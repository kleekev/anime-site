import { useEffect, useState } from "react"
import { LoadingOutlined } from '@ant-design/icons'
import { Select, InputNumber } from 'antd'
import { useAuthContext } from '../hooks/useAuthContext';

const EditAnime = () => {
    const anime_id = window.location.search.substring(1).split('=')[1];
    const { user } = useAuthContext();
    const email = user.email;

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [animeDetails, setAnimeDetails] = useState(null);
    const [status, setStatus] = useState('');
    const [score, setScore] = useState(0);
    const [episodes, setEpisodes] = useState(0);

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
    }, [])
    
    const handleSubmit = async () => {
        setIsLoading(true);
        setError(error);

        const response = await fetch('http://localhost:4000/api/users/animelist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`},
            body: JSON.stringify({email, anime_id, score, status, episodes})
        });

        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }
        setIsLoading(false);
    }

    return (
        <div className="edit-anime">
            {isLoading ? <LoadingOutlined className="loading-icon"/> :
            <>
                <h1 className="anime-details-title">Add {animeDetails.title} to your list</h1> 
                <div className="body">
                    <img src={animeDetails.main_picture} alt={animeDetails.title} />
                    <form className="add-to-list-form"noValidate onSubmit={handleSubmit}>
                        <div className="form-inputs">
                            <div className="status inputs">
                                <label>Status</label>
                                <Select
                                defaultValue=""
                                style={{ width: 200 }}
                                onChange={(value) => setStatus(value)}
                                options={[
                                    { value: 'watching', label: 'Watching' },
                                    { value: 'planned', label: 'Plan to Watch' },
                                    { value: 'completed', label: 'Completed' },
                                    { value: 'dropped', label: 'Dropped' },
                                ]}
                                />
                            </div>
                            <div className="score inputs">
                                <label>Score</label>
                                <Select
                                defaultValue=""
                                style={{ width: 200 }}
                                onChange={(value) => setScore(value)}
                                options={[
                                    { value: 10, label: 10 },
                                    { value: 9, label: 9 },
                                    { value: 8, label: 8 },
                                    { value: 7, label: 7 },
                                    { value: 6, label: 6 },
                                    { value: 5, label: 5 },
                                    { value: 4, label: 4 },
                                    { value: 3, label: 3 },
                                    { value: 2, label: 2 },
                                    { value: 1, label: 1 }
                                ]}
                                />
                            </div>
                            <div className="episodes inputs">
                            <label>Episodes</label>
                            <InputNumber 
                                size="large" 
                                min={0} 
                                max={animeDetails.episodes} 
                                defaultValue={0} 
                                style={{ width: 200 }}
                                onChange={(value) => setEpisodes(value)}
                            />
                            </div>
                            <button>Add to List</button>
                        </div>
                    </form>
                </div>
            </>
            }
            
        </div>
    )
}

export default EditAnime