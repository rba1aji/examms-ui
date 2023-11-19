import { DropdownButton, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { loginRoutes } from "../reducers/Routes";

export default function Login() {
    return (
        <>
            <DropdownButton
                title="Login"
                variant='dark'
                className="my-1"
            >
                {
                    [...loginRoutes].map((item, index) => {
                        return (
                            <Dropdown.Item
                                href={item.path}
                                as={Link}
                                to={item.path}
                                key={index}
                            >
                                {item.title}
                            </Dropdown.Item>
                        )
                    })
                }
            </DropdownButton>
        </>
    )
}