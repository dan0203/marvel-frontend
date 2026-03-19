// Modules internes
import './Characters.css';
// Modules react
import { useState, useEffect } from 'react';
// Modules yarn
import axios from 'axios';
import { Link } from 'react-router';
import Cookies from 'js-cookie';

const Characters = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [characters, setCharacters] = useState([]);
    const [search, setSearch] = useState('');
    const [limit, setLimit] = useState(100);
    const [currentPage, setCurrentPage] = useState(1);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Reconstitution des queries qui sont passées au serveur
                // Limit : il y aura toujours un paramètre limit, dont la valeur sera 100 par défaut (indiqué dans le state par défaut)
                //  pour uniformiser l'affichage et le comportement par défaut de l'API
                let queries = `?limit=${limit}`;

                // Skip
                const skip = (currentPage - 1) * limit;
                queries += `&skip=${skip}`;

                // Name
                queries += `&name=${search}`;

                // Récupération des données des personnages correspondant aux filtres
                const response = await axios.get(import.meta.env.VITE_API_URL + '/characters' + queries);

                setCharacters(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [search, limit, currentPage]);

    // Construction du tableau de boutons à afficher pour la pagination
    const numberOfPages = Math.ceil(characters.count / limit);
    // On aura toujours au moins un bouton
    const pages = [1];

    if (numberOfPages <= 5) {
        // si numberOfPages <= 5, afficher tout
        for (let i = 2; i <= numberOfPages; i++) {
            pages.push(i);
        }
    } else if (currentPage <= 3) {
        // si currentPage <= 3 et numberOfPages > 5, afficher 1 2 3 ... lastPage
        pages.push(2);
        pages.push(3);
        pages.push('...');
        pages.push(numberOfPages);
    } else if (currentPage >= numberOfPages - 2) {
        // si currentPage >= numberOfPages - 2 et numberOfPages > 5, afficher 1 ... lastPage-2 lastPage-1 lastPage
        pages.push('...');
        pages.push(numberOfPages - 2);
        pages.push(numberOfPages - 1);
        pages.push(numberOfPages);
    } else {
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(numberOfPages);
    }

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
                    <select
                        name="limit"
                        value={limit}
                        onChange={event => {
                            setLimit(Number(event.target.value));
                            setCurrentPage(1);
                        }}
                    >
                        <option value="20">20</option>
                        <option value="40">40</option>
                        <option value="60">60</option>
                        <option value="80">80</option>
                        <option value="100">100</option>
                    </select>
                    <span>personnages par page</span>
                </div>
            </div>

            <div className="pagination">
                <button
                    onClick={() => {
                        setCurrentPage(currentPage - 1);
                    }}
                    disabled={!(currentPage > 1)}
                >
                    &lt;
                </button>

                {pages.map((page, index) =>
                    page === '...' ? (
                        <span key={index}>...</span>
                    ) : (
                        <button key={index} className={currentPage === page ? 'active' : ''} onClick={() => setCurrentPage(page)}>
                            {page}
                        </button>
                    ),
                )}

                <button
                    onClick={() => {
                        setCurrentPage(currentPage + 1);
                    }}
                    disabled={!(currentPage < Math.ceil(characters.count / limit))}
                >
                    &gt;
                </button>
            </div>

            {characters.results.map(character => {
                return (
                    <div>
                        <button
                            onClick={() => {
                                if (!favorites.includes(character._id)) {
                                    const copyFavorites = [...favorites];
                                    copyFavorites.push(character._id);
                                    setFavorites(copyFavorites);
                                    Cookies.set('characters_favorites', JSON.stringify(copyFavorites));
                                }
                            }}
                        >
                            COEUR
                        </button>

                        <Link to={`/character/${character._id}`} key={character._id}>
                            <article>
                                <img src={`${character.thumbnail.path}/portrait_xlarge.${character.thumbnail.extension}`} alt={character.name} />
                                <p className="name">{character.name}</p>
                                <p className="description">{character.description}</p>
                            </article>
                        </Link>
                    </div>
                );
            })}

            <div className="pagination">
                <button
                    onClick={() => {
                        setCurrentPage(currentPage - 1);
                    }}
                    disabled={!(currentPage > 1)}
                >
                    &lt;
                </button>

                {pages.map((page, index) =>
                    page === '...' ? (
                        <span key={index}>...</span>
                    ) : (
                        <button key={index} className={currentPage === page ? 'active' : ''} onClick={() => setCurrentPage(page)}>
                            {page}
                        </button>
                    ),
                )}

                <button
                    onClick={() => {
                        setCurrentPage(currentPage + 1);
                    }}
                    disabled={!(currentPage < Math.ceil(characters.count / limit))}
                >
                    &gt;
                </button>
            </div>
        </main>
    );
};

export default Characters;
