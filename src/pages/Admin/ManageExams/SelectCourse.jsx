import axios from "axios";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { GET_ALL_COURSES } from "../../../reducers/ApiEndPoints";
import Cookies from "js-cookie";

export default function SelectCourse(props) {
    const [courses, setCourses] = useState([]);
    const {
        selectedExam, selectedDepartment,
        setSelectedCourse
    } = props;


    useEffect(() => {
        setCourses([])
        if (selectedDepartment?.code) {
            console.log('branches are selected', selectedDepartment)
            axios({
                method: 'get',
                url: GET_ALL_COURSES,
                params: {
                    department: selectedDepartment?.code,
                    semester: selectedExam?.semester,
                    batch: selectedExam?.batch
                },
                headers: {
                    Authorization: "Bearer " + Cookies.get('authtoken')
                }
            })
                .then(res => {
                    setCourses(res.data.data)
                    console.log(res.data?.message)
                })
                .catch(err => alert(err.response.data.message))
        }
    }, [selectedDepartment, selectedExam])


    if (!selectedDepartment?.code) return <></>
    return (
        <>
            <Dropdown className="d-inline" autoClose="inside" onSelect={(courseCode) => {
                setSelectedCourse(courses.find(c => c.code === courseCode))
                console.log("course selected", courseCode)
            }}>
                <Dropdown.Toggle id="dropdown-autoclose-inside" style={{
                    wordWrap: 'break-word'
                }}
                    variant='info'
                >
                    Select Course
                </Dropdown.Toggle>

                <Dropdown.Menu >
                    {
                        courses?.map((course, ind) => {
                            return (
                                <Dropdown.Item
                                    key={ind}
                                    eventKey={course.code}
                                >
                                    {course.code + " " + course.name}
                                </Dropdown.Item>
                            )
                        })
                    }
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}