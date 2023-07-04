import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, Card, Button, ListGroup, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listBookDetails } from '../actions/bookActions'



function BookScreen() {
    const history = useNavigate();
    const [quantity, setQuantity] = useState(1);

    const params = useParams();
    const dispatch = useDispatch();
    const bookDetails = useSelector(state => state.bookDetails);
    const { error, loading, book } = bookDetails;


    useEffect(() => {
        dispatch(listBookDetails(params.id));
    }, [dispatch, params])

    const addToCartHandler = () => {
        history(`/cart/${params.id}?quantity=${quantity}`)
    }

    return (
        <div>
            <Link to='/' className='btn btn-light btn-lg my-4'>Домашняя страница</Link>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Row>
                            <Col md={5}>
                                <Image src={book.image} alt={book.title} fluid />
                            </Col>

                            <Col md={4}>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item className='py-3'>
                                        <h3>{book.title}</h3>
                                    </ListGroup.Item>

                                    <ListGroup.Item className='list-group_item py-3'>
                                        <Rating value={book.rating} reviews={book.reviews} color={'#f8e825'} />
                                    </ListGroup.Item>

                                    <ListGroup.Item className='list-group_item py-3'>
                                        Цена: &nbsp; &nbsp;{book.price} &#8381;
                                    </ListGroup.Item>

                                    <ListGroup.Item className='list-group_item py-3'>
                                        {book.description}
                                    </ListGroup.Item>

                                    <ListGroup.Item className='list-group_item py-3'>
                                        Издательство: &nbsp;{book.publishing}
                                    </ListGroup.Item>

                                    <ListGroup.Item className='list-group_item py-3'>
                                        Автор: &nbsp;{book.author}
                                    </ListGroup.Item>

                                    <ListGroup.Item className='list-group_item py-3'>
                                        Дата публикации: &nbsp;{book.publication_date} г.
                                    </ListGroup.Item>

                                </ListGroup>
                            </Col>

                            <Col md={3}>
                                <Card>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item className='list-group_item'>
                                            <Row>
                                                <Col>Цена:</Col>
                                                <Col>{book.price} &#8381;</Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item className='list-group_item'>
                                            <Row>
                                                <Col>Статус</Col>
                                                <Col>В наличии</Col>
                                            </Row>
                                        </ListGroup.Item>

                                        {(book.count_in_stock) > 0 && (
                                            <ListGroup.Item className='list-group_item'>
                                                <Row>
                                                    <Col>Колличество</Col>
                                                    <Col className='my-1'>
                                                        <Form.Control
                                                            as='select'
                                                            value={quantity}
                                                            onChange={(e) => setQuantity(e.target.value)}
                                                            className='form-select'

                                                        >
                                                            {
                                                                [...Array(book.count_in_stock).keys()].map((x) => (
                                                                    <option key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                    </option>
                                                                ))
                                                            }
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )}

                                        <ListGroup.Item>
                                            <Button
                                                onClick={addToCartHandler}
                                                className='btn-lg d-grid gap-2 col-12 mx-auto'
                                                type='button'>
                                                Добавить в корзину
                                            </Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                    )
            }

        </div>
    )
}

export default BookScreen
