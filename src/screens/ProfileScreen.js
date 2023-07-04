import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'


function ProfileScreen() {
    const history = useNavigate();
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const userDetails = useSelector(state => state.userDetails)
    const { loading, user, error } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    useEffect(() => {
        if (!userInfo) {
            history('/login')
        } else {
            if (!user || !user.username || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails())
            } else {
                setUsername(user.username)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(updateUserProfile({
            'id': user.id,
            'username': username,
            'email': email,
        }))
    }


    return (
        <Row>
            <Col md={3}>
                <h2>Профиль</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}

                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='username' className='my-3'>
                        <Form.Label className='my-2 list-group_item fs-5'>Имя</Form.Label>
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

                    <Button type='submit' variant='primary' className='my-4 btn-lg'>
                        Изменить
                    </Button>

                </Form>
            </Col>

            <Col md={9}>
                <h2>Мои заказы</h2>
            </Col>
        </Row>
    )
}

export default ProfileScreen
