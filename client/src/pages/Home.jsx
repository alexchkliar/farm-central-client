import {posts} from "../data"
import Card from "../components/Card"
import '../css_components/home.css';

const Home = () => {
  return (
    <div className="home">
      {/* <h1>Home page</h1> */}
      <section className="home-page-section-1">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
        <div className="wave wave4"></div>
      </section>
      <section className="home-page-section-2">

      </section>
      <a href="/foods">Browse foods</a>
    </div>
  )
}

export default Home
