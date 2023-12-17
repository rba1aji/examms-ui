import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Form, InputGroup, Table } from "react-bootstrap";
import { EVALUATION_PAPER_SUBMIT_MARKS } from "../../../reducers/ApiEndPoints";
import Cookies from "js-cookie";

export default function EvaluationPaperMarksEntry(props) {
    const { selectedPaper, questionPaper, evaluationId, setSelectedPaperIdx } = props;
    const [splitupMarks, setSplitupMarks] = useState([])

    useEffect(() => {
        if (selectedPaper?.submitted == true) {
            setSplitupMarks(selectedPaper?.splitUpMarks)
        } else {
            const t = [];
            questionPaper?.forEach(section => {
                section?.questions?.forEach(qsn => {
                    t.push({
                        section: section.name,
                        question: qsn.question,
                        marks: 0
                    })
                })
            })
            setSplitupMarks(t)
        }
    }, [selectedPaper, questionPaper])

    async function handleSubmitEvaluationPaper(e) {
        e.preventDefault();
        await axios({
            method: 'POST',
            url: EVALUATION_PAPER_SUBMIT_MARKS(evaluationId, selectedPaper?.id),
            data: splitupMarks,
            headers: {
                Authorization: 'Bearer ' + Cookies.get('authtoken')
            }
        }).then(res => {
            alert(res?.data?.message)
            console.log(res?.data?.message)
            setSelectedPaperIdx(prev => prev + 1)
        }).catch(err => {
            alert(err?.response?.data?.message ?? 'Something went wrong')
            console.log(err)
        })
    }

    return <Form className="d-flex flex-column " style={{ gap: '10px' }} >
        <div>
            {
                questionPaper?.map((section, secIdx) =>
                    <Card className="mb-3 " key={secIdx}>
                        <Card.Header className="h5">{section?.name}</Card.Header>
                        <Card.Body >
                            <div className="d-flex flex-row">
                                <div className="d-flex flex-column bg-info">
                                    {
                                        ['Question', 'Marks']
                                            .map((th, idx) =>
                                                <InputGroup.Text className='bg-info' key={idx}>{th}</InputGroup.Text>
                                            )
                                    }
                                </div>
                                <div className="d-flex flex-row bg-light" >
                                    {
                                        [...section.questions]?.map((qsn, qsnIdx) =>
                                            <div key={qsnIdx}>
                                                <InputGroup.Text style={{ background: '#dee2e6' }}>{qsn.question}</InputGroup.Text>
                                                <Form.Control type='number' min={0} max={qsn.maxMarks}
                                                    value={splitupMarks?.find(i => i.section == section.name && i.question == qsn.question)?.marks}
                                                    onChange={e => {
                                                        const t = splitupMarks;
                                                        t.find(i => i.section == section.name && i.question == qsn.question).marks = Math.min(parseInt(e.target.value), qsn.maxMarks);
                                                        setSplitupMarks([...t])
                                                    }}
                                                />
                                                {/* <InputGroup.Text className=''>{qsn.co}</InputGroup.Text> */}
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                )
            }
            <Card className="mb-3 bg-light">
                <Card.Body>
                    <Table bordered className="m-0" style={{ width: 'auto' }}>
                        <tbody>
                            {
                                questionPaper?.map((section, idx) =>
                                    <tr key={idx}>
                                        {[
                                            section.name + ' Total',
                                            splitupMarks.map(i => i.section == section.name ? i.marks : 0).reduce((a, b) => a + b, 0) || 0
                                        ].map((item, idx) =>
                                            <td className="py-2 px-4" key={idx}>
                                                {item}
                                            </td>
                                        )}
                                    </tr>
                                )
                            }
                            <tr>
                                <td className="py-2 px-4">Grand Total</td>
                                <td className="py-2 px-4">
                                    {splitupMarks?.reduce((a, b) => a + b.marks, 0) || 0}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
        <div className="d-block ms-auto">
            <Button variant="danger" type='button' onClick={handleSubmitEvaluationPaper}>Submit and Open Next</Button>
        </div>
    </Form>
}