import { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AppContext from '../data/AppContext';

function MyContainer({ element: Element }) {
  const { items } = useContext(AppContext);

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