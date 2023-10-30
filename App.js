import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ChatStack from './src/navigation/ChatStack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const queryClient = new QueryClient()
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: true,
//       refetchOnmount: false,
//       refetchOnReconnect: false,
//       retry: false,
//       staleTime: twentyFourHoursInMs,
//     },
//   },
// })

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer>
          <ChatStack />
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}