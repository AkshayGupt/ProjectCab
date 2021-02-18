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
                        // src="https://lh3.googleusercontent.com/pw/ACtC-3fL0qowGoct7Y7hSac7yfYtQ07B4CmWgPXPvu12eva6qlAeN0KiShHWrRQiFR6WcJzrjz3hLd2clQbN5VKu4WWU6r-vJgf1eINoX8jhieR1Te2qBgPx5qgKcPkDEA8mj3DxPYZyfugVvzb8BgzlfQ0_pg=w1280-h960-no?authuser=0"
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
                        src="https://lh3.googleusercontent.com/rMyizkkB7rDix8_mc4SgtocmkMn5MpnJsX5VoyqdAh_jP6-0dRapuSy-CMDDoSD41BsPBOMc2A59Pt5ppLWQAMEyQSXgyGp43OIk_8sbYLkhZpAmuzcN5UT-5zU0IGRUkG5M0zOpQ25CsrcNzOjDeRbdAGEhcVOppbnVrY2po7Z3CK9oAp8NprZvW-PWhLtp7Ac6AZ4RmUvbyo_aB4AXN3T-K5Y1nN7rGK0brySbuWymijs19lzcnPHuPmnC901mXaYhml6S0shCG8EjgO61pSns_pHZvJHrl_eDX8IMlFiKFUJ84rntDcnj7zHpTQ7FTeOV9eLLuAOy2QomC3-c31b4c6Fuui3oLwEUiXyD9MKaomeCS3p9AnBPY1G-AgdGUh0MAsuoS0ZL8a0mrxZxZuQA1iiE5jdsHBVSmKUX5rpEA8o38MC1fpnQeH9STPrUOAOmbts44CmGM_9huvNNgtRFwyglGBtwL6N-lhh_XRi3IzdpGMx_EknbXyNEm5TGZlCJ1i3fMxumUgBFhaN0wYCAkOspq-qkELkWbBEhFXpM0ol0rwFaDZdL2aMv977tY6GW1Zi3ThFgFBiF_5U5TYoeSUxXW9DQziT4f4lbbO5mwSPHrLlJFwTz0BYItu_UTiiKHCMS_GYGtwySx8-Q9jDshrFrJnHYZf0x1SsAYm-qoDXyfa27cjPW5zNLyw=s250-k-no"
                        // src="https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70"
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
