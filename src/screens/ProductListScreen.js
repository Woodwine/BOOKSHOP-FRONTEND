import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { listBooks, deleteBook } from '../actions/bookActions'


function ProductListScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();

    const bookList = useSelector(state => state.bookList)
    const { loading, error, books } = bookList

    const bookDelete = useSelector(state => state.bookDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = bookDelete

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    useEffect(() => {
        if (userInfo && userInfo.is_admin) {
            dispatch(listBooks())
        } else {
            navigate('/login')
        }
    }, [dispatch, navigate, userInfo, successDelete]
    )

    const deleteHandler = (id) => {
        if (window.confirm('Вы уверены, что хотите удалить данный товар?')) {
            dispatch(deleteBook(id))
        }
    }

    const createBookHandler = (book) => {
        // create
    }

    return (
        <div>
            <Row className='aline-items-center'>
                <Col>
                    <h1>Книги</h1>
                </Col>

                <Col className='text-end'>
                    <Button className='my-3' onClick={createBookHandler}>
                        <i className='fas fa-plus'></i> &nbsp;&nbsp;Добавить товар
                    </Button>
                </Col>
            </Row>

            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Table striped hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>НАЗВАНИЕ</th>
                            <th>ЦЕНА</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {books.map(book => (
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                <td>{book.title}</td>
                                <td>{book.price} &#8381;</td>
                                <td>
                                    <LinkContainer to={`/admin/booklist/${book.id}`}>
                                        <Button variant='outline-secondary' className='btn-sm'>
                                            <i className='fas fa-edit' ></i>
                                        </Button>
                                    </LinkContainer>
                                </td>
                                <td>
                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(book.id)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )
            }
        </div >
    )
}

export default ProductListScreen
