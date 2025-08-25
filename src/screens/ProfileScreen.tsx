import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useAppStore } from '@/store/useAppStore';


export default function ProfileScreen() {
const me = useAppStore((s) => s.me);
const setMe = useAppStore((s) => s.setMe);


const [name, setName] = React.useState(me.name);
const [revenue, setRevenue] = React.useState(String(me.revenueMonthly));
const [tenure, setTenure] = React.useState(String(me.tenureMonths));


function save() {
setMe({ name, revenueMonthly: Number(revenue) || me.revenueMonthly, tenureMonths: Number(tenure) || me.tenureMonths });
Alert.alert('Saved', 'Your profile has been updated.');
}


return (
<View style={styles.container}>
<Text style={styles.h1}>SME Profile</Text>
<Input label="Business name" value={name} onChangeText={setName} />
<Input label="Monthly revenue (AED)" value={revenue} onChangeText={setRevenue} keyboardType="numeric" />
<Input label="Tenure (months)" value={tenure} onChangeText={setTenure} keyboardType="numeric" />
<Button title="Save" onPress={save} />
</View>
);
}


const styles = StyleSheet.create({
container: { flex: 1, padding: 16, gap: 12 },
h1: { fontSize: 20, fontWeight: '800' },
});