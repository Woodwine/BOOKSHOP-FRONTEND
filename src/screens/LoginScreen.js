import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'


function LoginScreen() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const userLogin = useSelector(state => state.userLogin)
    const { loading, userInfo, error } = userLogin

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(username, password))
    }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <FormContainer>
            <h1>Авторизация</h1>

            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}

            <Form onSubmit={submitHandler}>

                <Form.Group controlId='username' className='my-3'>
                    <Form.Label className='my-2 list-group_item fs-5'>Логин</Form.Label>
                    <Form.Control
                        type='username'
                        placeholder='Введите логин'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className='list-group_item'
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password' className='my-3'>
                    <Form.Label className='my-2 list-group_item fs-5'>Пароль</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Введите пароль'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='list-group_item'
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='my-4 btn-lg'>
                    Вход
                </Button>

            </Form>

            <Row className='py-3'>
                <Col className='list-group_item'>
                    Новый пользователь?
                    <Link className='list-group_item text-decoration-none fs-4'
                        to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        &ensp;Регистрация
                    </Link>
                </Col>
            </Row>
        </FormContainer >
    )
}

export default LoginScreen
