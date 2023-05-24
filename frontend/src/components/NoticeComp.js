import React from 'react';
import { ListGroup } from 'react-bootstrap';

const NoticeComp = () => {
  return (
    <ListGroup.Item style={{ height: '290px', backgroundColor: '#F78585', color: '#272B30', fontWeight: 'bold', overflow: 'auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h3 className='text-center'>THIS IS A DEMO WEBSITE</h3>
        <strong>You can "pay" with PayPal using the following credentials:</strong><br/><br/>
        <p>
          <strong><u>Email:</u></strong> <br />
          <small>sb-qug4m5128755@personal.example.com</small>
          <br />
          <strong><u>Password:</u></strong> <br />
          <small>a/sA@o4G</small>
        </p>
      </div>
    </ListGroup.Item>
  );
};

export default NoticeComp;
