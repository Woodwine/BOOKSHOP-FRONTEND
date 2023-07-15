import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Book from '../components/Book'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listBooks } from '../actions/bookActions'
import { useNavigate, useLocation } from 'react-router-dom'



function HomeScreen() {
    const dispatch = useDispatch();
    const location = useLocation()
    const bookList = useSelector(state => state.bookList);
    const { error, loading, books } = bookList;
    let keyword = location.search

    console.log(keyword)

    useEffect(() => {
        dispatch(listBooks(keyword))

    }, [dispatch, keyword])

    return (
        <div>
            <h1>Кулинарные книги</h1>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    : <Row>
                        {books.map(book => (
                            <Col key={book.id} sm={12} md={6} lg={4} xl={3}>
                                <Book book={book} />
                            </Col>
                        ))}
                    </Row>
            }

        </div >
    )
}

export default HomeScreen
