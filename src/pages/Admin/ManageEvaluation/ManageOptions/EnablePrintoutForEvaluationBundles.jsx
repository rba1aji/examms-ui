import axios from "axios";
import { useState } from "react";
import { Button, Dropdown, Form, InputGroup } from "react-bootstrap";
import { EVALUATION_BUNDLE_ENABLE_DISABLE_PRINTOUT, EVALUATION_PAPERS_ENABLE_ENTRY } from "../../../../reducers/ApiEndPoints";
import Cookies from "js-cookie";

export default function EnablePrintoutForEvaluationBundles(props) {
    const { printoutDisabledBundles } = props;
    const [selectedBundles, setSelectedBundles] = useState([])

    function handleEnablePrintout(e) {
        e.preventDefault()
        axios({
            method: 'PUT',
            url: EVALUATION_BUNDLE_ENABLE_DISABLE_PRINTOUT,
            data: {
                evaluationBundleId: selectedBundles.map(i => i.id),
                disablePrintout: false
            },
            headers: {
                Authorization: "Bearer " + Cookies.get('authtoken')
            }
        }).then(res => {
            alert(res?.data?.message)
        }).catch(err => {
            alert(err?.response?.data?.message ?? "Something went wrong!")
        })
    }

    return <Form onSubmit={handleEnablePrintout}>
        <Form.Label>Enable printout for evaluation bundles</Form.Label>
        <InputGroup>
            <Dropdown className="d-inline mx-2 bg-white" autoClose="outside"
                onSelect={(selectId) => {
                    if (selectedBundles.find(i => i.id == selectId)) {
                        setSelectedBundles(selectedBundles.filter(i => i.id != selectId))
                    } else {
                        setSelectedBundles([...selectedBundles, printoutDisabledBundles.find(i => i.id == selectId)])
                    }
                }}
            >
                <Dropdown.Toggle id="dropdown-autoclose-outside" className='bg-white text-dark border-dark text-start'
                    style={{ width: '80%' }}
                >
                    <span style={{ width: '90%' }}>
                        {
                            selectedBundles.length == 0 ? 'Select Bundles' :
                                selectedBundles.map((item, index) => {
                                    return '[' + (index + 1) + `] ` + item.evaluationPaperList[0]?.number + " - " + item.evaluationPaperList[item.evaluationPaperList?.length - 1]?.number
                                }).join(', ')
                        }
                    </span>
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ width: '75%' }} >
                    {
                        printoutDisabledBundles?.map((item, index) => {
                            return (
                                <Dropdown.Item
                                    key={index}
                                    eventKey={item.id}
                                    className={`${selectedBundles.find(i => i.id == item.id) ? 'bg-info' : ''}`}
                                >
                                    {`[`}{index + 1}{`] `} {item.evaluationPaperList[0]?.number + " - " + item.evaluationPaperList[item.evaluationPaperList?.length - 1]?.number}
                                </Dropdown.Item>
                            )
                        })
                    }
                </Dropdown.Menu>
            </Dropdown>
            <Button variant='info' type='submit'>
                Enable Printout
            </Button>
        </InputGroup>
    </Form>;
}