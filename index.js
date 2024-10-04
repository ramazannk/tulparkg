import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import multer from "multer";
import cors from 'cors';
import bcrypt from 'bcrypt'
const app = express();
const port = 4000;
const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const db = new pg.Pool({
    connectionString: 'postgres://gszokujy:O58RyuEPY0vgrcMbY0nQyhAiULzEiSo9@surus.db.elephantsql.com/gszokujy',
    ssl: {
        rejectUnauthorized: false
    }
});

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

app.post('/submit', upload.single('product'), async (req, res) => {
    const { lastName, productName, desc, car } = req.body;
    // Get the image buffer from the uploaded file
    const imgBuffer = req.file.buffer;
        
    try {
        const result = await db.query(
            `INSERT INTO tulparkg (lastName, productName, description, car, img) VALUES ($1, $2, $3, $4, $5) RETURNING id`, 
            [lastName, productName, desc, car, imgBuffer]
        );

        res.json({ message: 'Posted successfully', id: result.rows[0].id });
    } catch (err) {
        console.log('Something went wrong: ' + err);
        res.status(500).json({ error: 'Failed to post image' });
    }
});

app.post('/submit/car/:id', async (req, res) => {
    const { id } = req.params;  // car id from the URL
    const { lat, lng } = req.body;  // latitude and longitude from request body
    
    console.log(id, lat, lng);  // Debugging output to see what's being sent

    const query = `
        INSERT INTO cars (id, latitude, longitude, updated_at)
        VALUES ($1, $2, $3, NOW())
        ON CONFLICT (id) 
        DO UPDATE SET 
        latitude = EXCLUDED.latitude, 
        longitude = EXCLUDED.longitude,
        updated_at = NOW()
        RETURNING *;
    `;

    // Corrected the order of values to match the query placeholders
    const values = [id, parseFloat(lat), parseFloat(lng)];
      
    try {
      const result = await db.query(query, values);  // Executing the query
      if (result.rows.length > 0) {
        console.log('Car location updated:', result.rows[0]);  // Debugging the returned row
        res.json({ message: 'Car location updated successfully', car: result.rows[0] });
      } else {
        res.status(404).json({ message: 'Car not found' });  // Handle case if no row is returned
      }
    } catch (err) {
      console.error('Something went wrong:', err);
      res.status(500).json({ error: 'Failed to update car location' });  // Error handling
    }
});


app.post('/register', async (req, res) => {
    const { name, password, productId } = req.body;
    console.log(name, password, productId)

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);


        const userResult = await db.query(
            'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING user_id',
            [name, hashedPassword]
        );
        const userId = userResult.rows[0].user_id;
        if(userResult){
            console.log('Success')
        }

        const up = await db.query(
            'UPDATE tulparkg SET user_id = $1 WHERE id = $2',
            [userId, productId]
        );
        if(up){
            console.log('Updated th id')
        }

        res.status(201).send('User registered and product linked successfully');
    } catch (err) {
        res.status(500).send('Error registering user or linking product');
    } 
});

app.post('/login', async (req, res) => {
    const { name, password } = req.body;
    console.log(name, password)

    try {
        // Check if user exists
        const userResult = await db.query(
            'SELECT * FROM users WHERE name = $1',
            [name]
        );

        if (userResult.rows.length === 0) {
            return res.status(401).send('Invalid username or password');
        }

        const user = userResult.rows[0];

        // Verify the password
        const match = await bcrypt.compare(password, user.password);
        if(match){
            console.log(true)
        }

        if (!match) {
            console.log('no match')
            return res.status(401).send('Invalid username or password');
        }

        // Fetch the products for the logged-in user
        const productsResult = await db.query(
            'SELECT * FROM tulparkg WHERE user_id = $1',
            [user.user_id]
        );

        const data = productsResult.rows.map((elem)=>{
            let img = null
            if (elem.img) {
                    img = Buffer.from(elem.img).toString('base64');
            }
            return{
                id: elem.id,
                name: elem.lastname,
                productName: elem.productname,
                desc: elem.description,
                car: elem.car,
                img: img
            }
        })

        res.json(data[0])
    } catch (err) {
        res.status(500).send('Error during login');
    }
});

  
app.get('/getMaps/:id', async(req, res) => {
const { id } = req.params;

try {
    const result = await db.query(`SELECT latitude, longitude FROM cars WHERE id = $1`, [id]);
    
    if (result.rows.length === 0) {
    return res.status(404).json({ error: 'Car not found' });
    }

    res.json(result.rows[0]);
} catch (err) {
    console.error('Error fetching car location:', err);
    res.status(500).json({ error: 'Failed to fetch car location' });
}
});
  
  

app.delete('/delete/:id', async (req, res) => {
    console.log(req.params.id)
    const {id} = req.params;
    console.log(id)
    try {
        // console.log(id)
        await db.query(`DELETE FROM tulparkg WHERE id = $1`, [id]); // Use dynamic ID
        console.log('Success');
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        console.log("Error: " + err);
        res.status(500).json({ error: 'Failed to delete image' });
    }
});


app.get('/product/:id', async(req, res) => {
    const{id} = req.params;
    try{
        const result = await db.query('SELECT * FROM tulparkg WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        const data = result.rows.map((elem) => {
            let img = null
            if (elem.img) {
                    img = Buffer.from(elem.img).toString('base64');
            }
            return{
                id: elem.id,
                name: elem.lastname,
                productName: elem.productname,
                desc: elem.description,
                car: elem.car,
                img: img
            }
        })
        res.json(data[0])

    }catch(err){
        console.log(err)
    }
    
});


app.get('/', async(req, res) => {
    try{
        const result = await db.query('SELECT * FROM tulparkg');
        
        const data = result.rows.map(row => {
            const img = Buffer.from(row.img).toString('base64');
            return{
                id: row.id,
                name: row.lastname,
                productName: row.productname,
                desc: row.description,
                car: row.car,
                img: img
            }
        })
        res.json(data)
    }catch(err){
        console.log("Something went wrong" + err)
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
