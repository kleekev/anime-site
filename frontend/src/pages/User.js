import { useAuthContext } from "../hooks/useAuthContext"
import { Link } from 'react-router-dom'
import userIcon from '../images/usericon.png'
import { useEffect, useState } from "react";

// components
import UserCardAnimelist from "../components/UserCardAnimelist";
import UserCardFavorite from "../components/UserCardFavorite";
import UserCardOverview from "../components/UserCardOverview";
import UserCardStats from "../components/UserCardStats";

const User = () => {
    const username = window.location.search.substring(1).split('=')[1].split('&')[0];
    const initialTab = window.location.search.substring(1).split('=')[2] || 'overview';

    const { user } = useAuthContext();

    const [tab, setTab] = useState(initialTab);

    return (
        <div className="user-page">
            <div className="header">
                <img src={userIcon} alt="user icon" />
                <h1>{username}'s Profile</h1>
            </div>
            <div className="user-navbar">
                <Link onClick={() => setTab('overview')} to={'/user?username=' + username}>Overview</Link>
                <Link onClick={() => setTab('animelist')} to={'/user?username=' + username + '&tab=animelist'}>AnimeList</Link>
                <Link onClick={() => setTab('stats')} to={'/user?username=' + username + '&tab=stats'}>Stats</Link>
                <Link onClick={() => setTab('favorites')} to={'/user?username=' + username + '&tab=favorites'}>Favorites</Link>
            </div>
            <div className="body">
                {tab === 'overview' ? <UserCardOverview/> :
                 tab === 'animelist' ? <UserCardAnimelist username={username}/> :
                 tab === 'stats' ? <UserCardStats/> :
                 tab === 'favorites' ? <UserCardFavorite/> : null}
            </div>
        </div>
    )
}

export default User