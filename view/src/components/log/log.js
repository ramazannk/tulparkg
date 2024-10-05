import { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


import './log.scss';


const Log = () => {
    const[name, setUser] = useState('');
    const[password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);


    const onSubmit =async(e) => {
        e.preventDefault();

        const data = {
            name,
            password
        }

        try {
            await axios.post('https://tulparkg-backend.vercel.app/login', data)
                  .then(res => {
                    login();
                    console.log(res.data)
                    if(res.status === 200){
                        navigate('/user', {state:{
                            id: res.data.id,
                            name: res.data.name,
                            productName: res.data.productName,
                            img: res.data.img,
                            car: res.data.car,
                            desc: res.data.desc
                        }})
                    }
                    console.log(res.data.products[0].img.data)
                  })
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <div className="log">
            <div className="log__container">
            <form 
                action='/log'
                method='POST'
                onSubmit={onSubmit}>
                <label>Login</label>
                <input 
                    type="text"
                    value={name}
                    onChange={(e) => setUser(e.target.value)}/>
                <label >Password</label>
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                <button className="login" action='submit'>Войти</button>
            </form>
            </div>
        </div>
    )
};
export default Log