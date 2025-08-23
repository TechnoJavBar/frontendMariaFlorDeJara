import './footer.css';
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="footer container-fluid bg-dark py-4">
      <div className="footer-content text-center text-lg-start container">
        <p className="mb-2">
          © 2025 Mariaflordejara. All rights reserved.{" "}
          <Link to="/TermsAndConditions" className="text-decoration-underline">
            Términos y Condiciones
          </Link>
        </p>

        <div className="social-media mb-3">
          <h5>Síguenos en nuestras redes sociales</h5>
          <ul className="social-links list-unstyled d-flex justify-content-center justify-content-lg-start gap-3 mt-2">
            <li>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="FaFacebook" />
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="FaTwitter" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="FaInstagram" />
              </a>
            </li>
          </ul>
        </div>

        <div className="contact-info">
          <h5>Contacto</h5>
          <p>Correo: elbingo33@gmail.com</p>
          <p>Teléfono: +34 627 34 87 47</p>
        </div>
      </div>
    </footer>
  );
}