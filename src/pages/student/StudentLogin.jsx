import axios from "axios";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { formateDob } from "../../reducers/Utils";
import * as api from "../../reducers/ApiEndPoints";
import Cookies from "js-cookie";
import { AppState } from "../../reducers/AppContextProvider";

export default function StudentLogin() {
    const [regno, setRegno] = useState('')
    const [dob, setDob] = useState('')
    const navigate = useNavigate();
    const { setUserRole, setAuthtoken } = AppState();

    function handleLogin(e) {
        e.preventDefault();

        axios({
            method: 'post',
            url: api.STUDENT_LOGIN,
            data: {
                username: regno,
                password: formateDob(dob)?.replaceAll("/", "")
            }
        }).then((res) => {
            var data = res?.data?.data;
            Cookies.set("authtoken", data?.token);
            Cookies.set('userRole', data?.role);
            navigate('/' + data?.role + '/workspace');
            setUserRole(data?.role);
            setAuthtoken(data?.token);
        }).catch((err) => {
            console.log(err);
            alert(err?.response?.data?.message || err.message)
        });

    }


    return (
        <>
            <br />
            <br />
            <div className="text-center h4">Login as Student</div>
            <br />
            <Form style={{ margin: '0 40vw' }}
                onSubmit={handleLogin}
            >
                <Form.Group className="mb-3" >
                    <Form.Label>Register number</Form.Label>
                    <Form.Control placeholder="Enter register no"
                        value={regno} onChange={(e) => setRegno(e.target.value)}
                        required
                        type="number"
                        autoFocus={true}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Date of birth</Form.Label>
                    <Form.Control placeholder="dd/mm/yyyy"
                        value={dob} onChange={(e) => {
                            setDob(e.target.value)
                        }}
                        required
                        type='date'
                    />
                </Form.Group>
                <div className="text-end mt-4">
                    <Button variant="info" type="submit" className="px-4">
                        Login
                    </Button>
                </div>
            </Form>
        </>
    )
}