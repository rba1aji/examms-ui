import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { attendanceConfig, numbersToWords } from "../../../reducers/Utils";
import { GET_ALL_MARKS } from "../../../reducers/ApiEndPoints";

export default function BatchStudentsTable(props) {
    const { selectedBatch } = props;
    const [studentMarks, setStudentMarks] = useState([]);

    useEffect(() => {
        axios({
            method: 'get',
            url: GET_ALL_MARKS,
            params: {
                examBatch: selectedBatch.id,
            },
            headers: {
                Authorization: "Bearer " + Cookies.get('authtoken')
            }
        })
            .then((res) => {
                setStudentMarks(res.data?.data)
                console.log(res?.data?.data.message)
            })
            .catch((err) =>
                alert(err.response.data.message)
            )
    }, [selectedBatch])

    return (
        <>
            <div style={{
                width: '100%',
                height: '77.5vh',
                overflow: 'scroll',
                fontSize: '90%'
            }}
                className=" border "
            >

                <Table style={{
                    width: '100%',
                }}
                    bordered
                >
                    <thead>
                        <tr style={{
                            position: 'sticky',
                            top: 0,
                            zIndex: 1
                        }}>
                            {
                                ["Sno", "Register no", "Name", "Attendance", "Marks in numbers", "Marks in words"]
                                    .map((item, index) => {
                                        return <th
                                            key={index}
                                            className="bg-info"
                                            style={{
                                                // backgroundColor: 'azure'
                                            }}
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
                            studentMarks?.map((mark, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{mark.student?.registerNumber}</td>
                                        <td>{mark.student?.fullName}</td>
                                        <td>{attendanceConfig[mark.attendance]?.value}</td>
                                        <td>{mark.marks}</td>
                                        <td>{numbersToWords(mark?.marks)}
                                        </td>
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