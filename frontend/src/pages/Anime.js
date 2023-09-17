import { useEffect, useState } from "react"
import { LoadingOutlined, HeartFilled } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext';

// helper functions
import capitalize from '../helper/Capitalize'
import formatSource from "../helper/formatSource";

const Anime = () => {
    const anime_id = window.location.search.substring(1).split('=')[1] 

    const [isLoading, setIsLoading] = useState(true);
    const [animeDetails, setAnimeDetails] = useState(null);
    const [error, setError] = useState(null);
    const [errorClass, setErrorClass] = useState('error');
    const { user } = useAuthContext();

    useEffect(() => { 
        const fetchAnimeDetails = async () => {
            setIsLoading(true);
            const response = await fetch('http://localhost:4000/api/animes/'+ anime_id)
            const json = await response.json();

            if (response.ok) {
                setAnimeDetails(json);
            }
            setIsLoading(false);
        }

        fetchAnimeDetails();
    }, [anime_id])

    const handleClick = async () => {
        if (user) {
            const email = user.email;
            
            const response = await fetch('http://localhost:4000/api/users/favoritelist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`},
                body: JSON.stringify({email, anime_id})
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error);
                setErrorClass('error');
                console.log(json.error)
            }
        }
    }

    const handleErrorClick = (e) => {
        console.log(e);
        setErrorClass('error delete')
    }

    return (
        <div className="anime-details">
            {error && <div className={errorClass} onClick={handleErrorClick}>{error}</div>}
            {isLoading ? <LoadingOutlined className="loading-icon"/> :
            <>
                <h1 className="anime-details-title">{animeDetails.title}</h1>
                <div className="body">
                    <img src={animeDetails.main_picture} alt={animeDetails.title} />
                    <div className="body-details">
                        <h2>Synopsis</h2>
                        <hr/>
                        <p>{animeDetails.synopsis}</p>
                        <h2 className="details-header">Details</h2>
                        <hr />
                        <div className="footer">
                            <div className="footer-details">
                                <p>Season: {capitalize(animeDetails.start_season) + ' ' + animeDetails.start_year}</p>
                                <p>Format: {animeDetails.type ? capitalize(animeDetails.type) : ''}</p>
                                <p>Score: {animeDetails.score}</p>
                                <p>Episodes: {animeDetails.episodes}</p>
                                <p>Start Date: {animeDetails.start_date}</p>
                                <p>Source: {animeDetails.source ? formatSource(animeDetails.source) : ''}</p>
                                <p>Rating: {animeDetails.rating.toUpperCase()} </p>
                                <p>Studio: {animeDetails.studios[0]}</p>
                            </div>
                            <div className="list-actions">
                                <Link to={'/anime/list?=' + anime_id}>Add to List</Link>
                                <button>{<HeartFilled onClick={handleClick} className="heart-icon"/>}</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="genres">
                    {animeDetails.genres.map((genre) => (<span id={genre.toLowerCase().replace(' ', '-')}>{genre}</span>))}
                </div>
            </>
            }
        </div>
    )
}

export default Anime