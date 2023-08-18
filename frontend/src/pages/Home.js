import { useEffect, useState } from 'react'
import { Table } from 'antd';

const Home = () => {
    const [seasonalAnime, setSeasonalAnime] = useState(null);

    useEffect(() => {
        const fetchSeasonalAnime = async () => {
            const response = await fetch('http://localhost:4000/api/animes/search?season=summer&year=2023')
            const json = await response.json();

            if (response.ok) {
                setSeasonalAnime(json);
            }
        }

        fetchSeasonalAnime()
    }, [])

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => a.title.localeCompare(b.title),
            render: (text, record) =>(
                <div className="anime-card">
                    <img alt={record.main_picture} src={record.main_picture} />
                    <div className="anime-card-info">
                        <p>{text}</p>
                        <p>Rating: {record.rating.toUpperCase()}</p>
                    </div>
                </div>
            ) 
        },
        {
            title: 'Score',
            dataIndex: 'score',
            key: 'score',
            render: (text, record) => (
                <div className="score">
                    <p>{text.toPrecision(3)}</p>
                </div>
            )
        }
    ];

    return (
        <div className="home">
            <h1>Summer 2023 Anime</h1>
            <div className="seasonal">
                <Table dataSource={seasonalAnime} columns={columns} />
            </div>
        </div>
    )
}

export default Home