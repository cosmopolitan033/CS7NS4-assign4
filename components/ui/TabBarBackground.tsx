import React from 'react';
import { View, StyleSheet } from 'react-native';

interface TabBarBackgroundProps {
    color: string;
}

const TabBarBackground: React.FC<TabBarBackgroundProps> = ({ color }) => {
    return <View style={[styles.background, { backgroundColor: color }]} />;
};

const styles = StyleSheet.create({
    background: { flex: 1, position: 'absolute', height: '100%', width: '100%' },
});

export default TabBarBackground;
