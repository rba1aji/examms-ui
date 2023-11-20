import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import { inputFormateDateTime } from '../../../reducers/Utils';
import { ADD_UPDATE_EXAMBATCH, GET_ALL_FACULTIES } from '../../../reducers/ApiEndPoints';
import Cookies from 'js-cookie';

function MyVerticallyCenteredModal(props) {
    const { onHide, selectedCourse, selectedExam, type, prevBatch } = props;
    const [faculties, setFaculties] = useState([])
    let initialVal = {
        id: '',
        name: '',
        students: [{}],
        startTime: new Date(),
        endTime: new Date(),
        facultyId: '',
        venue: '',
        courseId: selectedCourse?.id,
        examId: selectedExam?.id,
    }
    if (type === 'edit') {
        initialVal = {
            id: prevBatch.id,
            name: prevBatch.name,
            students: prevBatch.students,
            startTime: inputFormateDateTime(prevBatch.startTime),
            endTime: inputFormateDateTime(prevBatch.endTime),
            facultyId: prevBatch.faculty.id,
            venue: prevBatch.venue,
            courseId: selectedCourse?.id,
            examId: selectedExam?.id,
        }
    }

    const [newBatch, setNewBatch] = useState(initialVal);


    async function handleRegisterBatch(e) {
        e.preventDefault();
        // setNewBatch(prev => ({
        //     ...prev,
        //     startTime: new Date(prev.startTime).toLocaleString(),
        //     endTime: new Date(prev.endTime).toLocaleString()
        // }))
        await axios({
            method: 'POST',
            url: ADD_UPDATE_EXAMBATCH,
            data: newBatch,
            headers: {
                Authorization: "Bearer " + Cookies.get('authtoken')
            }
        })
            .then(res => {
                alert(res.data.message)
                onHide()
                props.setRender(prev => prev + 1)
            })
            .catch(err =>
                alert(err.response.data.message)
            )

        console.log('update batch', newBatch)

    }

    useEffect(() => {
        axios({
            method: 'get',
            url: GET_ALL_FACULTIES,
            headers: {
                Authorization: "Bearer " + Cookies.get('authtoken')
            }
        })
            .then((res) => setFaculties(res.data?.data))
            .catch((err) => alert(err.response.data.message))
    }, [])

    useEffect(() => {
        console.log('newBatch', newBatch)
    }, [newBatch])

    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop='static'
            style={{
                backgroundColor: 'rgba(0,0,0,0.5)'
            }}
        >
            <Modal.Header closeButton style={{
                padding: '10px 20px'
            }}>
                {type === 'create' ? 'Create ' : 'Edit '}Batch
            </Modal.Header>
            <Modal.Body>
                <Form className='bg-light p-4'
                    onSubmit={handleRegisterBatch}
                    style={{
                        margin: '2vh 3vw',
                        borderRadius: '10px',
                        border: '1px solid #adb5bd',
                    }}>

                    <div className='text-center pb-4 '>
                        <Button variant='info' type='submit'>{type === "create" ? 'Create' : 'Update'} Batch</Button>
                    </div>

                    <Row>

                        <Col>
                            <Form.Group className="mb-3 text-center" >
                                <Form.Label className='pb-2'>Batch name</Form.Label>
                                <Form.Control
                                    type="text" placeholder="Batch name" required
                                    value={newBatch.name}
                                    onChange={(e) => setNewBatch(prev => ({ ...prev, name: e.target.value }))}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Label className='pb-2 text-center'> Students register num</Form.Label>
                            {
                                Array(newBatch.students.length).fill(0).map((_, i) => {
                                    return <Form.Group className="mb-3 text-center" key={i}>
                                        <Form.Control type="number" placeholder="Start reg no" required
                                            value={newBatch.students[i]?.startRegNum}
                                            size='sm'
                                            onChange={e => {
                                                let stdns = newBatch.students
                                                stdns[i] = { ...stdns[i], startRegNum: e.target.value }
                                                setNewBatch(prev => ({ ...prev, students: stdns }))
                                            }}
                                        />
                                        <span>to</span>
                                        <Form.Control type="number" placeholder="End reg no" required
                                            value={newBatch.students[i]?.endRegNum}
                                            size='sm'
                                            onChange={e => {
                                                let stdns = newBatch.students
                                                stdns[i] = { ...stdns[i], endRegNum: e.target.value }
                                                setNewBatch(prev => ({ ...prev, students: stdns }))
                                            }}
                                        />
                                    </Form.Group>
                                })
                            }
                            <Row>
                                <Col>
                                    <Button variant='info' className="py-0 "
                                        onClick={() => {
                                            setNewBatch(prev => ({ ...prev, students: prev.students.slice(0, prev.students.length - 1) }))
                                        }}
                                    >
                                        ➖
                                    </Button>
                                </Col>
                                <Col className='text-end'>
                                    <Button variant='info' className="py-0"
                                        onClick={() => {
                                            setNewBatch(prev => ({ ...prev, students: [...prev.students, { startRegNum: '', endRegNum: '' }] }))
                                        }}
                                    >
                                        ➕
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3 text-center" >
                                <Form.Label className='pb-2'>Time of exam</Form.Label>
                                <Form.Control type="datetime-local" placeholder="start" required
                                    value={newBatch.startTime}
                                    onChange={e => setNewBatch(prev => ({ ...prev, startTime: e.target.value }))}
                                    step="60"
                                />
                                to
                                <Form.Control type="datetime-local" placeholder="end" className='mt-1' required
                                    value={newBatch.endTime}
                                    onChange={e => setNewBatch(prev => ({ ...prev, endTime: e.target.value }))}
                                    step="60"
                                    min={newBatch.startTime}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3 text-center" >
                                <Form.Label className='pb-2'>Faculty</Form.Label>
                                <Form.Select
                                    required
                                    value={newBatch.facultyId}
                                    onChange={(e) => {
                                        setNewBatch(prev => ({ ...prev, facultyId: e.target.value }))
                                    }}
                                >
                                    <option value="" disabled selected>Select Faculty</option>
                                    {
                                        faculties && faculties?.map((f, ind) => {
                                            return (
                                                <option
                                                    key={ind}
                                                    value={f.id}
                                                    id={f.id}
                                                >
                                                    {f.fullName}
                                                </option>
                                            )
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3 text-center" >
                                <Form.Label className='pb-2'>Venue</Form.Label>
                                <Form.Control type="text" placeholder="Venue name" required
                                    value={newBatch.venue}
                                    onChange={e => setNewBatch(prev => ({ ...prev, venue: e.target.value }))}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                </Form>
            </Modal.Body >
        </Modal >
    );
}

export default function CreateOrEditBatch(props) {
    const [modalShow, setModalShow] = useState(false);
    const { selectedCourse, type } = props;


    if (!selectedCourse?.id) return <></>
    return (
        <>
            <Button variant="info" onClick={() => setModalShow(true)}
                className={type === 'edit' ? 'py-0' : 'py-0'}>
                {type === "create" ? 'Create new' : 'Edit'}
            </Button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                {...props}
            />
        </>
    );
}
