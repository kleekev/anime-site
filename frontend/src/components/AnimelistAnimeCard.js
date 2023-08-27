import { Link } from "react-router-dom";

const AnimelistAnimeCard = (props) => {
    const anime = props.details;

    return (
        <div className="animelist-card">
            <img src={anime.main_picture} alt={anime.title} />
            <div className="card-body">
                <Link className="title" to={'/anime?id=' + anime.anime_id}>{anime.title}</Link>
                <span className="score">{anime.score}</span>
                <span className="status">{anime.status}</span>
                <span className="progress">{anime.progress}/{anime.episodes}</span>
                <Link>Edit</Link>
            </div>
        </div>
    )
}

export default AnimelistAnimeCard