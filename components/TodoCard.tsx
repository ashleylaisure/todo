import { createHomeStyles } from '@/assets/styles/home.styles'
import { api } from '@/convex/_generated/api'
import { Doc, Id } from '@/convex/_generated/dataModel'
import useTheme from '@/hooks/useTheme'
import { Ionicons } from '@expo/vector-icons'
import { useMutation } from 'convex/react'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { TouchableOpacity, View, Text, Alert } from 'react-native'

type Todo = Doc<"todos">

function TodoCard({item}: {item:Todo}) {
    const { colors } = useTheme();
    const styles = createHomeStyles(colors)

    const toggleTodo = useMutation(api.todo.toogleTodo)

    const handleToggleTodo = async (id:Id<"todos">) => {
        try {
            await toggleTodo({id})
        } catch (error) {
            console.log("Error toggling todo", error)
            Alert.alert("Error", "Failed to toggle todo")
        }
    }
    
    return (
        <View style={styles.todoItemWrapper}>
            <LinearGradient
                colors={colors.gradients.surface}
                style={styles.todoItem}
                start={{x:0, y:0}}
                end={{x:1, y:1}}
            >
                {/* checkmark button*/}
                <TouchableOpacity 
                    style={styles.checkbox}
                    activeOpacity={0.7}
                    onPress={() => handleToggleTodo(item._id)}
                >
                    <LinearGradient
                        colors={item.isCompleted? colors.gradients.success : colors.gradients.muted}
                        style={[styles.checkboxInner, {borderColor: item.isCompleted? "transparent" : colors.border}]}
                    >
                        {item.isCompleted && <Ionicons name="checkmark" size={18} color="#fff" />}
                    </LinearGradient>
                </TouchableOpacity>

                {/* todo text */}
                <View style={styles.todoTextContainer}>
                    <Text
                        style={[styles.todoText, 
                            item.isCompleted && {
                                textDecorationLine: "line-through",
                                color: colors.textMuted,
                                opacity: 0.6,
                            }
                        ]}
                    >
                        {item.text}
                    </Text>

                    {/* todo action buttons */}
                    <View style={styles.todoActions}>

                        <TouchableOpacity onPress={()=>{}} activeOpacity={0.8}>
                            <LinearGradient colors={colors.gradients.warning} style={styles.actionButton}>
                            <Ionicons name="pencil" size={14} color="#fff"/>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>{}} activeOpacity={0.8}>
                            <LinearGradient colors={colors.gradients.danger} style={styles.actionButton}>
                            <Ionicons name="trash" size={14} color="#fff"/>
                            </LinearGradient>
                        </TouchableOpacity>

                    </View>
                </View>
            </LinearGradient>
        </View>
    )
}

export default TodoCard;
