// Modules internes
import './ComicCard.css';
import defaultImage from '../../assets/images/default.jpg';
import Button from '../../components/Button/Button';
// Modules react
import { useState } from 'react';
// Modules yarn
import Cookies from 'js-cookie';

const ComicCard = ({ comic }) => {
    const [favorites, setFavorites] = useState(JSON.parse(Cookies.get('comics_favorites')));

    return (
        <>
            <article className="comic-card">
                {/* <Button
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
                /> */}

                <h2>{comic.title}</h2>
                <div className="content">
                    <img src={comic.thumbnail.path ? `${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}` : defaultImage} alt={comic.title} onError={e => (e.target.src = defaultImage)} />
                    <p>{comic.description || 'N/A'}</p>
                </div>
            </article>
        </>
    );
};

export default ComicCard;
