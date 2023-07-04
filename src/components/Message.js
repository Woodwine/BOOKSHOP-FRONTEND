import React from 'react'
import { Alert } from 'react-bootstrap'

function Message({ variant, children }) {
    return (
        <Alert variant={variant} style={{
            display: 'flex',
            justifyContent: 'space-between',
        }}>
            {children}
        </Alert>
    )
}

export default Message
