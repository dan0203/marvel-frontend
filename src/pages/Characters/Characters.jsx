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
    const [limit, setLimit] = useState(100);
    const [pagination, setPagination] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Reconstitution des queries qui sont passées au serveur
                // Il y aura toujours un paramètre limit, dont la valeur sera 100 par défaut (indiqué dans le state par défaut)
                //  pour uniformiser l'affichage et le comportement par défaut de l'API
                let queries = `?limit=${limit}`;

                // Récupération des données de tous les personnages
                const response = await axios.get(import.meta.env.VITE_API_URL + '/characters' + queries);

                setCharacters(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [limit]);

    return isLoading ? (
        <p>Chargement en cours...</p>
    ) : (
        <main>
            <div className="filters">
                <div className="search">
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
                </div>

                <div className="limit">
                    <span>Afficher</span>
                    <select name="limit" value={limit} onChange={event => setLimit(event.target.value)}>
                        <option value="20">20</option>
                        <option value="40">40</option>
                        <option value="60">60</option>
                        <option value="80">80</option>
                        <option value="100">100</option>
                    </select>
                    <span>personnages par page</span>
                </div>
            </div>

            {characters.results
                .filter(character => {
                    // Filtrer les characters dont le name contient le terme saisi dans la barre recherche (en minuscules pour ne pas tenir compte de la casse)
                    return character.name.toLowerCase().includes(search.toLowerCase());
                })
                .map(character => {
                    return (
                        <Link to={`/character/${character._id}`} key={character._id}>
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
