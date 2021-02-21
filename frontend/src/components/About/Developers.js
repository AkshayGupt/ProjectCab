import React, { useState } from "react";
import { Carousel, Row, Col } from "react-bootstrap";
import developer1 from "./0.jpg";
import developer2 from "./ritvij.jpg";

const Developers = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div>
      <Row>
        <Col></Col>
        <Col lg="10" md="12">
          <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
              <img
                className="d-block mx-auto"
                src={developer1}
                alt="First slide"
                style={{
                  height: "auto",
                  maxWidth: "90vw",
                  borderRadius: "200px",
                }}
              />
              <Carousel.Caption>
                <h3 className="text-white">Akshay Gupta</h3>
                <p className="text-white">Co-founder</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block mx-auto"
                src={developer2}
                alt="Second slide"
                style={{
                  height: "auto",
                  maxHeight:"400px",
                  maxWidth: "90vw",
                  borderRadius: "200px",
                }}
              />
              <Carousel.Caption>
                <h3 className="text-white">Ritvij Srivastava</h3>
                <p className="text-white">Co-Founder</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
};

export default Developers;
