// Modules internes
import './Footer.css';
import logo from '../../assets/images/logo-marvel-320x129.svg';
// Modules yarn
import { Link } from 'react-router';

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <Link to="/">
                    <img src={logo} alt="Logo Marvel" />
                </Link>

                <p>
                    Made at <a href="https://www.lereacteur.io">LeRéacteur</a> by <a href="https://github.com/dan0203">Dan</a> - 2026
                </p>
            </div>
        </footer>
    );
};

export default Footer;
