import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import { GET_ALL_DEPARTMENT, SAVE_UPDATE_COURSES } from '../../../reducers/ApiEndPoints';
import Cookies from 'js-cookie';

function MyVerticallyCenteredModal(props) {
    const [newCourse, setNewCourse] = useState({
        code: '',
        name: '',
        credit: '',
        semester: '',
        department: '',
        batch: ''
    });
    const [selectedDepartment, setSelectedDepartment] = useState([]);
    const { onHide } = props;
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        axios({
            method: 'GET',
            url: GET_ALL_DEPARTMENT,
            headers: {
                Authorization: "Bearer " + Cookies.get('authtoken')
            }
        })
            .then((res) => {
                setDepartments(res.data.data)
            })
            .catch((err) => console.log(err));
    }, []);


    async function handleRegisterCourse(e) {
        e.preventDefault();
        onHide();
        await axios({
            method: 'post',
            url: SAVE_UPDATE_COURSES,
            data: newCourse,
            headers: {
                Authorization: "Bearer " + Cookies.get('authtoken')
            }
        })
            .then(res => {
                alert(res.data.data.message);
                setNewCourse({
                    code: '',
                    name: '',
                    credit: '',
                    semester: '',
                    department: '',
                    batch: ''
                })
            })
            .catch(err => {
                console.log(err)
                alert(err.response.data.message)
            })
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop='static'
        >
            <Modal.Header closeButton style={{
                padding: '10px 20px'
            }}>
                Register a course
            </Modal.Header>
            <Modal.Body >
                <Form className='bg-light'
                    onSubmit={handleRegisterCourse}
                    style={{
                        margin: '0 5vw',
                        borderRadius: '10px',
                        border: '1px solid #adb5bd',
                    }}>
                    <table style={{
                        width: '100%'
                    }}><tbody><tr>
                        <td style={{
                            width: '50%',
                            padding: '2% 5% 2% 5%'
                        }}>
                            {
                                [
                                    {
                                        label: 'Course code',
                                        placeholder: 'Enter course code',
                                        type: 'text',
                                        value: newCourse.code,
                                        onChange: (e) => setNewCourse({ ...newCourse, code: e.target.value }),
                                        required: true
                                    },
                                    {
                                        label: 'Course name',
                                        placeholder: 'Enter course name',
                                        type: 'text',
                                        value: newCourse.name,
                                        onChange: (e) => setNewCourse({ ...newCourse, name: e.target.value }),
                                        required: true
                                    },
                                    {
                                        label: 'Course credit',
                                        placeholder: 'Enter course credit',
                                        value: newCourse.credit,
                                        onChange: (e) => setNewCourse({ ...newCourse, credit: e.target.value }),
                                        required: true,
                                        type: 'number'
                                    }
                                ].map((item, index) => {
                                    return (
                                        <Form.Group className="mb-3" key={index} >
                                            <Form.Label>{item.label}</Form.Label>
                                            <Form.Control placeholder={item.placeholder}
                                                value={item.value} onChange={item.onChange}
                                                required={item.required}
                                                type={item.type}
                                            />
                                        </Form.Group>
                                    )
                                })
                            }
                        </td>
                        <td style={{
                            width: '50%',
                            padding: '2% 5% 2% 5%',
                        }}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Semester</Form.Label>
                                <Form.Control
                                    placeholder='Course for which sem'
                                    value={newCourse.semester}
                                    onChange={(e) => setNewCourse({ ...newCourse, semester: e.target.value })}
                                    required={true}
                                    type='number'
                                />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Department</Form.Label>
                                <Row>
                                    {/* <Col>
                                        <Form.Select
                                            value={newCourse.degree}
                                            onChange={(e) => {
                                                setNewCourse({ ...newCourse, department: { code: e.target.value } });
                                                setSelectedDegree(degrees.find(degree => degree.code === e.target.value));
                                            }}
                                            required={true}
                                        >
                                            <option value=''>Select degree</option>
                                            {
                                                degrees.map((degree, index) => (
                                                    <option key={index} value={degree.code}>{degree.name}</option>
                                                ))
                                            }
                                        </Form.Select>
                                    </Col> */}
                                    <Col>
                                        <Form.Select
                                            value={newCourse.department}
                                            onChange={(e) => {
                                                setNewCourse({ ...newCourse, department: e.target.value });
                                                setSelectedDepartment(e.target.value);
                                            }}
                                            required={true}>
                                            <option value=''>Select department</option>
                                            {
                                                departments?.map((department, index) => (
                                                    <option key={index} value={department.code}>{department.code}</option>
                                                ))
                                            }
                                        </Form.Select>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Students Batch</Form.Label>
                                <Form.Control
                                    placeholder='yyyy-YYYY'
                                    value={newCourse.batch}
                                    onChange={(e) => setNewCourse({ ...newCourse, batch: e.target.value })}
                                    required={true}
                                    type='text'
                                />
                            </Form.Group>
                        </td>
                    </tr></tbody></table>
                    <div className='text-center pb-3'>
                        <Button type='submit' variant='info'>Register</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal >
    );
}

export default function RegisterSingleCourse() {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <Button variant="info" onClick={() => setModalShow(true)}>
                Register Single Course
            </Button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}
