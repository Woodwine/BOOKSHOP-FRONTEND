import React, { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'


function OrderScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, error, success } = orderCreate

    const cart = useSelector(state => state.cart)

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)
    cart.shippingPrice = (cart.itemsPrice <= 2000 ? 300 : 0).toFixed(2)
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice)).toFixed(2)

    if (!cart.paymentMethod) {
        navigate('/payment')
    }

    useEffect(() => {
        if (success) {
            navigate(`/order/${order.id}`)
            dispatch({ type: ORDER_CREATE_RESET })
        }
    }, [success, navigate, order, dispatch])

    const placeOrder = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            shippingPrice: cart.shippingPrice,
            totalPrice: cart.totalPrice,
        }))
    }

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
                        <ListGroup variant='flush' className='list-group_item'>
                            <ListGroup.Item>
                                <h2>Сумма заказа</h2>
                            </ListGroup.Item>

                            <ListGroup.Item className='list-group_item'>
                                <Row>
                                    <Col>Стоимость:</Col>

                                    <Col>{cart.itemsPrice} &#8381;</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item className='list-group_item'>
                                <Row>
                                    <Col>Стоимость доставки:</Col>

                                    <Col>{cart.shippingPrice} &#8381;</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item className='list-group_item'>
                                <Row>
                                    <Col>Полная стоимость заказа:</Col>

                                    <Col>{cart.totalPrice} &#8381;</Col>
                                </Row>
                            </ListGroup.Item>

                            {error && <ListGroup.Item ><Message variant='danger'>{error}</Message></ListGroup.Item>}

                            <ListGroup.Item className='list-group_item'>
                                <Button
                                    type='button'
                                    className='btn-block btn-secondary btn-lg d-grid gap-2 col-12 mx-auto'
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrder}
                                >
                                    Заказать
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default OrderScreen
