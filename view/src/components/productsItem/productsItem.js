import { useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import './productsItem.scss'

const ProductItem = () => {
    const[item, setitem] = useState([])
    const[id, setId] = useState(null)
    const navigate = useNavigate()



    useEffect(() => {
        const fetch = async () => {
            try{
                const res = await axios.get('http://localhost:4000/homepage')
                setitem(res.data)
           }catch(err){
               console.log(err)
           }
        }
        fetch()
    }, [])
    useEffect(() => {

    },[])

    const onDelete = async(elem) => {
        console.log(elem.id)
        try{
            await axios.delete(`https://tulparkg-backend.vercel.app/delete/${elem.id}`)
            .then(res => {
                return res.data
            })
        }catch(err){
            console.log(err)
        }
    }
    const toggleToCar = async(item) => {
        setId(item.id)
        navigate('/DataProduct', { state: {
            id: item.id,
            name: item.name,
            productName: item.productName,
            img: item.img,
            car: item.car,
            desc: item.desc
        } });
        
    };
    
    const View = () => {
        return item.map(item => (
            <div to="/car" key={item.id} 
                  className="productItem__item"> {/* Unique key here */}
                <button onClick={() => toggleToCar(item)} 
                        className="productItem__toCar">to</button>
                <button onClick={() =>onDelete(item)} 
                        className="productName__delet">×</button>
                <img src={`data:image/jpeg;base64,${item.img}`} 
                     alt={item.name} />
                <div className="productItem__costumer">
                    {item.name}
                </div>
                <div className="productItem__car">{item.car}</div>
            </div>
        ));
    };
    return (
        <div className="productItem">
            <View data={id}/>
        </div>
    );
};

export default ProductItem;
