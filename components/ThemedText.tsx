import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

interface ThemedTextProps extends TextProps {
    lightColor?: string;
    darkColor?: string;
}

const ThemedText: React.FC<ThemedTextProps> = ({ lightColor = '#000', darkColor = '#fff', style, ...props }) => {
    const textColor = lightColor; // Add theme logic here if needed.

    return <Text style={[styles.text, { color: textColor }, style]} {...props} />;
};

const styles = StyleSheet.create({
    text: { fontSize: 16 },
});

export default ThemedText;
