import { ActivityIndicator, View, Text } from 'react-native'
import React from 'react'
import useTheme from '@/hooks/useTheme'
import { createHomeStyles } from '@/assets/styles/home.styles';
import { LinearGradient } from 'expo-linear-gradient';

const LoadingSpinner = () => {
    const {colors} = useTheme();

    const styles = createHomeStyles(colors);

    return (
        <LinearGradient
            colors={colors.gradients.background}
            style={styles.container}
        >
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary}/>
                <Text style={styles.loadingText}>Loading your todos...</Text>
            </View>
        </LinearGradient>
    )
}

export default LoadingSpinner