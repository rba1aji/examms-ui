import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { displayDDMMYYYHHMMSS } from "../../reducers/Utils";
import { GET_ACTIVE_EXAM_BATCHES } from "../../reducers/ApiEndPoints";
import Cookies from "js-cookie";

export default function AllocatedExams() {
    const [activeBatches, setActiveBatches] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios({
            method: 'get',
            url: GET_ACTIVE_EXAM_BATCHES,
            headers: {
                "Authorization": "Bearer " + Cookies.get('authtoken')
            }
        })
            .then((res) => {
                setActiveBatches(res.data?.data);
            })
            .catch((err) => alert(err.response.data.message))
    }, [])


    return (<>
        <div className="text-center">
            {/* Exams assigned to you are listed below */}
        </div>
        <br />
        {
            activeBatches?.sort((a, b) => {
                return (new Date(a.starttime) - new Date(b.starttime))
            })?.map((eb, ind) => {
                return <Card className='bg- mb-4' style={{
                    backgroundColor: '#F3F8FF',
                    margin: '0 22vw',
                }}
                    key={ind}
                >
                    <Card.Body className="py-3">
                        <table>
                            <tbody>
                                <tr>
                                    <td className="ps-3">
                                        <Card.Title className="mb-3 text-center">{displayDDMMYYYHHMMSS(eb.startTime) + " ---to--- " + displayDDMMYYYHHMMSS(eb.endTime)}</Card.Title>
                                        <Card.Subtitle className="mb-3">Batch: {eb.name}</Card.Subtitle>
                                        {/* <Card.Subtitle className="mb-3">Branch: {eb.course.department.code}</Card.Subtitle> */}
                                        <Card.Subtitle className="mb-3">Course: {eb.course?.code + " " + eb.course?.name}</Card.Subtitle>
                                        <Card.Subtitle className="mb-3">Exam: {eb.exam?.name}</Card.Subtitle>
                                        <Card.Subtitle className="mb-1">Venue: {eb.venue}</Card.Subtitle>
                                    </td>
                                    <td className="ps-4">
                                        <Button className="" variant="info"
                                            disabled={
                                                new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000) < new Date(eb.starttime)
                                            }
                                            onClick={() => navigate(`/faculty/exam/${eb.id}`)}
                                            style={{

                                            }}
                                        >{'Open >'}</Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Card.Body>
                </Card>
            })
        }
    </>)
}