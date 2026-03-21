// Modules internes
import './Comics.css';
import Search from '../../components/Search/Search';
import Limit from '../../components/Limit/Limit';
import Pagination from '../../components/Pagination/Pagination';
import ComicCard from './ComicCard';
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

    const addToFavorites = characterId => {
        const copyFavorites = [...favorites];
        copyFavorites.push(characterId);
        Cookies.set('comics_favorites', JSON.stringify(copyFavorites));
        setFavorites(copyFavorites);
    };

    const removeFromFavorites = comicId => {
        const copyFavorites = [...favorites];
        const index = copyFavorites.indexOf(comicId);

        if (index !== -1) {
            copyFavorites.splice(index, 1);
        }

        Cookies.set('comics_favorites', JSON.stringify(copyFavorites));
        setFavorites(copyFavorites);
    };

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

        // Récupération des comics favoris
        const comicsFavorites = Cookies.get('comics_favorites');
        comicsFavorites && setFavorites(JSON.parse(comicsFavorites));
    }, [search, limit, currentPage]);

    return isLoading ? (
        <p>Chargement en cours...</p>
    ) : (
        <main className="main-comics">
            <div className="container">
                <div className="filters">
                    <Search search={search} setSearch={setSearch} searchLabel="comic" />

                    <Limit limit={limit} setLimit={setLimit} setCurrentPage={setCurrentPage} />
                </div>

                <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} numberOfPages={Math.ceil(comics.count / limit)} />

                <div className="comics">
                    {comics.results.map(comic => {
                        return <ComicCard comic={comic} key={comic._id} favorites={favorites} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} />;
                    })}
                </div>

                <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} numberOfPages={Math.ceil(comics.count / limit)} />
            </div>
        </main>
    );
};

export default Comics;
