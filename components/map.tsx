/*Since the map was loaded on client side, 
we need to make this component client rendered as well*/
'use client'

//Map component Component from library
import { GoogleMap } from "@react-google-maps/api";

//Map's styling
const defaultMapContainerStyle = {
    width: '100%',
    height: '25vh',
    borderRadius: '15px',
};

//K2's coordinates
const defaultMapCenter = {
    lat: 41.0082, // İstanbul'un enlemi
    lng: 28.9784  // İstanbul'un boylamı
};

//Default zoom level, can be adjusted
const defaultMapZoom = 20

//Map options
const defaultMapOptions = {
    zoomControl: false,
    mapTypeId: 'roadmap',
};

const MapComponent = () => {
    return (
        <div className="w-full h-40">
            <GoogleMap
                mapContainerStyle={defaultMapContainerStyle}
                center={defaultMapCenter}
                zoom={defaultMapZoom}
                options={defaultMapOptions}
            >
            </GoogleMap>
        </div>
    )
};

export { MapComponent };