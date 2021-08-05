import React from 'react'
import {Row,Col,Card,Button} from 'react-bootstrap';

const Todo = ({id,title,description,isPinned,deleteTodo}) => {
    const [showDetails,setShowDetails] = React.useState(false)
    return (
        <Card style={{width:'60%',margin:'10px auto',}}>
            {isPinned && <Card.Header>Pinned</Card.Header>}
            <Card.Body>
                <Row>
                    <Col md={11}><Card.Title>{title}</Card.Title></Col>
                    <Col md={1}>
                        <button type="button" onClick={() => deleteTodo(id)}>
                            <i className="fas fa-trash"></i>
                        </button>
                    </Col>
                </Row>
                <Card.Text>
                {!showDetails ? `${description.substring(0,10)}...`: description}
                </Card.Text>
                <Button variant="secondary" onClick={() => {
                    setShowDetails(!showDetails)
                }}>{showDetails ? 'Hide Details' : 'View Details'}</Button>
            </Card.Body>
        </Card>
    )
}

export default Todo
