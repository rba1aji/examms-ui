import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import axios from "axios";
import { EXCEL_REGISTER_COURSES } from '../../../reducers/ApiEndPoints';
import Cookies from 'js-cookie';

function MyVerticallyCenteredModal(props) {
    const [file, setFile] = useState(null);
    const { onHide } = props;

    function handleRegisterMultiple(e) {
        e.preventDefault();
        onHide();
        if (file && !(file.name?.endsWith(".csv") || file.name?.endsWith(".xlsx"))) {
            alert("Please upload a valid file");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        axios({
            method: "POST",
            url: EXCEL_REGISTER_COURSES,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: "Bearer " + Cookies.get('authtoken')
            }
        })
            .then((response) => {
                alert(response?.data?.message);
            })
            .catch((error) => {
                alert(error.response.data.message);
            });
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
                Register Courses
            </Modal.Header>
            <Modal.Body >
                <div className='text-center'>Drop an Excel/CSV file</div>
                <br />
                <div className='bg-light'
                    style={{
                        margin: '0 10vw',
                        borderRadius: '10px',
                        border: '1px solid #adb5bd'
                    }}>
                    <Form className='text-center pt-4 pb-3 '
                        onSubmit={handleRegisterMultiple}
                    >
                        <input type='file'
                            onChange={(e) => setFile(e.target.files[0])}
                            style={{
                                color: 'darkgreen'
                            }}
                            required
                        />
                        <br />
                        <br />
                        <Button type='submit'
                            className="ms-3 py-1"
                            disabled={!file}
                            variant='info'
                        >Register</Button>
                    </Form>
                </div>
                <br />
                {`file column names should be: { id, name, credits, degreeid, branchid, semester, batch } `}
            </Modal.Body>
        </Modal >
    );
}

export default function RegisterMultipleCourses() {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <Button variant="info" onClick={() => setModalShow(true)}>
                Register Courses
            </Button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}
