import React from 'react'
import {Carousel} from  'react-bootstrap';
const SlideShow = () => {
    return (
        <div>
        <Carousel>
            <Carousel.Item interval={200}>
            <img
                className="d-block w-100"
                src="https://thumbs.dreamstime.com/b/carpool-banner-set-modern-taxi-flat-illustration-commercial-service-vehicle-transportation-cooperation-transitional-geo-point-143648884.jpg"
                alt="First slide"
            />
            <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={500}>
            <img
                className="d-block w-100"
                src="https://cdn4.vectorstock.com/i/1000x1000/07/78/friends-in-a-car-vector-21380778.jpg"
                alt="Third slide"
            />
            <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
            <img
                className="d-block w-100"
                src="https://static.vecteezy.com/system/resources/previews/000/143/153/non_2x/carpool-vector.jpg"
                alt="Third slide"
            />
            <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>
      </Carousel>
            
        </div>
    )
}

export default SlideShow
