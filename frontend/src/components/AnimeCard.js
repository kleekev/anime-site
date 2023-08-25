// helper functions
import capitalize from '../helper/Capitalize'

const AnimeCard = (props) => {
    const anime = props.anime;
    const rank = props.rank;
    
    const filteredGenres = anime.genres.filter((genre) => genre !== 'Slice of Life').filter((genre) => genre !== 'Award Winning').slice(0,3);

    return (
        <div className="anime-card">
            <div className="image-container">
                <img src={anime.main_picture} alt={anime.title} />
                <div>{capitalize(anime.title)}</div>
            </div>

            <div className="anime-card-details">
                <div className="header">
                    # {rank}
                </div>
                <div className="description">
                    {anime.synopsis}
                </div>
                <div className="footer">
                    {filteredGenres.map((genre) => (<span id={genre.toLowerCase().replace(' ', '-')}>{genre}</span>))}
                </div>
            </div>
        </div>
    )
}

export default AnimeCard