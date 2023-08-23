import { useState } from 'react'
import { Select } from 'antd'

const Filterbar = () => {
    const [season, setSeason] = useState('');

    const handleSeasonChange = (value) => {
        console.log(value);
        setSeason(value);
    }
    return (
        <div className="filter-bar">
            <Select
                defaultValue='Any'
                size='medium'
                placeholder='Any'
                style={{ width: 125 }}
                onChange={handleSeasonChange}
                options={[
                    { value: 'winter', label: 'Winter' },
                    { value: 'spring', label: 'Spring' },
                    { value: 'summer', label: 'Summer' },
                    { value: 'fall', label: 'Fall' },
                ]}
                value={season}
            />
        </div>
    )
}

export default Filterbar