import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { getEmployees } from '../services/EmployeeService';
import "../App.css";

const Employees = () => {
  const [Employee, setEmployee] = useState([]);

  useEffect(() => {
   let mounted = true;
   getEmployees()
     .then(data => {
       if(mounted) {
         setEmployee(data)
       }
     })
   return () => mounted = false;
 }, [])

  return(
   <div className="container-fluid side-container">
   <div className="row side-row" >
    <p id="before-table"></p>
        <Table striped bordered hover className="react-bootstrap-table" id="dataTable">
        <thead>
            <tr>
                            <th>Id No'</th>
                             <th>Name </th>
                            <th>Company Name</th>
                            <th>Department</th>
                            <th>Role</th>
                            <th>Date Started</th>
                            <th>Date Left</th>
                            <th>Duties</th>
            </tr>
        </thead>
        <tbody>
        {Employee.map((employee, index) => (
                            <tr key={index}>
                                <td>{employee.employee_id_number}</td>
                                <td>{employee.name}</td>
                                <td>{employee.company_name}</td>
                                <td>{employee.department}</td>
                                <td>{employee.role}</td>
                                <td>{employee.date_started}</td>
                                <td>{employee.date_left}</td>
                                <td>{employee.duties}</td>
                                </tr>

           ))}
        </tbody>
    </Table>
    </div>
  </div>
  );
};

export default Employees;