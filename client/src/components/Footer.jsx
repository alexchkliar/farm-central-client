import '../css_components/footer.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faFacebook } from "@fortawesome/free-brands-svg-icons"
import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"

const Footer = () => {

  return (
    <footer>
      <a href="/"><FontAwesomeIcon icon={faGithub} className={"fontawesome-footer-logos"} /></a>
      <a href="/"><FontAwesomeIcon icon={faFacebook} className={"fontawesome-footer-logos"} /></a>
      <a href="/"> <FontAwesomeIcon icon={faInstagram} className={"fontawesome-footer-logos"} /></a>
      <a href="/"><FontAwesomeIcon icon={faTwitter} className={"fontawesome-footer-logos"} /></a>
    </footer>
  )
}

export default Footer;
