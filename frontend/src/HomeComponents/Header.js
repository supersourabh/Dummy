import React from 'react';
import {Navbar , Nav , NavDropdown} from "react-bootstrap";
import { useSelector } from 'react-redux';
import SignOut from './SignOut';

export default function Header(props) {


    const studentLogin = useSelector(state => state.studentLogin)
    const{studentInfo}=studentLogin;



    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">UVCE Study Support</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                <NavDropdown  title="Developer Team" id="collasible-nav-dropdown">
                    <NavDropdown.Item  onClick={ (e) => window.open("https://wa.me/916362579248") } ><i style={{color : "green"}} className="fab fa-whatsapp" aria-hidden="true"></i> S K Sourabh</NavDropdown.Item>
                    <NavDropdown.Item  onClick={ (e) => window.open("https://www.instagram.com/d_e_e_p__s_y_n_c/") } ><i style={{color : "red"}} className="fab fa-instagram" aria-hidden="true"></i> d_e_e_p__s_y_n_c</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown  title=" Material Access" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/material"><i style={{color:"green"}} class="fas fa-book-reader"></i>  Study Material</NavDropdown.Item>
                    <NavDropdown.Item href="/syllabus"><i style={{color:"green"}} class="fas fa-clipboard"></i>  Syllabus and Timetable</NavDropdown.Item>
                    <NavDropdown.Item href="/ExamRelative"><i style={{color:"green"}} class="fas fa-user-graduate"></i>  QP's and Results</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Connect" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/connect/crs">CR's</NavDropdown.Item>
                    <NavDropdown.Item href="/connect/members">Members</NavDropdown.Item>
                    <NavDropdown.Item href="/connect/problems">Complent Box</NavDropdown.Item>
                    <NavDropdown.Item href="https://www.facebook.com/UVCEPlacements/"> Placements</NavDropdown.Item>
                </NavDropdown>
                </Nav>
                <Nav>
                    {
                        studentInfo &&studentInfo.isAdmin && 
                        <NavDropdown title="Admin" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/admin/memberAdd">Member Add</NavDropdown.Item>
                            <NavDropdown.Item href="/admin/problems">Problems</NavDropdown.Item>
                            <NavDropdown.Item href="/admin/list">Information</NavDropdown.Item>
                        </NavDropdown>
                    }
                    {
                        studentInfo &&studentInfo.cr && 
                        <NavDropdown title="Upload" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/cr/material">Study Material upload</NavDropdown.Item>
                            <NavDropdown.Item href="/cr/timetable">Timetable and Syllabus</NavDropdown.Item>
                            <NavDropdown.Item href="/cr/qps">QP's and Results</NavDropdown.Item>
                        </NavDropdown>
                    }
                    <Nav.Link href="/">{studentInfo?<b style={{ textTransform : "uppercase",color: "#fff"}}>{studentInfo.name}</b>:"Login"}</Nav.Link>
                    
                    {studentInfo && <Nav.Link href="/"> <SignOut/> </Nav.Link>}
                    
                    <Nav.Link eventKey={2} href="/signup">
                        SignUp
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
