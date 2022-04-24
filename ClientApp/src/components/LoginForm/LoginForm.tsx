import React, { useState } from "react"
import { Form, Button, Toast } from 'react-bootstrap';
import { useActions } from "../../hooks/useActions";
import { useLoginUserMutation } from "../../store/user/user.api";
import styles from './LoginForm.module.scss'

const LoginForm = () => {
    const [userName, setUserName] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [showToast, setShowToast] = useState<boolean>(false)
    const [err, setErr] = useState<any>()
    const toggleToast = () => setShowToast(!showToast)
   
    const {setUser} = useActions()
    const [loginUser] = useLoginUserMutation()
    const submit = (e: any) => {
        e.preventDefault()

        if (userName && password) {
            loginUser({ UserName: userName || "", Password: password || "" })
            .unwrap()
            .then((payload) => {
                setUser(payload)
            })
            .catch((error) => {
                setErr(error as any);
                setShowToast(true)
            })
        }
    }

    return (
        <Form className={styles.login} onSubmit={submit}>
            <Toast onClose={toggleToast} show={showToast} animation={false}>
                <Toast.Header>
                    <strong className="me-auto">Alert</strong>
                </Toast.Header>
                <Toast.Body>{err?.originalStatus} {err?.data}</Toast.Body>
            </Toast>
            <Form.Group className="mb-3" controlId="formBasicUserName">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(e: any) => setUserName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e: any) => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    );
  }
  
  export default LoginForm;