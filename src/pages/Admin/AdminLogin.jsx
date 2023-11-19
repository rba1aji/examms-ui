import axios from "axios";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ADMIN_LOGIN } from "../../reducers/ApiEndPoints";
import Cookies from "js-cookie";

export default function AdminLogin() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    function handleLogin(e) {
        e.preventDefault();
        axios({
            method: 'post',
            url: ADMIN_LOGIN,
            data: {
                username: username,
                password: password,
            },
            headers: {
                Authorization: "Bearer " + Cookies.get('authtoken')
            }
        })
            .then(function (res) {
                var data = res?.data?.data;
                Cookies.set("authtoken", data?.token);
                navigate('/' + data?.role + '/workspace');
                window.location.reload();
                Cookies.set('userRole', data?.role);
            })
            .catch(function (err) {
                alert(err.response?.data.message)
            });
    }


    return (
        <>
            <br />
            <br />
            <div className="text-center h4">Login as Admin</div>
            <br />
            <Form style={{ margin: '0 40vw' }}
                onSubmit={handleLogin}
            >
                <Form.Group className="mb-3" >
                    <Form.Label>Username</Form.Label>
                    <Form.Control placeholder="Enter username"
                        value={username} onChange={(e) => setUsername(e.target.value)}
                        required
                        type="text"
                        autoFocus={true}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control placeholder="Enter password"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        required
                        type="password"
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