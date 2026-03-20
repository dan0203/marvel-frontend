// Modules internes
import './Home.css';
import hero from '../../assets/images/hero.jpg';
import characters from '../../assets/images/characters.jpg';
import comics from '../../assets/images/comics.jpg';

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
                    <article className="card">
                        <h2>Voir les personnages</h2>
                        <img src={characters} alt="Voir les personnages MARVEL" />
                    </article>

                    <article className="card">
                        <h2>Voir les comics</h2>
                        <img src={comics} alt="Voir les comics MARVEL" />
                    </article>
                </section>
            </div>
        </main>
    );
};

export default Home;
