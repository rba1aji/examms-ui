import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Form, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom"
import Timer from "../../components/Timer";
import { numbersToWords, attendanceConfig } from "../../reducers/Utils";
import Cookies from "js-cookie";
import { ADD_UPDATE_MARKS_LIST, GET_ALL_MARKS_FOR_EXAM_BATCH, GET_EXAM_BATCH, SUBMIT_MARKS_ENTRY_BY_FACULTY } from "../../reducers/ApiEndPoints";
import ExamData from "./ExamData";

export default function Exam() {
    const { examBatchId } = useParams();
    const [examBatch, setExamBatch] = useState({});
    const [remTime, setRemTime] = useState('');
    const [studentMarks, setStudentMarks] = useState([])

    const [studentMarksCopy, setStudentMarksCopy] = useState([]);

    useEffect(() => {   //set examBatch
        axios({
            method: 'get',
            url: GET_EXAM_BATCH,
            params: {
                examBatchId: examBatchId
            },
            headers: { 'Authorization': 'Bearer ' + Cookies.get('authtoken') }
        })
            .then(res => {
                setExamBatch(res.data?.data)
                console.log(res.data?.message)
            })
            .catch(err => console.log(err.response.data.message))
    }, [examBatchId])

    useEffect(() => {   //set marks
        if (examBatch?.id) {
            axios({
                method: 'get',
                url: GET_ALL_MARKS_FOR_EXAM_BATCH,
                params: {
                    examBatchId: examBatchId
                },
                headers: { 'Authorization': 'Bearer ' + Cookies.get('authtoken') }
            })
                .then(res => {
                    setStudentMarks(res.data?.data)
                    setStudentMarksCopy(res?.data?.data)
                    console.log(res.data?.message)
                })
                .catch(err => console.log(err.response.data.message))
        }
    }, [examBatch])

    useEffect(() => {  //update student marks
        const intervalId = setInterval(() => {
            var data = studentMarks?.filter(i => !studentMarksCopy.includes(i));
            if (data?.length) {
                axios({
                    method: 'POST',
                    url: ADD_UPDATE_MARKS_LIST + "/" + examBatch?.id,
                    data: studentMarks,
                    headers: { 'Authorization': 'Bearer ' + Cookies.get('authtoken') }
                })
                    .then(res => {
                        console.log(res.data?.message)
                        setStudentMarksCopy(studentMarks.slice())
                    })
                    .catch(err => {
                        window.location.reload()
                        console.log(err.message)
                    })
            }
        }, 5 * 1000);
        return () => {
            clearInterval(intervalId);
        };
    }, [studentMarks, studentMarksCopy]);

    function handleSubmitMarksEntry() {
        axios({
            method: "POST",
            url: SUBMIT_MARKS_ENTRY_BY_FACULTY,
            params: {
                examBatchId: examBatch?.id
            },
            headers: {
                Authorization: 'Bearer ' + Cookies.get('authtoken')
            }
        }).then(res => {
            setExamBatch(res?.data?.data);
            console.log(res?.data?.message);
            alert('Submitted Marks Entry Successfully');
        }).catch(err => {
            alert(err?.response?.data?.message)
            console.log(err);
        })
    }

    return (
        <div style={{
            margin: '0 7.5vw'
        }}>
            <br />
            <ExamData
                examBatchId={examBatchId}
                examBatch={examBatch}
                setExamBatch={setExamBatch}
                setStudentMarks={setStudentMarks}
            />
            <Timer
                endtime={examBatch?.endTime}
                remTime={remTime}
                setRemTime={setRemTime}
            />

            <div className="mb-3">
                <span className="pe-4">Batch: {examBatch?.name}</span>
                <span className="pe-4">Exam: {examBatch?.exam?.name}</span>
                <span className="pe-4">Course: {examBatch?.course?.name}</span>
                <span className="pe-4">Venue: {examBatch?.venue}</span>
                <span className="pe-4">
                    <Button variant="info" className="ms-auto px-4 py-1"
                        as={Link}
                        to={`/faculty/exam/${examBatchId}/print-attendance`}
                        target="_blank"
                    >
                        Print Attendance
                    </Button>
                </span>
                <span className="">
                    <Button variant="info" className=" ms-auto px-4 py-1"
                        as={Link}
                        to={`/faculty/exam/${examBatchId}/print-marks`}
                        target="_blank"
                        onClick={(e) => {
                            if (!examBatch?.disableMarksEntry) {
                                e.preventDefault();
                                alert("Submit the marks entry to take print!");
                            }
                        }}
                    >
                        Print Marks
                    </Button>
                </span>
            </div>

            <p className="mb-2 text-warning text-end">
                Auto saving every 5 seconds
            </p>
            <div style={{
                // margin: '0 2.5vw'
            }}>
                <Table bordered>
                    <thead className="bg-info">
                        <tr>
                            <th>Sno</th>
                            <th>Register no</th>
                            <th>Name</th>
                            <th className="text-center">
                                <span>Attendance</span>
                                {
                                    examBatch?.disableAttendanceEntry &&
                                    <span className="text-danger" ><br />Disbaled</span>
                                }
                            </th>
                            <th className="text-center">Marks in numbers
                                {
                                    examBatch?.disableMarksEntry &&
                                    <span className="text-danger" ><br />Disbaled</span>
                                }
                            </th>
                            <th className="text-center">Marks in words</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            studentMarks?.map((stMark, ind) => (
                                <tr key={ind} className='align-middle'>
                                    <td>{ind + 1}</td>
                                    <td>{stMark.student.registerNumber}</td>
                                    <td>{stMark.student.fullName}</td>
                                    <td className="text-center attendance">
                                        <Form.Select
                                            disabled={remTime === "0 : 0 : 0 : 0"
                                                || examBatch?.disableAttendanceEntry
                                                || examBatch?.disableMarksEntry
                                            }
                                            size="sm"
                                            style={{ width: '60%', display: 'block', margin: 'auto', fontWeight: '600' }}
                                            onChange={e => {
                                                const val = e.target.value;
                                                // setStudentMarks(prev => {
                                                //     let mark = prev[ind] ? prev[ind] : studentMarks.find(i => i.id == stMark.id);
                                                //     prev[ind] = { ...mark, attendance: val };
                                                //     if (val != 'P') {
                                                //         prev[ind] = { ...prev[ind], marks: 0 }
                                                //     }
                                                //     return prev;
                                                // })
                                                setStudentMarks(prev => prev.map(x => {
                                                    if (x.id == stMark.id) {
                                                        if (val != 'P') {
                                                            return { ...x, attendance: val, marks: 0 }
                                                        }
                                                        return { ...x, attendance: val }
                                                    }
                                                    return x;
                                                }))
                                            }}
                                            defaultValue={stMark?.attendance ? stMark.attendance : '-'}
                                        >
                                            {
                                                Object.keys(attendanceConfig)
                                                    .map((key, idx) => {
                                                        return (
                                                            <option key={idx}
                                                                value={key}
                                                                style={{ color: attendanceConfig[key].color, fontWeight: '700' }}
                                                            // disabled={key == '-'}
                                                            >
                                                                {attendanceConfig[key]?.value}
                                                            </option>
                                                        )
                                                    })
                                            }
                                        </Form.Select>
                                    </td>
                                    <td className="text-center" style={{
                                        width: '250px'
                                    }}>
                                        <Form.Group className="px-5">
                                            <Form.Control
                                                disabled={
                                                    remTime === "0 : 0 : 0 : 0"
                                                    || "A-OW".includes(stMark?.attendance)
                                                    || examBatch?.disableMarksEntry

                                                }
                                                type={stMark?.attendance != 'P' ? 'text' : 'number'}
                                                className="py-1 text-center "
                                                style={{
                                                    borderColor: 'black'
                                                }}
                                                value={stMark?.attendance != 'P' ? '-' : stMark?.marks}
                                                onChange={e => {
                                                    // setStudentMarks(prev => {
                                                    //     let mark = prev[ind] ? prev[ind] : studentMarks.find(i => i.id == stMark.id);
                                                    //     prev[ind] = { ...mark, ...prev[ind], marks: e.target.value }
                                                    // })
                                                    setStudentMarks(prev => prev.map(x =>
                                                        x.id == stMark.id ? { ...x, marks: e.target.value } : x
                                                    ));
                                                }}
                                            // min={0}
                                            // max={100}
                                            />
                                        </Form.Group>
                                    </td>
                                    <td className="text-center">
                                        {
                                            numbersToWords(stMark?.marks)
                                        }
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
            <br />
            <div className="text-center">
                <Button variant="danger"
                    onClick={handleSubmitMarksEntry}
                    disabled={examBatch?.disableMarksEntry}
                >
                    {examBatch?.disableMarksEntry ? "Marks Entry Disabled" : " Submit Marks Entry"}
                </Button>
            </div>
            <br />
        </div >
    )
}