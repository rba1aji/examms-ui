import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AppState } from "../reducers/AppContextProvider";

export default function LoggedinMenu() {
    const navigate = useNavigate();
    const { userRole, setAuthtoken, setUserRole } = AppState();

    return (
        <>
            <div className='m-auto me-5 h5 text-dark'>
                {/* {userRole.substring(0, 1).toUpperCase() + userRole.substring(1)}:
                {" " + user?.fullname} */}
            </div>
            <Button variant="dark" className="me-5 my-1 "
                onClick={() => {
                    Cookies.remove('authtoken');
                    navigate('/');
                    setAuthtoken();
                    setUserRole();
                }}
            >
                Logout
            </Button>

            <Button as={Link} to={userRole + '/workspace'} variant="dark" className="my-1 ">
                Workspace
            </Button>
        </>
    )
}