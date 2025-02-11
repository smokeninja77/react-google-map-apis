import { useEffect, useRef, useState } from "react";
import { Map, AdvancedMarker, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { addSearch, clearHistory } from "@/app/store/slices/placesSlice";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import styles from "@/app/styles/googleMap.module.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import Box from "@mui/material/Box";

const MapWithAutocomplete = () => {
  const [location, setLocation] = useState({ lat: 3.1474767372280232, lng: 101.69953519560403 });
  const map = useMap();
  const places = useMapsLibrary("places");
  const inputRef = useRef(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const dispatch = useDispatch();
  const historySearch = useSelector((state: RootState) => state.history.historySearch);

  useEffect(() => {
    console.log("history search", historySearch);
  }, [historySearch]);

  const initializeAutocomplete = () => {
    if (places && inputRef.current) {
      console.log("inputRef.current", inputRef.current);
      autocompleteRef.current = new places.Autocomplete(inputRef.current);
      autocompleteRef.current?.addListener("place_changed", handlePlaceChanged);
    }
  };

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current?.getPlace();
      if (!place?.geometry || !place?.geometry.location) {
        alert("No details available for this location.");
        return;
      }

      dispatch(addSearch({ name: place?.name }));

      const newLocation = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };

      setLocation(newLocation);
      map?.setCenter(newLocation);
      map?.setZoom(15);
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <div style={{ width: "100%", marginRight: "15px" }} className="mr-[100px]">
          <TextField
            label="Places"
            inputRef={inputRef}
            onFocus={() => {
              initializeAutocomplete();
            }}
            style={{ width: "100%" }}
          />
          <Map
            mapId="8773159e315e1ade"
            defaultCenter={location}
            defaultZoom={15}
            style={{ width: "100%", height: "500px", paddingTop: "15px" }}
          >
            <AdvancedMarker position={location} />
          </Map>
        </div>

        <Box
          className={styles.historyWrap}
          sx={{
            width: historySearch.length > 0 ? { xs: "100%", md: "25%" } : "0%",
            opacity: historySearch.length > 0 ? "100%" : "0%",
            overflow: "hidden",
          }}
        >
          <h3 style={{ textAlign: "center" }}>Records</h3>
          <div className="" style={{ height: "100%", marginTop: "15px", marginBottom: "15px" }}>
            {historySearch.map((location, index) => (
              <div key={index} className={styles.locationName}>
                <FmdGoodIcon fontSize="small" />
                <p className="mb-30">{location.name}</p>
              </div>
            ))}
          </div>
          <Button
            color="error"
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={() => {
              dispatch(clearHistory());
            }}
          >
            Delete
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default MapWithAutocomplete;
