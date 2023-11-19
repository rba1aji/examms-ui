import FacultiesTable from "./FacultiesTable"
import RegisterMultipleFaculties from "./RegisterMultipleFaculties"

export default function ManageFaculties() {

    return (
        <div style={{
            margin: '0 2.5vw',
        }}>
            {/* <br />
            <div className="h6 text-end mt-2 ">Manage Faculties</div> */}
            <div className="mb-3">
                {
                    [
                        <RegisterMultipleFaculties />,
                    ].map((el, ind) => {
                        return <span className="pe-5" key={ind}>
                            {el}
                        </span>;
                    })
                }
            </div>
            <FacultiesTable />
        </div>
    )
}