import React from 'react';
import { View, Text, Switch } from 'react-native';
import { colors } from '@/theme/theme';


export default function SettingsScreen() {
    const [arabic, setArabic] = React.useState(false);
    const [notifications, setNotifications] = React.useState(true);


    return (
        <View style={{ flex: 1, padding: 16, gap: 14 }}>
            <Text style={{ fontSize: 22, fontWeight: '900' }}>Settings</Text>
            <Row label="Arabic UI" value={arabic} onValueChange={setArabic} />
            <Row label="Notifications" value={notifications} onValueChange={setNotifications} />
            <Text style={{ color: colors.subtext }}>MVP note: toggles are local for demo.</Text>
        </View>
    );
}


function Row({ label, value, onValueChange }: { label: string; value: boolean; onValueChange: (v: boolean) => void }) {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontWeight: '700' }}>{label}</Text>
            <Switch value={value} onValueChange={onValueChange} />
        </View>
    );
}