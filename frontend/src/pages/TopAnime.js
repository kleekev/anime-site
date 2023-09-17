import { useEffect, useState } from 'react'
import { LoadingOutlined } from '@ant-design/icons'

// components
import Filterbar from '../components/Filterbar';
import AnimeCard from '../components/AnimeCard';

const TopAnime = () => {
    const [topAnimes, setTopAnimes] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTopAnime = async () => {
            setIsLoading(true);
            const response = await fetch('http://localhost:4000/api/animes/search/top_animes')
            const json = await response.json();

            if (response.ok) {
                setTopAnimes(json);
            }
            setIsLoading(false);
        }
        
        fetchTopAnime()
    }, [])


    

    return (
        <div className="top-animes-page">
            {isLoading ? <LoadingOutlined className='loading-icon' /> :
            <>
                <h2>Top 100 Animes</h2>
                <Filterbar />
                <div className="top-animes-list">
                    {topAnimes.map((anime, index) => <AnimeCard anime={anime} rank={index+1}/>)}
                </div>
            </>  
            }
        </div>
    )
}

export default TopAnime