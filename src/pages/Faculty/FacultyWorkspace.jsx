import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import ChangePassword from '../../components/ChangePassword';
import AllocatedExams from './AllocatedExams';
import Evaluations from './Evaluations';

export function FacultyWorkspace() {
    const components = [<AllocatedExams />, <Evaluations />, <ChangePassword />];
    const [key, setKey] = useState(0);
    return (
        <table style={{
            width: '100%',
            height: '100%',
        }}>
            <tbody><tr className=''>
                <td style={{
                    width: '15%',
                    height: '95vh',
                    backgroundColor: '#F3F8FF'
                }}
                    className='align-top pt-5 px-3 border-end'
                >
                    <Nav defaultActiveKey="exams" className=' '
                        onSelect={(ekey) => {
                            setKey(ekey);
                        }}>
                        {
                            ['Exams', 'Evaluations', 'Change Password']
                                .map((item, index) => {
                                    return (
                                        <Nav.Link
                                            eventKey={index}
                                            className='text-dark w-100'
                                            key={index}
                                        >
                                            <Button variant={parseInt(key) === index ? 'info' : ''}
                                                className='w-100 py-1 my-1'
                                            >
                                                {item}
                                            </Button>
                                        </Nav.Link>
                                    )
                                })
                        }
                    </Nav>
                </td>
                <td className='align-top'>
                    <br />
                    <br />
                    {components[key]}
                </td>
            </tr></tbody>
        </table >
    );
}
