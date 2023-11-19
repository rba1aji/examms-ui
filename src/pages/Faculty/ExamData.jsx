import axios from "axios"
import { useEffect } from "react"
import { GET_ALL_MARKS_FOR_EXAM_BATCH, GET_EXAM_BATCH } from "../../reducers/ApiEndPoints";
import Cookies from "js-cookie";

export default function ExamData(props) {

    const { examBatchId, setExamBatch, examBatch, setStudentMarks } = props;

    useEffect(() => {   //set examBatch
        axios({
            method: 'get',
            url: GET_EXAM_BATCH,
            params: {
                examBatchId: examBatchId
            },
            headers: { 'Authorization': 'Bearer ' + Cookies.get('authtoken') }
        })
            .then(res => {
                setExamBatch(res.data?.data)
                console.log(res.data?.message)
            })
            .catch(err => console.log(err.response.data.message))
    }, [examBatchId])

    useEffect(() => {   //set marks
        if (examBatch?.id) {
            axios({
                method: 'get',
                url: GET_ALL_MARKS_FOR_EXAM_BATCH,
                params: {
                    examBatchId: examBatchId
                },
                headers: { 'Authorization': 'Bearer ' + Cookies.get('authtoken') }
            })
                .then(res => {
                    setStudentMarks(res.data?.data)
                    console.log(res.data?.message)
                })
                .catch(err => console.log(err.response.data.message))
        }
    }, [examBatch])
}