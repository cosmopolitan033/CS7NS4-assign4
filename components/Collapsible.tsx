import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CollapsibleProps {
    title: string;
    children: React.ReactNode;
}

const Collapsible: React.FC<CollapsibleProps> = ({ title, children }) => {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setCollapsed(!collapsed)} style={styles.header}>
                <Text style={styles.title}>{title}</Text>
            </TouchableOpacity>
            {!collapsed && <View style={styles.content}>{children}</View>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { marginBottom: 10 },
    header: { padding: 10, backgroundColor: '#ddd' },
    title: { fontWeight: 'bold' },
    content: { padding: 10, backgroundColor: '#f9f9f9' },
});

export default Collapsible;
