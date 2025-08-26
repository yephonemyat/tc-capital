import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '@/theme/theme';


export default function WalletScreen() {
    const [chain, setChain] = React.useState<'Polygon' | 'Stellar' | null>(null);
    const [connected, setConnected] = React.useState(false);


    return (
        <View style={styles.container}>
            <Text style={styles.h1}>Wallet</Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
                {(['Polygon', 'Stellar'] as const).map((c) => (
                    <Pressable key={c} onPress={() => setChain(c)} style={{ backgroundColor: chain === c ? colors.primary : '#EEF4FF', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999 }}>
                        <Text style={{ color: chain === c ? 'white' : colors.primary, fontWeight: '800' }}>{c}</Text>
                    </Pressable>
                ))}
            </View>
            <Pressable onPress={() => setConnected((p) => !p)} style={{ marginTop: 14, backgroundColor: connected ? '#DCFCE7' : '#E0EAFF', padding: 14, borderRadius: 14 }}>
                <Text style={{ fontWeight: '800', color: connected ? '#166534' : colors.primary }}>{connected ? 'Connected' : 'Connect Wallet'}</Text>
            </Pressable>
            {connected && chain ? <Text style={{ marginTop: 8, color: '#64748b' }}>Address: 0xA1...aE9 • Network: {chain}</Text> : null}
        </View>
    );
}


const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, gap: 12 },
    h1: { fontSize: 20, fontWeight: '800' },
});