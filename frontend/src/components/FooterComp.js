import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'




function FooterComp() {
  return (

    <footer className='footer'>
      <Container>
        <Row>
          <Col className='text-center py-3'> Copyright &copy; Magrafta-Mobile By Eldar Magrafta  </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default FooterComp;
