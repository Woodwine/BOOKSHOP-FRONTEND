import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'


function CheckoutSteps({ step1, step2, step3, step4 }) {
    return (
        <Nav className='justify-content-center mb-4'>

            <Nav.Item className='fs-5'>
                {step1 ? (
                    <LinkContainer to='/login'>
                        <Nav.Link>Login</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Login</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item className='fs-5'>
                {step2 ? (
                    <LinkContainer to='/shipping'>
                        <Nav.Link>Доставка</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Доставка</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item className='fs-5'>
                {step3 ? (
                    <LinkContainer to='/payment'>
                        <Nav.Link>Оплата</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Оплата</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item className='fs-5'>
                {step4 ? (
                    <LinkContainer to='/placeorder'>
                        <Nav.Link>Разместить заказ</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Разместить заказ</Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    )
}

export default CheckoutSteps
