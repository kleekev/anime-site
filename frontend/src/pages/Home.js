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
            title: "Image",
            dataIndex: "main_picture",  // this is the value that is parsed from the DB / server side
            render: theImageURL => <img alt={theImageURL} src={theImageURL} />  // 'theImageURL' is the variable you must declare in order the render the URL
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => a.title.localeCompare(b.title)
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