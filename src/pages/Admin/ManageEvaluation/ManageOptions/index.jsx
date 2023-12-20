import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react';
import { Button } from "react-bootstrap";
import axios from 'axios';
import { EVALUATION_BUNDLES_GET_ALL_FOR_EVALUATIONID } from '../../../../reducers/ApiEndPoints';
import Cookies from 'js-cookie';
import EnableEvaluationPaperEntry from './EnableEvaluationPaperEntry';
import EnablePrintoutForEvaluationBundles from './EnablePrintoutForEvaluationBundles';

function MyVerticallyCenteredModal(props) {
    const { onHide, evaluationId } = props;
    const [evaluationBundles, setEvaluationBundles] = useState([])
    const [disabledPapers, setDisabledPapers] = useState([])
    const [printoutDisablesBundles, setPrintoutDisabledBundles] = useState([])

    useEffect(() => {
        setDisabledPapers(evaluationBundles.map(i => i.evaluationPaperList.filter(j => j.disableEntry)).flat())
        setPrintoutDisabledBundles(evaluationBundles.filter(i => i.disablePrintout))
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
            <Modal.Body className='bg-light d-flex flex-column py-4' style={{ gap: '25px' }}>
                <EnableEvaluationPaperEntry disabledPapers={[...disabledPapers]} />
                <EnablePrintoutForEvaluationBundles printoutDisabledBundles={[...printoutDisablesBundles]} />
            </Modal.Body >
            <Modal.Footer className='bg-light'></Modal.Footer>
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
