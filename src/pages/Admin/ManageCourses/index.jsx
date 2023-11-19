import RegisterMultipleCourses from "./RegisterCourses"
import CourseTable from "./CourseTable"
import RegisterSingleCourse from "./RegisterSingleCourse";

export default function ManageCourses() {

    return (
        <div style={{
            margin: '0 2.5vw',
        }}>
            {/* <br />
            <div className="h6 text-end mt-2 ">Manage Courses</div> */}
            <div className="mb-3">
                {
                    [
                        <RegisterMultipleCourses />, <RegisterSingleCourse />
                    ].map((el, ind) => {
                        return <span className="pe-5" key={ind}>
                            {el}
                        </span>;
                    })
                }
            </div>
            <CourseTable />
        </div>
    )
}