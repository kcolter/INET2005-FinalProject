import { Link } from 'react-router-dom';
export default function Nav() {
    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/logout">Logout</Link>
        </div>
    )
}