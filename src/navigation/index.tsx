import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '@/screens/DashboardScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import EndorseScreen from '@/screens/EndorseScreen';
import RequestLoanScreen from '@/screens/RequestLoanScreen';
import PoolsScreen from '@/screens/PoolsScreen';


export type RootStackParamList = {
Dashboard: undefined;
Profile: undefined;
Endorse: undefined;
RequestLoan: undefined;
Pools: undefined;
};


const Stack = createNativeStackNavigator<RootStackParamList>();
export default function RootNav() {
return (
<Stack.Navigator>
<Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
<Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'SME Profile' }} />
<Stack.Screen name="Endorse" component={EndorseScreen} options={{ title: 'Community Endorsements' }} />
<Stack.Screen name="RequestLoan" component={RequestLoanScreen} options={{ title: 'Request Financing' }} />
<Stack.Screen name="Pools" component={PoolsScreen} options={{ title: 'Lending Pools' }} />
</Stack.Navigator>
);
}