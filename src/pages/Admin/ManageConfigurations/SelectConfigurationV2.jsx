import axios from "axios";
import { useEffect, useState } from "react";
import { Dropdown, Form, InputGroup } from "react-bootstrap";
import { CONFIGURATIONS_GET_ALL } from "../../../reducers/ApiEndPoints";
import Cookies from "js-cookie";

export default function SelectConfigurationV2(props) {
    const [availableConfigs, setAvailableConfigs] = useState([])
    const { setSelectedConfiguration, selectedConfiguration, label } = props;

    useEffect(() => {
        axios({
            method: 'GET',
            url: CONFIGURATIONS_GET_ALL,
            headers: {
                Authorization: 'Bearer ' + Cookies.get('authtoken')
            }
        }).then(res => setAvailableConfigs(res?.data?.data))
    }, [])

    return <InputGroup>
        <Dropdown className="d-inline" autoClose="inside" onSelect={(selectId) => {
            setSelectedConfiguration(availableConfigs.find(i => i.id == selectId))
        }}>
            <Dropdown.Toggle id="dropdown-autoclose-inside" style={{
                wordWrap: 'break-word'
            }}
                variant='info'
            >
                {label ?? 'Select Configuration'}
            </Dropdown.Toggle>

            <Dropdown.Menu >
                {
                    availableConfigs?.map((item, ind) => {
                        return (
                            <Dropdown.Item
                                key={ind}
                                eventKey={item.id}
                            >
                                {item.name}
                            </Dropdown.Item>
                        )
                    })
                }
            </Dropdown.Menu>
        </Dropdown>
        <Form.Control readOnly value={selectedConfiguration?.name ?? ''}
            className="bg-white" />
    </InputGroup>
}