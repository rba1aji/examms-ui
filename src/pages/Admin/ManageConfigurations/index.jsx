import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { CONFIGURATIONS_GET_ALL } from "../../../reducers/ApiEndPoints";
import Cookies from "js-cookie";
import AddQuestionPaperConfiguration from "./AddQuestionPaperConfiguration";

export default function ManageConfigurations() {
    const [availableConfigs, setAvailableConfigs] = useState([])

    useEffect(() => {
        axios({
            method: 'GET',
            url: CONFIGURATIONS_GET_ALL,
            headers: {
                Authorization: 'Bearer ' + Cookies.get('authtoken')
            }
        }).then(res => setAvailableConfigs(res?.data?.data))
    }, [])


    return <div className="mx-5">
        <div className="mb-5">
            {
                [<AddQuestionPaperConfiguration />]
                    .map((item, idx) =>
                        item
                    )
            }
        </div>
        <div>
            <h5 className="mb-3">Available Configurations</h5>
            <Table bordered>
                <thead>
                    <tr>
                        {
                            ['S no', 'Name', 'Type', 'Last Modified At', 'Configuration']
                                .map((item, idx) =>
                                    <th key={idx} className="bg-info">{item}</th>
                                )
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        availableConfigs?.map((item, idx) =>
                            <tr key={idx}>
                                {
                                    [idx + 1, item?.name, item.type, new Date(item.lastModifiedDate).toLocaleString() ?? '', item.configJson]
                                        .map((td, idxx) =>
                                            <td key={idxx}>{td}</td>
                                        )
                                }
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </div>
    </div>
}