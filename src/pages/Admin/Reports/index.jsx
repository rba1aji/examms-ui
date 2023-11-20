import Cookies from "js-cookie";
import { EXAM_MARKS_REPORT, GET_ALL_EXAMBATCH } from "../../../reducers/ApiEndPoints";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import SelectExam from "../ManageExams/SelectExam";
import Timer from "../../../components/Timer";

export default function Reports() {

    const [selectedExam, setSelectedExam] = useState();
    const [examBatches, setExamBatches] = useState([]);

    const [selectedExamBatches, setSelectedExamBatches] = useState([]);
    const [selectedDepartments, setSelectedDepartments] = useState([]);


    useEffect(() => {
        if (selectedExam?.id) {
            axios({
                method: 'get',
                url: GET_ALL_EXAMBATCH,
                params: {
                    exam: selectedExam?.id,
                },
                headers: {
                    Authorization: "Bearer " + Cookies.get('authtoken')
                }
            })
                .then((res) => {
                    setExamBatches(res.data?.data)
                    console.log(res.data?.message);
                }).catch(e => {
                    console.log(e)
                })
        }
        setSelectedDepartments([]);
        setSelectedExamBatches([])
    }, [selectedExam])

    return <Form onSubmit={(e) => {
        e.preventDefault();
        axios({
            method: 'POST',
            url: EXAM_MARKS_REPORT,
            data: {
                examId: selectedExam.id,
                examBatchIdList: selectedExamBatches,
                departmentCodeList: selectedDepartments
            },
            headers: {
                Authorization: 'Bearer ' + Cookies.get('authtoken')
            },
            responseType: 'blob'
        }).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `exam_marks_report_${Date.now()}.xlsx`);
            document.body.appendChild(link);
            link.click();
        }).catch(err => {
            console.log(err);
            alert(err?.response?.data?.message)
        })
    }}>
        <h5 className="text-center">Exam Marks Report</h5>
        <div className="mb-3"
            style={{
                margin: '0 5vw',
            }}
        >
            <br />
            <br />
            <div style={{ display: 'flex', flexDirection: 'row' }} className="">
                <SelectExam setSelectedExam={setSelectedExam} />
                <h5 className="ps-5 pt-2">selected exam: {selectedExam?.name || 'none'}</h5>
            </div>
            <div style={{ display: selectedExam?.id ? 'block' : 'none' }}>
                <div className="pt-5">
                    <Form.Group className="mb-3">
                        <Form.Label className="h5 mb-3">Select Exam Batches:</Form.Label>
                        <div>
                            {examBatches?.
                                map((item, ind) => (
                                    <Form.Check
                                        key={ind}
                                        inline
                                        type={'checkbox'}
                                        label={
                                            <div>
                                                {item.name}
                                            </div>
                                        }
                                        value={item.id}
                                        onChange={(e) => {
                                            const value = parseInt(e.target.value);
                                            setSelectedExamBatches(prev =>
                                                prev.includes(value)
                                                    ? prev.filter(i => i !== value)
                                                    : [...prev, value]
                                            );
                                        }}
                                        checked={selectedExamBatches?.includes(item.id)}
                                        className="pe-5"
                                    />
                                ))}
                        </div>
                    </Form.Group>
                </div>

                <div className="pt-5">
                    <Form.Group className="mb-3">
                        <Form.Label className="h5 mb-3">Select Departments:</Form.Label>
                        <div>
                            {selectedExam?.departments.
                                map((item, ind) => (
                                    <Form.Check
                                        key={ind}
                                        inline
                                        type={'checkbox'}
                                        label={item.code}
                                        value={item.code}
                                        onChange={(e) => {
                                            const value = (e.target.value);
                                            setSelectedExamBatches(prev =>
                                                prev.includes(value)
                                                    ? prev.filter(i => i !== value)
                                                    : [...prev, value]
                                            );
                                        }}
                                        checked={selectedExamBatches?.includes(item.code)}
                                        className="pe-5"
                                    />
                                ))}
                        </div>
                    </Form.Group>
                </div>
                <div className="text-center pt-5">
                    <Button variant="info" type="submit"
                        disabled={!selectedExam?.id}
                    >Download Report</Button>
                </div>
            </div>
        </div>

    </Form>
}