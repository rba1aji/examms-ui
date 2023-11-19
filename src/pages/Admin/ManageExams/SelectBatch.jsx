import { Dropdown } from "react-bootstrap";

export default function SelectBatch(props) {
    const {
        setSelectedBatch,
        selectedCourse,
        examBatches
    } = props;

    if (!selectedCourse?.code) return <></>
    return (
        <>
            <Dropdown className="d-inline" autoClose="inside"
                onSelect={(batchid) => {
                    setSelectedBatch(examBatches.find(e => e.id == batchid))
                    console.log("batch selected", batchid)
                }}
            >
                <Dropdown.Toggle id="dropdown-autoclose-inside" style={{
                    wordWrap: 'break-word'
                }}
                    variant='info'
                >
                    Select Batch
                </Dropdown.Toggle>

                <Dropdown.Menu >
                    {
                        examBatches?.map((b, ind) => {
                            return (
                                <Dropdown.Item
                                    key={ind}
                                    eventKey={b.id}
                                >
                                    {b.name}
                                </Dropdown.Item>
                            )
                        })
                    }
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}