import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Input from '@/components/Input';
import Button from '@/components/Button';


export default function KYCScreen() {
    const [name, setName] = React.useState('');
    const [idNo, setIdNo] = React.useState('');
    const [trade, setTrade] = React.useState('');


    function submit() {
        Alert.alert('Submitted', 'KYC submitted for review.');
        setName(''); setIdNo(''); setTrade('');
    }


    return (
        <View style={styles.container}>
            <Text style={styles.h1}>KYC</Text>
            <Input label="Legal name" value={name} onChangeText={setName} />
            <Input label="National ID / Passport" value={idNo} onChangeText={setIdNo} />
            <Input label="Trade License #" value={trade} onChangeText={setTrade} />
            <Button title="Submit" onPress={submit} />
            <Text style={{ color: '#64748b', marginTop: 8 }}>Upload placeholders omitted in MVP — we’ll wire later.</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, gap: 12 },
    h1: { fontSize: 20, fontWeight: '800' },
});