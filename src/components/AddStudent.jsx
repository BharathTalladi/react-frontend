import React, { useState, useEffect } from 'react';
import { useNavigate, useParams,Link} from 'react-router-dom';
import {addStudents, getStudentById, updateStudent} from '../services/Service';

const AddStudent =()=>  {


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const navigate = useNavigate();
    const {id} = useParams();


    const saveorUpdateStudent = (s)=>{ 
        s.preventDefault();
        const student={name,email };
        if(id){
            updateStudent(id, student).then((response)=> {
                    navigate('/students')
                }).catch(error => {
                    console.log(error)
                })
        }
        else{
            addStudents(student).then((response)=> {
                navigate('/students')
            }).catch(error => {
                console.log(error)
            })
        }
    }

    useEffect(() => {
        if(id){
            getStudentById(id).then((response) =>{
                setName(response.data.name)
                setEmail(response.data.email)
            }).catch(error => {
                console.log(error)
            })
        }

    }, [id])

    const pageTitle = () => {

        if(id){
            return <h2 className = "text-center">Update Student</h2>
        }else{
            return <h2 className = "text-center">Add Student</h2>
        }
    }
    
        return (
            <div className='container'>
                <br></br>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            {
                                pageTitle()
                            }
                            <div className='card-body'>
                                <form>
                                    <div className='form-group mb-2'>
                                        <label htmlFor="name">Student Name:</label>
                                        <input id="name" className="form-control mb-2" value={name} name='name' 
                                        placeholder='Name' onChange={(s)=> setName(s.target.value)}></input> 
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="email">Student Email:</label>
                                        <input id="email" className="form-control mb-2" value={email} name='email' 
                                        placeholder='Email' onChange={(s)=> setEmail(s.target.value)}></input> 
                                    </div>
                                    
                                    <button className='btn btn-success mb-2' onClick={(s)=> saveorUpdateStudent(s)}>Save</button>
                                    <Link className='btn btn-danger mb-2' to="/students" style={{marginLeft:"20px"}}>Cancel</Link>
                                </form>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }

export default AddStudent;