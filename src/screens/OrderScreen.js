import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card, Form } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, payOrder, statusOrder } from '../actions/orderActions'
import { ORDER_STATUS_RESET } from '../constants/orderConstants'


function PlaceOrderScreen() {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [status, setStatus] = useState('');

    const orderId = params.id

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success } = orderPay

    const orderStatus = useSelector(state => state.orderStatus)
    const { loading: loadingStatus, error: errorStatus, success: successStatus } = orderStatus

    if (!loading && !error) {
        order.itemsPrice = order.ord_books.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)
    }

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
        if (!order || order.id !== Number(orderId) || successStatus) {

            dispatch({ type: ORDER_STATUS_RESET })
            dispatch(getOrderDetails(orderId))
        }

    }, [order, orderId, dispatch, successStatus, navigate, userInfo])

    const successPaymentHandler = () => {
        dispatch(payOrder(orderId))
    }

    const statusHandler = () => {
        dispatch(statusOrder(orderId, status))
    }

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <div>
            <h1>Заказ: &nbsp;&nbsp;{order.id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>

                        <ListGroup.Item className='mb-3'></ListGroup.Item>

                        <ListGroup.Item>
                            <p className='fs-5'>
                                <strong>Дата заказа: &nbsp;&nbsp;</strong>
                                {order.order_date}
                            </p>

                            <p className='fs-5'>
                                <strong>Статус заказа: &nbsp;&nbsp;</strong>
                                {order.status}
                            </p>
                        </ListGroup.Item>

                        {order.delivery_address.map((item) => (
                            <ListGroup.Item>
                                <h2 className='mb-3'>Доставка</h2>

                                <p className='fs-5'>
                                    <strong>Имя: &nbsp;&nbsp;</strong>
                                    {order.customer.username}
                                </p>

                                <p className='fs-5'>
                                    <strong>Email: &nbsp;&nbsp;</strong>
                                    {order.customer.email}
                                </p>

                                <p className='fs-5'>
                                    <strong>Адрес доставки: &nbsp;&nbsp;</strong>
                                    {item.address}
                                </p>
                                <p className='fs-5'>
                                    <strong>Телефон: &nbsp;&nbsp;</strong>
                                    {item.phone_number}
                                </p>

                                {order.delivery_date ? (
                                    <Message variant='success'>Заказ доставлен {order.delivery_date}</Message>
                                ) : (
                                    <Message variant='warning'>Не доставлен</Message>
                                )}
                            </ListGroup.Item>
                        ))}

                        <ListGroup.Item>
                            <h2 className='mb-3'>Оплата</h2>
                            <p className='fs-5'>
                                <strong>Способ оплаты: &nbsp;&nbsp;</strong>
                                {order.payment_method}
                            </p>
                            {order.is_paid ? (
                                <Message variant='success'>Заказ оплачен &nbsp;&nbsp;&nbsp;&nbsp;{order.pay_date}</Message>
                            ) : (
                                <Message variant='warning'>Заказ не оплачен</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2 className='mb-3'>Товары</h2>
                            {order.ord_books.lenght === 0 ?
                                <Message variant='info'>Ваш заказ пустой</Message>
                                : (
                                    <ListGroup variant='flush'>
                                        {order.ord_books.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.book_image} alt={item.title} fluid rounded />
                                                    </Col>

                                                    <Col md={5}>
                                                        <Link to={`/book/${item.ord_book}`} className='text-decoration-none text-reset'>
                                                            {item.title}
                                                        </Link>
                                                    </Col>

                                                    <Col md={4}>
                                                        {item.quantity}&nbsp; x &nbsp; {item.price} &#8381; &nbsp; = &nbsp; {(item.quantity * item.price).toFixed(2)} &#8381;
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush' className='list-group_item'>
                            <ListGroup.Item>
                                <h2>Сумма заказа</h2>
                            </ListGroup.Item>

                            <ListGroup.Item className='list-group_item'>
                                <Row>
                                    <Col>Стоимость товаров:</Col>

                                    <Col>{order.itemsPrice} &#8381;</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item className='list-group_item'>
                                <Row>
                                    <Col>Стоимость доставки:</Col>

                                    <Col>{order.shipping_cost} &#8381;</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item className='list-group_item'>
                                <Row>
                                    <Col>Полная стоимость заказа:</Col>

                                    <Col>{order.total_cost} &#8381;</Col>
                                </Row>
                            </ListGroup.Item>

                            {userInfo.id === order.customer.id && !order.is_paid && (
                                <ListGroup.Item className='list-group_item'>
                                    {loadingPay && <Loader />}
                                    <Button type='button'
                                        className='btn-secondary btn-lg d-grid gap-2 col-12 mx-auto'
                                        onClick={successPaymentHandler}
                                    >
                                        Оплатить
                                    </Button>
                                </ListGroup.Item>
                            )}

                            {loadingStatus && <Loader />}
                            {errorStatus && <Message variant='danger'>{errorStatus}</Message>}
                            {userInfo && userInfo.is_admin && !order.delivery_date && (

                                <ListGroup.Item>

                                    <h2 className='my-2 list-group_item fs-5'>Статус заказа</h2>
                                    <Form.Control
                                        as='select'
                                        type='select'
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className='list-group_item my-3'>

                                        <option value='В работе' key='1'>В работе</option>
                                        <option value='Передан в службу доставки' key='2'>Передан в службу доставки</option>
                                        <option value='Доставлен' key='3'>Доставлен</option>
                                        <option value='Отменен' key='4'>Отменен</option>

                                    </Form.Control>

                                    <Button
                                        type='submit'
                                        variant='primary'
                                        className='btn-lg d-grid gap-2 col-12 mx-auto'
                                        onClick={statusHandler}
                                    >
                                        Сохранить статус
                                    </Button>
                                </ListGroup.Item>

                            )}

                        </ListGroup>
                    </Card >

                </Col >
            </Row >
        </div >
    )
}

export default PlaceOrderScreen
