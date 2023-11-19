import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { GET_ALL_COURSES } from "../../../reducers/ApiEndPoints";
import Cookies from "js-cookie";

export default function CourseTable() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios({
            method: 'GET',
            url: GET_ALL_COURSES,
            headers: {
                Authorization: "Bearer " + Cookies.get('authtoken')
            }
        })
            .then(res => setCourses(res.data.data))
            .catch(err => alert(err.response.data.message))
    }, [])

    return (
        <>
            <div style={{
                width: '100%',
                height: '75vh',
                overflow: 'scroll',
                fontSize: '85%'
            }}
                className=" border "
            >

                <Table style={{
                    width: '100%',
                }}
                    bordered
                >
                    <thead >
                        <tr style={{
                            position: 'sticky',
                            top: 0,
                            zIndex: 1
                        }}>
                            {
                                ["Sno", "CourseID", "Name", "Credits", "Degree", 'Branch', 'Semester', "Batch"]
                                    .map((item, index) => {
                                        return <th
                                            key={index}
                                            className="bg-info"
                                        >
                                            {item}
                                        </th>;
                                    })
                            }
                        </tr>
                    </thead>
                    <tbody
                        style={{
                            height: '70vh',
                            overflow: 'scroll'
                        }}>
                        {
                            courses?.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.code}</td>
                                        <td>{item.name}</td>
                                        <td>{item.credit}</td>
                                        <td>{item.department.degree.code}</td>
                                        <td>{item.department.code}</td>
                                        <td>{item.semester}</td>
                                        <td>{item.batch}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </>
    )
}