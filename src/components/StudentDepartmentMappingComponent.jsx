import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation} from 'react-router-dom';

const StudentDepartmentMappingComponent = () => {
  const [name, setName] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  // Event handler for input change (student name)
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Event handler for dropdown change (selected department)
  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const location = useLocation(); // Access the location object
  const departments = location.state?.departments || []; // Get departments from state

  const addDepartmentToStudent = (s)=>{ 
    s.preventDefault(); 
    }

  return (
    <div className='container'>
      <br></br>
      <div className='row'>
        <div className='card col-md-6 offset-md-3 offset-md-3'>
          <h2 className="text-center">Assign Student to Department</h2>
          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
                <label htmlFor="name">Student Name:</label>
                <input
                  id="name"
                  className="form-control mb-2"
                  value={name}
                  name='name'
                  placeholder='Name'
                  onChange={handleNameChange}
                ></input>
              </div>
              <div className='form-group mb-2'>
                <label htmlFor="departmentName">Select Department</label>
                <select value={selectedDepartment} onChange={handleDepartmentChange}>
                  <option value="">Select a department</option>
                  {departments.map((department, index) => (
                    <option key={index} value={department.departmentName}>
                      {department.departmentName}
                    </option>
                  ))}
                </select>
              </div>
              <button className='btn btn-success mb-2' onClick={(s)=> addDepartmentToStudent(s)}>Save</button>
              <Link className='btn btn-danger mb-2' to="/students" style={{ marginLeft: "20px" }}>Cancel</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDepartmentMappingComponent;
