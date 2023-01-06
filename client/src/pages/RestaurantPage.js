import React, { useEffect, useState } from 'react';
import RestaurantCard from '../components/RestaurantCard';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function RestaurantPage() {

  return (
    <>
      <h1 className="text-center mb-4">Restaurants</h1>
      <Container>
        <Row className="mb-4 justify-content-md-center">
          <Col md="auto">
            <RestaurantCard />
          </Col>
        </Row>
        {/* <Row className="mb-4 justify-content-md-center">
          <Col md="auto">
            <RestaurantCard />
          </Col>
        </Row>
        <Row className="mb-4 justify-content-md-center">
          <Col md="auto">
            <RestaurantCard />
          </Col>
        </Row> */}
      </Container>
    </>
  );
}
