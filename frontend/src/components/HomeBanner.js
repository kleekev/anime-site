import { Link } from 'react-router-dom';

const HomeBanner = () => {
    return (
        <div className="join-banner">
            <h1 className='header'>AniTrack</h1>
            <h2 className="subheader">Track, socialize, and find your new favorite anime with AniTrack</h2>
            <Link to='/signup'>
                Join Now!
            </Link>
        </div>
    )
}

export default HomeBanner