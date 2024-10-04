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
            await axios.delete(`http://localhost:4000/delete/${elem.id}`)
            .then(res => {
                return res.data
            })
        }catch(err){
            console.log(err)
        }
    }
    const toggleToCar = async(item) => {
        setId(item.id)
        navigate('/car', { state: {
            id: item.id,
            name: item.name,
            productName: item.productName,
            img: item.img,
            car: item.car,
            desc: item.desc
        } });
        // function base64ToBlob(base64String) {
        //     try {
        //         // Ensure the string has correct padding
        //         let paddedBase64String = base64String.padEnd(base64String.length + (base64String.length % 4), '=');
        //         let binary = atob(paddedBase64String);  // Decode base64
        //         let length = binary.length;
        //         let bytes = new Uint8Array(length);
        //         for (let i = 0; i < length; i++) {
        //             bytes[i] = binary.charCodeAt(i);
        //         }
        //         return new Blob([bytes], { type: 'image/png' });
        //     } catch (e) {
        //         console.error('Error decoding Base64:', e);
        //     }
        // }
        
        // const imgBlob = base64ToBlob(item.img, 'image/jpeg');
        // const formData = new FormData();
        //     formData.append('id', item.id);
        //     formData.append('name', item.name);
        //     formData.append('productName', item.productName);
        //     formData.append('desc', item.desc);
        //     formData.append('car', item.car);
        //     formData.append('img', imgBlob);
        // try{
        //     await axios.post('http://localhost:4000/submit/car', formData).then(res => console.log(res.data))
        // }catch(err){
        //     console.error("Error posting data: ", err);
        // } 
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
