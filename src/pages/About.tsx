import Carousel from 'react-bootstrap/Carousel';

export function About() {
    return (
        <>
            <h1 style={{marginBottom:32}}>About us</h1>
            <div className="d-flex justify-content-center">
                <div className="w-75">
                    <p className="text-center">Sustainable management is a central topic at NoBin Snacks - and one of our greatest challenges. Our goal for the future? Being more sustainable, ecological and smarter than the regular trade!</p>
                    <p className="text-center">Our aim is to save second quality, dented, wilted or dried foods from the bin, and prepare delicious and healthy snacks. We collaborate with local farmers, food markets, grocery stores and restaurants.</p>
                    <p className="text-center">We love the products we sell and do everything we can to ensure that you love our products too.</p>
                </div>
            </div>
            <div className="d-flex justify-content-center mt-4">
                <Carousel>
                    <Carousel.Item>
                        <img className="d-block" style={{width: "500px", height: "300px", objectFit: "cover" }} src="/images/energy-balls.jpg" alt="First slide"/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="d-block" style={{width: "500px", height: "300px", objectFit: "cover" }} src="/images/dried-apples.jpg" alt="Second slide"/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="d-block" style={{width: "500px", height: "300px", objectFit: "cover" }} src="/images/tomato-chutney.jpg" alt="Third slide"/>
                    </Carousel.Item>
                </Carousel>
            </div>
        </>
    )
}
