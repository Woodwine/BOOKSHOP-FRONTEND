import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails } from '../actions/orderActions'


function PlaceOrderScreen() {
    const params = useParams();
    const dispatch = useDispatch();

    const orderId = params.id

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails

    if (!loading && !error) {
        order.itemsPrice = order.ord_books.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)
    }

    useEffect(() => {
        if (!order || order.id !== Number(orderId)) {
            dispatch(getOrderDetails(orderId))
        }

    }, [order, orderId, dispatch])

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <div>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>

                        <ListGroup.Item>
                            <h2 className='mb-3'>Доставка</h2>
                            <p className='fs-5'>
                                <strong>Адрес доставки: &nbsp;&nbsp;</strong>
                                {order.delivery_address.address}
                            </p>
                            <p className='fs-5'>
                                <strong>Телефон: &nbsp;&nbsp;</strong>
                                {order.delivery_address.phone_number}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2 className='mb-3'>Оплата</h2>
                            <p className='fs-5'>
                                <strong>Способ оплаты: &nbsp;&nbsp;</strong>
                                {order.payment_method}
                            </p>
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
                                                        <Image src={item.image} alt={item.title} fluid rounded />
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
                                    <Col>Стоимость:</Col>

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


                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderScreen
