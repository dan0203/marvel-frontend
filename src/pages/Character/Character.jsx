// Modules internes
import './Character.css';
// Modules react
import { useState, useEffect } from 'react';
import axios from 'axios';
// Modules yarn
import { useLocation } from 'react-router';
import ComicCard from '../Comics/ComicCard';

const Character = () => {
    // Permet la récupération de la valeur id du personnage passé en param dans la route : /character/:id
    const location = useLocation();
    // Récupération du paramètre id
    const characterId = location.pathname.replace('/character/', '');

    const [character, setCharacter] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Récupération des données du personnage
                const characterResponse = await axios.get(import.meta.env.VITE_API_URL + '/character/' + characterId);
                // Copie des infos dans une nouvelle variable pour la modifier sans toucher à characterResponse
                const characterToDisplay = characterResponse.data;

                // Récupération des comics liés au personnage
                const comicsResponse = await axios.get(import.meta.env.VITE_API_URL + '/comics/' + characterId);

                // Reconstruction du personnage avec le tableau des données complètes des comics qui lui sont associées
                //  (car le tableau comics renvoyé dans characterResponse ne contient que les id des comics)
                characterToDisplay.comics = comicsResponse.data.comics;
                characterToDisplay.comics.show = true;

                setCharacter(characterToDisplay);
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
        <main className="main-character">
            <div className="container">
                <h1>{character.name}</h1>
                <section className="character">
                    <div className="content">
                        <img src={character.thumbnail.path ? `${character.thumbnail.path}/portrait_xlarge.${character.thumbnail.extension}` : defaultImage} alt={character.name} onError={e => (e.target.src = defaultImage)} />
                        <p>{character.description || 'N/A'}</p>
                    </div>
                </section>

                <h2>Comics avec {character.name}</h2>
                <section className="comics">
                    {character.comics.show &&
                        character.comics.map(comic => {
                            return <ComicCard key={comic._id} comic={comic} />;
                        })}
                </section>
            </div>
        </main>
    );
};

export default Character;
