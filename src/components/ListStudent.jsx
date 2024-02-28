import React, { useState, useEffect } from 'react';
import {getStudents, deleteStudent, isAdminUser, isUserLoggedIn} from '../services/Service';
import { useNavigate } from 'react-router-dom';

const ListStudent = ()=> {

    const [students, setstudents] = useState([])

    const navigate = useNavigate()

    const isAdmin = isAdminUser();

    useEffect(() => {
        getAllStudents();
    }, [])

    const getAllStudents = () => {
        getStudents().then((response) => {
            setstudents(response.data)
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }

    const removeStudent= (studentId) => {
        deleteStudent(studentId).then((response) =>{
            getAllStudents();
 
        }).catch(error =>{
            console.log(error);
        })
         
     }
 
     function addNewStudent() {
         navigate('/add-student')
     }

     function makePayment(){
        navigate('/payment')
     }

     const updateStudent = (id) => {
         navigate(`/edit-student/${id}`)
     }

     const assignDeptToStudent = (id) => {
  navigate(`/assign-department/${id}`);
    }


        return (
            <div className='container'>
                <h2 className="text-center">Student List</h2>
                <div>
                        {
                            isAdmin &&
                            <button className='btn btn-primary mb-2' onClick={addNewStudent}>Add Student</button>
                        }
                </div>
                <div className='row'>
                    <table className='table table-bordered table-stripped'>
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Student Email</th>
                                <th>Department</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                students.map(
                                    student => 
                                    <tr key= {student.id}>
                                        <td>{student.name}</td>
                                        <td>{student.email}</td>
                                        <td>{student.department}</td>
                                        <td>
                                        {
                                            isAdmin && <button className="btn btn-info" onClick={() => updateStudent(student.id)} style = {{marginLeft:"10px"}}>Update</button>
                                        }
                                        {
                                            isAdmin && <button className = "btn btn-primary" onClick = {() => assignDeptToStudent(student.id)}  style = {{marginLeft:"10px"}}> Assign Dept</button>
                                        }
                                        {
                                            isAdmin && <button className = "btn btn-danger" onClick = {() => removeStudent(student.id)}  style = {{marginLeft:"10px"}}> Delete</button>
                                        }
                                        {
                                            isUserLoggedIn && <button className = "btn btn-primary"  onClick={makePayment} style = {{marginLeft:"10px"}}>Payment</button>
                                        }
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

export default ListStudent;