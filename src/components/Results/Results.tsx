import React from "react";
import { Row } from "react-bootstrap";

import { Point } from "../App";

interface Props {
  distance: number;
  elevationGain: number;
  startAddress: string;
  endAddress: string;
  route: Point[];
}

const Results: React.FC<Props> = (props: Props) => {
  let routing = <div></div>;
  if (props.route.length !== 0) {
    routing = (
      <div>
        <Row>
          <span>- {props.startAddress}</span>
        </Row>
        {props.route.map((point, idx) => (
          <Row key={idx}>
            <span>- {point.name}</span>
          </Row>
        ))}
        <Row>
          <span>- {props.endAddress}</span>
        </Row>
      </div>
    );
  }
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
      <br />
      {routing}
    </div>
  );
};

export default Results;
