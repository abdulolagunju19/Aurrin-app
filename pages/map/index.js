import React, { useState, useEffect } from 'react';
import { Flex, Box, Text, Select } from "@chakra-ui/react";
import Link from 'next/link';
import { Map, Marker } from "pigeon-maps";
import Layout from "../../components/Layout";
import { osm } from 'pigeon-maps/providers';
import seniorsDirectory from './seniors-directory.json'; // Adjust the path to your JSON file

export default function MyMap() {
  const [markers, setMarkers] = useState([]);
  const [tooltip, setTooltip] = useState({ visible: false, name: '', url: '', coordinates: [0, 0] });
  const [userPin, setUserPin] = useState(null);
  const [closestService, setClosestService] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    console.log("Component mounted"); // Log when component mounts

    const formattedMarkers = seniorsDirectory
      .filter(center => center.latitude && center.longitude)
      .slice(0, 100)
      .map(center => ({
        name: center.organization_name,
        category: center.category,
        url: center.e_communication?.url || 'No URL provided',
        coordinates: [parseFloat(center.latitude), parseFloat(center.longitude)]
      }));
    
    console.log("Formatted Markers:", formattedMarkers); // Log formatted markers
    setMarkers(formattedMarkers);

    return () => {
      console.log("Component unmounted"); // Log when component unmounts
      setMarkers([]); // Clear markers on unmount
    };
  }, []);

  // const handleMapClick = ({ latLng }) => {
  //   console.log("Map clicked at:", latLng); // Log when map is clicked
  //   setUserPin(latLng);
  //   findClosestService(latLng);
  // };

  const handleMarkerClick = (name, url, coordinates) => {
    console.log("Mouse entered marker:", name, coordinates); // Log when mouse enters a marker
    setTooltip({ visible: true, name, url, coordinates });
  };

  // const calculateDistance = (coords1, coords2) => {
  //   const [lat1, lon1] = coords1;
  //   const [lat2, lon2] = coords2;
  //   const R = 6371; // Radius of the Earth in km
  //   const dLat = (lat2 - lat1) * Math.PI / 180;
  //   const dLon = (lon2 - lon1) * Math.PI / 180;
  //   const a = 
  //     0.5 - Math.cos(dLat) / 2 + 
  //     Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
  //     (1 - Math.cos(dLon)) / 2;
  //   return R * 2 * Math.asin(Math.sqrt(a));
  // };

  // const findClosestService = (userCoords) => {
  //   let closest = null;
  //   let minDistance = Infinity;
  //   markers.forEach(marker => {
  //     const distance = calculateDistance(userCoords, marker.coordinates);
  //     if (distance < minDistance) {
  //       minDistance = distance;
  //       closest = marker;
  //     }
  //   });
  //   setClosestService(closest);
  //   console.log("Closest Service:", closest);
  // };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredMarkers = selectedCategory === 'All' 
    ? markers 
    : markers.filter(marker => marker.category === selectedCategory);

  const categories = Array.from(new Set(seniorsDirectory.map(center => center.category)));


  return (
    <Layout>
      <Flex direction="column" m={8} position="relative">
        <Select placeholder="Select category" onChange={handleCategoryChange} w={"50%"} m={5}>
          <option value="All">All</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </Select>
        <Map 
          provider={osm}
          height={400} 
          defaultCenter={[51.0447, -114.0719]} 
          defaultZoom={11}
          //onClick={handleMapClick}
        >
          {filteredMarkers.map((marker, index) => (
            <Marker 
              key={index} 
              width={35} 
              anchor={marker.coordinates}
              onClick={() => handleMarkerClick(marker.name, marker.url, marker.coordinates)}
              style={{pointerEvents: 'auto'}}
            />
          ))}
          {userPin && (
            <Marker 
              width={35} 
              anchor={userPin}
              color={`rgb(255, 0, 0)`} 
              style={{pointerEvents: 'auto'}}
            />
          )}
          {tooltip.visible && (
            <Box 
              position="absolute" 
              left={`${tooltip.coordinates[1]}px`} 
              top={`${tooltip.coordinates[0]}px`}
              bg="white" 
              borderRadius="md" 
              boxShadow="md" 
              p={2}
              m={2}
              zIndex={10}
            >
              <Link href={tooltip.url} target="_blank">
                <Text fontWeight="bold" as='u'>{tooltip.name}</Text>
              </Link>
            </Box>
          )}
        </Map>

        {/* {closestService && (
          <Box 
            position="absolute" 
            bottom={4} 
            left="50%" 
            transform="translateX(-50%)" 
            bg="white" 
            borderRadius="md" 
            boxShadow="md" 
            p={4}
            zIndex={10}
            maxWidth="300px"
            textAlign="center"
          >
            <Text fontWeight="bold">Closest Service:</Text>
            <Link href={closestService.url} target="_blank">
              <Text fontWeight="bold" as='u'>{closestService.name}</Text>
            </Link>
          </Box>
        )} */}
      </Flex>
    </Layout>
  );
}
