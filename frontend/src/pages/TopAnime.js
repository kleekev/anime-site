import { useEffect, useState } from 'react'
import { StarFilled } from '@ant-design/icons';
import { Table } from 'antd';

const captialize =  (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

const TopAnime = () => {
    const [topAnimes, setTopAnimes] = useState(null);

    useEffect(() => {
        const fetchTopAnime = async () => {
            const response = await fetch('http://localhost:4000/api/animes/search/top_animes')
            const json = await response.json();

            if (response.ok) {
                setTopAnimes(json);
            }
        }

        fetchTopAnime()
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
                        <p>{text + ' (' + captialize(record.type) + ')'}</p>
                        <p>{record.episodes} eps</p>
                        <p>{captialize(record.start_season) + ' ' + record.start_year}</p>
                        <p>Rating: {record.rating ? record.rating.toUpperCase(): 'N/A'}</p>
                    </div>
                </div>
            ) 
        },
        {
            title: 'Score',
            dataIndex: 'score',
            key: 'score',
            sorter: (a, b) => a.score - (b.score),
            render: (text, record) => (
                <div className="score">
                    <p> <StarFilled className='stars' /> {text ? text.toPrecision(3) : 'N/A'}</p>
                </div>
            )
        }
    ];

    

    return (
        <div className="top-anime">
            <h1>Top 100 Ranked Animes</h1>
            <div className="top-animes-list">
                <Table dataSource={topAnimes} columns={columns} />
            </div>
        </div>
    )
}

export default TopAnime