// Modules yarn
import Cookies from 'js-cookie';

export const handleFavorites = (favorites, id, category, type, setState) => {
    // category === "characters" ou "comics"
    // type === "add" ou "remove"

    const copyFavorites = [...favorites];

    if (type === 'add') {
        copyFavorites.push(id);
    } else if (type === 'remove') {
        const index = copyFavorites.indexOf(id);

        if (index !== -1) {
            copyFavorites.splice(index, 1);
        }
    }

    Cookies.set(`${category}_favorites`, JSON.stringify(copyFavorites));
    setState(copyFavorites);
};

// export const addToFavorites = (favorites, id, category) => {
//     const copyFavorites = [...favorites];
//     copyFavorites.push(id);
//     if (category === 'characters') {
//         Cookies.set('characters_favorites', JSON.stringify(copyFavorites));
//         setFavoriteCharacters(copyFavorites);
//     } else if (category === 'comics') {
//         Cookies.set('comics_favorites', JSON.stringify(copyFavorites));
//         setFavoriteComics(copyFavorites);
//     }
// };

// export const removeFromFavorites = (favorites, id, category) => {
//     const copyFavorites = [...favorites];
//     const index = copyFavorites.indexOf(id);

//     if (index !== -1) {
//         copyFavorites.splice(index, 1);
//     }

//     if (category === 'characters') {
//         Cookies.set('characters_favorites', JSON.stringify(copyFavorites));
//         setFavoriteCharacters(copyFavorites);
//     } else if (category === 'comics') {
//         Cookies.set('comics_favorites', JSON.stringify(copyFavorites));
//         setFavoriteComics(copyFavorites);
//     }
// };
