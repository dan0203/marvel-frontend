// Modules internes
import './Comics.css';
// Modules react
import { useState, useEffect } from 'react';
// Modules yarn
import axios from 'axios';

const Comics = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [comics, setComics] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Récupération des données de tous les comics
                const response = await axios.get(import.meta.env.VITE_API_URL + '/comics');

                setComics(response.data);
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

            {comics.results
                .filter(comic => {
                    // Filtrer les comics dont le titre contient le terme saisi dans la barre recherche (en minuscules pour ne pas tenir compte de la casse)
                    return comic.title.toLowerCase().includes(search.toLowerCase());
                })
                .map(comic => {
                    return (
                        <article key={comic._id}>
                            <img src={`${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`} alt={comic.title} />
                            <p className="title">{comic.title}</p>
                            <p className="description">{comic.description}</p>
                        </article>
                    );
                })}
        </main>
    );
};

export default Comics;
