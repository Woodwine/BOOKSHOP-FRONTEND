import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { myOrdersList } from '../actions/orderActions'


function ProfileScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const userDetails = useSelector(state => state.userDetails)
    const { loading, user, error } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success, error: errorUpdate } = userUpdateProfile

    const orderMyList = useSelector(state => state.orderMyList)
    const { loading: loadingOrders, error: errorOrders, orders } = orderMyList

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            if (!user || !user.username || success || userInfo.id !== user.id) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails(userInfo.id))
                dispatch(myOrdersList())
            } else {
                setUsername(user.username)
                setEmail(user.email)
            }
        }
    }, [dispatch, navigate, userInfo, user, success])

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
                {errorUpdate && errorUpdate.map((err, index) => <Message variant='danger' key={index}>{err}</Message>)}
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
            {!userInfo.is_admin && (
                <Col md={9}>
                    <h2>Мои заказы</h2>
                    {loadingOrders ? (
                        <Loader />
                    ) : errorOrders ? (
                        <Message variant='danger'>{error}</Message>
                    ) : (
                        <Table striped responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>Заказ</th>
                                    <th>Дата заказа</th>
                                    <th>Сумма заказа</th>
                                    <th>Оплачен</th>
                                    <th>Статус заказа</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((item) => (
                                    <tr key={item.id}>
                                        <th>&nbsp;&nbsp;{item.id}</th>
                                        <th>&nbsp;{item.order_date.substring(0, 8)}</th>
                                        <th>&nbsp;{item.total_cost} &#8381;</th>
                                        <th>&nbsp;{item.is_paid ? item.pay_date.substring(0, 8) : (
                                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                                        )}</th>
                                        <th>&nbsp;{item.status}</th>
                                        <th>
                                            <LinkContainer to={`/order/${item.id}`}>
                                                <Button variant='outline-primary' className='btn-sm'>Детали заказа</Button>
                                            </LinkContainer>
                                        </th>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Col>
            )}
        </Row>
    )
}

export default ProfileScreen
