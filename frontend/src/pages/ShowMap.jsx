/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import { useLocation } from "react-router-dom";
import PickupHeader from "./PickupHeader";
import PickupTable from "./PickupTable";

const ShowMap = () => {
  const { state } = useLocation();
  const routeData = state?.routeData;


  // Ensure `routeData` is available
  if (!routeData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-medium text-gray-700">Loading route data...</div>
      </div>
    );
  }


  const { office, selectedBins } = routeData;


  const RoutingMachine = ({ waypoints }) => {
    const map = useMap();


    useEffect(() => {
      if (!map) return;


      const routingControl = L.Routing.control({
        waypoints: waypoints,
        routeWhileDragging: true,
        show: true,
        addWaypoints: false,
        createMarker: function (i, waypoint) {
          return L.marker(waypoint.latLng).bindPopup(
            i === 0
              ? "Office"
              : i === waypoints.length - 1
              ? "Office (Return)"
              : `Bin Location ${i}`
          );
        },
      }).addTo(map);


      return () => map.removeControl(routingControl);
    }, [map, waypoints]);


    return null;
  };


  const waypoints = [
    L.latLng(office.latitude, office.longitude), // Start from the office
    ...selectedBins.map((bin) => L.latLng(bin.latitude, bin.longitude)),
    L.latLng(office.latitude, office.longitude), // Return to the office
  ];


  return (
    <div>
      <PickupHeader></PickupHeader>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Route Map</h1>
      <div className="w-full max-w-6xl">
        <MapContainer
          center={[office.latitude, office.longitude]}
          zoom={13}
          className="h-[75vh] w-full rounded-lg shadow-lg"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <RoutingMachine waypoints={waypoints} />
          {selectedBins.map((bin, index) => (
            <Marker key={index} position={[bin.latitude, bin.longitude]}>
              <Popup>
                Bin Location {index + 1} <br />
                Fill Level: {bin.fillLevel}%
              </Popup>
            </Marker>
          ))}
          <Marker position={[office.latitude, office.longitude]}>
            <Popup>Office Location</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
    <PickupTable bins={selectedBins} />
    </div>
  );
};


export default ShowMap;



