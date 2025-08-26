import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FinanceStackParamList } from '@/navigation';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { fetchPools } from '@/services/api';


export default function PoolDetailsScreen({ route, navigation }: NativeStackScreenProps<FinanceStackParamList, 'PoolDetails'>) {
    const [pool, setPool] = React.useState<any>(null);
    React.useEffect(() => { fetchPools().then((arr) => setPool(arr.find((p) => p.id === route.params.id))); }, [route.params.id]);
    if (!pool) return null;


    return (
        <View style={{ flex: 1, padding: 16, gap: 12 }}>
            <Text style={{ fontSize: 22, fontWeight: '900' }}>{pool.name}</Text>
            <Card>
                <Text>APR: {pool.apr}%</Text>
                <Text>Chain: {pool.chain}</Text>
                <Text>Capacity: AED {pool.capacity.toLocaleString()}</Text>
                <Text>Funded: AED {pool.filled.toLocaleString()}</Text>
            </Card>
            <Button title="Request from this pool" onPress={() => navigation.navigate('RequestLoan')} />
        </View>
    );
}