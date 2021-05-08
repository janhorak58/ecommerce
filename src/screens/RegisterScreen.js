import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import {register}  from '../actions/userActions'

function RegisterScreen  ({location, history})  {
    const [firstname, setFirstname] = useState('')
    const [secondname, setSecondname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : "/"

    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo } = userRegister

    useEffect(() => {
        if (userInfo){
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password != confirmPassword) {
            setMessage('The passwords are not the same...')
        } else {
        const name = firstname + " " + secondname
        dispatch(register(name, email, password))
        }
    }

    return (
        <FormContainer>
                <h1>Register</h1>
                {message && <Message>{message}</Message>}
                {error && <Message>{error}</Message>}
                {loading ? (<Loader></Loader>):(
                <Form onSubmit={submitHandler}>
                    <Row>
                    <Col>
                    <Form.Group controlId = 'firstname'>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control required type="text" placeholder = "Enter your First Name" value= {firstname} onChange={(e => setFirstname(e.target.value))}></Form.Control>
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId = 'secondname'>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control required type="text" placeholder = "Enter your Last Name" value= {secondname} onChange={(e => setSecondname(e.target.value))}></Form.Control>
                    </Form.Group>
                    </Col>
                    </Row>
                    <Form.Group controlId = 'email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control required type="email" placeholder = "Enter your Email" value= {email} onChange={(e => setEmail(e.target.value))}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId = 'password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password" placeholder = "Enter your Password" value= {password} onChange={(e => setPassword(e.target.value))}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId = 'confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control required type="password" placeholder = "Retype your Password" value= {confirmPassword} onChange={(e => setConfirmPassword(e.target.value))}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Button className="btn btn-block" type="submit" variant = "primary">Register</Button>
                    </Form.Group>
                </Form>
                )}
                
                <Row className="py-3">
                    <Col>
                        Already have an account? <Link to = {redirect ? `/login?redirect=${redirect}` : '/login'}>Log In</Link>
                    </Col>
                </Row>
        </FormContainer>
    )
}

export default RegisterScreen
