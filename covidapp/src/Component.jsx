import React from "react";
import Card from 'react-bootstrap/Card';


const Component = (props) => {
  return (
    <>
      <div className='d-flex p-3 inforcard' >
      <Card style={{ width: '18rem', height:'12rem' }} className="mt-3 text-center card_bg">
        <Card.Body>
          <Card.Title className='title'>{props.text}</Card.Title>
          <Card.Text >{props.value}</Card.Text>
        </Card.Body>
      </Card>
      </div>
    </>
  );
}

export default Component;