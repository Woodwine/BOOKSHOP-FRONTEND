import React, { useEffect } from 'react'
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'


function CartScreen() {
    const history = useNavigate();
    const location = useLocation();
    const params = useParams();
    const bookID = params.id;
    const quantity = location.search ? Number(location.search.split('=')[1]) : 1;

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const dispatch = useDispatch();

    useEffect(() => {
        if (bookID) {
            dispatch(addToCart(bookID, quantity))
        }
    }, [dispatch, bookID, quantity])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history('/login?redirect=shipping')
    }

    return (
        <Row>
            <Col md={8}>
                <h1 className='my-3'>Корзина</h1>
                {cartItems.length === 0 ? (
                    <Message variant='primary'>
                        Ваша корзина пуста
                        <Link to='/' className='text-decoration-none'>
                            Вернуться на домашнюю страницу
                        </Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.book} >
                                <Row>
                                    <Col md={2} className='my-2'>
                                        <Image src={item.image} alt={item.title} fluid rounded />
                                    </Col>

                                    <Col md={3} className='my-3'>
                                        <Link to={`/book/${item.book}`} className='text-decoration-none text-reset'>{item.title}</Link>
                                    </Col>

                                    <Col md={2} className='list-group_item my-4'>
                                        {item.price} &#8381;
                                    </Col>

                                    <Col md={3} className='my-3'>
                                        <Form.Control
                                            as='select'
                                            value={item.quantity}
                                            onChange={(e) => dispatch(addToCart(item.book, Number(e.target.value)))}
                                            className='form-select'

                                        >
                                            {
                                                [...Array(item.count_in_stock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Col>

                                    <Col md={1}>
                                        <Button type='button'
                                            variant='light'
                                            className='my-3 mx-3'
                                            onClick={() => removeFromCartHandler(item.book)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}

                    </ListGroup>


                )}
            </Col>

            <Col md={4}>
                <Card className='my-3'>
                    <ListGroup variant='flush'>

                        <ListGroup.Item className='list-group_item'>
                            <h3>
                                Итого: &ensp;{cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}  &#8381;
                            </h3>

                            Товаров: &ensp;{cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                        </ListGroup.Item>

                        <ListGroup.Item className='list-group_item'>
                            <Button type='button'
                                className='btn-secondary btn-lg d-grid gap-2 col-12 mx-auto'
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                            >
                                Заказать
                            </Button>
                        </ListGroup.Item>

                    </ListGroup>
                </Card>
            </Col>
        </Row >
    )
}

export default CartScreen
