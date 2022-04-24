import React from "react"
import { Form } from 'react-bootstrap';
import { IUser } from './../../store/user/user.types'
import { useTypedSelector } from "../../hooks/useTypedSelector";
import styles from './AccountDetails.module.scss'

const AccountDetails = () => {
    const {activeUser} = useTypedSelector(state => state)

    return (
        <Form className={styles.details}>
        {
            Object.keys(activeUser.user).map((item, idx) => (
                <Form.Group className="mb-3" key={`user_detail_${idx}`}>
                    <Form.Label>{item}:</Form.Label>
                    <Form.Control type="text" value={activeUser.user[item as keyof IUser]} readOnly={true} />
                </Form.Group>
            ))
        }
        </Form>
    );
  }
  
  export default AccountDetails;