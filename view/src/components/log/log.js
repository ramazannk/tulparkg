// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './log.scss';

// const Log = () => {
//     const [name, setUser] = useState('');
//     const [password, setPassword] = useState('');
//     const [role, setRole] = useState(null);  // Role state
//     const navigate = useNavigate();

//     const onSubmit = async (e) => {
//         e.preventDefault();

//         const data = {
//             name,
//             password,
//             role // Include role in the data sent to the backend
//         };  
//         try {
//             const res = await axios.post('http://localhost:4000/login', data);
//             console.log(res.data);

//             if (res.status === 200) {

//                 if (role === 'user') {
//                     navigate('/user', {
//                         state: {
//                             id: res.data.id,
//                             name: res.data.name,
//                             productName: res.data.productName,
//                             img: res.data.img,
//                             car: res.data.car,
//                             desc: res.data.desc
//                         }
//                     });
//                 } else if (role === 'admin') {
//                     console.log(role)
//                     navigate('/');
//                 }
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return (
//         <div className="log">
//             <div className="log__container">
//                 <form 
//                     onSubmit={onSubmit}
//                     className='log__post'>
//                     <h1>Welcome to company TULPARkG</h1>

//                     {/* Username input */}
//                     <div className="log__name">
//                         <label>Login</label>
//                         <input 
//                             type="text"
//                             value={name}
//                             onChange={(e) => setUser(e.target.value)} 
//                         />
//                     </div>

//                     {/* Password input */}
//                     <div className="log__password">
//                         <label>Password</label>
//                         <input 
//                             type="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)} 
//                         />
//                     </div>

//                     {/* Role selection */}
//                     <div className="log__role">
//                         <label>Role</label>
//                         <select value={role} onChange={(e) => setRole(e.target.value)}>
//                             <option value="tulparkg">User</option>
//                             <option value="admintkg">Admin</option>
//                         </select>
//                     </div>

//                     {/* Submit button */}
//                     <button className="log__login" type='submit'>Login</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Log;
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './log.scss';

const Log = ({ login }) => {  // Accept login as prop
    const [name, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(null);  // Set default to user role
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
    
        const data = { name, password};  
        console.log(data, role);
        if(role === 'tulparkg'){
            try {
                const res = await axios.post('http://localhost:4000/login', data);
                console.log(res.data);
        
                if (res.status === 200) {  
                    login(role);  
                        if (role === 'tulparkg') {
                            navigate('/user', {
                                state: {
                                    id: res.data.id,
                                    name: res.data.name,
                                    productName: res.data.productName,
                                    img: res.data.img,
                                    car: res.data.car,
                                    desc: res.data.desc
                                }
                            });
                        } 
                    }
                } catch (error) {
                    console.log(error);
                }
            }else{
                try {
                    const res = await axios.post('http://localhost:4000/login/admin', data);
            
                    if (res.status === 200) {  
                        console.log("ok")
                        login(role);  
                        navigate('/');
                    }
                } catch (error) {
                    console.log(error);
                }
            
            }
        } 

        

    return (
        <div className="log">
            <div className="log__container">
                <form className='log__post'>
                    <h1>Welcome to company TULPARkG</h1>

                    <div className="log__name">
                        <label>Login</label>
                        <input 
                            type="text"
                            value={name}
                            onChange={(e) => setUser(e.target.value)} 
                        />
                    </div>

                    <div className="log__password">
                        <label>Password</label>
                        <input 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>

                    <div className="log__role">
                        <label>Role</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="tulparkg">User</option>
                            <option value="admintkg">Admin</option>
                        </select>
                    </div>

                    <button 
                        className="log__login" 
                        type='submit'
                        onClick={onSubmit}>Login</button>
                </form>
            </div>
        </div>
    );
};

export default Log;
