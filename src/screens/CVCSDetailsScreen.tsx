import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppStore } from '@/store/useAppStore';
import { colors, spacing, radii } from '@/theme/theme';
import Card from '@/components/Card';
import { computeCVCS } from '@/utils/cvcs';


export default function CVCSDetailsScreen() {
    const me = useAppStore((s) => s.me);
    const score = computeCVCS(me);


    // replicate parts of compute for explainability
    const endurance = Math.min(30, me.tenureMonths * 0.8);
    const revBoost = Math.min(15, Math.log10(Math.max(1, me.revenueMonthly)) * 5);
    const crowd = Math.min(25, me.endorsements.reduce((a, e) => a + e.weight * 10, 0));


    return (
        <View style={{ flex: 1, padding: spacing.lg, gap: 14 }}>
            <Text style={{ fontSize: 22, fontWeight: '900' }}>CVCS Score</Text>
            <Card>
                <Text style={styles.row}><Text style={styles.key}>Base trust</Text><Text style={styles.val}>40</Text></Text>
                <Text style={styles.row}><Text style={styles.key}>Business endurance</Text><Text style={styles.val}>+{Math.round(endurance)}</Text></Text>
                <Text style={styles.row}><Text style={styles.key}>Revenue signal</Text><Text style={styles.val}>+{Math.round(revBoost)}</Text></Text>
                <Text style={styles.row}><Text style={styles.key}>Community endorsements</Text><Text style={styles.val}>+{Math.round(crowd)}</Text></Text>
                <View style={{ height: 1, backgroundColor: '#EAEEF5', marginVertical: 8 }} />
                <Text style={[styles.row, { fontSize: 18 }]}><Text style={styles.key}>Total</Text><Text style={styles.val}>{score}</Text></Text>
            </Card>


            <Card title="Recent Endorsements">
                <View style={{ gap: 10 }}>
                    {me.endorsements.map((e, i) => (
                        <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontWeight: '700' }}>{e.by}</Text>
                            <Text style={{ color: colors.subtext }}>weight {e.weight}</Text>
                        </View>
                    ))}
                </View>
            </Card>
        </View>
    );
}


const styles = StyleSheet.create({
    row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6, fontSize: 16, color: colors.text } as any,
    key: { color: colors.subtext, fontWeight: '600' } as any,
    val: { fontWeight: '900' } as any,
});