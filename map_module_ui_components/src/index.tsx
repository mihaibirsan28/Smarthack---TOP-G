import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MantineProvider } from "@mantine/core";
import { MapAdminCreatorComponent } from "./modules/MapAdminCreator.component";
import { QueryClient, QueryClientProvider } from "react-query";
// @ts-ignore
import icon from 'leaflet/dist/images/marker-icon.png';
// @ts-ignore
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import {MapAdminVisualiserComponent} from "./modules/MapAdminVisualiser.component";
import {MapVendorHeatzoneComponent} from "./modules/MapVendorHeatzone.component";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;
const queryClient = new QueryClient();

const vendorHeatZone = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

vendorHeatZone.render(
    <React.StrictMode>
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <QueryClientProvider client={queryClient}>
                <MapVendorHeatzoneComponent></MapVendorHeatzoneComponent>
            </QueryClientProvider>
        </MantineProvider>
    </React.StrictMode>
)

const adminCreator = ReactDOM.createRoot(
    document.getElementById('admincreator') as HTMLElement
);

adminCreator.render(
    <React.StrictMode>
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <QueryClientProvider client={queryClient}>
                <MapAdminCreatorComponent></MapAdminCreatorComponent>
            </QueryClientProvider>
        </MantineProvider>
    </React.StrictMode>
)

const adminVisualiser = ReactDOM.createRoot(
    document.getElementById('adminvisualiser') as HTMLElement
);

adminVisualiser.render(
    <React.StrictMode>
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <QueryClientProvider client={queryClient}>
                <MapAdminVisualiserComponent></MapAdminVisualiserComponent>
            </QueryClientProvider>
        </MantineProvider>
    </React.StrictMode>
)

