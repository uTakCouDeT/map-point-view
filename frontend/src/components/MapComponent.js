import React, {useState, useEffect} from 'react';
import {MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import MarkerForm from "./MarkerForm";

const customIcon = L.icon({
    iconUrl: '/marker-icon.png',
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [1, -34],
});

const AttributionControl = ({prefix}) => {
    const map = useMap();

    React.useEffect(() => {
        if (map) {
            map.attributionControl.setPrefix(prefix);
        }
    }, [map, prefix]);

    return null;
};

function LocationMarker({onAdd}) {
    useMapEvents({
        click(e) {
            onAdd(e.latlng);
        }
    });

    return null;
}

function MapHandler({onZoomChange, onCenterChange}) {
    const map = useMapEvents({
        zoomend: () => {
            onZoomChange(map.getZoom());
        },
        moveend: () => {
            onCenterChange(map.getCenter());
        }
    });

    return null;
}

const MapComponent = () => {
    const [markers, setMarkers] = useState(
        JSON.parse(localStorage.getItem('markers')) || [{id: 0, coords: {lat: 55.789006, lng: 37.729242}}]
    );
    const [center, setCenter] = useState(
        JSON.parse(localStorage.getItem('center')) || {lat: 55.789006, lng: 37.729242}
    );
    const [zoom, setZoom] = useState(
        JSON.parse(localStorage.getItem('zoom')) || 7
    );

    useEffect(() => {
        localStorage.setItem('markers', JSON.stringify(markers));
        localStorage.setItem('center', JSON.stringify(center));
        localStorage.setItem('zoom', JSON.stringify(zoom));
    }, [markers, center, zoom]);

    const handleCenterChange = (newCenter) => {
        setCenter(newCenter);
    };

    const handleZoomChange = (newZoom) => {
        setZoom(newZoom);
    };

    const addMarker = (newLatLng) => {
        setMarkers(markers => [
            ...markers,
            {id: Date.now(), coords: newLatLng}
        ]);
    };

    const removeMarker = (id) => {
        setMarkers(markers => markers.filter(marker => marker.id !== id));
    };

    const handleDeleteClick = (e, id) => {
        e.stopPropagation();
        removeMarker(id);
    };

    const MarkerPopup = ({marker}) => (
        <Popup>
            <div style={{fontSize: "16px", marginBottom: "12px"}}>Marker at:</div>
            <div><strong>Latitude:</strong> {marker.coords.lat.toFixed(3)}</div>
            <div><strong>Longitude:</strong> {marker.coords.lng.toFixed(3)}</div>
            <button
                onClick={(e) => handleDeleteClick(e, marker.id)}
                style={{
                    marginTop: "12px",
                    color: "#fff",
                    backgroundColor: "#dc3545",
                    border: "none",
                    borderRadius: "4px",
                    padding: "6px 12px",
                    cursor: "pointer"
                }}>
                Delete
            </button>
        </Popup>
    );

    return (
        <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
            <MarkerForm addMarker={addMarker}/>
            <MapContainer style={{height: '100%', width: '100%'}}
                          center={center}
                          zoom={zoom}
                          minZoom={0}
                          maxZoom={9}
                          crs={L.CRS.EPSG3395}
            >
                <TileLayer url="http://localhost:8000/z{z}/0/x{x}/0/y{y}.png" zoomOffset={1}/>
                {/*<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>*/}
                {markers.map((marker) => (
                    <Marker key={marker.id} position={marker.coords} icon={customIcon}>
                        <MarkerPopup marker={marker}/>
                    </Marker>
                ))}
                <LocationMarker onAdd={addMarker}/>
                <MapHandler onZoomChange={handleZoomChange} onCenterChange={handleCenterChange}/>
                <AttributionControl prefix=""/>
            </MapContainer>
        </div>
    );
};

export default MapComponent;
