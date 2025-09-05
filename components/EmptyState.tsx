import { View, Text } from 'react-native'
import React from 'react'
import { createHomeStyles } from '@/assets/styles/home.styles';
import useTheme from '@/hooks/useTheme';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const EmptyState = () => {
    const {colors} = useTheme();
    const styles = createHomeStyles(colors)

    return (
        <View style={styles.emptyContainer}>
            <LinearGradient colors={colors.gradients.empty} style={styles.emptyIconContainer}>
                <Ionicons name="clipboard-outline" size={60} color={colors.textMuted}/>
            </LinearGradient>
            <Text style={styles.emptyText}>No todos yet!</Text>
            <Text style={styles.emptySubtext}>Add your first todo above to get started</Text>
        </View>
    )
}

export default EmptyState;