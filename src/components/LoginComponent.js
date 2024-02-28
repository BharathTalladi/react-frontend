import React, { useState } from 'react';
import {loginUser,saveLoggedInUser,storeToken} from '../services/Service'; 
import { useNavigate,Link} from 'react-router-dom';

const Login = ()=>{

    const [usernameOrEmail,setusernameOrEmail]=useState('')
    const [password,setpassword]=useState('')
    const navigate = useNavigate();

    async function userLogin(e){
        e.preventDefault();
		const user = { usernameOrEmail, password };
        console.log("Request Payload:", user);
        await loginUser(usernameOrEmail, password).then((response) => {
            console.log(response.data);
            const token = 'Bearer ' + response.data.accessToken;
            const role=response.data.role;
            storeToken(token);
            saveLoggedInUser(usernameOrEmail,role);
            navigate('/students')
            //window.location.reload(false);
        }).catch(error => {
            console.error(error);
        })

    }

    

    return(
        <div className='container'>
        <br></br>
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <div className='card'>
                        <div className='card-header'> 
                            <h2 className='text-center'>User Login</h2>
                        </div>
                        <div className='card-body'>
                            <form>
                        
                                <div className='row mb-3'>
                                    <label htmlFor='usernameOrEmail' className='col-md-3 control-label'>Username or Email:</label>
                                    <div className='col-md-9'>
                                         <input id='usernameOrEmail' className="form-control mb-2" value={usernameOrEmail} name='username' 
                                        placeholder='Enter Username or Email' onChange={(s)=> setusernameOrEmail(s.target.value)}></input> 
                                    </div>
                                </div>
                                <div className='row mb-3'>
                                    <label htmlFor='password' className='col-md-3 control-label'>Password:</label>
                                    <div className='col-md-9'>
                                         <input id='password' className="form-control mb-2" value={password} name='password' 
                                        placeholder='Enter Password' onChange={(s)=> setpassword(s.target.value)}></input> 
                                    </div>
                                </div>
                                <div className='form-group mb-3'>
                                <button className='btn btn-success mb-2' onClick={(u)=> userLogin(u)}>Login</button>
                                Not Registered?<Link className='btn btn-info mb-2' to="/register" style={{marginLeft:"20px"}}>Register</Link>
                                </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;

