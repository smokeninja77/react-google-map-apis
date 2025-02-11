"use client";
import { APIProvider } from "@vis.gl/react-google-maps";
import MapWithAutocomplete from "@/app/components/GoogleMap";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/app/store/store";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export default function GooglePlacesAutocompleteMap() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <APIProvider apiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
          <MapWithAutocomplete />
        </APIProvider>
      </PersistGate>
    </Provider>
  );
}
