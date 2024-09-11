import React, {useState} from 'react';

function MarkerForm({addMarker}) {
    const [coordsInput, setCoordsInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const parts = coordsInput.split(',');
        const lat = parseFloat(parts[0]);
        const lng = parseFloat(parts[1]);

        if (!isNaN(lat) && !isNaN(lng)) {
            const newCoords = {lat, lng};
            addMarker(newCoords)
            setCoordsInput('');
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 50px',
            backgroundColor: '#f8f9fa',
            borderBottom: '1px solid #9e9e9e'
        }}>
            <h1 style={{margin: '0', flex: '1 1 auto', textAlign: 'left'}}>MapPointView</h1>
            <form onSubmit={handleSubmit} style={{display: 'flex', justifyContent: 'center', flex: '2 1 auto'}}>
                <input
                    type="text"
                    value={coordsInput}
                    onChange={(e) => setCoordsInput(e.target.value)}
                    placeholder="latitude, longitude"
                    required
                    style={{
                        padding: '10px',
                        fontSize: '16px',
                        width: '300px',
                        borderRadius: '8px',
                        border: '1px solid #ccc'
                    }}
                />
                <button type="submit" style={{
                    padding: '10px 20px',
                    marginLeft: '10px',
                    fontSize: '16px',
                    backgroundColor: '#376fe8',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '8px'
                }}>
                    Add Marker
                </button>
            </form>
            <div style={{flex: '1 1 auto'}}></div>
        </div>
    );
}

export default MarkerForm;
