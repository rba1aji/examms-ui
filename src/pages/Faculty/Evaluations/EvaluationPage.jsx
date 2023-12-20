import axios from "axios"
import { useEffect, useState } from "react"
import { EVALUATION_BUNDLES_GET_ALL_FOR_EVALUATIONID, EVALUATION_BUNDLE_ENABLE_DISABLE_PRINTOUT } from "../../../reducers/ApiEndPoints"
import { Link, useParams } from "react-router-dom"
import Cookies from "js-cookie"
import { Button, Card } from "react-bootstrap";
import EvaluationPaperMarksEntry from "./EvaluationPaperMarksEntry"
import SelectEvaluationPaperV2 from "./SelectEvaluationPaperV2"

export default function EvaluationPage() {
    const { evaluationId } = useParams()
    const [evaluationBundles, setEvaluationBundles] = useState([])
    const [selectedBundle, setSelectedBundle] = useState()
    const [selectedPaper, setSelectedPaper] = useState()
    const [questionPaper, setQuestionPaper] = useState()
    const [selectedPaperIdx, setSelectedPaperIdx] = useState(0)
    const [renderPage, setRenderPage] = useState(0)

    async function disablePrintout(bundleId) {
        await axios({
            method: 'PUT',
            url: EVALUATION_BUNDLE_ENABLE_DISABLE_PRINTOUT,
            data: {
                evaluationBundleId: [bundleId],
                disablePrintout: true
            },
            headers: {
                Authorization: 'Bearer ' + Cookies.get('authtoken')
            }
        }).then(res => {
            console.log(res?.data?.message)
        }).catch(err => {
            alert(err?.response?.data?.message ?? 'Something went wrong')
            console.log(err)
        })
        setRenderPage(prev => prev + 1)
    }

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
                const qp = res?.data?.data[0]?.evaluation?.questionPaperConfig?.configJson;
                try {
                    setQuestionPaper(JSON.parse(qp))
                } catch (err) { alert('Error in QuestionPaper Config') }
                console.log(res?.data?.message)
                setSelectedBundle(res?.data?.data[Cookies.get('selectedBundleIndex') ?? 0])
            }).catch(err => {
                alert(err?.response?.data?.message ?? "Something went wrong")
            })
    }, [renderPage])

    useEffect(() => {
        if (selectedPaperIdx != 0 && selectedPaperIdx % 5 == 0) {
            window.location.reload()
        }
        setSelectedPaper(selectedBundle?.evaluationPaperList?.filter(i => i.disableEntry == false)[selectedPaperIdx])
    }, [selectedBundle, selectedPaperIdx])

    return <>
        <br />
        <div className="d-flex flex-row p-3">
            <div className="d-flex flex-column px-2" style={{ width: '25%', height: '90vh', overflowY: 'scroll' }}>
                <p className="mb-3">Total Evaluation Bundles : {evaluationBundles.length}</p>
                {
                    [...evaluationBundles].map((bundle, idx) => <EvaluationBundleCard bundle={bundle} selectedBundle={selectedBundle} setSelectedBundle={setSelectedBundle} disablePrintout={disablePrintout} idx={idx} />)
                }
            </div>
            <div style={{ width: '75%' }} className="px-5">
                <SelectEvaluationPaperV2 selectedBundle={selectedBundle} selectedPaper={selectedPaper} setSelectedPaper={setSelectedPaper} />
                {
                    selectedPaper?.id &&
                    <EvaluationPaperMarksEntry
                        selectedPaper={selectedPaper}
                        questionPaper={questionPaper}
                        evaluationId={evaluationId}
                        setSelectedPaperIdx={setSelectedPaperIdx}
                    />
                }
            </div>
        </div >
    </>
}


function EvaluationBundleCard(props) {
    const { bundle, idx, selectedBundle, setSelectedBundle, disablePrintout } = props;

    const completedPapersCount = bundle.evaluationPaperList?.filter(i => i.submitted)?.length;
    const totalPapersCount = bundle.evaluationPaperList.length;

    return <Card className={`mb-4` + (bundle.id == selectedBundle?.id ? ' bg-info' : '')}
        style={{
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
                <Card.Subtitle style={{ fontSize: '14px' }}>Completed: {completedPapersCount}/{totalPapersCount}</Card.Subtitle>
            </div>
            <div className="d-flex flex-column ms-auto my-auto" style={{ gap: '7.5px' }}>
                {bundle.id != selectedBundle?.id &&
                    <Button
                        variant={bundle?.disableEntry ? "danger" : "info"}
                        disabled={bundle?.disableEntry}
                        onClick={() => {
                            setSelectedBundle(bundle)
                            Cookies.set('selectedBundleIndex', idx)
                        }}
                        style={{ fontSize: '12px' }}
                    >{bundle?.disableEntry ? "Disabled" : 'Evaluate >'}</Button>
                }
                {
                    totalPapersCount === completedPapersCount &&
                    bundle.disablePrintout != true &&
                    <Button style={{ fontSize: '12px' }} variant={"dark"}
                        as={Link}
                        to={`/faculty/evaluation/bundle/${bundle.id}/print-marks/`}
                        target="_blank"
                        onClick={() => { disablePrintout(bundle.id) }}
                    >{`Print Out`}</Button>
                }
            </div>
        </Card.Body>
    </Card >
}