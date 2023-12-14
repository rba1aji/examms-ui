import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react';
import SelectExam from "../ManageExams/SelectExam";
import { Button, FloatingLabel, Form, FormControl, InputGroup } from "react-bootstrap";
import SelectCourse from "../ManageExams/SelectCourse";
import SelectDepartment from "../ManageExams/SelectDepartment";
import SelectFacultyV2 from './SelectFacultyV2';
import axios from 'axios';
import { EVALUATION_CREATE } from '../../../reducers/ApiEndPoints';
import Cookies from 'js-cookie';

function MyVerticallyCenteredModal(props) {
    const { onHide, selectedExam, selectedCourse } = props;
    const [selectedFaculty, setSelectedFaculty] = useState()
    const [startPaperNumber, setStartPaperNumber] = useState();
    const [endPaperNumber, setEndPaperNumber] = useState()
    const [description, setDescription] = useState('')

    function handleCreateEvaluation(e) {
        e.preventDefault()
        onHide();
        alert("Creating Evaluation...")
        axios({
            method: 'POST',
            url: EVALUATION_CREATE,
            data: {
                examId: selectedExam.id,
                courseId: selectedCourse.id,
                facultyId: selectedFaculty.id,
                startPaperNumber: startPaperNumber,
                endPaperNumber: endPaperNumber,
                configuration: "{}"
            },
            headers: {
                Authorization: "Bearer " + Cookies.get('authtoken')
            }
        }).then(res => {
            alert(res?.data?.message)
        }).catch(err => {
            alert(err?.response?.data?.message ?? "Something went wrong!")
        })
    }

    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop='static'
        >
            <Modal.Header closeButton style={{
                padding: '10px 20px'
            }}>
                Create Evaluation
            </Modal.Header>
            <Modal.Body className='bg-light'>
                <Form className='p-2 py-4 d-flex flex-column'
                    style={{
                        gap: '25px'
                    }}
                    onSubmit={handleCreateEvaluation}
                >
                    <div className="d-flex flex-row" style={{ gap: '30px', width: '100%' }}>
                        <InputGroup >
                            <InputGroup.Text className='bg-info'>Description</InputGroup.Text>
                            <FormControl type='text' onChange={e => setDescription(e.target.value)} value={description} />
                        </InputGroup>
                        <SelectFacultyV2 selectedFaculty={selectedFaculty} setSelectedFaculty={setSelectedFaculty} />
                    </div>
                    <div className="d-flex flex-row" style={{ gap: '30px', width: '100%' }}>
                        <InputGroup >
                            <InputGroup.Text className='bg-info'>Start Paper Number</InputGroup.Text>
                            <FormControl type='number' onChange={e => setStartPaperNumber(e.target.value)} value={startPaperNumber} />
                        </InputGroup>
                        <InputGroup >
                            <InputGroup.Text className='bg-info'>End Paper Number</InputGroup.Text>
                            <FormControl type='number' onChange={e => setEndPaperNumber(e.target.value)} value={endPaperNumber} />
                        </InputGroup>
                    </div>
                    <div className='mx-auto d-block pt-3'>
                        <Button variant='info' className='px-5' type='submit'>Create Evaluation</Button>
                    </div>
                </Form>
            </Modal.Body >
        </Modal >
    );
}

export default function CreateEvaluation(props) {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <Button variant="info" onClick={() => setModalShow(true)}>
                Create Evaluation
            </Button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                {...props}
            />
        </>
    );
}
