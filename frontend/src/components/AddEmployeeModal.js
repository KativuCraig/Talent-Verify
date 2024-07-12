import React from "react";
import { Modal, Button, Col, Row, Form } from "react-bootstrap";
import { addEmployee } from "../services/EmployeeService";

const AddEmployeeModal = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        addEmployee(data)
            .then((result) => {
                alert(result); // Display success message
                props.setUpdated(true); // Trigger re-fetch of employees
                props.onHide(); // Close modal
            })
            .catch((error) => {
                console.error('Failed to Add Employee:', error);
                alert('Failed to Add Employee'); // Display error message
            });
    };

    return (
        <div className="container">
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Add Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name="name" required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Employee ID Number</Form.Label>
                                    <Form.Control type="text" name="employee_id_number" required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Company Name</Form.Label>
                                    <Form.Control type="text" name="company_name" required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Department</Form.Label>
                                    <Form.Control type="text" name="department" required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Role</Form.Label>
                                    <Form.Control type="text" name="role" required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Date Started</Form.Label>
                                    <Form.Control type="date" name="date_started" required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Date Left</Form.Label>
                                    <Form.Control type="date" name="date_left" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Duties</Form.Label>
                                    <Form.Control as="textarea" name="duties" required />
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

export default AddEmployeeModal;
