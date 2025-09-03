import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.content}>Edit app/index.tsx to edit this screen.</Text>
      <Text style={styles.content}>Hello World</Text>
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