import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'


function ShippingScreen() {
    const history = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address);
    const [phone_number, setPhoneNumber] = useState(shippingAddress.phone_number);

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, phone_number }))
        history('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Доставка</h1>
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='address' className='my-3'>
                    <Form.Label className='my-2 list-group_item fs-5'>Адрес доставки</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Введите адрес доставки'
                        value={address ? address : ''}
                        onChange={(e) => setAddress(e.target.value)}
                        className='list-group_item'
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='phone_number' className='my-3'>
                    <Form.Label className='my-2 list-group_item fs-5'>Номер телефона</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Введите номер телефона'
                        value={phone_number ? phone_number : ''}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className='list-group_item'
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='my-4 btn-lg'>
                    Сохранить
                </Button>

            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
