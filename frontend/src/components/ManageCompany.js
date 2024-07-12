import React, { useState, useEffect } from 'react';
import { Table, Button, ButtonToolbar, Form, Row, Col } from 'react-bootstrap';
import { getCompanies, deleteCompanies } from '../services/EmployeeService'; // Make sure the service name is correct
import "../App.css";
import AddCompanyModal from './AddCompanyModal';
import UpdateCompanyModal from './UpdateCompanyModal'; 
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';

const ManageCompanies = () => {
    const [companies, setCompanies] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);

    const [filterName, setFilterName] = useState('');
    const [filterRegistrationNumber, setFilterRegistrationNumber] = useState('');
    const [filterContactPerson, setFilterContactPerson] = useState('');

    useEffect(() => {
        let mounted = true;
        if (companies.length && !isUpdated) {
            return;
        }
        getCompanies().then((data) => {
            if (mounted) {
                setCompanies(data);
            }
        }).catch(error => {
            console.error("Error fetching companies:", error);
        });
        return () => {
            mounted = false;
            setIsUpdated(false);
        };
    }, [isUpdated, companies.length]);

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true);
    };

    const handleUpdate = (e, company) => {
        e.preventDefault();
        setSelectedCompany(company);
        setEditModalShow(true);
    };

    const handleDelete = (e, registration_number) => {
        if (window.confirm('Are you sure?')) {
            e.preventDefault();
            deleteCompanies(registration_number)
                .then((result) => {
                    alert(result);
                    setIsUpdated(true);
                })
                .catch((error) => {
                    alert("Failed to Delete Company");
                });
        }
    };

    const filteredCompanies = companies.filter(company =>
        (filterName === '' || company.name.toLowerCase().includes(filterName.toLowerCase())) &&
        (filterRegistrationNumber === '' || company.registration_number.toLowerCase().includes(filterRegistrationNumber.toLowerCase())) &&
        (filterContactPerson === '' || company.contact_person.toLowerCase().includes(filterContactPerson.toLowerCase()))
    );

    let addModalClose = () => {
        setAddModalShow(false);
        setIsUpdated(true); // Trigger update after closing the add modal
    };
    let editModalClose = () => {
        setEditModalShow(false);
        setIsUpdated(true); // Trigger update after closing the edit modal
    };

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
                                placeholder="Filter by Registration Number"
                                value={filterRegistrationNumber}
                                onChange={(e) => setFilterRegistrationNumber(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Filter by Contact Person"
                                value={filterContactPerson}
                                onChange={(e) => setFilterContactPerson(e.target.value)}
                            />
                        </Col>
                    </Row>
                </Form>
                <div className="table-responsive">
                    <Table striped bordered hover className="react-bootstrap-table" id="dataTable" style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th>Reg. No.</th>
                                <th>Name</th>
                                <th>Reg. Date</th>
                                <th>Address</th>
                                <th>Contact</th>
                                <th>Departments</th>
                                <th>Employees</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCompanies.map((company, index) => (
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
                                    <td>
                                        <Button className='mr-2' variant='danger' onClick={(e) => handleDelete(e, company.registration_number)}>
                                            <RiDeleteBin5Line />
                                        </Button>
                                        <Button variant='primary' onClick={(e) => handleUpdate(e, company)}>
                                            <FaEdit />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                <ButtonToolbar>
                    <Button variant='success' onClick={handleAdd}>Add Company</Button>
                    <AddCompanyModal show={addModalShow} onHide={addModalClose} setUpdated={setIsUpdated} />
                    {selectedCompany && (
                        <UpdateCompanyModal
                            show={editModalShow}
                            onHide={editModalClose}
                            company={selectedCompany}
                            setUpdated={setIsUpdated}
                        />
                    )}
                </ButtonToolbar>
            </div>
        </div>
    );
};

export default ManageCompanies;
