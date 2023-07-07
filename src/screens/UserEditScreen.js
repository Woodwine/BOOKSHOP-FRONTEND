import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../actions/userActions'


function UserEditScreen() {
    const params = useParams();
    // const navigate = useNavigate();
    const dispatch = useDispatch();

    const userId = params.id

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [is_admin, setAdmin] = useState(false);


    const userDetails = useSelector(state => state.userDetails)
    const { loading, user, error } = userDetails

    useEffect(() => {
        console.log(user, userId)
        if ((!user) || (user.id !== Number(userId))) {

            dispatch(getUserDetails(userId))
        } else {
            setUsername(user.username);
            setEmail(user.email);
            setAdmin(user.is_admin);
        }
    }, [dispatch, user, userId])

    const submitHandler = (e) => {
        e.preventDefault()
    }

    return (
        <div>
            <Link to={'/admin/userlist'}>
                <Button variant='outline-secondary' style={{ padding: '10px 30px' }}>
                    <i className='fas fa-arrow-left'></i>
                </Button>
            </Link>


            <FormContainer>
                <h1>Редактировать профиль</h1>

                {loading ?
                    (<Loader />)
                    : error ? (
                        <Message variant='danger'></Message>
                    ) : (
                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId='username' className='my-3'>
                                <Form.Label className='my-2 list-group_item fs-5'>Логин</Form.Label>
                                <Form.Control
                                    type='username'
                                    placeholder='Введите логин'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className='list-group_item'
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='email' className='my-3'>
                                <Form.Label className='my-2 list-group_item fs-5'>Email</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Введите адрес электронной почты'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='list-group_item'
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='is_admin' className='my-3'>
                                <Form.Check
                                    type='checkbox'
                                    label='Админ'
                                    checked={is_admin}
                                    onChange={(e) => setAdmin(e.target.checked)}
                                    className='list-group_item'
                                >
                                </Form.Check>
                            </Form.Group>

                            <Button type='submit' variant='primary' className='my-4 btn-lg'>
                                Сохранить изменения
                            </Button>

                        </Form>
                    )}
            </FormContainer>
        </div>
    )
}

export default UserEditScreen
