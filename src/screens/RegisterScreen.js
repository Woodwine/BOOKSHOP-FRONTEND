import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'


function RegisterScreen() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const userRegister = useSelector(state => state.userRegister)
    const { loading, userInfo, error } = userRegister

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password != confirmPassword) {
            setMessage('Пароли не совпадают!')
        } else {
            dispatch(register(username, email, password))
        }
    }

    return (
        <FormContainer>
            <h1>Регистрация</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}

            <Form onSubmit={submitHandler}>

                <Form.Group controlId='username' className='my-3'>
                    <Form.Label className='my-2 list-group_item fs-5'>Логин</Form.Label>
                    <Form.Control
                        required
                        type='username'
                        placeholder='Введите логин'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className='list-group_item'
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email' className='my-3'>
                    <Form.Label className='my-2 list-group_item fs-5'>Email</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='Введите адрес электронной почты'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='list-group_item'
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password' className='my-3'>
                    <Form.Label className='my-2 list-group_item fs-5'>Пароль</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Введите пароль'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='list-group_item'
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword' className='my-3'>
                    <Form.Label className='my-2 list-group_item fs-5'>Подтвердите пароль</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Введите пароль повторно'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className='list-group_item'
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='my-4 btn-lg'>
                    Регистрация
                </Button>

            </Form>

            <Row className='py-3'>
                <Col className='list-group_item'>
                    Уже есть аккаунт?
                    <Link className='list-group_item text-decoration-none fs-4'
                        to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        &ensp;Войти
                    </Link>
                </Col>
            </Row>

        </FormContainer>
    )
}

export default RegisterScreen
