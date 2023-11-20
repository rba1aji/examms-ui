import { useEffect, useState } from "react";
import { Form, Table } from "react-bootstrap";
import { AppState } from "../../reducers/AppContextProvider";
import axios from "axios";
import { serverurl } from "../../reducers/Constants";
import Cookies from "js-cookie";

export default function ViewExamMarks() {
    const [exams, setExams] = useState([]);
    const { user } = AppState()
    const [selectedExamId, setSelectedExamId] = useState('');
    const [semester, setSemester] = useState(0);
    const [marks, setMarks] = useState([]);

    useEffect(() => {
        if (semester === '') return;
        axios({
            method: 'get',
            url: serverurl + '/exams/getByBatchSemester',
            params: {
                semester: semester,
                batch: user.batch
            },
            headers: {
                Authorization: "Bearer " + Cookies.get('authtoken')
            }
        })
            .then(res => {
                setExams(res.data.exams)
                console.log(res.data)
            })
            .catch(err => console.log(err.message))
    }, [semester, user.batch])


    useEffect(() => {
        if (selectedExamId) {
            axios({
                method: 'get',
                url: serverurl + "/marks/getByStudentidAndExamid",
                params: {
                    studentid: user.id,
                    examid: selectedExamId
                },
                headers: {
                    Authorization: "Bearer " + Cookies.get('authtoken')
                }
            })
                .then((res) => {
                    setMarks(res.data.marks);
                    console.log(res.data);
                })
                .catch(err => alert(err.response.data.message || err.message))
        }
    }, [selectedExamId, user.id])

    return (
        <>
            <div style={{
                margin: '0 25vw'
            }}>
                <table className="">
                    <tbody >
                        <tr>
                            <td className="pe-4" style={{
                                width: '135px',
                            }}>
                                <Form.Group className="text-end ">
                                    <Form.Label>Semester</Form.Label>
                                    <Form.Control type="number" onChange={(e) => {
                                        setSemester(e.target.value)
                                        setExams([])
                                    }}
                                        value={semester}
                                        className="text-center border-dark bg-azure"
                                        min={1}
                                        style={{
                                            borderRadius: '2px'
                                        }}
                                    />
                                </Form.Group>
                            </td>
                            <td className="ps-4">
                                <Form.Group className="text-end"
                                    style={{
                                        width: '275px'
                                    }}>
                                    <Form.Label>Exam</Form.Label>
                                    <Form.Select onChange={(e) => {
                                        setSelectedExamId(e.target.value)
                                        setMarks([])
                                    }}
                                        className="border-dark bg-azure "
                                        style={{
                                            borderRadius: '2px'
                                        }}
                                    >
                                        <option value={''}>Select Exam</option>
                                        {
                                            exams.map((exam, ind) => (
                                                <option value={exam.id} key={ind}>
                                                    {exam.name}
                                                </option>
                                            ))
                                        }
                                    </Form.Select>
                                </Form.Group>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br />
            <br />
            <div style={{
                margin: '0 20vw'
            }}>
                {
                    marks.length !== 0 &&
                    <Table bordered className="border-dark">
                        <thead className="bg-info">
                            <tr>
                                {
                                    ["Course", "Attendance", "Mark"]
                                        .map((h, ind) => {
                                            return <td key={ind}>{h}</td>
                                        })
                                }
                            </tr>
                        </thead>
                        <tbody className="bg-azure">
                            {
                                marks.map((itm, ind) => (
                                    <tr key={ind}>
                                        <td>{itm.course.code}</td>
                                        <td>{itm.attendance ? "Present" : "Absent"}</td>
                                        <td>{itm.mark}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                }
            </div>
        </>
    )
}