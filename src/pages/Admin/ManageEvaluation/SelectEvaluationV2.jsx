import { useEffect, useState } from "react";

export default function SelectEvaluationV2(props) {
    const { selectedEvaluation, setSelectedEvaluation } = props;
    const [evaluations, setEvaluations] = useState([])

    useEffect(() => {

    }, [])

    return <InputGroup>
        <Dropdown className="d-inline" autoClose="inside" onSelect={(selectId) => {
            setSelectedEvaluation(evaluations.find(i => i.id == selectId))
        }}>
            <Dropdown.Toggle variant='info' id="dropdown-autoclose-inside" style={{
                wordWrap: 'break-word'
            }}>
                Select Evaluation
            </Dropdown.Toggle>

            <Dropdown.Menu >
                {
                    evaluations?.map((item, ind) => {
                        return (
                            <Dropdown.Item
                                key={ind}
                                eventKey={item.id}
                            >
                                {item.fullName + " (" + item.username + ')'}
                            </Dropdown.Item>
                        )
                    })
                }
            </Dropdown.Menu>
        </Dropdown>
        <Form.Control disabled value={selectedEvaluation?.exam.name ?? '' + "--" + (selectedEvaluation?.course.code ?? '') + "--" + (selectedEvaluation?.startPaperNumber) + "--"(selectedEvaluation?.endPaperNumber)} />
    </InputGroup>
}