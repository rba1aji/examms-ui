import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { AppState } from '../../../reducers/AppContextProvider';
import axios from 'axios';
import { ADD_UPDATE_EXAM } from '../../../reducers/ApiEndPoints';

function MyVerticallyCenteredModal(props) {
    const { degrees } = AppState();
    const [newExam, setNewExam] = useState({
        id: '',
        name: '',
        semester: '',
        batch: ''
    });
    const [selectedDegree, setSelectedDegree] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState([]);
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


    async function handleRegisterExam(e) {
        e.preventDefault();
        console.log(newExam, selectedBranch);
        await axios({
            method: 'post',
            url: ADD_UPDATE_EXAM,
            data: {
                exam: newExam,
                branchidList: selectedBranch
            },
            headers: {
                Authorization: "Bearer " + Cookies.get('authtoken')
            }
        })
            .then(res => {
                onHide();
                alert(res.data.message)
                setNewExam({
                    id: '',
                    name: '',
                    semester: '',
                    batch: ''
                })
            })
            .catch(err => alert(err.response.data.message))
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
                Create new exam
            </Modal.Header>
            <Modal.Body >
                <Form className='bg-light'
                    onSubmit={handleRegisterExam}
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
                                    // {
                                    //     label: 'Exam ID',
                                    //     placeholder: 'Enter exam id',
                                    //     type: 'text',
                                    //     value: newExam.id,
                                    //     onChange: (e) => setNewExam({ ...newExam, id: e.target.value }),
                                    //     required: true
                                    // },
                                    {
                                        label: 'Exam name',
                                        placeholder: 'Enter exam name',
                                        type: 'text',
                                        value: newExam.name,
                                        onChange: (e) => setNewExam({ ...newExam, name: e.target.value }),
                                        required: true
                                    },
                                    {
                                        label: 'Semester',
                                        placeholder: 'Exam for which sem',
                                        type: 'number',
                                        value: newExam.semester,
                                        onChange: (e) => setNewExam({ ...newExam, semester: e.target.value }),
                                        required: true
                                    },
                                    {
                                        label: 'Students Batch',
                                        placeholder: 'yyyy-YYYY',
                                        type: 'text',
                                        value: newExam.batch,
                                        onChange: (e) => setNewExam({ ...newExam, batch: e.target.value }),
                                        required: true
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
                            {/* <Form.Group className="mb-3" >
                                <Form.Label>Students Batch</Form.Label>
                                <Form.Control
                                    placeholder='yyyy-YYYY'
                                    value={newExam.batch}
                                    onChange={(e) => setNewExam({ ...newExam, batch: e.target.value })}
                                    required={true}
                                    type='text'
                                />
                            </Form.Group> */}
                            <Form.Group className="mb-3" style={{
                            }}>
                                <Form.Label>Degrees</Form.Label>
                                <div style={{
                                    fontSize: '80%'
                                }}>
                                    {degrees?.map((item, ind) => (
                                        <Form.Check
                                            key={ind}
                                            inline
                                            type={'checkbox'}
                                            label={item.id}
                                            value={item.id}
                                            onChange={(e) => {
                                                setSelectedDegree(prev => {
                                                    return selectedDegree.includes(e.target.value) ?
                                                        selectedDegree.filter(item => item !== e.target.value) :
                                                        [...prev, e.target.value]
                                                })
                                            }}
                                            checked={selectedDegree.includes(item.id)}
                                        />
                                    ))}
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Branches</Form.Label>
                                <div style={{
                                    fontSize: '80%',
                                }}>
                                    {departments?.filter(b => selectedDegree.includes(b.degreeid)).map((item, ind) => (
                                        <Form.Check
                                            key={ind}
                                            inline
                                            type={'checkbox'}
                                            label={item.id}
                                            value={item.id}
                                            onChange={(e) => {
                                                setSelectedBranch(prev => {
                                                    return selectedBranch.includes(e.target.value) ?
                                                        selectedBranch.filter(item => item !== e.target.value) :
                                                        [...prev, e.target.value]
                                                })
                                            }}
                                            checked={selectedBranch.includes(item.id)}
                                        />
                                    ))}
                                </div>
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

export default function RegisterExam() {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <Button variant="info" onClick={() => setModalShow(true)}>
                Create new Exam
            </Button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}
