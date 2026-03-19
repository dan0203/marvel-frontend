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
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Récupération des données de tous les personnages
                const response = await axios.get(import.meta.env.VITE_API_URL + '/characters');

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
            <label htmlFor="search">LOUPE</label>
            <input
                type="text"
                name="search"
                id="search"
                value={search}
                onChange={event => {
                    setSearch(event.target.value);
                }}
            />

            {characters.results
                .filter(character => {
                    // Filtrer les characters dont le name contient le terme saisi dans la barre recherche (en minuscules pour ne pas tenir compte de la casse)
                    return character.name.toLowerCase().includes(search.toLowerCase());
                })
                .map(character => {
                    return (
                        <Link to="/character/" key={character._id} state={{ id: character._id }}>
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
