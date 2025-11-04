import useData from '../hooks/useData';
import { Container, Row, Col } from 'react-bootstrap';

function MyContainer({ element: Element }) {
  const items = useData();

  return (
    <Container>
      <Row className="g-4">
        {items.map((item) => (
          <Col key={item.id} md={4}>
            <Element {...item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default MyContainer;