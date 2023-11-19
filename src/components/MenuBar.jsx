import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Login from './Login'
import LoggedinMenu from './LoggedinMenu'
import Cookies from 'js-cookie'
import { APP_LOGO } from '../reducers/Utils'

export default function MenuBar() {
  return (
    <>
      <Navbar collapseOnSelect bg="info" expand="lg" fixed="top" className=''>
        <Container className='p-0'>
          <img src={APP_LOGO} alt='ksr'
            width='42.5' height='37.5' />
          <div
            style={{ fontWeight: 'bold' }}
            className="h1 mb-0 ps-3 me-auto ms-2"
          >
            <Link to='/ '
              className='text-decoration-none text-dark'
            >
              <div style={{
                fontSize: 18,
                letterSpacing: 2,
                paddingBottom: '3px'
              }}
              >
                K.S.Rangasamy College of Technology
              </div>
              <div style={{
                fontSize: 16.5,
                letterSpacing: 1.5
              }}><i>
                  Examinations Management System
                </i>
              </div>
            </Link>
          </div>

          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            style={{ border: 'none' }}
          />
          <Navbar.Collapse >
            <Nav className="ms-auto text-white text-bolder">

              {
                Cookies.get('authtoken') ? <LoggedinMenu /> : <Login />
              }

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}