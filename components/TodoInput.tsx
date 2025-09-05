import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import useTheme from '@/hooks/useTheme';
import { createHomeStyles } from '@/assets/styles/home.styles';
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const TodoInput = () => {
    const {colors} = useTheme();
    const styles = createHomeStyles(colors);

    const [newTodo, setNewTodo] = useState("");
    const addTodo = useMutation(api.todo.addTodo);

    const handleAddTodo = async () => {
        if(newTodo.trim()) {
            try {
                await addTodo({text:newTodo.trim()})
                setNewTodo("")
            } catch (error) {
                console.log("Error adding a todo", error)
                Alert.alert("Error", "Failed to add todo")
            }
        }
    }

    return (
        <View style={styles.inputSection}>
            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder='Add a new task'
                    placeholderTextColor={colors.textMuted}
                    value={newTodo}
                    onChangeText={setNewTodo}
                    onSubmitEditing={handleAddTodo}
                    // multiline
                />

                <TouchableOpacity 
                    onPress={handleAddTodo} 
                    activeOpacity={0.8} 
                    disabled={!newTodo.trim()}>
                    <LinearGradient
                        colors={newTodo.trim() ? colors.gradients.primary : colors.gradients.muted}
                        style={[styles.addButton, !newTodo.trim() && styles.addButtonDisabled]}
                    >
                        <Ionicons name="add" size={24} color="#fff"/>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            
        </View>
    )
}

export default TodoInput