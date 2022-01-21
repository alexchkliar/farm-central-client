import '../css_components/home.css';
import Carousel from 'react-bootstrap/Carousel'

// document.querySelector("#carouselExampleIndicators").carousel();

const Home = () => {
  return (
    <div className="home-container">
      {/* <h1>Home page</h1> */}
      <section className="home-page-section-1">
        <div className="landing-page-main-text-wrapper">

          <div className="landing-page-main-text-div-left">
            <h1 className="landing-page-main-header">Order fresh organic food from local farms</h1>
            <p className="landing-page-main-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, libero. Totam magni ipsum sed maiores eos numquam.
            </p>
            <a className="landing-page-main-button" href="/foods">Order now</a>
          </div>
          <div className="landing-page-main-text-div-right">
            <h1 className="landing-page-main-header">List your food now</h1>
            <p className="landing-page-main-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, libero. Totam magni ipsum sed maiores eos numquam.
            </p>
            <a className="landing-page-main-button" href="/foods">List now</a>
          </div>

        </div>
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
        <div className="wave wave4"></div>
      </section>
      <section className="home-page-section-2">
        <h1 className="landing-page-main-header">Order fresh organic food from local farms</h1>
        <p className="landing-page-main-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, libero. Totam magni ipsum sed maiores eos numquam.</p>
        <br />
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://www.thespruceeats.com/thmb/ZnWDXm0VjfY2wy25ocFqZccy5YY=/2164x1217/smart/filters:no_upscale()/freshvegetablesAlexRaths-4c1ea186a88e4fd7b95283eee614600c.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Fresh organic food</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://www.thespruceeats.com/thmb/ZnWDXm0VjfY2wy25ocFqZccy5YY=/2164x1217/smart/filters:no_upscale()/freshvegetablesAlexRaths-4c1ea186a88e4fd7b95283eee614600c.jpg"
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>Sourced from local farms</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://www.thespruceeats.com/thmb/ZnWDXm0VjfY2wy25ocFqZccy5YY=/2164x1217/smart/filters:no_upscale()/freshvegetablesAlexRaths-4c1ea186a88e4fd7b95283eee614600c.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Delivered straight to your door</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        {/* <div className="home-page-card"></div>
        <div className="home-page-card"></div>
        <div className="home-page-card"></div> */}
      </section>
    </div>
  )
}

export default Home
