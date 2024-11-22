import React from 'react';
import { Linking, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ExternalLinkProps {
    url: string;
    children: React.ReactNode;
}

const ExternalLink: React.FC<ExternalLinkProps> = ({ url, children }) => {
    const handlePress = () => {
        Linking.openURL(url).catch((err) => console.error('Error opening link:', err));
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <Text style={styles.link}>{children}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    link: { color: 'blue', textDecorationLine: 'underline' },
});

export default ExternalLink;
