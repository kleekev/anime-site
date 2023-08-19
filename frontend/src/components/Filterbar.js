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
                placeholder="Select a season"
                style={{ width: 120 }}
                onChange={handleSeasonChange}
                options={[
                    { value: 'winter', label: 'Winter' },
                    { value: 'spring', label: 'Spring' },
                    { value: 'summer', label: 'Summer' },
                    { value: 'fall', label: 'Fall' },
                ]}
            />
        </div>
    )
}

export default Filterbar