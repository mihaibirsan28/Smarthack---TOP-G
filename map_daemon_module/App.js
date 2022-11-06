import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import Daemon from "./Daemon";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: false,
            staleTime: 5 * 60 * 1000,
        },
    },
});

export default function App() {
    const [id, _] = React.useState(Date.now().toString(36) + Math.random().toString(36).substr(2));
    return (
        <QueryClientProvider client={queryClient}>
            <Daemon id={id}/>
        </QueryClientProvider>
    );
}
