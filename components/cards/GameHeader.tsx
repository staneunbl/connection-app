import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export default function GameHeader({ categoryName, progress, onBack }: any) {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Text style={styles.backBtnText}>‹</Text>
      </TouchableOpacity>

      <View style={styles.headerTitleWrap}>
        <Text style={styles.headerCategory}>{categoryName}</Text>
        <Text style={styles.headerProgress}>{progress}</Text>
      </View>

      <View style={styles.backBtnSpacer} />
    </View>
  );
}