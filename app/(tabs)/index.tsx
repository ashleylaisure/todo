import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { toggleDarkMode } = useTheme();

  const todos = useQuery(api.todo.getTodos)
  console.log(todos);

  const addTodo = useMutation(api.todo.addTodo)
  const deleteAllTodos = useMutation(api.todo.deleteAllTodos)

  return (
    <View
      style={styles.container}
    >
      <Text style={styles.content}>Edit app/index.tsx to edit this screen.</Text>
      <Text style={styles.content}>Hello World</Text>
      <TouchableOpacity onPress={toggleDarkMode}>
        <Text>Toggle Dark Mode</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => addTodo({text: "walk the dog"})}>
        <Text>Add a new Todo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteAllTodos()}>
        <Text>Delete all Todos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
    gap: 10,
  },
  content: {
    color: "white",
    fontSize: 18,
  },
});