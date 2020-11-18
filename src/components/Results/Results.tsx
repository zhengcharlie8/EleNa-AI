import React from "react";
import { Row } from "react-bootstrap";

interface Props {
  distance: number;
  elevationGain: number;
}

const routePoints: Object[] = [];
const Results: React.FC<Props> = (props: Props) => {
  return (
    <div>
      <Row>
        <strong>Distance</strong>
        <input disabled value={props.distance} />
      </Row>
      <br />
      <Row>
        <strong>Elevation Gain</strong>
        <input disabled value={props.elevationGain} />
      </Row>
      <Row>
        {routePoints.map((location, idx) => (
          <div>{}</div>
        ))}
      </Row>
    </div>
  );
};

export default Results;
