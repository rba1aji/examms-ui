import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, Form, FormControl, InputGroup, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CONFIGURATIONS_ADD_UPDATE } from '../../../reducers/ApiEndPoints';
import Cookies from 'js-cookie';

function MyVerticallyCenteredModal(props) {
    const [newConfigName, setNewConfigName] = useState('')
    const [newConfig, setNewConfig] = useState([]);
    const [sectionCount, setSectionCount] = useState(0)

    useEffect(() => {
        setNewConfig([])
        for (let i = 0; i < sectionCount; i++) {
            setNewConfig(prev => [...prev, {}])
        }
    }, [sectionCount])

    function handleAddConfiguration(e) {
        e.preventDefault();
        console.log(JSON.stringify(newConfig))
        axios({
            method: 'post',
            url: CONFIGURATIONS_ADD_UPDATE,
            data: {
                name: newConfigName,
                type: 'QuestionPaper',
                configJson: JSON.stringify(newConfig)
            },
            headers: {
                Authorization: `Bearer ` + Cookies.get('authtoken')
            }
        }).then(res => {
            alert(res?.data?.message)
            console.log(res?.data?.message)
        }).catch(err => alert(err?.response?.data?.message))
        props.onHide()
    }

    return (
        <Modal
            {...props}
            size="xl"
            centered
        >
            <Form onSubmit={handleAddConfiguration}>
                <Modal.Header closeButton className='px-3 py-2'>
                    Add QuestionPaper Config
                </Modal.Header>
                <Modal.Body >
                    <div className='d-flex flex-row mb-2' style={{ gap: '10px' }}>
                        <InputGroup >
                            <InputGroup.Text id="basic-addon1">QuestionPaper Name</InputGroup.Text>
                            <FormControl type="text" value={newConfigName} onChange={e => setNewConfigName(e.target.value)} required />
                        </InputGroup>
                        <InputGroup >
                            <InputGroup.Text id="basic-addon1">Num Of Section</InputGroup.Text>
                            <FormControl type="number" value={sectionCount} onChange={e => setSectionCount(e.target.value)} required />
                        </InputGroup>
                    </div>
                    {
                        newConfig?.map((section, idx1) => {
                            return <Card className='bg-light mb-2'>
                                <Card.Body>
                                    <div className='d-flex flex-row' style={{ gap: '10PX' }}>
                                        <InputGroup className="mb-2">
                                            <InputGroup.Text id="basic-addon1">Section Name</InputGroup.Text>
                                            <Form.Control type="text" value={section?.name} onChange={e => {
                                                const t = newConfig;
                                                t[idx1].name = e.target.value;
                                                setNewConfig([...t])
                                            }} required
                                                placeholder=''
                                            />
                                        </InputGroup>
                                        <InputGroup className="mb-2">
                                            <InputGroup.Text id="basic-addon1">Num Of Questions</InputGroup.Text>
                                            <Form.Control type="number" value={section?.questionCount} onChange={e => {
                                                const t = newConfig;
                                                t[idx1].questionCount = e.target.value;
                                                const qsncopy = t[idx1].questions;
                                                t[idx1].questions = []
                                                for (let i = 0; i < e.target.value; i++) {
                                                    t[idx1].questions.push(qsncopy[i] ?? {})
                                                }
                                                setNewConfig([...t])
                                            }} required />
                                        </InputGroup>
                                        {/* <InputGroup className="mb-2">
                                            <InputGroup.Text id="basic-addon1">Num Of Answerable Questions</InputGroup.Text>
                                            <Form.Control type="number" value={section.answerableCount} onChange={e => {
                                                section.answerableCount = e.target.value;
                                                setNewConfig(prev => prev)
                                            }} required />
                                        </InputGroup> */}
                                    </div>
                                    <div className='d-flex flex-row' style={{ gap: '10px' }}>
                                        <div style={{ width: 'fit-content' }} className='d-flex flex-row'>
                                            <div className='bg-info d-flex flex-column' style={{ gap: '5px' }}>
                                                {
                                                    ['Question', 'MaxMarks', 'CO'].map((th, idx) =>
                                                        <div className='py-1 px-2'>{th}</div>
                                                    )
                                                }
                                            </div>
                                            {
                                                section?.questions?.map((qsn, idx2) => {
                                                    return <div className='d-flex flex-column justify-content-center' style={{ gap: '5px' }}>
                                                        {
                                                            [
                                                                <Form.Control value={qsn?.question} onChange={e => {
                                                                    const t = newConfig;
                                                                    t[idx1].questions[idx2].question = e.target.value;
                                                                    setNewConfig([...t])
                                                                }} required />,
                                                                <Form.Control value={qsn?.maxMarks} onChange={e => {
                                                                    const t = newConfig;
                                                                    t[idx1].questions[idx2].maxMarks = e.target.value;
                                                                    setNewConfig([...t])
                                                                }} required />,
                                                                <Form.Control value={qsn?.co} onChange={e => {
                                                                    const t = newConfig;
                                                                    t[idx1].questions[idx2].co = e.target.value;
                                                                    setNewConfig([...t])
                                                                }} required />
                                                            ].map((item, idx) =>
                                                                <div className='px-1 my-0' key={idx}>{item}</div>
                                                            )
                                                        }
                                                    </div>
                                                })
                                            }
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        })
                    }
                </Modal.Body>
                <Modal.Footer className='py-0'>
                    <Button type='submit' variant='info'>Add Configuration</Button>
                </Modal.Footer>
            </Form>
        </Modal >
    );
}

export default function AddQuestionPaperConfiguration(props) {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <Button variant="info" onClick={() => setModalShow(true)} >
                Add QuestionPaper Config
            </Button>

            <MyVerticallyCenteredModal
                {...props}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}
