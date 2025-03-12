import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import { MdGpsFixed } from "react-icons/md";

interface IProps {
  selectedBranch?: IBranch;
  locationButton: boolean;
  clickable: boolean;
  setLatitude?: React.Dispatch<React.SetStateAction<string>>;
  setLongitude?: React.Dispatch<React.SetStateAction<string>>;
}

const LeafletMap: React.FC<IProps> = ({
  locationButton,
  selectedBranch,
  clickable,
  setLatitude,
  setLongitude,
}) => {
  const [position, setPosition] = useState<LatLngExpression | null>(null);
  const [mapInstance, setMapInstance] = useState<any>(null);

  const LocationMarker = () => {
    const map = useMap();
    useEffect(() => {
      setMapInstance(map);
    }, [map]);

    if (clickable) {
      useMapEvents({
        click(e) {
          setPosition([e.latlng.lat, e.latlng.lng]); // Bir marta bosganda joylashuv belgilash
          setLatitude!(e.latlng.lat + "");
          setLongitude!(e.latlng.lng + "");
        },
        dblclick(e) {
          map.setView([e.latlng.lat, e.latlng.lng], map.getZoom() + 1); // Ikki marta bosganda zoom oshirish
        },
      });
    }

    return position ? <Marker position={position} /> : null;
  };

  const defaultCenter: LatLngExpression = [
    42.45695229535686, 59.61407313472131,
  ];

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPos: LatLngExpression = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          setPosition(newPos);
          if (mapInstance) {
            mapInstance.setView(newPos, mapInstance.getZoom());
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };

  useEffect(() => {
    if (selectedBranch) {
      if (selectedBranch.point_array) {
        setPosition([
          selectedBranch?.point_array[1]!,
          selectedBranch?.point_array[0]!,
        ]);
      } else {
        setPosition([0, 0]);
      }
      if (mapInstance && selectedBranch.point_array) {
        mapInstance.setView(
          [selectedBranch?.point_array[1]!, selectedBranch?.point_array[0]!],
          mapInstance.getZoom()
        );
      }
    }
  }, [selectedBranch]);

  return (
    <div className="leaflet-map">
      {locationButton && (
        <button
          onClick={getCurrentLocation}
          style={{ marginBottom: "10px", padding: "5px 10px" }}
        >
          <MdGpsFixed />
        </button>
      )}
      <MapContainer
        center={defaultCenter}
        zoom={18}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker />
        {position && <Marker position={position} />}
      </MapContainer>
      {/* {position && (
        <p>
          Tanlangan joy: Lat: {(position as [number, number])[0]}, Lon:{" "}
          {(position as [number, number])[1]}
        </p>
      )} */}
    </div>
  );
};

export default LeafletMap;
