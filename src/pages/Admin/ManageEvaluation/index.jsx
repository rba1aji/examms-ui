import { useState } from "react";
import SelectExam from "../ManageExams/SelectExam";
import { Button, Form, InputGroup } from "react-bootstrap";
import SelectCourse from "../ManageExams/SelectCourse";
import SelectDepartment from "../ManageExams/SelectDepartment";
import CreateEvaluation from "./CreateEvaluation";

export default function ManageEvaluation() {
    const [selectedExam, setSelectedExam] = useState();
    const [selectedDepartment, setSelectedDepartment] = useState();
    const [selectedCourse, setSelectedCourse] = useState();

    return <div className="d-flex flex-row p-5" style={{ gap: '100px' }}>
        <div className="d-flex flex-column" style={{ gap: '30px', width: '40%' }}>
            <InputGroup>
                <SelectExam setSelectedExam={setSelectedExam} />
                <Form.Control disabled value={selectedExam?.name} className="bg-white" />
            </InputGroup>
            <InputGroup>
                <SelectDepartment selectedExam={selectedExam} setSelectedDepartment={setSelectedDepartment} showAnyway={true} />
                <Form.Control disabled value={(selectedDepartment?.code ?? '') + " " + (selectedDepartment?.name ?? '')} className="bg-white" />
            </InputGroup>
            <InputGroup >
                <SelectCourse selectedDepartment={selectedDepartment} setSelectedCourse={setSelectedCourse} showAnyway={true} />
                <Form.Control disabled value={(selectedCourse?.code ?? '') + ' ' + (selectedCourse?.name ?? '')} className="bg-white" />
            </InputGroup>
        </div>
        <div className="d-flex flex-column" style={{ gap: '30px' }}>
            {selectedCourse?.id &&
                <CreateEvaluation selectedCourse={selectedCourse} selectedExam={selectedExam} />
            }
        </div>
    </div>
}