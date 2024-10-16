import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';  // State to track authentication and roles
import Menu from '../menu/menu';
import Log from '../log/log';
import User from '../user/user';
import Main from '../HomePage/homePage';
import DataProduct from '../dataProduct/dataProduct';
import Car from '../car.js/car';

const App = () => {
    const [userRole, setUserRole] = useState(null); // Track user role
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

    // Login function to update state
    const login = (role) => {
        setUserRole(role);
        setIsLoggedIn(true);
    };

    return (
        <Router>
            <div className="app">
                <Menu />
                <Routes>
                    {/* Public route */}
                    <Route path="/log" element={<Log login={login} />} />  {/* Pass login function */}

                    {/* Main route */}
                    <Route 
                        path="/" 
                        element={isLoggedIn ? <Main /> : <Navigate to='/log' />} 
                    />

                    {/* Protected route for users */}
                    <Route 
                        path="/user" 
                        element={isLoggedIn && userRole === 'tulparkg' ? <User /> : <Navigate to="/log" />} 
                    />

                    {/* Other protected routes */}
                    <Route 
                        path="/DataProduct" 
                        element={isLoggedIn ? <DataProduct /> : <Navigate to="/log" />} 
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
