import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { fetchPools, type Pool } from '@/services/api';
import PoolCard from '@/components/PoolCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FinanceStackParamList } from '@/navigation';
import Button from '@/components/Button';


export default function PoolsScreen({ navigation }: NativeStackScreenProps<FinanceStackParamList, 'Pools'>) {
    const [pools, setPools] = React.useState<Pool[]>([]);
    React.useEffect(() => { fetchPools().then(setPools); }, []);


    return (
        <View style={styles.container}>
            <Text style={styles.h1}>Lending Pools</Text>
            <FlatList
                data={pools}
                keyExtractor={(p) => p.id}
                renderItem={({ item }) => (
                    <PoolCard
                        name={item.name}
                        apr={item.apr}
                        capacity={item.capacity}
                        filled={item.filled}
                        chain={item.chain}
                        onPress={() => navigation.navigate('PoolDetails', { id: item.id })}
                    />
                )}
            />
            <Button title="Supply Chain (Invoices)" onPress={() => navigation.navigate('Invoices')} />
        </View>
    );
}


const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    h1: { fontSize: 20, fontWeight: '800', marginBottom: 8 },
});