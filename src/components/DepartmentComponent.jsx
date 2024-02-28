import React, { useState, useEffect } from 'react';
import {updateDepartments,addDepartments,getDepartmentById} from '../services/Service';
import { useNavigate,Link,useParams } from 'react-router-dom';

const DepartmentComponent = ()=>{

    const [departmentName,setdepartmentName]=useState([]);
    const [departmentDescription,setdepartmentDescription]=useState([]);

    const navigate = useNavigate();
    const {id} = useParams();



    const saveorUpdateDepartment = (d)=>{ 
        d.preventDefault();
        const department={departmentName,departmentDescription };
        if(id){
            updateDepartments(id, department).then((response)=> {
                    console.log(response.data)
                    navigate('/department')
                }).catch(error => {
                    console.log(error)
                })
        }
        else{
            addDepartments(department).then((response)=> {
                navigate('/department')
            }).catch(error => {
                console.log(error)
            })
        }
    }

    useEffect(() => {
        if(id){
            getDepartmentById(id).then((response) =>{
                setdepartmentName(response.data.departmentName)
                setdepartmentDescription(response.data.departmentDescription)
            }).catch(error => {
                console.log(error)
            })
        }

    }, [id])

    const pageTitle = () => {

        if(id){
            return <h2 className = "text-center">Update Department</h2>
        }else{
            return <h2 className = "text-center">Add Department</h2>
        }
    }

    return(
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
                                        <label htmlFor="departmentName">Department Name:</label>
                                        <input id="departmentName" className="form-control mb-2" value={departmentName} name='Department Name' 
                                        placeholder='Department Name' onChange={(d)=> setdepartmentName(d.target.value)}></input> 
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="departmentDescription">Department Description:</label>
                                        <input id="departmentDescription" className="form-control mb-2" value={departmentDescription} name='Department Description' 
                                        placeholder='Department Description' onChange={(d)=> setdepartmentDescription(d.target.value)}></input> 
                                    </div>
                                    
                                    <button className='btn btn-success mb-2' onClick={(d)=> saveorUpdateDepartment(d)}>Save</button>
                                    <Link className='btn btn-danger mb-2' to="/department" style={{marginLeft:"20px"}}>Cancel</Link>
                                </form>
                            </div>
                        </div>
                    </div>
            </div>
    );
}

export default DepartmentComponent;