import React, { useState, useEffect } from 'react';
import {getDepartments,deleteDepartment,isAdminUser} from '../services/Service';
import { useNavigate } from 'react-router-dom';
import StudentDepartmentMappingComponent from './StudentDepartmentMappingComponent';

const ListDepartmentComponent = ()=>{

    const[departments, setDepartments]=useState([]);
    const navigator = useNavigate();
    const isAdmin = isAdminUser();

    useEffect( () => {
        listOfDepartments();
     }, [])
    
    function listOfDepartments(){
        getDepartments().then((response) => {
            console.log(response.data);
            setDepartments(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function updateDepartment(id){
        navigator(`/edit-department/${id}`)
    }

    function removeDepartment(departmentId){
        deleteDepartment(departmentId).then((response) => {
            console.log(response.data);
            listOfDepartments();
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewDepartment() {
        navigator('/add-department')
    }

    return (
        <div className='container'>
            <br></br>
            <div>
                        {
                            isAdmin &&
                            <button className='btn btn-primary mb-2' onClick={addNewDepartment}>Add Department</button>
                        }
                </div>
                <div className='row'>
                    <table className='table table-bordered table-stripped'>
                        <thead>
                            <tr>
                                <th>Departmet Name</th>
                                <th>Department Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                departments.map(
                                    department =>
                                    <tr key= {department.id}>
                                        <td>{department.departmentName}</td>
                                        <td>{department.departmentDescription}</td>
                                        <td>
                                            { isAdmin && <button onClick={() => updateDepartment(department.id)} className='btn btn-info'>Update</button>} 
                                            {isAdmin && <button onClick={() => removeDepartment(department.id)} className='btn btn-danger'style={{marginLeft: "10px"}}>Delete</button>}
                                        </td>
                                    </tr>

                                )
                            }
                        </tbody>
                    </table>
                </div>
                 {/* Pass department names to StudentDepartmentMappingComponent */}
               
    </div>
    );
}

export default ListDepartmentComponent