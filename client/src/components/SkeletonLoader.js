import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";

export default function SkeletonLoader() {
  return (
    <Card style={{ width: "28rem" }}>

      {/* Placeholder for the image */}
      <Placeholder animation="glow">
      <Placeholder
        xs={12}
        style={{ height: "286px" }}
      />
      </Placeholder>

      <Card.Body>
        <div style={{ textAlign: "end", marginRight: "1rem" }}>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Subtitle} animation="glow">
            <Placeholder xs={4} /> <br />
            <Placeholder xs={3} />
          </Placeholder>
        </div>
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{" "}
          <Placeholder xs={6} /> <Placeholder xs={8} />
        </Placeholder>
        <div className="d-grid gap-2">
          <Placeholder.Button variant="primary" xs={12} />
        </div>
      </Card.Body>
    </Card>
  );
}
