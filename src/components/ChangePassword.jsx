import axios from 'axios'
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { CHANGE_PASSOWRD } from '../reducers/ApiEndPoints'
import Cookies from 'js-cookie'

export default function ChangePassword() {
    const [curPw, setCurPw] = useState('')
    const [newPw, setNewPw] = useState('')

    function handleChangePassword(e) {
        alert("Trust me it will work, Since its a demo I disabled it.")
        return;
        e.preventDefault()
        axios({
            method: 'put',
            url: CHANGE_PASSOWRD,
            data: {
                currentPassword: curPw,
                newPassword: newPw
            },
            headers: { 'Authorization': 'Bearer ' + Cookies.get('authtoken') }
        })
            .then((res) => {
                alert(res.data.message)
            })
            .catch(err => alert(err.response.data.message))
    }

    return (
        <>
            <br />
            <div className="text-center h4">Change Password</div>
            <br />
            <Form style={{ margin: '0 32.5vw' }}
                onSubmit={handleChangePassword}
            >
                <Form.Group className="mb-3" >
                    <Form.Label>Current password</Form.Label>
                    <Form.Control placeholder="Enter current password"
                        value={curPw} onChange={(e) => setCurPw(e.target.value)}
                        required
                        autoFocus={true}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>New password</Form.Label>
                    <Form.Control placeholder="Enter new password"
                        value={newPw} onChange={(e) => setNewPw(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="info" type="submit"
                    className='d-block ms-auto mt-4 px-3'
                >
                    Change
                </Button>
            </Form>
        </>
    )
}