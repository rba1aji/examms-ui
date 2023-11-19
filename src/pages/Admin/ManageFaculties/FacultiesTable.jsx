import { Table } from "react-bootstrap"
import axios from "axios"
import { useEffect, useState } from "react"
import { GET_ALL_FACULTIES } from "../../../reducers/ApiEndPoints";

export default function FacultiesTable() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios({
            method: 'get',
            url: GET_ALL_FACULTIES,
        })
            .then((res) => {
                setData(res?.data?.data)
            })
            .catch((err) => {
                alert(err.response.data.message)
            })
    }, []);

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
                                ["Sno", "ID", "Name", "Department", "Designation", "Email", "Phone"].map((item, index) => {
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
                            data?.map((f, index) => {
                                return <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{f.id}</td>
                                    <td>{f.fullName}</td>
                                    <td>{f.department.code}</td>
                                    <td>{f.designation}</td>
                                    <td>{f.email}</td>
                                    <td>{f.phone}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </Table>
            </div >
        </>
    )
}