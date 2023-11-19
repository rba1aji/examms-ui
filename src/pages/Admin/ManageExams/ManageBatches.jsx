import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { displayDDMMYYYHHMMSS } from '../../../reducers/Utils';
import CreateOrEditBatch from './CreateOrEditBatch';
import { GET_ALL_EXAMBATCH } from '../../../reducers/ApiEndPoints';

function MyVerticallyCenteredModal(props) {
    const { selectedCourse, selectedExam, examBatches, setExamBatches } = props;
    const [render, setRender] = useState(0);

    useEffect(() => {
        axios({
            method: 'get',
            url: GET_ALL_EXAMBATCH,
            params: {
                department: selectedCourse?.branchid,
                exam: selectedExam?.id,
                course: selectedCourse?.id
            },
            headers: {
                Authorization: "Bearer " + Cookies.get('authtoken')
            }
        })
            .then((res) => {
                console.log("exam examBatches fetched", res.data);
                setExamBatches(res.data?.data)
            })
    }, [selectedCourse, selectedExam, render])

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
                Manage Batches
            </Modal.Header>
            <Modal.Body style={{
                minHeight: '80vh',
            }}
                className='bg-light'>
                <div className='mx-5  my-1'>
                    <Table className='text-center align-middle bg-white' bordered>
                        <thead>
                            <tr>
                                <th>Batch Name</th>
                                <th>Student Reg no</th>
                                <th>Time of Exam</th>
                                <th>Faculty</th>
                                <th>Venue</th>
                                <th>
                                    <CreateOrEditBatch
                                        selectedExam={selectedExam}
                                        selectedCourse={selectedCourse}
                                        type="create"
                                        setRender={setRender}
                                    />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                examBatches?.map((b, ind) => {
                                    return (
                                        <tr key={ind}>
                                            <td style={{
                                                // fontSize: '150%'
                                            }}>{b.name}</td>
                                            <td>
                                                {
                                                    b.students?.map((ids, ind) => {
                                                        return <span key={ind}>
                                                            {ids.startRegNum} to {ids.endRegNum}<br />
                                                        </span>
                                                    })
                                                }
                                            </td>
                                            <td>
                                                {displayDDMMYYYHHMMSS(b.startTime)}
                                                <br />to<br />
                                                {displayDDMMYYYHHMMSS(b.endTime)}
                                            </td>
                                            <td>
                                                {b.faculty?.fullName}
                                            </td>
                                            <td>{b.venue}</td>
                                            <td>
                                                <CreateOrEditBatch
                                                    selectedExam={selectedExam}
                                                    selectedCourse={selectedCourse}
                                                    type="edit"
                                                    prevBatch={b}
                                                    setRender={setRender}
                                                />
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </Modal.Body>
        </Modal >
    );
}

export default function ManageBatches(props) {
    const [modalShow, setModalShow] = useState(false);
    const { selectedCourse } = props;

    if (!selectedCourse?.id) return <></>

    return (
        <>
            <Button variant="info" onClick={() => setModalShow(true)}>
                Manage Batches
            </Button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                {...props}
            />
        </>
    );
}
