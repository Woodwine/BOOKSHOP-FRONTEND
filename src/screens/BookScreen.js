import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, Card, Button, ListGroup, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listBookDetails, createBookReview } from '../actions/bookActions'
import { BOOK_CREATE_REVIEW_RESET } from '../constants/bookConstants'



function BookScreen() {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const bookDetails = useSelector(state => state.bookDetails);
    const { error, loading, book } = bookDetails;

    const bookReviewCreate = useSelector(state => state.bookReviewCreate);
    const { error: errorReview, loading: loadingReview, success: successReview } = bookReviewCreate;


    useEffect(() => {
        if (successReview) {
            setRating(0)
            setComment('')
            dispatch({ type: BOOK_CREATE_REVIEW_RESET })
        }

        dispatch(listBookDetails(params.id));
    }, [dispatch, params, successReview])

    const addToCartHandler = () => {
        navigate(`/cart/${params.id}?quantity=${quantity}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        console.log(book.id, rating, userInfo.id, comment)
        dispatch(createBookReview({
            book: book.id,
            rating: Number(rating),
            comment,
        }
        ))
    }

    return (
        <div>
            <Link to='/' className='btn btn-light btn-lg my-4'>Домашняя страница</Link>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    : (<div>
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
                                        Издательство: &nbsp;{book.publishing ? book.publishing.name : null}
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
                                            {userInfo && userInfo.is_admin ? (
                                                <Button
                                                    onClick={addToCartHandler}
                                                    className='btn-lg d-grid gap-2 col-12 mx-auto'
                                                    type='button'
                                                    disabled
                                                >
                                                    Добавить в корзину
                                                </Button>
                                            ) : (
                                                <Button
                                                    onClick={addToCartHandler}
                                                    className='btn-lg d-grid gap-2 col-12 mx-auto'
                                                    type='button'
                                                >
                                                    Добавить в корзину
                                                </Button>
                                            )}

                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>

                        <Row className='my-4'>
                            <Col md={5}>

                                <h4>Отзывы</h4>
                                <hr></hr>
                                {book.reviews === 0 && <Message variant='primary'>Нет отзывов</Message>}

                                <ListGroup variant='flush'>
                                    {book && book.reviews > 0 &&
                                        book.book_comments.map((comment) => (
                                            <ListGroup.Item key={comment.id}>
                                                <h5><strong>{comment.comment_author}</strong>&nbsp; &nbsp; &nbsp; {comment.date}</h5>
                                                <Rating value={comment.rating} color='#f8e825'></Rating>
                                                <h5 className='my-2'>{comment.comment}</h5>
                                            </ListGroup.Item>
                                        ))
                                    }

                                </ListGroup>
                                <hr></hr>

                                <ListGroup.Item>
                                    {loadingReview && <Loader />}
                                    {successReview && <Message variant='success'>Отзыв отправлен</Message>}
                                    {errorReview && <Message variant='danger'>{errorReview}</Message>}

                                    {userInfo ? (
                                        (book.reviews === 0 || (book.book_comments && !book.book_comments.find(item => item.comment_author === userInfo.username))) && (

                                            <Form onSubmit={submitHandler}>
                                                <h4>Оставить отзыв</h4>
                                                <Form.Group controlId='rating' className='mb-4'>
                                                    <Form.Label>Рейтинг</Form.Label>
                                                    <Form.Control
                                                        as='select'
                                                        value={rating}
                                                        onChange={(e) => setRating(e.target.value)}
                                                    >
                                                        <option value=''>Выберите рейтинг...</option>
                                                        <option value='1'>1 - Очень плохо</option>
                                                        <option value='2'>2 - Плохо</option>
                                                        <option value='3'>3 - Удовлетворительно</option>
                                                        <option value='4'>4 - Хорошо</option>
                                                        <option value='5'>5 - Великолепно</option>
                                                    </Form.Control>

                                                </Form.Group>

                                                <Form.Group controlId='comment' className='my-4'>
                                                    <Form.Label>Отзыв</Form.Label>
                                                    <Form.Control
                                                        as='textarea'
                                                        rows={5}
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                    >

                                                    </Form.Control>
                                                </Form.Group>

                                                <Button
                                                    disabled={loadingReview}
                                                    type='submit'
                                                    variant='primary'
                                                >
                                                    Отправить отзыв
                                                </Button>

                                            </Form>)
                                    ) : (
                                        <div>
                                            <h4>Оставить отзыв</h4>
                                            <Message variant='secondary'>Пожалуйста войдите чтоб оставить отзыв о товаре<Link to={'/login'}>Войти</Link></Message>
                                        </div>

                                    )}
                                </ListGroup.Item>

                            </Col>
                        </Row>
                    </div>
                    )
            }

        </div>
    )
}

export default BookScreen
