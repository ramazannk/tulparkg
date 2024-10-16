import { useState } from 'react'
import axios from 'axios';

import './regstre.scss'

const Registre = () => {
    const[name, setName] = useState('');
    const[password, setPassword] = useState('');
    const[productId, setproductId] = useState(0)

    

    const postData = async(e) => {
        e.preventDefault()

        const data = {
            name, 
            password,
            productId
        };

        console.log('Sending Data:', data);

        try {
            // Use JSON format for sending the data
            const res = await axios.post('http://localhost:4000/register', data, {
                headers: {
                    'Content-Type': 'application/json' // Ensure content-type is JSON
                }
            });
            console.log(res.data)
        }catch(err){
            console.log(err)
        }
    }

    
    return(
        <div className="registre">
            <div className="registre__contaoner">
                <form 
                    method='POST'
                    onSubmit={postData}>
                    <label>Имя</label>
                    <input 
                        type="text"
                        className="registre__name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}/>
                    <label>пароль</label>
                    <input 
                        type="password" 
                        className="registre__password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                    <input 
                        type="number" 
                        className="registre__id"
                        value={productId}
                        onChange={(e) => setproductId(e.target.value)} />
                    <button type='submit'>click</button>
                </form>
            </div>
        </div>
    )
} 

export default Registre