const { useState } = require('react');
import { useContext } from 'react';
import { ACTION_TYPES, StoreContext } from '../pages/_app';
const useTrackLocation = () => {
  const [locationErrorMsg, setLocationErrorMsg] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const { dispatch } = useContext(StoreContext);

  const success = (position) => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;

    dispatch({
      type: ACTION_TYPES.SET_LAT_LONG,
      payload: { latLong: `${lat},${long}` },
    });

    setLocationErrorMsg('');
    setIsFetching(false);
  };
  const error = () => {
    setLocationErrorMsg('Unable to retrive your location');
    setIsFetching(false);
  };

  const handleTrackLocation = () => {
    setIsFetching(true);
    if (!navigator.geolocation) {
      setLocationErrorMsg('Geolocation is not supported by your browser');
      setIsFetching(false);
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };
  return {
    // latLong,
    locationErrorMsg,
    handleTrackLocation,
    isFetching,
  };
};

export default useTrackLocation;
