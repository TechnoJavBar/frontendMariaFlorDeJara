import './footer.css';
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export function Footer() {
    return(
        <footer className="footer">
            <div className="footer-content">
                <p>© 2025 Mariaflordejara. All rights reserved.</p>
                <div className="social-media">
                    <h3>Siguenos en nuestras redes sociales</h3>
                    <ul className="social-links">
                        <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook className='FaFacebook'/></a></li>
                        <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter className='FaTwitter'/></a></li>
                        <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram className='FaInstagram'/></a></li>
                    </ul>
                </div>
                <div className="contact-info">
                    <h2>Contacto</h2>
                    <p>Correo: elbingo33@gmail.com</p>
                    <p>Teléfono: +34 627 34 87 47</p>
                </div>
            </div>
        </footer>
            
    )
}