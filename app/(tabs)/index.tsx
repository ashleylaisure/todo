import { createHomeStyles } from "@/assets/styles/home.styles";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { useQuery } from "convex/react";
import { FlatList, StatusBar} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import Header from "@/components/Header";
import TodoInput from "@/components/TodoInput";
import LoadingSpinner from "@/components/LoadingSpinner";
import EmptyState from "@/components/EmptyState";
import TodoCard from "@/components/TodoCard";


export default function Index() {
  const { colors } = useTheme();
  const styles = createHomeStyles(colors)

  const todos = useQuery(api.todo.getTodos)

  const isLoading = todos === undefined
  if(isLoading) return <LoadingSpinner />

  return (
    <LinearGradient colors={colors.gradients.background} style={styles.container}>
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={styles.safeArea}>

        <Header />

        <TodoInput />

        <FlatList
          data={todos}
          renderItem={({ item }) => <TodoCard item={item} />}
          keyExtractor={(item) => item._id}
          style={styles.todoList}
          contentContainerStyle={styles.todoListContent}
          ListEmptyComponent={<EmptyState />}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}