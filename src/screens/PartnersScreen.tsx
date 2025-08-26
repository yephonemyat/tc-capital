import React from 'react';
import { View, Text } from 'react-native';
import Card from '@/components/Card';


const partners = [
    { name: 'Zoho Books', type: 'Accounting' },
    { name: 'Talabat', type: 'Marketplace' },
    { name: 'Careem', type: 'Delivery' },
    { name: 'noon', type: 'Marketplace' },
];


export default function PartnersScreen() {
    return (
        <View style={{ flex: 1, padding: 16, gap: 12 }}>
            <Text style={{ fontSize: 22, fontWeight: '900' }}>Embedded partners</Text>
            {partners.map((p) => (
                <Card key={p.name}>
                    <Text style={{ fontWeight: '800' }}>{p.name}</Text>
                    <Text>{p.type}</Text>
                </Card>
            ))}
        </View>
    );
}