import { useState } from "react"
import axios from 'axios'
import ProductItem from "../productsItem/productsItem"



import './homePage.scss'
const Main =()=> {
    const [product, setProduct] = useState(null); 
    const[lastName, setLastName] = useState('');
    const[ProductName, setProdutName] = useState('');
    const[desc, setDesc] = useState('');
    const[car, setCar] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const[preview, setPreview] = useState(null)
    const[password, setPassword] = useState('');
    
    
    
   const trigerInput = () =>{
        document.getElementById("file").click()
   }

   const handleFileChange = (e) => {
        const target = e.target.files[0]
        setProduct(target); // Store the selected file
        const previewUrl = URL.createObjectURL(target);
        setPreview(previewUrl);
    };
   
    const toggelData = async(e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('lastName', lastName);
        formData.append('productName', ProductName);
        formData.append('desc', desc);
        formData.append('car', car);

        formData.append('product', product);
        formData.append('password', password)

        try{
            await axios.post('https://tulparkg-backend.vercel.app/submit', formData)
                .then(res => {
                    if(res.status === 200){
                        setCar('');
                        setDesc('');
                        setLastName('');
                        setProdutName('');
                        setProduct(null);
                        setPreview(null)
                    }
                    return res.data
                })
                .catch(res => res)
                .finally(console.log("This process is finished"))
            
        }catch(err){
            setResponseMessage('Failed to upload data');
            console.log(err)
        }
    }


    return(
        <div className="main">
            <div className="main__container">
                <form  action="/submit" 
                       method="POST"
                       onSubmit={toggelData}>
                    <div className="main__upLoad">
                        <div className="main__image">
                            {preview ? <img 
                                style={{width: "170px",
                                        height: "204px",
                                        borderRadius: "5px"}}
                                src={preview} 
                                alt="Selected Product" /> : 
                                <input
                                    type="button"
                                    value="+"
                                    className="main__plus-button"
                                    onClick={trigerInput}
                                />}
                            <label htmlFor="upLoad"></label>
                            <input
                                id="file"
                                type="file" 
                                style={{ display: 'none' }} // Hide the default file input
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="main__data">
                            <input type="text" 
                                placeholder="Клиент: ФИО"
                                className="main__datainput"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}/>
                            <input type="text" 
                                placeholder="Называние: Товар"
                                className="main__datainput"
                                value={ProductName}
                                onChange={(e) => setProdutName(e.target.value)}/>
                            <textarea type="text" 
                                placeholder="Описание: Товар из китай" 
                                className="main__datainput-desc"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}/>
                            <input type="text" 
                                placeholder="Машина: ФИО"
                                className="main__datainput"
                                value={car}
                                onChange={(e) => setCar(e.target.value)}/>
                            <input 
                                type="password" 
                                className="registre__password"
                                value={password}
                                placeholder="password"
                                onChange={(e) => setPassword(e.target.value)}/>
                            <button className="submit" type="submit">send</button>
                            {responseMessage && <p>{responseMessage}</p>}
                        </div>
                        
                    </div>
                </form>
                <div className="main__card">
                    <ProductItem />
                </div>
            </div>
        </div>
    )
}

export default Main