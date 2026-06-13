import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export default function EndCard({ onRestart, categoryName }: any) {
  return (
    <View style={styles.endCard}>
      <Text style={styles.endEmoji}>🎉</Text>
      <Text style={styles.endTitle}>That's a wrap!</Text>
      <Text style={styles.endSub}>
        You finished {categoryName}.
      </Text>

      <TouchableOpacity style={styles.btnPrimary} onPress={onRestart}>
        <Text style={styles.btnPrimaryText}>Play again</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/game")}>
        <Text style={{ color: "#F5F0D0" }}>
          Choose another category
        </Text>
      </TouchableOpacity>
    </View>
  );
}