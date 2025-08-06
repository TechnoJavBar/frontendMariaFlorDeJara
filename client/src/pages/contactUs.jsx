import { FaWhatsapp } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import './contactUs.css';

export function ContactUs() {
  return (
    <div className="contact-us">
      <div className='contact-us-header'>
        <h1>¿Tienes alguna duda o quieres comprar algo?</h1>
        <p>Si es así, no dudes en ponerte en contacto con nosotros, te responderemos lo antes posible</p>
      </div>

      <div className='contact-us-info'>
        <h2>Puedes ponerte en contacto con nosotros de estas formas</h2>
        <div className='contact-us-info-grid'>
            <div className='contact-us-whatsapp'>
            <h3><FaWhatsapp/> WhatsApp</h3>
                <p>Envíanos un mensaje a nuestro número de WhatsApp y te responderemos lo antes posible.</p>
                <a href="https://wa.me/627348747" target="_blank" rel="noopener noreferrer">Enviar mensaje</a>
            </div>
            <div className='contact-us-email'>
            <h3><SiGmail/> Email</h3>
                <p>También puedes enviarnos un correo electrónico a nuestra dirección de contacto.</p>
                <a href="mailto:elbingo33@gmail.com" target="_blank" rel="noopener noreferrer">Enviar correo</a>
            </div>
        </div>
      </div>
    </div>
  );
}
