import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

function Book({ book }) {

    return (
        <Card className='my-3 p-3 rounded'>
            <Link to={`/book/${book.id}`}>
                <Card.Img src={book.image} />
            </Link>
            <Card.Body>
                <Link to={`/book/${book.id}`} className='text-decoration-none text-reset'>
                    <Card.Title as='div'>
                        <strong>{book.title}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as='h3'>
                    {book.price} &#8381;
                </Card.Text>
                <Card.Text as='div'>
                    <Rating value={book.rating} reviews={book.reviews} color={'#f8e825'} />
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Book
