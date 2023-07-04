import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions'


function PaymentScreen() {
    const history = useNavigate();
    const dispatch = useDispatch();

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if (!shippingAddress.address) {
        history('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />

            <Form onSubmit={submitHandler}>

                <Form.Group>
                    <Form.Label as='legend' className='py-2'>
                        Выбрать способ оплаты
                    </Form.Label>

                    <Col className='py-2'>
                        <Form.Check
                            type='radio'
                            label='PayPal or Credit Card'
                            id='paypal'
                            name='paymentMethod'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                        </Form.Check>
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary' className='my-3'>
                    Продолжить
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen