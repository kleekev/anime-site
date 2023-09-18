import { useState } from 'react'
import { Select } from 'antd'

const Filterbar = (props) => {

    const handleSeasonChange = (value) => {
        props.getFilterData({...props.data, 'season': value})
    }

    const handleTypeChange  = (value) => {
        props.getFilterData({...props.data, 'type': value})
    }

    const handleRatingChange = (value) => {
        props.getFilterData({...props.data, 'rating': value})
    }

    return (
        <div className="filter-bar">
            <div className='filter-title'>Filter Animes</div>
            <div className="filter-inputs">
                <Select
                    defaultValue='Season'
                    size='medium'
                    style={{ width: 125 }}
                    onChange={handleSeasonChange}
                    options={[
                        { value: '', label: 'All'},
                        { value: 'winter', label: 'Winter' },
                        { value: 'spring', label: 'Spring' },
                        { value: 'summer', label: 'Summer' },
                        { value: 'fall', label: 'Fall' },
                    ]}
                />
                <Select
                    defaultValue='Type'
                    size='medium'
                    style={{ width: 125 }}
                    onChange={handleTypeChange}
                    options={[
                        { value: '', label: 'All'},
                        { value: 'tv', label: 'TV' },
                        { value: 'special', label: 'Special' },
                        { value: 'movie', label: 'Movie' },
                        { value: 'ova', label: 'OVA' },
                        { value: 'music', label: 'Music' },
                        { value: 'ona', label: 'ONA' },
                    ]}
                />
                <Select
                    defaultValue='Rating'
                    size='medium'
                    style={{ width: 125 }}
                    onChange={handleRatingChange}
                    options={[
                        { value: '', label: 'All'},
                        { value: 'pg', label: 'PG' },
                        { value: 'g', label: 'G' },
                        { value: 'pg_13', label: 'PG_13' },
                        { value: 'r', label: 'R' },
                        { value: 'r+', label: 'R+' },
                    ]}
                />
            </div>
            
        </div>
    )
}

export default Filterbar