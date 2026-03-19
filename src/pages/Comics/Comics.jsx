// Modules internes
import './Comics.css';
import ComicCard from './ComicCard';
import Search from '../../components/Search/Search';
import Limit from '../../components/Limit/Limit';
import Pagination from '../../components/Pagination/Pagination';
import Button from '../../components/Button/Button';
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
    const [favorites, setFavorites] = useState(JSON.parse(Cookies.get('comics_favorites')));

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

    return isLoading ? (
        <p>Chargement en cours...</p>
    ) : (
        <main>
            <div className="filters">
                <Search search={search} setSearch={setSearch} />

                <Limit limit={limit} setLimit={setLimit} setCurrentPage={setCurrentPage} />
            </div>

            <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} numberOfPages={Math.ceil(comics.count / limit)} />

            {comics.results.map(comic => {
                return (
                    <div key={comic._id}>
                        <Button
                            text="COEUR"
                            onClickFunc={() => {
                                if (!favorites.includes(comic._id)) {
                                    // Ajouter le nouveau favori
                                    const copyFavorites = [...favorites];
                                    copyFavorites.push(comic._id);
                                    setFavorites(copyFavorites);
                                    Cookies.set('comics_favorites', JSON.stringify(copyFavorites));
                                }
                            }}
                        />

                        <ComicCard key={comic._id} comic={comic} />
                    </div>
                );
            })}

            <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} numberOfPages={Math.ceil(comics.count / limit)} />
        </main>
    );
};

export default Comics;
