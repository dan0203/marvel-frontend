// Modules internes
import './ComicsList.css';
import ComicCard from '../ComicCard/ComicCard';

const ComicsList = ({ comics, favorites, addToFavorites, removeFromFavorites }) => {
    return (
        <div className="comics-list list">
            {comics.map(comic => {
                return <ComicCard comic={comic} key={comic._id} favoriteComics={favorites} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} />;
            })}
        </div>
    );
};

export default ComicsList;
