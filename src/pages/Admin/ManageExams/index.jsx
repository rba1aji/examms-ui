import { useEffect, useState } from "react"
import RegisterExam from "./RegisterExam";
import SelectExam from "./SelectExam"
import SelectCourse from "./SelectCourse";
import SelectBranches from "./SelectDepartment";
import ManageBatches from "./ManageBatches";
import SelectBatch from "./SelectBatch";
import BatchStudentsTable from "./BatchStudentsTable";

export default function ManageExams() {
    const [selectedExam, setSelectedExam] = useState(
        JSON.parse(window.sessionStorage.getItem('selectedExam'))
    );
    const [selectedDepartment, setSelectedDepartment] = useState(
        JSON.parse(window.sessionStorage.getItem('selectedDepartment'))
    );
    const [selectedCourse, setSelectedCourse] = useState(
        JSON.parse(window.sessionStorage.getItem('selectedCourse'))
    )

    const [examBatches, setExamBatches] = useState([]);
    const [selectedBatch, setSelectedBatch] = useState({});

    useEffect(() => {
        selectedExam && window.sessionStorage.setItem('selectedExam', JSON.stringify(selectedExam));
        selectedDepartment && window.sessionStorage.setItem('selectedDepartment', JSON.stringify(selectedDepartment));
        selectedCourse && window.sessionStorage.setItem('selectedCourse', JSON.stringify(selectedCourse));
    }, [selectedExam, selectedDepartment, selectedCourse])

    useEffect(() => {
        setSelectedCourse({})
    }, [selectedDepartment])
    useEffect(() => {
        setSelectedBatch({})
    }, [selectedCourse])

    return (
        <div style={{
            margin: '0 2.5vw',
        }}>
            {/* <br />
            <div className="h6 text-end mt-2 ">Manage Exams</div> */}
            <div className="mb-3">
                <br />
                {
                    [
                        <RegisterExam />,

                        <SelectExam
                            selectedExam={selectedExam}
                            setSelectedExam={setSelectedExam} />,

                        <SelectBranches
                            selectedExam={selectedExam}
                            selectedDepartment={selectedDepartment}
                            setSelectedDepartment={setSelectedDepartment}
                            setSelectedCourse={setSelectedCourse}
                        />,

                        <SelectCourse
                            selectedExam={selectedExam}
                            selectedDepartment={selectedDepartment}
                            selectedCourse={selectedCourse}
                            setSelectedCourse={setSelectedCourse}
                        />,

                        <ManageBatches
                            selectedCourse={selectedCourse}
                            selectedExam={selectedExam}
                            examBatches={examBatches}
                            setExamBatches={setExamBatches}
                        />,

                        <SelectBatch
                            examBatches={examBatches}
                            setExamBatches={setExamBatches}
                            selectedExam={selectedExam}
                            selectedCourse={selectedCourse}
                            setSelectedBatch={setSelectedBatch}
                        />

                    ].map((el, ind) => {
                        return <span className="pe-5" key={ind}>
                            {el}
                        </span>
                    })
                }
            </div>
            <div style={{
            }}>
                <table className="my-5 p-4" style={{
                    width: '100%'
                }}>
                    <tbody >
                        <tr>
                            <td style={{
                                width: '37.5%'
                            }}>
                                {
                                    [
                                        { key: "Exam Name", val: selectedExam?.name },
                                        { key: "Semester", val: selectedExam?.semester },
                                        { key: "Students Batch", val: selectedExam?.batch },
                                    ].map((itm, ind) => (
                                        itm.val && <table key={ind}><tbody><tr
                                        >
                                            <td className="px-3 py-3">{itm.key + ":"}</td>
                                            <td className="px-3 py-3"><b>{itm.val}</b></td>
                                        </tr></tbody></table>
                                    ))
                                }
                            </td>
                            <td>
                                {
                                    [
                                        { key: "Department", val: selectedDepartment?.name },
                                        { key: "Course", val: !selectedCourse?.code ? null : (selectedCourse?.code + " " + selectedCourse?.name) },
                                        { key: "Exam Batch", val: selectedBatch?.name }
                                    ].map((itm, ind) => (
                                        itm.val && <table key={ind}><tbody><tr
                                        >
                                            <td className="px-3 py-3">{itm.key + ":"}</td>
                                            <td className="px-3 py-3"><b>{itm.val}</b></td>
                                        </tr></tbody></table>
                                    ))
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="mx-2">
                {selectedBatch?.id && <BatchStudentsTable selectedBatch={selectedBatch} />}
            </div>
            <br />
            <br />
        </div >
    )
}