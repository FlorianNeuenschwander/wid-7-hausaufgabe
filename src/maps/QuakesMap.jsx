import React, { useState, useEffect } from "react";
import { CssBaseline, Typography, Link } from "@mui/material";
import { renderToString } from "react-dom/server";
import { MapContainer, TileLayer, GeoJSON, LayersControl } from "react-leaflet";
import L from "leaflet";
import Header from "./Header";
import Filter from "./Filter";
import { BASE_LAYERS } from "./baseLayers";

const OUTER_BOUNDS = [
  [-80, -180],
  [80, 180],
];

const BASE_URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/";

function getMarkerRadius(magnitude) {
  const baseArea = 10;
  const scaleFactor = 2.5;
  const area = baseArea * Math.pow(10, (magnitude - 1) / scaleFactor);
  return Math.sqrt(area / Math.PI);
}

const pointToLayer = ({ properties }, latlng) => {
  const radius = getMarkerRadius(properties.mag);
  return L.circleMarker(latlng, {
    radius: radius,
    color: "#8A2BE2",
    fillColor: "#8A2BE2",
    fillOpacity: 0.6,
    weight: 1,
  });
};

const onEachFeature = (feature, layer) => {
  if (feature.properties && feature.properties.place) {
    const popup = <Popup {...feature} />;
    layer.bindPopup(renderToString(popup));
  }
};

function Popup({ properties, geometry }) {
  const [lon, lat, depth] = geometry.coordinates;

  return (
    <>
      <Typography variant="h6">{properties.place}</Typography>
      <p>
        <strong>MAGNITUDE</strong>: {properties.mag}
        <br />
        <strong>DEPTH</strong>: {depth} km
        <br />
        <strong>TYPE</strong>: {properties.type}
        <br />
        <strong>Lon/Lat</strong>: {lon}, {lat}
      </p>
      <Link target="_blank" href={properties.url}>
        More info
      </Link>
    </>
  );
}

function QuakesMap() {
  const [quakesJson, setQuakesJson] = useState([]);
  const [minMag, setMinMag] = useState("2.5");
  const [timespan, setTimespan] = useState("week");

  async function fetchQuakeData(url) {
    try {
      const resp = await fetch(url);
      if (!resp.ok) {
        throw new Error(`Error fetching data from ${url}`);
      }
      const data = await resp.json();
      setQuakesJson(data.features);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const url = `${BASE_URL}${minMag}_${timespan}.geojson`;
    fetchQuakeData(url);
  }, [minMag, timespan]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Filter setMinMag={setMinMag} setTimespan={setTimespan} />
      <MapContainer
        style={{ height: "calc(100vh - 64px - 50px)" }}
        center={[0, 0]}
        zoom={3}
        minZoom={2}
        maxBounds={OUTER_BOUNDS}
        maxBoundsViscosity={1}
      >
        <LayersControl position="topright">
          {BASE_LAYERS.map((baseLayer) => (
            <LayersControl.BaseLayer
              key={baseLayer.url}
              checked={baseLayer.checked}
              name={baseLayer.name}
            >
              <TileLayer
                attribution={baseLayer.attribution}
                url={baseLayer.url}
              />
            </LayersControl.BaseLayer>
          ))}
          <LayersControl.Overlay checked name="USGS Earthquakes">
            <GeoJSON
              data={quakesJson}
              pointToLayer={pointToLayer}
              key={quakesJson.length}
              onEachFeature={onEachFeature}
            />
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </>
  );
}

export default QuakesMap;
