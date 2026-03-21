// Modules internes
import './Favorites.css';
import CharacterCard from '../Character/CharacterCard';
// Modules react
import { useState, useEffect } from 'react';
// Modules yarn
import axios from 'axios';
import Cookies from 'js-cookie';
import ComicCard from '../Comics/ComicCard';

const Favorites = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [favoriteCharactersArray, setFavoriteCharactersArray] = useState([]);
    const [favoriteComicsArray, setFavoriteComicsArray] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Récupération du cookie characters_favorites
                const charactersFavoritesFromCookie = Cookies.get('characters_favorites');
                let favoriteCharactersIdArrayFromCookie = charactersFavoritesFromCookie ? JSON.parse(charactersFavoritesFromCookie) : [];

                if (favoriteCharactersIdArrayFromCookie.length > 0) {
                    const copyFavorites = [...favoriteCharactersArray];
                    // Récupération des données des personnages
                    for (let i = 0; i < favoriteCharactersIdArrayFromCookie.length; i++) {
                        const responseCharacters = await axios.get(import.meta.env.VITE_API_URL + '/character/' + favoriteCharactersIdArrayFromCookie[i]);

                        copyFavorites.push(responseCharacters.data);
                    }
                    setFavoriteCharactersArray(copyFavorites);
                }

                // Récupération du cookie comics_favorites
                const comicsFavoritesFromCookie = Cookies.get('comics_favorites');
                let favoriteComicsIdArrayFromCookie = comicsFavoritesFromCookie ? JSON.parse(comicsFavoritesFromCookie) : [];

                if (favoriteComicsIdArrayFromCookie.length > 0) {
                    const copyFavorites = [...favoriteComicsArray];
                    // Récupération des données des personnages
                    for (let i = 0; i < favoriteComicsIdArrayFromCookie.length; i++) {
                        const responseComics = await axios.get(import.meta.env.VITE_API_URL + '/comic/' + favoriteComicsIdArrayFromCookie[i]);

                        copyFavorites.push(responseComics.data);
                    }
                    setFavoriteComicsArray(copyFavorites);
                }

                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return isLoading ? (
        <p>Chargement en cours...</p>
    ) : (
        <main className="main-favorites">
            <div className="container">
                <h1>Mes favoris</h1>

                <h2>Personnages</h2>
                <section className="characters-favorites">
                    {favoriteCharactersArray.map(character => {
                        return <CharacterCard character={character} key={character._id} />;
                    })}
                </section>

                <h2>Comics</h2>
                <section className="comics-favorites">
                    {favoriteComicsArray.map(comic => {
                        return <ComicCard comic={comic} key={comic._id} />;
                    })}
                </section>
            </div>
        </main>
    );
};

export default Favorites;
