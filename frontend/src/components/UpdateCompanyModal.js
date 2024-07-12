import React from 'react';
import { Modal, Button, Col, Row, Form } from 'react-bootstrap';
import { updateCompany } from '../services/EmployeeService';

const UpdateCompanyModal = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        updateCompany(props.company.registration_number, data)
            .then((result) => {
                alert(result);
                props.setUpdated(true);
                props.onHide();
            })
            .catch((error) => {
                console.error('Failed to Update Company:', error);
                alert('Failed to Update Company');
            });
    };

    const { company } = props;

    return (
        <div className="container">
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Update Company Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name="name" defaultValue={company ? company.name : ''} required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Date of Registration</Form.Label>
                                    <Form.Control type="date" name="date_of_registration" defaultValue={company ? company.date_of_registration : ''} required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Registration Number</Form.Label>
                                    <Form.Control type="text" name="registration_number" defaultValue={company ? company.registration_number : ''} required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control as="textarea" name="address" defaultValue={company ? company.address : ''} required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Contact Person</Form.Label>
                                    <Form.Control type="text" name="contact_person" defaultValue={company ? company.contact_person : ''} required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Departments</Form.Label>
                                    <Form.Control as="textarea" name="departments" defaultValue={company ? company.departments : ''} required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Number of Employees</Form.Label>
                                    <Form.Control type="number" name="number_of_employees" defaultValue={company ? company.number_of_employees : ''} required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Contact Phone</Form.Label>
                                    <Form.Control type="text" name="contact_phone" defaultValue={company ? company.contact_phone : ''} required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control type="email" name="email_address" defaultValue={company ? company.email_address : ''} required />
                                </Form.Group>
                                <Form.Group>
                                    <Button variant="primary" type="submit">Submit</Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UpdateCompanyModal;
