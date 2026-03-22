// Modules internes
import './Header.css';
import logo from '../../assets/images/logo-marvel-320x129.svg';
// Modules yarn
import { Link, NavLink } from 'react-router'; // NavLink permet de manipuler la classe "active" sur le lien actif

const Header = () => {
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <img src={logo} alt="Logo Marvel" />
                </Link>

                <nav>
                    <ul>
                        <li>
                            <NavLink to="/characters">Personnages</NavLink>
                        </li>
                        <li>
                            <NavLink to="/comics">Comics</NavLink>
                        </li>
                        <li>
                            <NavLink to="/favorites">Favoris</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
