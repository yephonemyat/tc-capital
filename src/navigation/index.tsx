import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme/theme';

// Home stack
import DashboardScreen from '@/screens/DashboardScreen';
import CVCSDetailsScreen from '@/screens/CVCSDetailsScreen';

// Finance stack
import PoolsScreen from '@/screens/PoolsScreen';
import PoolDetailsScreen from '@/screens/PoolDetailsScreen';
import RequestLoanScreen from '@/screens/RequestLoanScreen';
import InvoicesScreen from '@/screens/InvoicesScreen';

// Community stack
import EndorseScreen from '@/screens/EndorseScreen';

// Profile stack
import ProfileScreen from '@/screens/ProfileScreen';
import KYCScreen from '@/screens/KYCScreen';
import WalletScreen from '@/screens/WalletScreen';
import SettingsScreen from '@/screens/SettingsScreen';
import PartnersScreen from '@/screens/PartnersScreen';
import InvoiceDetailsScreen from '@/screens/InvoiceDetailsScreen';


// ---------- Types ----------
export type HomeStackParamList = {
  Dashboard: undefined;
  CVCSDetails: undefined;
};
export type FinanceStackParamList = {
  Pools: undefined;
  PoolDetails: { id: string };
  RequestLoan: undefined;
  Invoices: undefined;
  InvoiceDetails: { invoice: { id: string; buyer: string; amount: number; due: number } };
};

export type CommunityStackParamList = {
  Endorse: undefined;
  CVCSDetails?: undefined;
};
export type ProfileStackParamList = {
  Profile: undefined;
  KYC: undefined;
  Wallet: undefined;
  Settings: undefined;
  Partners: undefined;
};

export type RootTabsParamList = {
  HomeTab: undefined;
  FinanceTab: undefined;
  CommunityTab: undefined;
  ProfileTab: undefined;
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const FinanceStack = createNativeStackNavigator<FinanceStackParamList>();
const CommunityStack = createNativeStackNavigator<CommunityStackParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();
const Tabs = createBottomTabNavigator<RootTabsParamList>();

function HomeStackNav() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="CVCSDetails"
        component={CVCSDetailsScreen}
        options={{ title: 'Score details' }}
      />
    </HomeStack.Navigator>
  );
}

function FinanceStackNav() {
  return (
    <FinanceStack.Navigator>
      <FinanceStack.Screen name="Pools" component={PoolsScreen} options={{ title: 'Lending Pools' }} />
      <FinanceStack.Screen name="PoolDetails" component={PoolDetailsScreen} options={{ title: 'Pool' }} />
      <FinanceStack.Screen name="RequestLoan" component={RequestLoanScreen} options={{ title: 'Request Financing' }} />
      <FinanceStack.Screen name="Invoices" component={InvoicesScreen} options={{ title: 'Supply Chain (Invoices)' }} />
      <FinanceStack.Screen name="InvoiceDetails" component={InvoiceDetailsScreen} options={{ title: 'Invoice Financing' }} />
    </FinanceStack.Navigator>
  );
}

function CommunityStackNav() {
  return (
    <CommunityStack.Navigator>
      <CommunityStack.Screen name="Endorse" component={EndorseScreen} options={{ title: 'Community Endorsements' }} />
      <CommunityStack.Screen name="CVCSDetails" component={CVCSDetailsScreen} options={{ title: 'Score details' }} />
    </CommunityStack.Navigator>
  );
}

function ProfileStackNav() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} options={{ title: 'SME Profile' }} />
      <ProfileStack.Screen name="KYC" component={KYCScreen} options={{ title: 'KYC' }} />
      <ProfileStack.Screen name="Wallet" component={WalletScreen} options={{ title: 'Wallet' }} />
      <ProfileStack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
      <ProfileStack.Screen name="Partners" component={PartnersScreen} options={{ title: 'Partners' }} />
    </ProfileStack.Navigator>
  );
}

export default function RootNav() {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.8)',
        tabBarLabelStyle: { fontWeight: '700' },
        tabBarStyle: {
          backgroundColor: colors.primary,
          borderTopWidth: 0,
          paddingBottom: 6,
          height: 64,
        },
        tabBarIcon: ({ color, size }) => {
          const map: Record<string, keyof typeof Ionicons.glyphMap> = {
            HomeTab: 'home',
            FinanceTab: 'wallet',
            CommunityTab: 'people',
            ProfileTab: 'person',
          };
          const name = map[route.name] ?? 'ellipse';
          return <Ionicons name={name as any} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="HomeTab" component={HomeStackNav} options={{ title: 'Home' }} />
      <Tabs.Screen name="FinanceTab" component={FinanceStackNav} options={{ title: 'Finance' }} />
      <Tabs.Screen name="CommunityTab" component={CommunityStackNav} options={{ title: 'Community' }} />
      <Tabs.Screen name="ProfileTab" component={ProfileStackNav} options={{ title: 'Profile' }} />
    </Tabs.Navigator>
  );
}
