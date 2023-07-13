import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { listOrders } from '../actions/orderActions'


function OrderListScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (userInfo && userInfo.is_admin) {
            dispatch(listOrders())
        } else {
            navigate('/login')
        }
    }, [dispatch, navigate, userInfo]
    )

    return (
        <div>
            <h1>Заказы</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Table striped hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>ЗАКАЗЧИК</th>
                            <th>ДАТА ЗАКАЗА</th>
                            <th>ОПЛАЧЕН</th>
                            <th>СТАТУС</th>
                            <th>ОБЩАЯ СТОИМОСТЬ</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.customer && order.customer.username}</td>
                                <td>{order.order_date}</td>
                                <td>{order.is_paid ?
                                    order.pay_date
                                    : (<i className='fas fa-check' style={{ color: 'red' }}></i>)}</td>
                                <td>{order.status}</td>
                                <td>{order.total_cost} &#8381;</td>
                                <td>
                                    <LinkContainer to={`/order/${order.id}`}>
                                        <Button variant='outline-secondary' className='btn-sm me-4'>
                                            Детали заказа
                                        </Button>
                                    </LinkContainer>

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

export default OrderListScreen
