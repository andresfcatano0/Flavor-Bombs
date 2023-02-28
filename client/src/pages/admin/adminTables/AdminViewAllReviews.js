import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import AdminReviewTable from "../AdminReviewTable";
import AdminNavLeftPane from "../../../components/navbar/AdminNavLeftPane";

export default function AdminViewAllReviews({allReviews, getAllReviews}) {
  return (
    <Container fluid className="mt-3">
      {/* Left Pane - Menu */}
      <Row>
        <Col>
          <AdminNavLeftPane />
        </Col>

        {/* Right Pane - Content */}
        <Col xs={10}>
          <Row>
            <Col>
              <AdminReviewTable allReviews={allReviews} getAllReviews={getAllReviews}/>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
