// Modules internes
import './Header.css';
import logo from '../../assets/images/logo-marvel-320x129.svg';
// Modules yarn
import { Link } from 'react-router';

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
                            <Link to="/characters">Personnages</Link>
                        </li>
                        <li>
                            <Link to="/comics">Comics</Link>
                        </li>
                        <li>
                            <Link to="/favorites">Favoris</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
