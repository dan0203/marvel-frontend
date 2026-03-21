// Modules internes
import './Favorites.css';
import CharactersList from '../../components/CharactersList/CharactersList';
import ComicsList from '../../components/ComicsList/ComicsList';
// Modules react
import { useState, useEffect } from 'react';
// Modules yarn
import axios from 'axios';

const Favorites = ({ favoriteCharacters, favoriteComics, addToFavorites, removeFromFavorites }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [favoriteCharactersDetailed, setFavoriteCharactersDetailed] = useState([]);
    const [favoriteComicsDetailed, setFavoriteComicsDetailed] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Requête de récupération des données des personnages favoris
                if (favoriteCharacters.length > 0) {
                    const copyFavorites = [];
                    for (let i = 0; i < favoriteCharacters.length; i++) {
                        const responseCharacters = await axios.get(import.meta.env.VITE_API_URL + '/character/' + favoriteCharacters[i]);

                        copyFavorites.push(responseCharacters.data);
                    }
                    setFavoriteCharactersDetailed(copyFavorites);
                }

                // Requête de récupération des données des comics favoris
                if (favoriteComics.length > 0) {
                    const copyFavorites = [];
                    for (let i = 0; i < favoriteComics.length; i++) {
                        const responseComics = await axios.get(import.meta.env.VITE_API_URL + '/comic/' + favoriteComics[i]);

                        copyFavorites.push(responseComics.data);
                    }
                    setFavoriteComicsDetailed(copyFavorites);
                }

                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [favoriteCharacters, favoriteComics]);

    return isLoading ? (
        <p>Chargement en cours...</p>
    ) : (
        <main className="main-favorites">
            <div className="container">
                <h1>Mes favoris</h1>

                <section className="characters-favorites">
                    <h2>Personnages</h2>
                    {favoriteCharacters.length > 0 ? <CharactersList characters={favoriteCharactersDetailed} favorites={favoriteCharacters} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} /> : <p>Aucun personnage favori pour le moment</p>}
                </section>

                <section className="comics-favorites">
                    <h2>Comics</h2>
                    {favoriteComics.length > 0 ? <ComicsList comics={favoriteComicsDetailed} favorites={favoriteComics} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} /> : <p>Aucun comic favori pour le moment</p>}
                </section>
            </div>
        </main>
    );
};

export default Favorites;
