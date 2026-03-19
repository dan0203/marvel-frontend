// Modules internes
import './Characters.css';
import Search from '../../components/Search/Search';
import Limit from '../../components/Limit/Limit';
import CharacterCard from '../Character/CharacterCard';
import Pagination from '../../components/Pagination/Pagination';
import Button from '../../components/Button/Button';
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
    const [favorites, setFavorites] = useState(JSON.parse(Cookies.get('characters_favorites')));

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
                <Search search={search} setSearch={setSearch} />

                <Limit limit={limit} setLimit={setLimit} setCurrentPage={setCurrentPage} />
            </div>

            <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} pages={pages} />

            {characters.results.map(character => {
                return (
                    <div key={character._id}>
                        <Button
                            text="COEUR"
                            onClickFunc={() => {
                                // Ajouter le nouveau favori
                                if (!favorites.includes(character._id)) {
                                    const copyFavorites = [...favorites];
                                    copyFavorites.push(character._id);
                                    setFavorites(copyFavorites);
                                    Cookies.set('characters_favorites', JSON.stringify(copyFavorites));
                                }
                            }}
                        />

                        <Link to={`/character/${character._id}`} key={character._id}>
                            <CharacterCard character={character} />
                        </Link>
                    </div>
                );
            })}

            <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} pages={pages} />
        </main>
    );
};

export default Characters;
