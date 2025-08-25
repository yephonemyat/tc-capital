import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { fetchPools, type Pool } from '@/services/api';
import PoolCard from '@/components/PoolCard';


export default function PoolsScreen() {
const [pools, setPools] = React.useState<Pool[]>([]);
React.useEffect(() => { fetchPools().then(setPools); }, []);


return (
<View style={styles.container}>
<Text style={styles.h1}>Lending Pools</Text>
<FlatList
data={pools}
keyExtractor={(p) => p.id}
renderItem={({ item }) => (
<PoolCard name={item.name} apr={item.apr} capacity={item.capacity} filled={item.filled} chain={item.chain} />
)}
/>
</View>
);
}


const styles = StyleSheet.create({
container: { flex: 1, padding: 16 },
h1: { fontSize: 20, fontWeight: '800', marginBottom: 8 },
});