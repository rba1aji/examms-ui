import { useEffect, useState } from "react";
import SelectExam from "../ManageExams/SelectExam";
import { Button, Form, InputGroup, Table } from "react-bootstrap";
import SelectCourse from "../ManageExams/SelectCourse";
import SelectDepartment from "../ManageExams/SelectDepartment";
import CreateEvaluation from "./CreateEvaluation";
import axios from "axios";
import { EVALUATION_DELETE, EVALUATION_GET_ALL } from "../../../reducers/ApiEndPoints";
import ManageOptions from "./ManageOptions";
import Cookies from "js-cookie";
import { BlackDustbin, BlackRefresh } from "../../../assets/svgicons";

export default function ManageEvaluation() {
    const [selectedExam, setSelectedExam] = useState();
    const [selectedDepartment, setSelectedDepartment] = useState();
    const [selectedCourse, setSelectedCourse] = useState();
    const [evaluations, setEvaluations] = useState([]);
    const [refreshEvaluations, setRefreshEvaluations] = useState(0);

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
    }, [selectedCourse, refreshEvaluations])

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
                    <CreateEvaluation selectedCourse={selectedCourse} selectedExam={selectedExam} setRefreshEvaluations={setRefreshEvaluations} />
                }
            </div>
        </div>
        <br />
        <br />
        {
            selectedCourse?.id &&
            <div>
                <Table bordered>
                    <thead>
                        <tr>
                            {
                                ["Evaluation", "Papers number", "Faculty", "Status", "", "Delete"]
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
                                            <ManageOptions evaluationId={evaluation.id} />,
                                            <BlackDustbin onClick={() => {
                                                if (confirm("Deleting Evaluation... Sure?")) {
                                                    deleteEvaluation(evaluation.id);
                                                    setRefreshEvaluations(prev => prev + 1)
                                                }
                                            }} />
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
            </div>
        }
    </div >
}

function deleteEvaluation(evaluationId) {
    axios({
        method: 'DELETE',
        url: EVALUATION_DELETE,
        params: {
            evaluationId: evaluationId
        },
        headers: {
            Authorization: 'Bearer ' + Cookies.get('authtoken')
        }
    }).then(res => {
        alert(res?.data?.message)
    }).catch(err => {
        alert(err?.response?.data?.message ?? "Something went wrong!")
        console.log(err)
    })
}