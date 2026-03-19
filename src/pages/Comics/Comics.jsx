// Modules internes
import './Comics.css';
// Modules react
import { useState, useEffect } from 'react';
// Modules yarn
import axios from 'axios';
import Cookies from 'js-cookie';

const Comics = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [comics, setComics] = useState([]);
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
                queries += `&title=${search}`;

                // Récupération des données de tous les comics
                const response = await axios.get(import.meta.env.VITE_API_URL + '/comics' + queries);

                setComics(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [search, limit, currentPage]);

    // Construction du tableau de boutons à afficher pour la pagination
    const numberOfPages = Math.ceil(comics.count / limit);
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
                    <span>comics par page</span>
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
                    disabled={!(currentPage < Math.ceil(comics.count / limit))}
                >
                    &gt;
                </button>
            </div>

            {comics.results.map(comic => {
                return (
                    <div>
                        <button
                            onClick={() => {
                                if (!favorites.includes(comic._id)) {
                                    const copyFavorites = [...favorites];
                                    copyFavorites.push(comic._id);
                                    setFavorites(copyFavorites);
                                    Cookies.set('comics_favorites', JSON.stringify(copyFavorites));
                                }
                            }}
                        >
                            COEUR
                        </button>

                        <article key={comic._id}>
                            <img src={comic.thumbnail.path ? `${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}` : '../../images/default.jpg'} alt={comic.title} />
                            <p className="title">{comic.title}</p>
                            <p className="description">{comic.description}</p>
                        </article>
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
                    disabled={!(currentPage < Math.ceil(comics.count / limit))}
                >
                    &gt;
                </button>
            </div>
        </main>
    );
};

export default Comics;
