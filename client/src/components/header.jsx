import {Button} from './button.jsx'
import {Link} from 'react-router-dom'
import logo from '../assets/logoMariaflordejara.jpg'
import './header.css'

export function Header() {
    return (
        <header className='header'>
        <div className='header-div'>
            <img src={logo} alt='Logo MariaFlorDeJara'/>
        </div>
        <nav className='header-nav'>
            <Link to="/Inicio">
                <Button text="Inicio" />
            </Link>
            <Link to="/products">
                <Button text="Productos" />
            </Link>
            <Link to="/contacto">
            <Button text="Contacto" />
            </Link>
            <Button text="Carrito" />
        </nav>
    </header>
    )
}