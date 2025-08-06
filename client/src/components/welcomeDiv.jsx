import { Button } from "./button"
import { Link } from "react-router-dom"
import "./welcomeDiv.css"

export function WelcomeDiv() {
    return (
        <div className="welcome">
            <h1>¡Bienvenido a MariaFlorDeJara!</h1>
            <p>Explora nuestros productos y disfruta de una experiencia única de compra.</p>
            <Link to="/products">
                <Button text="Ver Productos" />
            </Link>
        </div>
    )
}