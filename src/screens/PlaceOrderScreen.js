import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'


function PlaceOrderScreen() {

    const cart = useSelector(state => state.cart)

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />

            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>

                        <ListGroup.Item>
                            <h2 className='mb-3'>Доставка</h2>
                            <p className='fs-5'>
                                <strong>Адрес доставки: &nbsp;&nbsp;</strong>
                                {cart.shippingAddress.address}
                            </p>
                            <p className='fs-5'>
                                <strong>Телефон: &nbsp;&nbsp;</strong>
                                {cart.shippingAddress.phone_number}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2 className='mb-3'>Оплата</h2>
                            <p className='fs-5'>
                                <strong>Способ оплаты: &nbsp;&nbsp;</strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2 className='mb-3'>Товары</h2>
                            {cart.cartItems.lenght === 0 ?
                                <Message variant='info'>Ваша корзина пуста</Message>
                                : (
                                    <ListGroup variant='flush'>
                                        {cart.cartItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.title} fluid rounded />
                                                    </Col>

                                                    <Col md={5}>
                                                        <Link to={`/book/${item.book}`} className='text-decoration-none text-reset'>
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
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Сумма заказа</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Количество:</Col>

                                    <Col>{cart.itemPrice}</Col>
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
