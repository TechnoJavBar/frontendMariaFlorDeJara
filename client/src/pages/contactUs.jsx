import { FaWhatsapp } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import './contactUs.css';

export function ContactUs() {

  const whatsappNumber = "34627348747"; 
  const emailAddress = "mariaflordejara@gmail.com";


    return(
      <section className="contact-wrapper">
      <div className="glass-card">
        <h2>¿Tienes alguna duda o quieres hacer un pedido?</h2>
        <p>Si es así, no dudes en ponerte en contacto con nosotros, te responderemos lo antes posible y empezaremos a tramitar su pedido</p>

        <div className="links-container">
          <a 
            href={`https://wa.me/${whatsappNumber}`}
            className="link-item wa"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp Directo
          </a>

          <a 
            href={`mailto:${emailAddress}`}
            className="link-item mail"
          >
            Correo Electrónico
          </a>
        </div>
      </div>
    </section>
  );
  // return (
  //   <div className="contact-us container-fluid w-100 min-vh-100">
  //     <div className="text-center mb-5">
  //       <h1>¿Tienes alguna duda o quieres comprar algo?</h1>
  //       <p>Si es así, no dudes en ponerte en contacto con nosotros, te responderemos lo antes posible</p>
  //     </div>

  //     <div className="text-center">
  //       <h2 className="mb-4">Puedes ponerte en contacto con nosotros de estas formas</h2>
  //       <div className="row justify-content-center g-4">
  //         <div className="col-12 col-md-5">
  //           <div className="p-4 border rounded h-100">
  //             <h3 className="mb-3"><FaWhatsapp className="me-2 text-success" /> WhatsApp</h3>
  //             <p>Envíanos un mensaje a nuestro número de WhatsApp y te responderemos lo antes posible.</p>
  //             <a href="https://wa.me/627348747" target="_blank" rel="noopener noreferrer" className="btn btn-success">Enviar mensaje</a>
  //           </div>
  //         </div>
  //         <div className="col-12 col-md-5">
  //           <div className="p-4 border rounded h-100">
  //             <h3 className="mb-3"><SiGmail className="me-2 text-danger" /> Email</h3>
  //             <p>También puedes enviarnos un correo electrónico a nuestra dirección de contacto.</p>
  //             <a href="mailto:elbingo33@gmail.com" target="_blank" rel="noopener noreferrer" className="btn btn-danger">Enviar correo</a>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}
