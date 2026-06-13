import React from "react";
import { Text } from "react-native";
import { styles } from "./styles";

export default function GameCard({ card }: any) {
  return (
    <>
      <Text
        style={[
          styles.cardLabel,
          card.mode === "chaos" && styles.cardLabelChaos,
        ]}
      >
        {card.mode === "chaos" ? "🍻 CHAOS MODE" : "🌙 DEEP TALK"}
      </Text>

      <Text style={styles.cardQuestion}>{card.text}</Text>

      <Text style={styles.swipeHint}>
        ← Skip · Swipe right for next →
      </Text>
    </>
  );
}