// Modules intenes
import './Header.css';
// Modules yarn
import { Link } from 'react-router';

const Header = () => {
    return (
        <header>
            <p>logo</p>
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
        </header>
    );
};

export default Header;
