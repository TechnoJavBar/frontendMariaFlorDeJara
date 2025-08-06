import {Button} from './button.jsx'
import {Link} from 'react-router-dom'
import logo from '../assets/logoMariaflordejara.png'
import './header.css'

export function Header() {
    return (
        <header className='header'>
        <div className='header-div'>
            <img src='{logo}' alt='Logo Maria Flor de Jara' style={{ height: '60px' }} />
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