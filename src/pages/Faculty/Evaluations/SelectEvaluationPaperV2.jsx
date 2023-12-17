import { Dropdown, InputGroup } from "react-bootstrap";

export default function SelectEvaluationPaperV2(props) {
    const { selectedBundle, setSelectedPaper, selectedPaper } = props;

    return <InputGroup className="mb-4 border-black" >
        <Dropdown className="d-block" autoClose="inside" onSelect={(selectId) => {
            setSelectedPaper(selectedBundle?.evaluationPaperList.find(i => i.id == selectId))
        }}>
            <Dropdown.Toggle variant='info' id="dropdown-autoclose-inside" style={{
                wordWrap: 'break-word'
            }}
                className="px-4"
            >
                <span className="h5 px-2">Evaluation Paper Number</span>
            </Dropdown.Toggle>
            <Dropdown.Menu >
                {
                    selectedBundle?.evaluationPaperList?.map((item, ind) => {
                        return (
                            <Dropdown.Item
                                key={ind}
                                eventKey={item.id}
                                className="px-4"
                            >
                                {item.number}
                                <span className="text-gray ps-2">{item.submitted ? ' (submitted)' : ''}</span>
                            </Dropdown.Item>
                        )
                    })
                }
            </Dropdown.Menu>
        </Dropdown>
        <InputGroup.Text className="px-5 bg-white"><h5 className="mb-0">{selectedPaper?.number}</h5></InputGroup.Text>
    </InputGroup>

}