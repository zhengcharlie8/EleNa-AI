import React from "react";
import { Row } from "react-bootstrap";

interface Props {
  distance: number;
  elevationGain: number;
  startAddress: string;
  endAddress: string;
  route: number[][];
}

const Results: React.FC<Props> = (props: Props) => {
  let routing = <div></div>;
  if (props.route !== undefined && props.route.length !== 0) {
    routing = (
      <div>
        <Row>
          <span><strong>- {props.startAddress}</strong></span>
        </Row>
        {props.route.map((point, idx) => (
          <Row key={idx}>
            <span>- Lat: {point[0]}, Lng: {point[1]}</span>
          </Row>
        ))}
        <Row>
          <span><strong>- {props.endAddress}</strong></span>
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
