import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export default function GameControls({ onSkip, onNext }: any) {
  return (
    <View style={styles.bottomArea}>
      <TouchableOpacity style={styles.btnSkip} onPress={onSkip}>
        <Text style={styles.btnSkipText}>Skip</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnPrimary} onPress={onNext}>
        <Text style={styles.btnPrimaryText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}