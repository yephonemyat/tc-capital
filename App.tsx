import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';
import RootNav from '@/navigation';
import { StatusBar } from 'expo-status-bar';
import { colors } from '@/theme/theme';


const qc = new QueryClient();


const navTheme: Theme = {
...DefaultTheme,
colors: {
...DefaultTheme.colors,
background: colors.bg,
primary: colors.primary,
card: '#ffffff',
text: colors.text,
border: '#e6e8ee',
notification: colors.primary,
},
};


export default function App() {
return (
<QueryClientProvider client={qc}>
<NavigationContainer theme={navTheme}>
<StatusBar style="dark" />
<RootNav />
</NavigationContainer>
</QueryClientProvider>
);
}