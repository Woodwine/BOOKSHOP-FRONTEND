import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'

function SearchBox() {
    let navigate = useNavigate();
    const location = useLocation();
    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()

        if (keyword) {
            navigate(`/?keyword=${keyword}`)
        } else {
            navigate(navigate(location.pathname))
        }
    }


    return (
        <Form className="d-flex ms-5" onSubmit={submitHandler} >
            <Form.Control
                type="text"
                name='q'
                placeholder="Искать"
                className="me-2"
                aria-label="Search"
                onChange={(e) => setKeyword(e.target.value)}
            />
            <Button variant="secondary" type='submit'>Искать</Button>
        </Form>
    )
}

export default SearchBox
