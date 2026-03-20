// Modules internes
import './Characters.css';
import Search from '../../components/Search/Search';
import Limit from '../../components/Limit/Limit';
import CharacterCard from '../Character/CharacterCard';
import Pagination from '../../components/Pagination/Pagination';
// Modules react
import { useState, useEffect } from 'react';
// Modules yarn
import axios from 'axios';

const Characters = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [characters, setCharacters] = useState([]);
    const [search, setSearch] = useState('');
    const [limit, setLimit] = useState(100);
    const [currentPage, setCurrentPage] = useState(1);

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

                <div className="characters">
                    {characters.results.map(character => {
                        return <CharacterCard character={character} key={character._id} />;
                    })}
                </div>

                <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} numberOfPages={Math.ceil(characters.count / limit)} />
            </div>
        </main>
    );
};

export default Characters;
