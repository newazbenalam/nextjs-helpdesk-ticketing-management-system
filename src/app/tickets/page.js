import { Button, Col, Container, Row } from "react-bootstrap";

export default function Ticket() {
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-danger fw-bold">Home</h1>
          <Button variant="" className="mt-5 btn btn-secondary">Click Me</Button>
        </Col>
      </Row>
    </Container>
  );
}