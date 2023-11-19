import axios from "axios";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { GET_ALL_EXAM } from "../../../reducers/ApiEndPoints";

export default function SelectExam(props) {
    const [exams, setExams] = useState([]);
    const { setSelectedExam } = props;

    useEffect(() => {
        axios({
            method: 'GET',
            url: GET_ALL_EXAM,
            params: {
                batch: ''
            },
            headers: {
                Authorization: "Bearer " + Cookies.get('authtoken')
            }
        })
            .then(res => {
                setExams(res.data.data)
                console.log("exams are fetched", res.data.data);
            })
            .catch(err => alert(err.response.data.message))
    }, []);


    return (
        <>
            <Dropdown className="d-inline" autoClose="inside" onSelect={(examid) => {
                setSelectedExam(exams.find(e => e.id == examid))
            }}>
                <Dropdown.Toggle id="dropdown-autoclose-inside" style={{
                    wordWrap: 'break-word'
                }}
                    variant='info'
                >
                    Select Exam
                </Dropdown.Toggle>

                <Dropdown.Menu >
                    {
                        exams?.map((exam, ind) => {
                            return (
                                <Dropdown.Item
                                    key={ind}
                                    eventKey={exam.id}
                                >
                                    {exam.name}
                                </Dropdown.Item>
                            )
                        })
                    }
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}