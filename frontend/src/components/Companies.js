import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { getCompanies } from '../services/EmployeeService';
import "../App.css";

const Companies = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    let mounted = true;
    getCompanies()
      .then(data => {
        if(mounted) {
          setCompanies(data);
        }
      })
      .catch(error => {
        console.error("Error fetching companies:", error);
      });
    return () => mounted = false;
  }, []);

  return (
    <div className="container-fluid side-container">
      <div className="row side-row">
        <p id="before-table"></p>
        <Table striped bordered hover className="react-bootstrap-table" id="dataTable">
          <thead>
            <tr>
              <th>Registration Number</th>
              <th>Name</th>
              <th>Date of Registration</th>
              <th>Address</th>
              <th>Contact Person</th>
              <th>Departments</th>
              <th>Number of Employees</th>
              <th>Contact Phone</th>
              <th>Email Address</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company, index) => (
              <tr key={index}>
                <td>{company.registration_number}</td>
                <td>{company.name}</td>
                <td>{company.date_of_registration}</td>
                <td>{company.address}</td>
                <td>{company.contact_person}</td>
                <td>{company.departments}</td>
                <td>{company.number_of_employees}</td>
                <td>{company.contact_phone}</td>
                <td>{company.email_address}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Companies;
