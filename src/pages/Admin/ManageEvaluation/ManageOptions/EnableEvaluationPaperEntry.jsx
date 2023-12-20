import axios from "axios";
import { useState } from "react";
import { Button, Dropdown, Form, InputGroup } from "react-bootstrap";
import { EVALUATION_PAPERS_ENABLE_ENTRY } from "../../../../reducers/ApiEndPoints";
import Cookies from "js-cookie";

export default function EnableEvaluationPaperEntry(props) {
    const { disabledPapers } = props;
    const [selectedPapers, setSelectedPapers] = useState([])

    function handleEvaluationPaperEnableEntry(e) {
        e.preventDefault()
        axios({
            method: 'PUT',
            url: EVALUATION_PAPERS_ENABLE_ENTRY,
            data: selectedPapers.map(i => i.id),
            headers: {
                Authorization: "Bearer " + Cookies.get('authtoken')
            }
        }).then(res => {
            alert(res?.data?.message)
        }).catch(err => {
            alert(err?.response?.data?.message ?? "Something went wrong!")
        })
    }

    return <Form onSubmit={handleEvaluationPaperEnableEntry}>
        <Form.Label>Enable marks entry for evaluation papers</Form.Label>
        <InputGroup>
            <Dropdown className="d-inline mx-2 bg-white" autoClose="outside"
                onSelect={(selectId) => {
                    if (selectedPapers.find(i => i.id == selectId)) {
                        setSelectedPapers(selectedPapers.filter(i => i.id != selectId))
                    } else {
                        setSelectedPapers([...selectedPapers, disabledPapers.find(i => i.id == selectId)])
                    }
                }}
            >
                <Dropdown.Toggle id="dropdown-autoclose-outside" className='bg-white text-dark border-dark text-start'
                    style={{ width: '80%' }}
                >
                    <span style={{ width: '90%' }}>
                        {
                            selectedPapers.length == 0 ? 'Select Papers' :
                                selectedPapers.map((item, index) => item.number).join(', ')
                        }
                    </span>
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ width: '75%' }} >
                    {
                        disabledPapers?.map((item, index) => {
                            return (
                                <Dropdown.Item
                                    key={index}
                                    eventKey={item.id}
                                    className={`${selectedPapers.find(i => i.id == item.id) ? 'bg-info' : ''}`}
                                >
                                    {item.number}
                                </Dropdown.Item>
                            )
                        })
                    }
                </Dropdown.Menu>
            </Dropdown>
            <Button variant='info' type='submit'>
                Enable Entry
            </Button>
        </InputGroup>
    </Form>;
}