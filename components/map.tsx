/*Since the map was loaded on client side, 
we need to make this component client rendered as well*/
'use client'

//Map component Component from library
import { GoogleMap, Marker } from "@react-google-maps/api";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
const defaultMapZoom = 15

//Map options
const defaultMapOptions = {
    zoomControl: false,
    mapTypeId: 'roadmap',
};
const markers = [
    { id: 1, position: { lat: 41.0082, lng: 28.9784 }, color: "#24A1DE" },
    { id: 2, position: { lat: 41.015137, lng: 28.979530 }, color: "#24A1DE" },
    { id: 3, position: { lat: 40.990073, lng: 29.024776 }, color: "#24A1DE" },
];

interface Location {
    lat: number;
    lng: number;
  }
  
  interface MapComponentProps {
    location?: Location[];
  }
  
  const MapComponent: React.FC<MapComponentProps> = ({ location }) => {
    const pathname = usePathname();
    const [currentPosition, setCurrentPosition] = useState<{
        lat: number;
        lng: number;
    } | null>(null);

    function getNavigation() {
        console.log(pathname, 'pathname');
        if (navigator.geolocation) {
            const watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentPosition({ lat: latitude, lng: longitude });
                    localStorage.setItem('latlong', JSON.stringify({ lat: latitude, lng: longitude }));
                },
                (error) => {
                    console.error("Konum alınırken hata oluştu:", error);
                },
                { enableHighAccuracy: true }
            );

            // watchPosition'u temizle
            return () => navigator.geolocation.clearWatch(watchId);
        } else {
            console.error("Geolocation API desteklenmiyor.");
        }
    }
    useEffect(() => {
        if (!currentPosition) {
            console.log('currentPosition', currentPosition);
            getNavigation();
            const latlong = localStorage.getItem('latlong');
            if (latlong) {
                setCurrentPosition(JSON.parse(latlong));
            }
        }
    }, [currentPosition]);
    return (
        <div className="w-full">
            <GoogleMap
                mapContainerStyle={defaultMapContainerStyle}
                center={currentPosition ? currentPosition : defaultMapCenter}
                zoom={defaultMapZoom}
                options={defaultMapOptions}
            >
                {location && location.map((marker,index) => (
                    <Marker
                        icon={{
                            path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 11 7 11s7-5.75 7-11c0-3.87-3.13-7-7-7zm0 10.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z",
                            fillColor: "#24A1DE",
                            fillOpacity: 1,
                            strokeWeight: 1,
                            scale: 2,
                            anchor: new google.maps.Point(12, 22), // `google.maps.Point` ile oluşturuldu
                        }}
                        key={index}
                        position={marker}
                    />

                ))}
                {currentPosition ?
                    <Marker position={currentPosition} />
                    : null
                }

            </GoogleMap>
        </div>
    )
};

export { MapComponent };