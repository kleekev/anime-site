import { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel';
import { Card } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom'

// components
import HomeBanner from '../components/HomeBanner';

const { Meta } = Card;

const Home = () => {
    const [seasonalAnime, setSeasonalAnime] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchSeasonalAnime = async () => {
            setIsLoading(true);
            const response = await fetch('http://localhost:4000/api/animes/search?season=summer&year=2023')
            const json = await response.json();

            if (response.ok) {
                const filteredJson = json.filter((anime) => {
                    return Object.keys(anime).length > 5;
                })
                setSeasonalAnime(filteredJson);
            }
            setIsLoading(false);
        }

        fetchSeasonalAnime()
    }, [])

    const responsive = {
        0: {
            items: 1,
            itemsFit: 'contain'
        },
        600: {
            items: 2,
            itemsFit: 'contain'
        },
        800: {
            items: 3,
            itemsFit: 'contain'
        },
        1000: {
            items: 4,
            itemsFit: 'contain'
        },
        1300: {
            items: 5,
            itemsFit: 'contain'
        },
    }

    return (
        <div className="home">
            {!user && <HomeBanner/>}
            {isLoading ? <LoadingOutlined className='loading-icon'/> :
                <div className="seasonal-animes">
                    <h2>Summer 2023 Anime</h2>
                    <AliceCarousel
                        autoPlay={true}
                        startIndex = {1}
                        disableDotsControls ={true}
                        fadeOutAnimation={true}
                        playButtonEnabled={true}
                        responsive={responsive}
                        autoPlayInterval={2000}
                        autoPlayActionDisabled={true}
                        infinite={true}
                    >
                        {seasonalAnime.map((anime) => (
                            <Link className='anime-card-link' to={'/anime?id=' + anime.anime_id}>
                                <Card className='seasonal-anime-card'
                                hoverable
                                style={{ width: 240 }}
                                cover={<img alt={anime.title} src={anime.main_picture} />}
                                >
                                <Meta id='seasonal-anime-desc'title={anime.title} description={"⭐ " + anime.score.toPrecision(3)} />
                                
                                </Card>
                            </Link>
                            
                        ))}
                    </AliceCarousel>
                </div>
            }
        </div>
    )
}

export default Home