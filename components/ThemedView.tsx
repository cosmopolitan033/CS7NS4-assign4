import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';

interface ThemedViewProps extends ViewProps {
    lightBackgroundColor?: string;
    darkBackgroundColor?: string;
}

const ThemedView: React.FC<ThemedViewProps> = ({ lightBackgroundColor = '#fff', darkBackgroundColor = '#000', style, ...props }) => {
    const backgroundColor = lightBackgroundColor; // Add theme logic here if needed.

    return <View style={[styles.view, { backgroundColor }, style]} {...props} />;
};

const styles = StyleSheet.create({
    view: { flex: 1, padding: 10 },
});

export default ThemedView;
