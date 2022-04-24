import React from "react"
import { Link } from "react-router-dom";
import { Menu } from "./Menu";
import { ButtonGroup, Button } from 'react-bootstrap';
import logoImage from './../../assets/img/logo.svg'
import styles from './Header.module.scss'

const Header = () => {
    return (
      <div className={styles.header}>
        <div className={styles.logo}>
            <img src={logoImage} alt="" />
        </div>        
        <div className={styles.bar}>
            <ButtonGroup aria-label="Top bar">
                {Menu.map((item, idx) => (

                    <Button variant="secondary" key={`left_menu_item_${idx}`}>
                        <Link to={item.link}>{item.title}</Link>
                    </Button>
                ))}
            </ButtonGroup>
        </div>
      </div>
    );
  }
  
  export default Header;