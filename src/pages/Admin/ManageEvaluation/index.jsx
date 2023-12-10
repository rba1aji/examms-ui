import { useState } from "react";
import SelectExam from "../ManageExams/SelectExam";
import { Form, InputGroup } from "react-bootstrap";

export default function ManageEvaluation() {
    const [selectedExam, setSelectedExam] = useState();

    return <div className="d-flex flex-row align-items-center justify-content-center p-5" style={{ gap: '45px' }}>
        <InputGroup>
            <SelectExam setSelectedExam={setSelectedExam} />
            <Form.Control aria-label="Text input with dropdown button" disabled value={selectedExam.name} />
        </InputGroup>
    </div>
}