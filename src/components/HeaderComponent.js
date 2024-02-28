import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { isUserLoggedIn, logoutUser } from '../services/Service';

const HeaderComponent = ()=>  {

    const isUserAuthenticated = isUserLoggedIn();
    const navigate=useNavigate();

    function logout(){
        logoutUser();
        navigate('login');
    }
    
        return (
            <div>
                <header>
                    <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
                        <div>
                            <a href='http://localhost:3000/students' className='navbar-brand'>Student's Information</a>
                        </div>
                        <div className='collapse navbar-collapse'>
                           <ul className='navbar-nav'>

                                {
                                    isUserAuthenticated && 
                                    <li className='nav-item'>
                                    <NavLink to="/students" className="nav-link">Students</NavLink>
                                    </li>
                                }
                                {
                                    isUserAuthenticated && 
                                    <li className='nav-item'>
                                    <NavLink to="/department" className="nav-link">Departments</NavLink>
                                    </li>
                                }
                                
                           </ul>
                        </div>
                           <ul className='navbar-nav'>
                            {
                                !isUserAuthenticated && 
                                <li className='nav-item'>
                                <NavLink to="/register" className="nav-link">Register</NavLink>
                                </li>
                            }
                            {
                                !isUserAuthenticated && 
                                <li className='nav-item'>
                                <NavLink to="/login" className="nav-link">Login</NavLink>
                                </li>
                            } 
                            {
                                isUserAuthenticated && 
                                <li className='nav-item'>
                                <NavLink to="/login" className="nav-link" onClick={logout}>Logout</NavLink>
                                </li>
                            }  
                           </ul>
                    </nav>
                </header>
            </div>
        ); 
}

export default HeaderComponent;