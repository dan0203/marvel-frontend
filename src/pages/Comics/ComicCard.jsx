// Modules internes
import './ComicCard.css';
import defaultImage from '../../assets/images/default.jpg';
import Button from '../../components/Button/Button';
// Modules yarn
import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';

const ComicCard = ({ comic, favorites, addToFavorites, removeFromFavorites }) => {
    return (
        <>
            <article className="comic-card">
                <Button
                    text={favorites.includes(comic._id) ? <FaHeart /> : <FaRegHeart />}
                    className="add-to-favorite"
                    onClickFunc={() => {
                        // Ajouter le nouveau favori
                        if (!favorites.includes(comic._id)) {
                            addToFavorites(comic._id);
                        } else {
                            removeFromFavorites(comic._id);
                        }
                    }}
                />

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
