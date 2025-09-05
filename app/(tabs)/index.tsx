import { createHomeStyles } from "@/assets/styles/home.styles";
import { api } from "@/convex/_generated/api";
import useTheme, { ColorScheme } from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { Link } from "expo-router";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import Header from "@/components/Header";
import TodoInput from "@/components/TodoInput";

export default function Index() {
  const { toggleDarkMode, colors } = useTheme();

  const styles = createHomeStyles(colors)

  return (
    <LinearGradient colors={colors.gradients.background} style={styles.container}>
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={styles.safeArea}>

        <Header />

        <TodoInput />
        
        <TouchableOpacity onPress={toggleDarkMode}>
          <Text>Toggle Dark Mode</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}