import React, { useState, useEffect } from 'react';
import { Table, Button, ButtonToolbar, Form, Row, Col } from 'react-bootstrap';
import { getEmployees, deleteEmployees } from '../services/EmployeeService';
import "../App.css";
import AddEmployeeModal from './AddEmployeeModal';
import UpdateEmployeeModal from './UpdateEmployeeModal'; 
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';

const ManageEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const [filterName, setFilterName] = useState('');
    const [filterCompanyName, setFilterCompanyName] = useState('');
    const [filterDepartment, setFilterDepartment] = useState('');

    useEffect(() => {
        let mounted = true;
        if (employees.length && !isUpdated) {
            return;
        }
        getEmployees().then((data) => {
            if (mounted) {
                setEmployees(data);
            }
        }).catch(error => {
            console.error("Error fetching employees:", error);
        });
        return () => {
            mounted = false;
            setIsUpdated(false);
        };
    }, [isUpdated, employees.length]);

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true);
    };

    const handleUpdate = (e, employee) => {
        e.preventDefault();
        setSelectedEmployee(employee);
        setEditModalShow(true);
    };

    const handleDelete = (e, employee_id_number) => {
        if (window.confirm('Are you sure?')) {
            e.preventDefault();
            deleteEmployees(employee_id_number)
                .then((result) => {
                    alert(result);
                    setIsUpdated(true);
                })
                .catch((error) => {
                    alert("Failed to Delete Employee");
                });
        }
    };

    const filteredEmployees = employees.filter(employee =>
        (filterName === '' || employee.name.toLowerCase().includes(filterName.toLowerCase())) &&
        (filterCompanyName === '' || employee.company_name.toLowerCase().includes(filterCompanyName.toLowerCase())) &&
        (filterDepartment === '' || employee.department.toLowerCase().includes(filterDepartment.toLowerCase()))
    );

    let addModalClose = () => setAddModalShow(false);
    let editModalClose = () => setEditModalShow(false);

    return (
        <div className="container-fluid side-container">
            <div className="row side-row">
                <Form>
                    <Row>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Filter by Name"
                                value={filterName}
                                onChange={(e) => setFilterName(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Filter by Company Name"
                                value={filterCompanyName}
                                onChange={(e) => setFilterCompanyName(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Filter by Department"
                                value={filterDepartment}
                                onChange={(e) => setFilterDepartment(e.target.value)}
                            />
                        </Col>
                    </Row>
                </Form>
                <Table striped bordered hover className="react-bootstrap-table" id="dataTable">
                    <thead>
                        <tr>
                            <th>Id No'</th>
                            <th>Name</th>
                            <th>Company Name</th>
                            <th>Department</th>
                            <th>Role</th>
                            <th>Date Started</th>
                            <th>Date Left</th>
                            <th>Duties</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map((employee, index) => (
                            <tr key={index}>
                                <td>{employee.employee_id_number}</td>
                                <td>{employee.name}</td>
                                <td>{employee.company_name}</td>
                                <td>{employee.department}</td>
                                <td>{employee.role}</td>
                                <td>{employee.date_started}</td>
                                <td>{employee.date_left}</td>
                                <td>{employee.duties}</td>
                                <td>
                                    <Button className='mr-2' variant='danger' onClick={(e) => handleDelete(e, employee.employee_id_number)}>
                                        <RiDeleteBin5Line />
                                    </Button>
                                    <span>&nbsp;&nbsp;&nbsp;</span>
                                    <Button variant='primary' onClick={(e) => handleUpdate(e, employee)}>
                                        <FaEdit />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant='success' onClick={handleAdd}>Add Employee</Button>
                    <AddEmployeeModal show={addModalShow} onHide={addModalClose} setUpdated={setIsUpdated} />
                    {selectedEmployee && (
                        <UpdateEmployeeModal
                            show={editModalShow}
                            onHide={editModalClose}
                            employee={selectedEmployee}
                            setUpdated={setIsUpdated}
                        />
                    )}
                </ButtonToolbar>
            </div>
        </div>
    );
};

export default ManageEmployees;
