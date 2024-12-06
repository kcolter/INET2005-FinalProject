import { Link } from 'react-router-dom';
export default function Nav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-expand-sm">
            <ul className='navbar-nav'>
                <li className='nav-item'>
                    <Link to="/">Home</Link>
                </li>
                <li className='nav-item'>
                    <Link to="/login">Login</Link>
                </li>
                <li className='nav-item'>
                    <Link to="/cart">Cart</Link>
                </li>
                <li className='nav-item'>
                    <Link to="/logout">Logout</Link>
                </li>
            </ul>
        </nav>
    )
}