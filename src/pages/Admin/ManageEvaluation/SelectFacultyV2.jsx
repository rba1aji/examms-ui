import axios from "axios";
import { useEffect, useState } from "react"
import { Dropdown, Form, InputGroup } from "react-bootstrap";
import { GET_ALL_FACULTIES } from "../../../reducers/ApiEndPoints";
import Cookies from "js-cookie";

export default function SelectFacultyV2(props) {
    const { selectedFaculty, setSelectedFaculty } = props;
    const [faculties, setFaculties] = useState([])

    useEffect(() => {
        axios({
            method: 'get',
            url: GET_ALL_FACULTIES,
            headers: {
                Authorization: "Bearer " + Cookies.get('authtoken')
            }
        })
            .then((res) => setFaculties(res.data?.data))
            .catch((err) => alert(err.response.data.message))
    }, [])

    return <InputGroup>
        <Dropdown className="d-inline" autoClose="inside" onSelect={(facultyId) => {
            setSelectedFaculty(faculties.find(i => i.id == facultyId))
        }}>
            <Dropdown.Toggle id="dropdown-autoclose-inside" style={{
                wordWrap: 'break-word'
            }}
                variant='info'
            >
                Select Faculty
            </Dropdown.Toggle>

            <Dropdown.Menu >
                {
                    faculties?.map((faculty, ind) => {
                        return (
                            <Dropdown.Item
                                key={ind}
                                eventKey={faculty.id}
                            >
                                {faculty.fullName + " (" + faculty.username + ')'}
                            </Dropdown.Item>
                        )
                    })
                }
            </Dropdown.Menu>
        </Dropdown>
        <Form.Control disabled value={selectedFaculty?.id ? selectedFaculty?.fullName + " (" + selectedFaculty?.username + ')' : ''}
            className="bg-white" />
    </InputGroup>
}