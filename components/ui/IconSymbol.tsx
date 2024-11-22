import React from 'react';
import { View, StyleSheet } from 'react-native';

interface IconSymbolProps {
    color: string;
    size: number;
}

const IconSymbol: React.FC<IconSymbolProps> = ({ color, size }) => {
    return <View style={[styles.icon, { backgroundColor: color, width: size, height: size }]} />;
};

const styles = StyleSheet.create({
    icon: { borderRadius: 50 },
});

export default IconSymbol;
