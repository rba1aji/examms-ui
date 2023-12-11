import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { GET_STUDENT_PROFILE } from "../../reducers/ApiEndPoints";
import Cookies from "js-cookie";

export default function StudentProfile() {
    const [student, setStudent] = useState({});

    useEffect(() => {
        axios({
            method: "GET",
            url: GET_STUDENT_PROFILE,
            headers: {
                Authorization: "Bearer " + Cookies.get("authtoken")
            }
        }).then(res => {
            setStudent(res?.data?.data)
        }).catch(err => {
            console.log(err);
        })
    }, []);


    return (
        <div style={{
            margin: '0 15vw'
        }}>
            <Table bordered className="mt-5 border-dark" style={{
                backgroundColor: '#F3F8FF',
                tableLayout: 'fixed'
            }}
            >
                <tbody>
                    {
                        student && Object.keys(student).map((key, ind) => {
                            return (
                                <tr key={ind}>
                                    {/* <td>{key}</td> */}
                                    <td>{key}</td>
                                    <td>{JSON.stringify(student[key])}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    );
}