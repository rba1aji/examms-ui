import { useEffect, useState } from "react";
import { EVALUATION_GET_ALL } from "../../../reducers/ApiEndPoints";
import axios from "axios";
import Cookies from "js-cookie";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Evaluations() {
    const [evaluations, setEvaluations] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        axios({
            method: 'GET',
            url: EVALUATION_GET_ALL,
            params: {
                sessionFaculty: true
            },
            headers: {
                Authorization: 'Bearer ' + Cookies.get('authtoken')
            }
        }).then(res => {
            setEvaluations(res?.data?.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    return <>
        {
            evaluations.map((evaluation, idx) =>
                <Card className='bg- mb-4' style={{
                    backgroundColor: '#F3F8FF',
                    margin: '0 22vw',
                }}
                    key={idx}
                >
                    <Card.Body className="p-4 d-flex felx-row">
                        <div className="d-flex flex-column" style={{ gap: '20px' }}>
                            <Card.Subtitle >Exam: {evaluation.exam?.name}</Card.Subtitle>
                            <Card.Subtitle >Course: {evaluation.course?.code + " " + evaluation.course?.name}</Card.Subtitle>
                            <Card.Subtitle >Papers Number: {evaluation.startPaperNumber + ' to ' + evaluation.endPaperNumber}</Card.Subtitle>
                            {evaluation.description && <Card.Subtitle>Description: {evaluation.description}</Card.Subtitle>}
                        </div>
                        <div className="d-block ms-auto my-auto">
                            <Button className="" variant="info"
                                // disabled={evaluation?.disableEntry}
                                onClick={() => navigate(`/faculty/evaluation/${evaluation.id}`)}
                                style={{

                                }}
                            >{'Open >'}</Button>
                        </div>
                    </Card.Body>
                </Card>)
        }
    </>
}