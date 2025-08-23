import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export function TerminosYCondiciones({
  marketplaceName,
  city,
  country,
  contactEmail,
  paymentProcessorName,
  lastUpdated,
  privacyPolicyUrl
}) {
  const sections = [
    { id: "aceptacion", title: "Introducción y aceptación" },
    { id: "definiciones", title: "Definiciones" },
    { id: "registro", title: "Registro y cuentas" },
    { id: "uso", title: "Uso del marketplace" },
    { id: "compras-ventas", title: "Compras y ventas" },
    { id: "pagos", title: "Pagos y comisiones" },
    { id: "envios-devoluciones", title: "Envíos y devoluciones" },
    { id: "responsabilidad", title: "Limitación de responsabilidad" },
    { id: "propiedad-intelectual", title: "Propiedad intelectual" },
    { id: "proteccion-datos", title: "Protección de datos" },
    { id: "modificaciones", title: "Modificaciones" },
    { id: "ley-aplicable", title: "Ley aplicable y jurisdicción" },
    { id: "contacto", title: "Contacto" },
  ];

   return (
    <div className="container-fluid my-5 bg-white">
      {/* Encabezado */}
      <header className="mb-5 text-center">
        <h1 className="fw-bold">Términos y Condiciones</h1>
        <p className="text-muted">Última actualización: {lastUpdated}</p>
      </header>

      <div className="row">
        {/* Índice lateral */}
        <nav className="col-md-3 mb-4">
          <div className="list-group sticky-top" style={{ top: "80px" }}>
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="list-group-item list-group-item-action">
                {s.title}
              </a>
            ))}
          </div>
        </nav>

        {/* Contenido principal */}
        <main className="col-md-9">
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="mb-5 p-3 border rounded shadow-sm bg-white">
              <h2 className="h5">{s.title}</h2>
              {s.id === "aceptacion" && (
                <p>
                  Bienvenido/a a {marketplaceName}. Al acceder o utilizar nuestra plataforma, aceptas cumplir estos
                  Términos y Condiciones. Si no estás de acuerdo con alguna parte, debes abstenerte de usar el servicio.
                </p>
              )}
              {s.id === "definiciones" && (
                <ul>
                  <li><strong>Plataforma</strong>: el sitio y/o app de {marketplaceName}.</li>
                  <li><strong>Usuario</strong>: cualquier persona que accede o se registra.</li>
                  <li><strong>Comprador</strong>: usuario que adquiere productos o servicios.</li>
                  <li><strong>Vendedor</strong>: usuario que publica y ofrece productos o servicios.</li>
                  <li><strong>Cuenta</strong>: perfil personal asociado a un usuario.</li>
                  <li><strong>Comisión</strong>: cargo aplicado por {marketplaceName} por transacción.</li>
                </ul>
              )}
              {s.id === "registro" && (
                <p>
                  Para usar ciertas funciones debes crear una cuenta con datos exactos y actualizados. Eres responsable
                  de mantener la confidencialidad de tus credenciales y de todas las actividades realizadas desde tu cuenta.
                </p>
              )}
              {s.id === "uso" && (
                <p>
                  Te comprometes a usar la plataforma de forma lícita, a respetar a otros usuarios y a no incurrir en
                  actividades fraudulentas, engañosas, infractoras de derechos o que puedan dañar sistemas, datos o reputaciones.
                </p>
              )}
              {s.id === "compras-ventas" && (
                <p>
                  Salvo que se indique lo contrario, {marketplaceName} actúa como intermediario entre compradores y vendedores.
                  Cada vendedor es responsable de la legalidad, calidad, seguridad, descripción y disponibilidad de sus productos o servicios.
                </p>
              )}
              {s.id === "pagos" && (
                <p>
                  Los pagos se procesan mediante {paymentProcessorName}. {marketplaceName} puede cobrar comisiones por
                  transacción; dichos importes se informarán de forma visible antes de completar el pago.
                </p>
              )}
              {s.id === "envios-devoluciones" && (
                <p>
                  Los vendedores son responsables de gestionar envíos, entregas, devoluciones y garantías según su política
                  y la legislación aplicable. El comprador debe revisar dichas condiciones antes de comprar.
                </p>
              )}
              {s.id === "responsabilidad" && (
                <p>
                  En la medida permitida por la ley, {marketplaceName} no será responsable por daños indirectos, incidentales,
                  especiales o consecuentes, ni por pérdidas de beneficios, datos o reputación derivadas del uso de la plataforma
                  o de transacciones entre usuarios.
                </p>
              )}
              {s.id === "propiedad-intelectual" && (
                <p>
                  Los contenidos de la plataforma (marca, logotipos, diseño, software y materiales) pertenecen a {marketplaceName}
                  o a sus licenciantes y están protegidos por la normativa aplicable. Queda prohibida su reproducción, distribución
                  o explotación sin autorización.
                </p>
              )}
              {s.id === "proteccion-datos" && (
                <p>
                  El tratamiento de datos personales se rige por nuestra <a href={privacyPolicyUrl} target="_blank" rel="noreferrer">Política de Privacidad</a>.
                  Al usar {marketplaceName} aceptas lo allí previsto.
                </p>
              )}
              {s.id === "modificaciones" && (
                <p>
                  Podemos actualizar estos Términos en cualquier momento. Publicaremos los cambios en esta página con su fecha
                  de entrada en vigor. El uso continuado tras la publicación implica la aceptación de las modificaciones.
                </p>
              )}
              {s.id === "ley-aplicable" && (
                <p>
                  Estos Términos se rigen por las leyes de {country}. Para cualquier controversia, las partes se someten
                  a los tribunales de {city}, salvo norma imperativa en contrario.
                </p>
              )}
              {s.id === "contacto" && (
                <p>
                  Si tienes dudas sobre estos Términos, escribe a <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
                </p>
              )}
            </section>
          ))}

          <footer className="mt-5 text-center text-muted small">
            <p>Documento informativo. No constituye asesoramiento legal.</p>
            <p>Soporte {marketplaceName}: <a href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
          </footer>
        </main>
      </div>
    </div>
  );
}