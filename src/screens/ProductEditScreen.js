import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import {
    listBookDetails,
    updateBook,
} from '../actions/bookActions'
import { listPublishing } from '../actions/publishingActions'
import { BOOK_UPDATE_RESET } from '../constants/bookConstants'


function ProductEditScreen() {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const bookId = params.id

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [author, setAuthor] = useState('');
    const [publishing, setPublishing] = useState('');
    const [publication_date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [count_in_stock, setCount] = useState('');
    const [uploading, setUploading] = useState(false);


    const bookDetails = useSelector(state => state.bookDetails)
    const { loading, book, error } = bookDetails

    const bookUpdate = useSelector(state => state.bookUpdate)
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = bookUpdate

    const publishingList = useSelector(state => state.publishingList)
    const { loading: loadingPublishing, publishing: pubList, error: errorPublishing } = publishingList

    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: BOOK_UPDATE_RESET })
            navigate('/admin/booklist')
        } else {
            if ((!book) || (book.id !== Number(bookId))) {
                dispatch(listBookDetails(bookId))
                dispatch(listPublishing())
            } else {
                setTitle(book.title);
                setImage(book.image);
                setAuthor(book.author);
                setPublishing(book.publishing);
                setDate(book.publication_date);
                setDescription(book.description);
                setPrice(book.price);
                setCount(book.count_in_stock);
            }
        }


    }, [book, bookId, navigate, dispatch, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateBook({
            id: bookId,
            title,
            author,
            publishing: publishing.id,
            publication_date,
            description,
            price,
            count_in_stock,
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('book_id', bookId)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post('/api/v1/upload_image/', formData, config)

            setImage(data)
            setUploading(false)


        } catch (error) {
            setUploading(false)
        }
    }

    return (
        <div>
            <Link to={'/admin/booklist'}>
                <Button variant='outline-secondary' style={{ padding: '10px 30px' }}>
                    <i className='fas fa-arrow-left'></i>
                </Button>
            </Link>


            <FormContainer>
                <h1>Редактировать товар</h1>

                {loadingUpdate && <Loader />}

                {loadingPublishing && <Loader />}
                {errorPublishing && <Message variant='danger'>{errorPublishing}</Message>}

                {loading ?
                    (<Loader />)
                    : error ? (
                        <Message variant='danger'>{error.message}</Message>
                    ) : (
                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId='title' className='my-3'>
                                <Form.Label className='my-2 list-group_item fs-5'>Название книги</Form.Label>
                                {errorUpdate && errorUpdate['title'] && errorUpdate['title']
                                    .map((err, index) => <Message variant='danger' key={index}>{err}</Message>)}
                                <Form.Control
                                    type='text'
                                    placeholder='Введите название книги'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className='list-group_item'
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='image' className='my-3'>
                                <Form.Label className='my-2 list-group_item fs-5'>Фотография</Form.Label>
                                {errorUpdate && errorUpdate['image'] && errorUpdate['image']
                                    .map((err, index) => <Message variant='danger' key={index}>{err}</Message>)}
                                <Form.Control
                                    type='text'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    className='list-group_item'
                                >
                                </Form.Control>
                                <Form.Control
                                    type='file'
                                    onChange={uploadFileHandler}
                                    className='list-group_item'
                                >
                                </Form.Control>
                            </Form.Group>
                            {uploading && <Loader />}

                            <Form.Group controlId='author' className='my-3'>
                                <Form.Label className='my-2 list-group_item fs-5'>Автор</Form.Label>
                                {errorUpdate && errorUpdate['author'] && errorUpdate['author']
                                    .map((err, index) => <Message variant='danger' key={index}>{err}</Message>)}
                                <Form.Control
                                    type='text'
                                    placeholder='Введите автора книги'
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    className='list-group_item'
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='publishing' className='my-3'>
                                <Form.Label className='my-2 list-group_item fs-5'>Издательство</Form.Label>
                                {errorUpdate && errorUpdate['publishing'] && errorUpdate['publishing']
                                    .map((err, index) => <Message variant='danger' key={index}>{err}</Message>)}
                                <Form.Control
                                    as='select'
                                    type='select'
                                    value={publishing.id}
                                    onChange={(e) => setPublishing(pubList.find(item => item.id === Number(e.target.value)))}
                                    className='list-group_item'
                                >
                                    {pubList.map((item) =>
                                        (<option value={item.id} key={item.id}>{item.name}</option>)
                                    )}

                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='publication_date' className='my-3'>
                                <Form.Label className='my-2 list-group_item fs-5'>Дата выхода книги</Form.Label>
                                {errorUpdate && errorUpdate['publication_date'] && errorUpdate['publication_date']
                                    .map((err, index) => <Message variant='danger' key={index}>{err}</Message>)}
                                <Form.Control
                                    type='number'
                                    placeholder='Введите название книги'
                                    value={publication_date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className='list-group_item'
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='description' className='my-3'>
                                <Form.Label className='my-2 list-group_item fs-5'>Описание</Form.Label>
                                {errorUpdate && errorUpdate['description'] && errorUpdate['description']
                                    .map((err, index) => <Message variant='danger' key={index}>{err}</Message>)}
                                <Form.Control
                                    as='textarea'
                                    rows={5}
                                    placeholder='Введите описание книги'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className='list-group_item'
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='price' className='my-3'>
                                <Form.Label className='my-2 list-group_item fs-5'>Цена</Form.Label>
                                {errorUpdate && errorUpdate['price'] && errorUpdate['price']
                                    .map((err, index) => <Message variant='danger' key={index}>{err}</Message>)}
                                <Form.Control
                                    type='number'
                                    placeholder='Введите цену книги'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className='list-group_item'
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='count_in_stock' className='my-3'>
                                <Form.Label className='my-2 list-group_item fs-5'>Остаток на складе</Form.Label>
                                {errorUpdate && errorUpdate['count_in_stock'] && errorUpdate['count_in_stock']
                                    .map((err, index) => <Message variant='danger' key={index}>{err}</Message>)}
                                <Form.Control
                                    type='text'
                                    placeholder='Введите количество'
                                    value={count_in_stock}
                                    onChange={(e) => setCount(e.target.value)}
                                    className='list-group_item'
                                >
                                </Form.Control>
                            </Form.Group>



                            <Button type='submit' variant='primary' className='my-4 btn-lg'>
                                Сохранить изменения
                            </Button>

                        </Form>
                    )}
            </FormContainer>
        </div >
    )
}

export default ProductEditScreen
