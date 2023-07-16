import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button } from 'react-bootstrap'
import Book from '../components/Book'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listBooks } from '../actions/bookActions'
import { useLocation } from 'react-router-dom'
import { usePagination } from '../hooks/usePagination'



function HomeScreen() {
    const dispatch = useDispatch();
    const location = useLocation()
    const bookList = useSelector(state => state.bookList);
    const { error, loading, books } = bookList;
    let keyword = location.search

    const {
        firstContentIndex,
        lastContentIndex,
        nextPage,
        prevPage,
        page,
        setPage,
        totalPages,
    } = usePagination({
        contentPerPage: 8,
        count: books.length,
    });


    useEffect(() => {
        dispatch(listBooks(keyword))

    }, [dispatch, keyword])

    return (
        <div>
            <h1>Кулинарные книги</h1>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    : <Row>
                        {books
                            .slice(firstContentIndex, lastContentIndex)
                            .map(book => (
                                <Col key={book.id} sm={12} md={6} lg={4} xl={3}>
                                    <Book book={book} />
                                </Col>
                            ))}
                    </Row>
            }
            <div className='d-flex justify-content-center my-4'>
                <ul className='pagination'>
                    <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                        <Button onClick={prevPage} className="page-link">
                            &larr;
                        </Button>
                    </li>

                    {[...Array(totalPages).keys()].map((el) => (
                        <li className="page-item">
                            <Button
                                onClick={() => setPage(el + 1)}
                                key={el}
                                className={`page-link ${page === el + 1 ? "active" : ""}`}
                            >
                                {el + 1}
                            </Button>
                        </li>
                    ))}

                    <li className={`page-item ${page === totalPages ? "disabled" : ""}`} >
                        <Button onClick={nextPage} className="page-link">
                            &rarr;
                        </Button>
                    </li>
                </ul>
            </div>

        </div >
    )
}

export default HomeScreen
