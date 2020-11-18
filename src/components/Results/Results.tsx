import React from "react";
import { Row } from "react-bootstrap";

const routePoints: Object[] = [];
const Results: React.FC = () => {
  return (
    <div>
      <Row>
        <strong>Distance</strong>
        <input disabled value="520" />
        <strong>Elevation</strong>
        <input disabled value="520" />
        {routePoints.map((location, idx) => (
          <div>{}</div>
        ))}
      </Row>
    </div>
  );
};

export default Results;
