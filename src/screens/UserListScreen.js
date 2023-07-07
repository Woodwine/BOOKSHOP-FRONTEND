import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers, deleteUser } from '../actions/userActions'


function UserListScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect(() => {
        if (userInfo && userInfo.is_admin) {
            dispatch(listUsers())
        } else {
            navigate('/login')
        }
    }, [dispatch, navigate, userInfo, successDelete]
    )

    const deleteHandler = (id) => {
        if (window.confirm('Вы уверены, что хотите удалить данного пользователя?')) {
            dispatch(deleteUser(id))
        }
    }

    return (
        <div>
            <h1>Пользователи</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Table striped hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>ЛОГИН</th>
                            <th>ПОЧТА</th>
                            <th>АДМИН</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.is_admin ?
                                    (<i className='fas fa-check' style={{ color: 'green' }}></i>)
                                    : (<i className='fas fa-check' style={{ color: 'red' }}></i>)}</td>
                                <td>
                                    <LinkContainer to={`/admin/userlist/${user.id}`}>
                                        <Button variant='outline-secondary' className='btn-sm me-4'>
                                            <i className='fas fa-edit' ></i>
                                        </Button>
                                    </LinkContainer>

                                    <Button variant='danger' className='btn-sm ms-4' onClick={() => deleteHandler(user.id)}>
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

export default UserListScreen
