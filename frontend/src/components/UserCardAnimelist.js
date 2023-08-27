import { useEffect, useState } from "react"
import { LoadingOutlined } from '@ant-design/icons'

// componenents 
import AnimelistAnimeCard from "./AnimelistAnimeCard";

const UserCardAnimelist = (props) => {
    const username = props.username;

    const [isLoading, setIsLoading] = useState(true);
    const [animelist, setAnimelist] = useState(null);
    

    useEffect(() => {
        const fetchAnimelist = async () => {
            setIsLoading(true);
            const response = await fetch('http://localhost:4000/api/users/animelist?username=' + username);
            const json = await response.json();

            if (response.ok) {
                setAnimelist(json);
            }
            setIsLoading(false);
        }
        fetchAnimelist();

    }, [])

    return (
        <div className="animelist">
            <div className="filterbar">
                Filter
            </div>
            <div className="animelist-list">
                
                {isLoading ? <LoadingOutlined className="loading-icon"/> :
                    animelist.map((anime) => <AnimelistAnimeCard details={anime}/>)
                }
            </div>
            
            
        </div>
    )
}

export default UserCardAnimelist