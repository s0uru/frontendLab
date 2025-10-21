import { useReducer } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AppReducer from '../data/AppReducer';

function MyContainer({ element: Element, data }) {
  const [state, dispatch] = useReducer(AppReducer, data);

  return (
    <Container>
      <Row className="g-4">
        {state.map((item) => (
          <Col key={item.id} md={4}>
            <Element {...item} dispatch={dispatch} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default MyContainer;