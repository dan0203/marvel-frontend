// Modules internes
import './ComicCard.css';
import defaultImage from '../../assets/images/default.jpg';
import Button from '../../components/Button/Button';
// Modules yarn
import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';

const ComicCard = ({ comic, favoriteComics, addToFavorites, removeFromFavorites }) => {
    return (
        <>
            <article className="card">
                <Button
                    text={favoriteComics && favoriteComics.includes(comic._id) ? <FaHeart /> : <FaRegHeart />}
                    className="add-to-favorite"
                    onClickFunc={() => {
                        if (!favoriteComics.includes(comic._id)) {
                            // Ajouter le nouveau favori
                            addToFavorites(favoriteComics, comic._id, 'comics');
                        } else {
                            // Retirer le nouveau favori
                            removeFromFavorites(favoriteComics, comic._id, 'comics');
                        }
                    }}
                />

                <h3>{comic.title}</h3>
                <div className="content">
                    <img src={comic.thumbnail.path ? `${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}` : defaultImage} alt={comic.title} onError={e => (e.target.src = defaultImage)} />
                    <p>{comic.description || 'N/A'}</p>
                </div>
            </article>
        </>
    );
};

export default ComicCard;
