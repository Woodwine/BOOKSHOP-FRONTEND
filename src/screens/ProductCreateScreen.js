import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { createBook } from '../actions/bookActions'
import { listPublishing } from '../actions/publishingActions'
import axios from 'axios'


function ProductCreateScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [author, setAuthor] = useState('');
    const [publishing, setPublishing] = useState('');
    const [publication_date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [count_in_stock, setCount] = useState('');
    const [uploading, setUploading] = useState(false);

    const bookCreate = useSelector(state => state.bookCreate)
    const { success, loading, error, book } = bookCreate

    const publishingList = useSelector(state => state.publishingList)
    const { loading: loadingPublishing, publishing: pubList, error: errorPublishing } = publishingList


    useEffect(() => {

        dispatch(listPublishing())

        if (success) {

            const formData = new FormData()
            formData.append('image', image)
            formData.append('book_id', book.id)


            try {
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                const { data } = axios.post('/api/v1/upload_image/', formData, config)

                setImage(data)
                setUploading(false)


            } catch (error) {
                setUploading(false)
            }

            navigate('/admin/booklist')
        }
    }, [navigate, success, dispatch])

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(createBook({
            title,
            author,
            publishing,
            publication_date,
            description,
            price,
            count_in_stock,
        }
        ))

    }

    return (
        <div>
            <Link to={'/admin/booklist'}>
                <Button variant='outline-secondary' style={{ padding: '10px 30px' }}>
                    <i className='fas fa-arrow-left'></i>
                </Button>
            </Link>

            <FormContainer>
                <h1>Новый товар</h1>
                {loading && <Loader />}

                {errorPublishing && <Message variant='danger'>{errorPublishing}</Message>}
                {loadingPublishing && <Loader />}

                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='title' className='my-3'>
                        <Form.Label className='my-2 list-group_item fs-5'>Название книги</Form.Label>
                        {error && error['title'] && error['title']
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
                        {error && error['image'] && error['image']
                            .map((err, index) => <Message variant='danger' key={index}>{err}</Message>)}

                        <Form.Control
                            type='file'
                            onChange={(e) => setImage(e.target.files[0])}
                            className='list-group_item'
                        >
                        </Form.Control>
                    </Form.Group>
                    {uploading && <Loader />}

                    <Form.Group controlId='author' className='my-3'>
                        <Form.Label className='my-2 list-group_item fs-5'>Автор</Form.Label>
                        {error && error['author'] && error['author']
                            .map((err, index) => <Message variant='danger' key={index}>{err}</Message>)}
                        <Form.Control
                            type='text'
                            placeholder='Введите имя автора'
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className='list-group_item'
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='publishing' className='my-3'>
                        <Form.Label className='my-2 list-group_item fs-5'>Издательство</Form.Label>
                        {error && error['publishing'] && error['publishing']
                            .map((err, index) => <Message variant='danger' key={index}>{err}</Message>)}
                        <Form.Control
                            as='select'
                            type='select'
                            value={publishing}
                            onChange={(e) => setPublishing(e.target.value)}
                            className='list-group_item'
                        >   <option>Выберите издательство</option>
                            {pubList.map((item) =>
                                (<option value={item.id} key={item.id}>{item.name}</option>)
                            )}

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='publication_date' className='my-3'>
                        <Form.Label className='my-2 list-group_item fs-5'>Дата выхода книги</Form.Label>
                        {error && error['publication_date'] && error['publication_date']
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
                        {error && error['description'] && error['description']
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
                        {error && error['price'] && error['price']
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
                        {error && error['count_in_stock'] && error['count_in_stock']
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
                        Создать
                    </Button>

                </Form>

            </FormContainer>
        </div>
    )
}

export default ProductCreateScreen
