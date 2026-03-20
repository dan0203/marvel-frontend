// Modules internes
import './Home.css';
import hero from '../../assets/images/hero.jpg';
import characters from '../../assets/images/characters.jpg';
import comics from '../../assets/images/comics.jpg';
// Modules yarn
import { Link } from 'react-router';

const Home = () => {
    return (
        <main className="main-home">
            <div className="hero">
                <img src={hero} alt="" />
            </div>

            <div className="container">
                <h1>
                    Bienvenue dans l'Univers des superhéros <span className="marvel-style">MARVEL</span>
                </h1>

                <section>
                    <Link to="/characters">
                        <article className="card">
                            <h2>Voir les personnages</h2>
                            <img src={characters} alt="Voir les personnages MARVEL" />
                        </article>
                    </Link>

                    <Link to="/comics">
                        <article className="card">
                            <h2>Voir les comics</h2>
                            <img src={comics} alt="Voir les comics MARVEL" />
                        </article>
                    </Link>
                </section>
            </div>
        </main>
    );
};

export default Home;
