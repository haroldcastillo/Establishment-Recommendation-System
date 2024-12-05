import React, { useEffect, useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Polyline,
    useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Geocoding function using Nominatim
const geocodeLocation = async (address) => {
    const url = `https://nominatim.openstreetmap.org/search?q=${address}&format=json&limit=1`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lng: parseFloat(data[0].lon),
            };
        }
    } catch (error) {
        console.error("Error fetching geocode:", error);
    }
    return null;
};

// Fetch route between two points using OSRM
const fetchRoute = async (pointA, pointB) => {
    const url = `https://router.project-osrm.org/route/v1/driving/${pointA.lng},${pointA.lat};${pointB.lng},${pointB.lat}?overview=full&geometries=geojson`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.routes && data.routes.length > 0) {
            return data.routes[0].geometry.coordinates.map(([lng, lat]) => [
                lat,
                lng,
            ]);
        }
    } catch (error) {
        console.error("Error fetching route:", error);
    }
    return [];
};

// Custom hook to adjust map view to fit the route
const AdjustMapView = ({ route }) => {
    const map = useMap();

    useEffect(() => {
        if (route.length > 0) {
            const bounds = route.map((coord) => [coord[0], coord[1]]);
            map.fitBounds(bounds);
        }
    }, [route, map]);

    return null;
};

const OpenStreetMapWithRouting = ({ locationOne, locationTwo }) => {
    const [coordinatesOne, setCoordinatesOne] = useState(null);
    const [coordinatesTwo, setCoordinatesTwo] = useState(null);
    const [route, setRoute] = useState([]);
    const [isMapReady, setIsMapReady] = useState(false);

    useEffect(() => {
        const fetchLocationsAndRoute = async () => {
            const pointA = await geocodeLocation(locationOne);
            const pointB = await geocodeLocation(locationTwo);

            if (pointA && pointB) {
                setCoordinatesOne(pointA);
                setCoordinatesTwo(pointB);

                const routeData = await fetchRoute(pointA, pointB);
                setRoute(routeData);

                if (routeData.length > 0) {
                    setIsMapReady(true); // Set map as ready when route is available
                }
            }
        };
        setIsMapReady(false); // Reset map ready state when fetching new route
        fetchLocationsAndRoute();
    }, [locationOne, locationTwo]); // Re-fetch when location changes

    return (
        <div
            style={{
                height: "50vh",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {isMapReady ? ( // Conditionally render map only when route is ready
                <MapContainer
                    center={[14.676041, 121.0437]} // Default center
                    zoom={13}
                    style={{ height: "100%", width: "100%", zIndex: "5" }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {coordinatesOne && (
                        <Marker
                            position={[coordinatesOne.lat, coordinatesOne.lng]}
                        />
                    )}
                    {coordinatesTwo && (
                        <Marker
                            position={[coordinatesTwo.lat, coordinatesTwo.lng]}
                        />
                    )}
                    {route.length > 0 && (
                        <Polyline positions={route} color="blue" />
                    )}
                    <AdjustMapView route={route} />
                </MapContainer>
            ) : (
                "loading..."
            )}
        </div>
    );
};

export default OpenStreetMapWithRouting;
