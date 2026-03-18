// Modules internes
import './Characters.css';
// Modules react
import { useState, useEffect } from 'react';
// Modules yarn
import axios from 'axios';
import { Link } from 'react-router';

const Characters = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_API_URL + '/characters');
                console.log(response.data);

                setCharacters(response.data);
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
            {characters.results.map(character => {
                return (
                    <Link to="/" key={character._id}>
                        <article>
                            <img src={`${character.thumbnail.path}/portrait_xlarge.${character.thumbnail.extension}`} alt={character.name} />
                            <p className="name">{character.name}</p>
                            <p className="description">{character.description}</p>
                        </article>
                    </Link>
                );
            })}
        </main>
    );
};

export default Characters;
