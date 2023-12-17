import axios from "axios"
import { useEffect, useState } from "react"
import { EVALUATION_BUNDLES_GET_ALL_FOR_EVALUATIONID } from "../../../reducers/ApiEndPoints"
import { useParams } from "react-router-dom"
import Cookies from "js-cookie"
import { Button, Card } from "react-bootstrap";

export default function EvaluationPage() {
    const { evaluationId } = useParams()
    const [evaluationBundles, setEvaluationBundles] = useState([])
    const [selectedBundle, setSelectedBundle] = useState()
    const [selectedPaper, setSelectedPaper] = useState()

    useEffect(() => {
        axios({
            method: 'GET',
            url: EVALUATION_BUNDLES_GET_ALL_FOR_EVALUATIONID,
            params: {
                evaluationId: evaluationId
            },
            headers: {
                Authorization: 'Bearer ' + Cookies.get('authtoken')
            }
        })
            .then(res => {
                setEvaluationBundles(res?.data?.data)
                console.log(evaluationBundles)
            }).catch(err => {
                alert(err?.response?.data?.message ?? "Something went wrong")
            })
    }, [])

    useEffect(() => {
        setSelectedPaper(selectedBundle?.evaluationPaperList[0])
    }, [selectedBundle])

    return <>
        <br />
        <div className="d-flex flex-row p-3">
            <div className="d-flex flex-column px-2" style={{ width: '25%', height: '90vh', overflowY: 'scroll' }}>
                <p className="mb-3">Total Bundles : {evaluationBundles.length}</p>
                {
                    [...evaluationBundles].map((bundle, idx) =>
                        <Card className='mb-4' style={{
                            backgroundColor: '#F3F8FF',
                            fontSize: '12px'
                        }}
                            key={idx}
                        >
                            <Card.Body className="p-3 d-flex felx-row">
                                <div className="d-flex flex-column" style={{ gap: '15px' }}>
                                    <Card.Subtitle style={{ fontSize: '14px' }}>Bundle: {idx + 1}</Card.Subtitle>
                                    <Card.Subtitle style={{ fontSize: '14px' }}>Papers Number: {bundle.evaluationPaperList[0].number + ' to ' + bundle.evaluationPaperList[bundle.evaluationPaperList?.length - 1].number}</Card.Subtitle>
                                    {bundle.description && <Card.Subtitle style={{ fontSize: '14px' }}>Description: {bundle.description}</Card.Subtitle>}
                                </div>
                                <div className="d-block ms-auto my-auto">
                                    <Button className=""
                                        variant={bundle?.disableEntry ? "danger" : "info"}
                                        disabled={bundle?.disableEntry}
                                        onClick={() => {
                                            setSelectedBundle(bundle)
                                        }}
                                        style={{ fontSize: '12px' }}
                                    >{bundle?.disableEntry ? "Disabled" : 'Evaluate >'}</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    )
                }
            </div>
            <div style={{ width: '75%' }}>
                {
                    selectedPaper?.id &&
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <h4>Current Paper Number: {selectedPaper.number}</h4>
                        <br /><br /><br /><br />
                        <Button variant="danger">Submit and Open Next</Button>
                    </div>
                }
            </div>
        </div>
    </>
}