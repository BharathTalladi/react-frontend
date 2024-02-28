import React, { useState } from 'react';
import { useNavigate,Link} from 'react-router-dom';
import {registerUsers} from '../services/Service'; 

const Registration = ()=>{

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password,setPassword] = useState('')

    const navigate = useNavigate();

    const registerUser = (u)=>{ 
        u.preventDefault();
        const user={name,username,email,password };
        console.log(user);
        registerUsers(user).then((response)=> {
                console.log(response)
                navigate('/students')
            }).catch(error => {
                console.log(error)
            })
        
    }

    return(
        <div className='container'>
            <br></br>
                <div className='row'>
                    <div className='col-md-6 offset-md-3'>
                        <div className='card'>
                            <div className='card-header'> 
                                <h2 className='text-center'>User Registartion Page</h2>
                            </div>
                            <div className='card-body'>
                                <form>
                                    <div className='row mb-3'>
                                        <label className='col-md-3 control-label'>Name:</label>
                                        <div className='col-md-9'>
                                             <input className="form-control" value={name} name='name' 
                                            placeholder='Enter Name' onChange={(s)=> setName(s.target.value)}></input> 
                                        </div>
                                    </div>
                                    <div className='row mb-3'>
                                        <label className='col-md-3 control-label'>Username:</label>
                                        <div className='col-md-9'>
                                             <input className="form-control mb-2" value={username} name='username' 
                                            placeholder='Enter Username' onChange={(s)=> setUsername(s.target.value)}></input> 
                                        </div>
                                    </div>
                                    <div className='row mb-3'>
                                        <label className='col-md-3 control-label'>Email:</label>
                                        <div className='col-md-9'>
                                             <input className="form-control mb-2" value={email} name='email' 
                                            placeholder='Enter Email' onChange={(s)=> setEmail(s.target.value)}></input> 
                                        </div>
                                    </div>
                                    <div className='row mb-3'>
                                        <label className='col-md-3 control-label'>Password:</label>
                                        <div className='col-md-9'>
                                             <input className="form-control mb-2" value={password} name='password' 
                                            placeholder='Enter Password' onChange={(s)=> setPassword(s.target.value)}></input> 
                                        </div>
                                    </div>
                                    <div className='form-group mb-3'>
                                    <button className='btn btn-success mb-2' onClick={(u)=> registerUser(u)}>Submit</button>
                                    Already Registered?<Link className='btn btn-danger mb-2' to="/login" style={{marginLeft:"20px"}}>Login</Link>
                                    </div>
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Registration;