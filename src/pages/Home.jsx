import '../css_components/home.css';
import Carousel from 'react-bootstrap/Carousel'

const Home = () => {
  return (
    <div className="home-container">
      {/* <h1>Home page</h1> */}
      <section className="home-page-section-1">
        <div className="landing-page-main-text-wrapper">

          <div className="landing-page-main-text-div-left">
            <h1 className="landing-page-main-header">Order fresh food from local farms</h1>
            <p className="landing-page-main-text">
              Support local farmers today. Order fresh, affordable farm produce, delivered straight to your door.
            </p>
            <a className="landing-page-main-button" href="/foods">Order now</a>
          </div>
          <div className="landing-page-main-text-div-right">
            <h1 className="landing-page-main-header">List your food now</h1>
            <p className="landing-page-main-text">
              Expand your business today. List your goods and let us handle the rest, including shipping.
            </p>
            <a className="landing-page-main-button" href="/listings">List now</a>
          </div>

        </div>
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
        <div className="wave wave4"></div>
      </section>
      <section className="home-page-section-2">
        <h1 className="landing-page-header-2">Order fresh organic food from local farms</h1>
        <p className="landing-page-main-text">We work with hundreds of farmers across the country, like Dave, pictured below, to bring you the best selection of organic fruits and vegetables, all at unbeatable prices!</p>
        <br />
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://otbsalessolutions.com/wp-content/uploads/2021/08/Farmer-standing-in-field.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Fresh organic food</h3>
              <p>Farmers in our network are all certified organic producers.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://otbsalessolutions.com/wp-content/uploads/2021/08/Farmer-standing-in-field.jpg"
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>Sourced from local farms</h3>
              <p>Support certified local farmers.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://otbsalessolutions.com/wp-content/uploads/2021/08/Farmer-standing-in-field.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Delivered straight to your door</h3>
              <p>We expedite shipping, so your food is always delivered fresh.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>
    </div>
  )
}

export default Home
