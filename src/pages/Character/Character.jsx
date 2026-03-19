// Modules internes
import './Character.css';
import CharacterCard from './CharacterCard';
// Modeuls react
import { useState, useEffect } from 'react';
import axios from 'axios';
// Modules yarn
import { useLocation } from 'react-router';

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
        <main>
            <CharacterCard character={character} />
        </main>
    );
};

export default Character;
