import React from "react"
import { Link } from "react-router-dom";
import { Menu } from "./Menu";
import { Nav, Navbar, Container } from 'react-bootstrap';
import logoImage from './../../assets/img/logo.svg'
import styles from './Header.module.scss'

const Header = () => {
    return (
        <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="/"><div className={styles.logo}><img src={logoImage} alt="" /></div></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                {Menu.map((item, idx) => (

                <Link key={`left_menu_item_${idx}`} className="nav-link" to={item.link}>{item.title}</Link>
                ))}
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
  }
  
  export default Header;