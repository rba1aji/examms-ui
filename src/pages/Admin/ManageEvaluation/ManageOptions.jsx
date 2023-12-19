import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Form, InputGroup } from "react-bootstrap";
import axios from 'axios';
import { EVALUATION_BUNDLES_GET_ALL_FOR_EVALUATIONID, EVALUATION_PAPERS_ENABLE_ENTRY } from '../../../reducers/ApiEndPoints';
import Cookies from 'js-cookie';

function MyVerticallyCenteredModal(props) {
    const { onHide, evaluationId } = props;
    const [selectedPapers, setSelectedPapers] = useState([])
    const [evaluationBundles, setEvaluationBundles] = useState([])
    const [disabledPapers, setDisabledPapers] = useState([])

    useEffect(() => {
        setDisabledPapers(evaluationBundles.map(i => i.evaluationPaperList.filter(j => j.disableEntry)).flat())
    }, [evaluationBundles])

    useEffect(() => {
        axios({
            method: 'GET',
            url: EVALUATION_BUNDLES_GET_ALL_FOR_EVALUATIONID,
            params: {
                evaluationId: evaluationId
            },
            headers: {
                Authorization: "Bearer " + Cookies.get('authtoken')
            }
        }).then(res => {
            setEvaluationBundles(res?.data?.data)

        }).catch(err => {
            alert(err?.response?.data?.message ?? "Something went wrong!")
            console.log(err)
        })
    }, [])

    function handleEvaluationPaperEnableEntry(e) {
        e.preventDefault()
        axios({
            method: 'PUT',
            url: EVALUATION_PAPERS_ENABLE_ENTRY,
            data: selectedPapers.map(i => i.id),
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
                Manage Evaluation Options
            </Modal.Header>
            <Modal.Body className='bg-light'>
                <Form onSubmit={handleEvaluationPaperEnableEntry}>
                    <Form.Label>Enable marks entry for evaluation papers</Form.Label>
                    <InputGroup>
                        <Dropdown className="d-inline mx-2 bg-white" autoClose="outside"
                            onSelect={(selectId) => {
                                if (selectedPapers.find(i => i.id == selectId)) {
                                    setSelectedPapers(selectedPapers.filter(i => i.id != selectId))
                                } else {
                                    setSelectedPapers([...selectedPapers, disabledPapers.find(i => i.id == selectId)])
                                }
                            }}
                        >
                            <Dropdown.Toggle id="dropdown-autoclose-outside" className='bg-white text-dark border-dark text-start'
                                style={{ width: '80%' }}
                            >
                                <span style={{ width: '90%' }}>
                                    {
                                        selectedPapers.length == 0 ? 'Select Papers' :
                                            selectedPapers.map((item, index) => item.number).join(', ')
                                    }
                                </span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu style={{ width: '75%' }} >
                                {
                                    disabledPapers.map((item, index) => {
                                        return (
                                            <Dropdown.Item
                                                key={index}
                                                eventKey={item.id}
                                                className={`${selectedPapers.find(i => i.id == item.id) ? 'bg-info' : ''}`}
                                            >
                                                {item.number}
                                            </Dropdown.Item>
                                        )
                                    })
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button variant='info' type='submit'>
                            Enable Entry
                        </Button>
                    </InputGroup>
                </Form>
            </Modal.Body >
        </Modal >
    );
}

export default function ManageOptions(props) {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <Button variant="info" onClick={() => setModalShow(true)}>
                Options
            </Button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                {...props}
            />
        </>
    );
}
