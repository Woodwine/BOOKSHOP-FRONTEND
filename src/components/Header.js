import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Container, Nav, Button, Form, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'

function Header() {
    const userLogin = useSelector(state => state.userLogin)

    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
            <Navbar expand="lg" bg='primary' variant='dark' collapseOnSelect className='py-3'>
                <Container>

                    <LinkContainer to='/'>
                        <Navbar.Brand>BookShop</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <LinkContainer to="/cart" className='fs-5 mx-2'>
                                <Nav.Link><i className='fas fa-shopping-cart'></i> Корзина</Nav.Link>
                            </LinkContainer>

                            {userInfo ? (
                                <NavDropdown title={userInfo.username} id='username' className='fs-5 mx-2'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Профиль</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>Выйти</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login" className='fs-5'>
                                    <Nav.Link><i className='fas fa-user'></i> Войти</Nav.Link>
                                </LinkContainer>)
                            }

                            {userInfo && userInfo.is_admin && (
                                <NavDropdown title='Admin' id='adminMenu' className='fs-5 mx-2'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Пользователи</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>Товары</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>Заказы</NavDropdown.Item>
                                    </LinkContainer>

                                </NavDropdown>
                            )}

                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="secondary">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header >
    )
}

export default Header
