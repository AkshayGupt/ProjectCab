import React,{useState} from 'react'
import {Carousel, Row, Col} from 'react-bootstrap';



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
                        src="https://scontent.fccu14-1.fna.fbcdn.net/v/t1.0-9/48428112_2119470468315595_994062187725062144_n.jpg?_nc_cat=101&ccb=3&_nc_sid=09cbfe&_nc_ohc=TLtqE-c1PtQAX8Ebvo9&_nc_ht=scontent.fccu14-1.fna&oh=d0c508956d53cbad764602aea74969e9&oe=6052545F"
                        alt="First slide"
                        style={{height:"60vh",width:"auto",borderRadius:"px"}}
                        />
                        <Carousel.Caption>
                        <h2 className="text-white">Akshay Gupta</h2>
                        <h4 className="text-dark">Co-founder</h4>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block mx-auto"
                        src="https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70"
                        alt="Second slide"
                        style={{height:"60vh",width:"auto"}}
                        />
                        <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                </Col>
                <Col></Col>
            </Row>
        </div>
    )
}

export default Developers
