import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { listLogEntries } from './api'
import MarkerImage from './img/marker.png'
import PinImage from './img/pin.png'
import AddLogForm from './components/AddLog';
import CustomPopup from './components/CustomPopup';
import PreLoader from './components/PreLoader/PreLoader';

function App() {
  const [loadingEntries, setLoadingEntries] = useState(true)
  const [ logEntries, setLogEntries] = useState([])
  const [ showPopup, setShowPopup] = useState({})
  const [addEntryLocation, setAddEntryLocation] = useState()
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 6.505967,
    longitude: 3.361695,
    zoom: 9
  });
  
  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries.data.data)
    setLoadingEntries(false)
  }
  useEffect(() => {
    getEntries()
  }, [])

  const showAddMarkerPopup = (e) => {
    const [longitude, latitude] = e.lngLat;
    setAddEntryLocation({
      latitude,
      longitude
    })
  }

  if(loadingEntries){
    return  <PreLoader />
  }
  return (
    <React.Fragment>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={setViewport}
        mapStyle="mapbox://styles/gbengacodes/ck58pdu2r17tv1cmryn3cb9oy"
        onDblClick={showAddMarkerPopup}
      >
        {
          logEntries.map((entry) => {
            return (
              <div key={entry._id}>
              <Marker 
                latitude={entry.latitude} 
                longitude={entry.longitude}
              >
                <img 
                  src={MarkerImage} 
                  className="marker" 
                  alt="marker" 
                  onClick={() => setShowPopup({
                    [entry._id]: true
                  })}
                />
              </Marker>
              {
                showPopup[entry._id] ?
                <Popup
                  latitude={entry.latitude} 
                  longitude={entry.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  dynamicPosition={true}
                  onClose={() => setShowPopup({
                    [entry._id]: false
                  })}
                  anchor="top" 
                >
                  <CustomPopup entry={entry} />
                </Popup>
                : null
              }
              </div>
            )
          })
        }
        {
          addEntryLocation ? 
          <>
            <Marker 
              latitude={addEntryLocation.latitude} 
              longitude={addEntryLocation.longitude}
            >
              <img 
                src={PinImage} 
                className="marker" 
                alt="marker"
              />
            </Marker>
            <Popup
              latitude={addEntryLocation.latitude} 
              longitude={addEntryLocation.longitude}
              closeButton={true}
              closeOnClick={false}
              dynamicPosition={true}
              onClose={() => setAddEntryLocation(null)}
              anchor="top" 
            >
            <div className="popup">
              <AddLogForm 
                onClose={() => {
                  setAddEntryLocation(null)
                  getEntries()
                }}
                location={addEntryLocation}
              />
            </div>
          </Popup>
          </>
          : null
        }
      </ReactMapGL>
    </React.Fragment>
  );
}

export default App;
