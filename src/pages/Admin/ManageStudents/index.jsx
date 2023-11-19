import RegisterMultipleStudents from "./RegisterStudents"
import StudentsTable from "./StudentsTable"

export default function ManageStudents() {

    return (
        <div style={{
            margin: '0 2.5vw',
        }}>
            {/* <br /> */}
            {/* <div className="h6 text-end mt-2 ">Manage Students</div> */}
            <div className="mb-3">
                {
                    [
                        <RegisterMultipleStudents />,
                    ].map((el, ind) => {
                        return <span className="pe-5" key={ind}>
                            {el}
                        </span>;
                    })
                }
            </div>
            <StudentsTable />
        </div>
    )
}