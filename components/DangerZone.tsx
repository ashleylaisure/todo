import { View, Text, Alert, Platform, TouchableOpacity } from 'react-native'
import React from 'react'
import useTheme from '@/hooks/useTheme';
import { createSettingsStyles } from '@/assets/styles/settings.styles';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const DangerZone = () => {
    const {colors} = useTheme();
    const settingsStyles = createSettingsStyles(colors)

    const clearAllTodos = useMutation(api.todo.deleteAllTodos);

    const handleResetApp = async () => {
        if (Platform.OS === "web") {
            if (window.confirm("Are you sure you want to reset the app? This will delete all your todos and cannot be undone.")) {
                try {
                    const result = await clearAllTodos();
                    alert(`Successfully deleted ${result.deletedCount} todo${result.deletedCount === 1 ? '' : 's'}. Your app has been reset.`);
                } catch (error) {
                    console.log(error);
                    alert("An error occurred while resetting the app.");
                }
            }
        } else {
            Alert.alert(
                "Reset App",
                "Are you sure you want to reset the app? This will delete all your todos and cannot be undone.",
                [
                    {text: "Cancel", style: "cancel"},
                    {text: "Delete All", style: "destructive", onPress: async () => {
                        try {
                            const result = await clearAllTodos();
                            Alert.alert("App Reset", `Successfully deleted ${result.deletedCount} todo${result.deletedCount === 1 ? '' : 's'}. Your app has been reset.`);
                        } catch (error) {
                            console.log(error);
                            Alert.alert("Error", "An error occurred while resetting the app.");
                        }
                    }}
                ]
            )
        }
    }

    return (
        <LinearGradient colors={colors.gradients.surface} style={settingsStyles.section}>
            <Text style={settingsStyles.sectionTitleDanger}>Danger Zone</Text>

            <TouchableOpacity
                style={[settingsStyles.actionButton, {borderBottomWidth: 0}]}
                onPress={handleResetApp}
                activeOpacity={0.7}
            >
                <View style={settingsStyles.actionLeft}>
                    <LinearGradient colors={colors.gradients.danger} style={settingsStyles.actionIcon}>
                        <Ionicons name="trash" size={18} color="#fff" />
                    </LinearGradient>

                    <Text style={settingsStyles.actionTextDanger}>Reset App</Text>
                </View>

                <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </TouchableOpacity>
            
        </LinearGradient>
    )
}

export default DangerZone