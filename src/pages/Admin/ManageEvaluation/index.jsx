import { useEffect, useState } from "react";
import SelectExam from "../ManageExams/SelectExam";
import { Button, Form, InputGroup, Table } from "react-bootstrap";
import SelectCourse from "../ManageExams/SelectCourse";
import SelectDepartment from "../ManageExams/SelectDepartment";
import CreateEvaluation from "./CreateEvaluation";
import axios from "axios";
import { EVALUATION_GET_ALL } from "../../../reducers/ApiEndPoints";
import ManageOptions from "./ManageOptions";
import Cookies from "js-cookie";

export default function ManageEvaluation() {
    const [selectedExam, setSelectedExam] = useState();
    const [selectedDepartment, setSelectedDepartment] = useState();
    const [selectedCourse, setSelectedCourse] = useState();
    const [evaluations, setEvaluations] = useState([]);

    useEffect(() => {
        selectedCourse?.id &&
            axios({
                method: 'GET',
                url: EVALUATION_GET_ALL,
                params: {
                    examId: selectedExam?.id,
                    courseId: selectedCourse?.id
                },
                headers: {
                    Authorization: 'Bearer ' + Cookies.get('authtoken')
                }
            }).then(res => {
                setEvaluations(res?.data?.data)
            }).catch(err => {
                console.log(err)
            })
    }, [selectedCourse])

    return <div className=" p-5">
        <div className="d-flex flex-row" style={{ gap: '100px' }}>
            <div className="d-flex flex-column" style={{ gap: '30px', width: '40%' }}>
                <InputGroup>
                    <SelectExam setSelectedExam={setSelectedExam} />
                    <Form.Control readOnly value={selectedExam?.name} />
                </InputGroup>
                <InputGroup>
                    <SelectDepartment selectedExam={selectedExam} setSelectedDepartment={setSelectedDepartment} showAnyway={true} />
                    <Form.Control readOnly value={(selectedDepartment?.code ?? '') + " " + (selectedDepartment?.name ?? '')} />
                </InputGroup>
                <InputGroup >
                    <SelectCourse selectedDepartment={selectedDepartment} setSelectedCourse={setSelectedCourse} showAnyway={true} />
                    <Form.Control readOnly value={(selectedCourse?.code ?? '') + ' ' + (selectedCourse?.name ?? '')} />
                </InputGroup>
            </div>
            <div className="d-flex flex-column" style={{ gap: '30px' }}>
                {selectedCourse?.id &&
                    <CreateEvaluation selectedCourse={selectedCourse} selectedExam={selectedExam} />
                }
            </div>
        </div>
        <br />
        <br />
        <div>
            {
                selectedCourse?.id &&
                <Table bordered>
                    <thead>
                        <tr>
                            {
                                ["Evaluation", "Papers number", "Faculty", "Status", ""]
                                    .map((item, idx) =>
                                        <td key={idx} className="bg-info">{item}</td>
                                    )
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            evaluations?.map((evaluation, idx) =>
                                <tr key={idx}>
                                    {
                                        [
                                            (idx + 1) + ' ' + (evaluation.description ?? ''),
                                            evaluation.startPaperNumber + " to " + evaluation.endPaperNumber,
                                            evaluation.faculty.fullName + ' (' + evaluation.faculty.username + ')',
                                            '',
                                            <ManageOptions evaluationId={evaluation.id} />
                                        ].map((item, indx) =>
                                            < td key={indx}>
                                                {item}
                                            </td>
                                        )
                                    }
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            }
        </div>
    </div >
}