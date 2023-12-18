import { useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";

export default function SelectDepartment(props) {
    const [departments, setDepartments] = useState([]);
    const {
        selectedExam,
        setSelectedDepartment,
        showAnyway
    } = props;

    useEffect(() => {
        setSelectedDepartment()
        setDepartments(selectedExam?.departments)
    }, [selectedExam]);

    if (!showAnyway && !selectedExam?.id) return <></>
    return (
        <>
            <Dropdown className="d-inline" autoClose="inside"
                onSelect={(departmentCode) => {
                    setSelectedDepartment(departments.find(e => e.code === departmentCode))
                    console.log("department selected", departmentCode)
                }}>
                <Dropdown.Toggle id="dropdown-autoclose-inside"
                    style={{
                        wordWrap: 'break-word'
                    }}
                    variant='info'
                >
                    Select Department
                </Dropdown.Toggle>

                <Dropdown.Menu >
                    <Form>
                        {
                            departments?.map((department, ind) => {
                                return (
                                    <Dropdown.Item
                                        key={ind}
                                        eventKey={department.code}
                                    >
                                        {department.name}
                                    </Dropdown.Item>
                                )
                            })
                        }
                    </Form>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}