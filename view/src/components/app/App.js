import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext'; // Import your authentication context
import Menu from '../menu/menu'; 
import Log from '../log/log';
import User from '../user/user';
import Registre from '../regstre/registre';
import Main from '../HomePage/homePage';
import Car from '../car.js/car';

const App = () => {
    const { isAuthenticated } = useContext(AuthContext); // Access the login status

    return (
        <Router>
            <div className="app">
                <Menu />
                <Routes>
                    <Route path="/log" element={<Log />} />
                    <Route path="/registre" element={<Registre />} />

                    <Route 
                        path="/user" 
                        element={isAuthenticated ? <User /> : <Navigate to="/log" />} 
                    />

                    <Route 
                        path="/" 
                        element={<Main />} 
                    />
                    <Route 
                        path="/car" 
                        element={<Car />} 
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
