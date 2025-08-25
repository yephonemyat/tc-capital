import React from 'react';
import Svg, { Circle } from 'react-native-svg';
import Animated, { useSharedValue, withTiming, useAnimatedProps, Easing } from 'react-native-reanimated';
import { Text, View } from 'react-native';
import { colors } from '@/theme/theme';


const AnimatedCircle = Animated.createAnimatedComponent(Circle);


export default function ScoreDonut({ score, size = 160 }: { score: number; size?: number }) {
const r = (size - 16) / 2; // padding for stroke
const c = 2 * Math.PI * r;
const progress = useSharedValue(0);


React.useEffect(() => {
progress.value = withTiming(score / 100, { duration: 800, easing: Easing.out(Easing.cubic) });
}, [score]);


const animatedProps = useAnimatedProps(() => ({
strokeDashoffset: c * (1 - progress.value),
}));


return (
<View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
<Svg width={size} height={size}>
<Circle cx={size / 2} cy={size / 2} r={r} stroke="#EDF2FE" strokeWidth={12} fill="none" />
<AnimatedCircle
cx={size / 2}
cy={size / 2}
r={r}
stroke={colors.primary}
strokeWidth={12}
strokeLinecap="round"
strokeDasharray={c}
animatedProps={animatedProps}
fill="none"
/>
</Svg>
<Text style={{ position: 'absolute', fontSize: 34, fontWeight: '900', color: colors.text }}>{score}</Text>
<Text style={{ position: 'absolute', marginTop: 54, fontSize: 12, color: colors.subtext }}>CVCS</Text>
</View>
);
}