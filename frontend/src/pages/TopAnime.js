import { useEffect, useState } from 'react'
import { LoadingOutlined } from '@ant-design/icons'

// components
import Filterbar from '../components/Filterbar';
import AnimeCard from '../components/AnimeCard';

const TopAnime = () => {
    let s = new Set();
    const [topAnimes, setTopAnimes] = useState([]);
    const [top100Animes, setTop100Animes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filterData, setFilterData] = useState({'season': '', 
                                                  'type': '',
                                                  'rating': ''});

    useEffect(() => {
        const fetchTopAnime = async () => {
            setIsLoading(true);
            const response = await fetch('http://localhost:4000/api/animes/search/top_animes')
            const json = await response.json();

            if (response.ok) {
                setTopAnimes(json);
                setTop100Animes(json.slice(0, 100));
                json.map((anime) => s.add(anime.rating))
                console.log(s);
                console.log(json.slice(0, 100))
            }
            setIsLoading(false);
        }
        
        fetchTopAnime()
    }, [])

    useEffect(() => {
        let filteredResults = topAnimes
        if (filterData.season !== '') {
            filteredResults = topAnimes.filter((anime) => anime.start_season === filterData.season);
        }
        if (filterData.type !== '') {
            filteredResults = filteredResults.filter((anime) => anime.type === filterData.type);
        }
        if (filterData.rating !== '') {
            filteredResults = filteredResults.filter((anime) => anime.rating === filterData.rating);
        }
        console.log(filterData);
        setTop100Animes(filteredResults.slice(0, 100))
    }, [filterData.season, filterData.type, filterData.rating])

    return (
        <div className="top-animes-page">
            {isLoading ? <LoadingOutlined className='loading-icon' /> :
            <>
                <h2>Top 100 Animes</h2>
                <Filterbar getFilterData={setFilterData} data={filterData}/>
                {top100Animes.length == 0 ? <div>No Results</div> : 
                <div className="top-animes-list">
                    {top100Animes.map((anime, index) => <AnimeCard anime={anime} rank={index+1}/>)}
                </div>
                }
            </>  
            }
        </div>
    )
}

export default TopAnime