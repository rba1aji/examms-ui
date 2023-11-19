import { Table } from "react-bootstrap"
import axios from "axios"
import { useEffect, useState } from "react"
import * as api from '../../../reducers/ApiEndPoints'

export default function StudentsTable() {
    const [data, seData] = useState([]);

    useEffect(() => {
        axios({
            method: 'get',
            maxBodyLength: Infinity,
            url: api.GET_ALL_STUDENTS,
            headers: {
                Authorization: "Bearer " + Cookies.get('authtoken')
            }
        })
            .then((res) => {
                console.log(res)
                seData(res.data?.data)
            })
            .catch((err) => alert(err.response.data.message))
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
                                ["Sno", "Register number", "Name", "Degree", "Branch", "Section", "Batch", "Phone", "DOB"].map((item, index) => {
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
                            data?.map((st, index) => {
                                return <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{st.registerNumber}</td>
                                    <td>{st.fullName}</td>
                                    <td>{st.department.degree.code}</td>
                                    <td>{st.department.code}</td>
                                    <td>{st.section}</td>
                                    <td>{st.batch}</td>
                                    <td>{st.phone}</td>
                                    <td>{new Date(st.dateOfBirth).toLocaleDateString()}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </Table>
            </div >
        </>
    )
}