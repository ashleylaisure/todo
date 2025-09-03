import { View, Text } from 'react-native'
import React from 'react'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { createHomeStyles } from '@/assets/styles/home.styles'
import useTheme from '@/hooks/useTheme'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

const Header = () => {
    const { colors } = useTheme()
    const styles = createHomeStyles(colors)
    
    const todos = useQuery(api.todo.getTodos)

    const completedTodos = todos?.filter(todo => todo.isCompleted).length || 0;
    const totalTodos = todos?.length || 0;
    const todoProgress = totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0;

    return (
        <View style={styles.header}>
            <View style={styles.titleContainer}>
                <LinearGradient colors={colors.gradients.primary} style={styles.iconContainer}>
                    <Ionicons name="flash-outline" size={28} color='#fff' />
                </LinearGradient>

                <View style={styles.titleTextContainer}>
                    <Text style={styles.title}>Today&apos;s Tasks 👀</Text>
                    <Text style={styles.subtitle}>{completedTodos} of {totalTodos} Completed</Text>
                </View>
            </View>

            {/* {true > 0 && ( */}
            <View style={styles.progressContainer}>
                <View style={styles.progressBarContainer}>
                    <View style={styles.progressBar}>
                        <LinearGradient 
                            colors={colors.gradients.success}
                            style={[styles.progressFill, {width: `${todoProgress}%`}]}
                        />
                    </View>
                    <Text style={styles.progressText}>{Math.round(todoProgress)}%</Text>
                </View>
            </View>
            {/* )} */}
        </View>
    )
}

export default Header