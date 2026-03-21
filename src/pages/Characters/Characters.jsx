// Modules internes
import './Characters.css';
import Search from '../../components/Search/Search';
import Limit from '../../components/Limit/Limit';
import Pagination from '../../components/Pagination/Pagination';
import CharacterCard from '../Character/CharacterCard';
// Modules react
import { useState, useEffect } from 'react';
// Modules yarn
import axios from 'axios';
import Cookies from 'js-cookie';

const Characters = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [characters, setCharacters] = useState([]);
    const [search, setSearch] = useState('');
    const [limit, setLimit] = useState(100);
    const [currentPage, setCurrentPage] = useState(1);
    const [favorites, setFavorites] = useState([]);

    const addToFavorites = characterId => {
        const copyFavorites = [...favorites];
        copyFavorites.push(characterId);
        Cookies.set('characters_favorites', JSON.stringify(copyFavorites));
        setFavorites(copyFavorites);
    };

    const removeFromFavorites = characterId => {
        const copyFavorites = [...favorites];
        const index = copyFavorites.indexOf(characterId);

        if (index !== -1) {
            copyFavorites.splice(index, 1);
        }

        Cookies.set('characters_favorites', JSON.stringify(copyFavorites));
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

        // Récupération des personnages favoris
        const charactersFavorites = Cookies.get('characters_favorites');
        charactersFavorites && setFavorites(JSON.parse(charactersFavorites));
    }, [search, limit, currentPage]);

    return isLoading ? (
        <p>Chargement en cours...</p>
    ) : (
        <main className="main-characters">
            <div className="container">
                <div className="filters">
                    <Search search={search} setSearch={setSearch} searchLabel="personnage" />

                    <Limit limit={limit} setLimit={setLimit} setCurrentPage={setCurrentPage} />
                </div>

                <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} numberOfPages={Math.ceil(characters.count / limit)} />

                <section className="characters">
                    {characters.results.map(character => {
                        return <CharacterCard character={character} key={character._id} favorites={favorites} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} />;
                    })}
                </section>

                <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} numberOfPages={Math.ceil(characters.count / limit)} />
            </div>
        </main>
    );
};

export default Characters;
