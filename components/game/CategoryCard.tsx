import { Category } from "@/types/categories.types";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export default function CategoryCard({
  category,
  onSelect,
}: {
  category: Category;
  onSelect: (c: Category) => void;
}) {
  const router = useRouter();

  const handlePress = () => {
    onSelect(category);

    router.push({
      pathname: "/card",
      params: {
        categoryId: category.id,
        categoryName: category.name,
      },
    });
  };

  return (
    <TouchableOpacity
      style={[styles.modalCard, { backgroundColor: category.color }]}
      activeOpacity={0.82}
      onPress={handlePress}
    >
      <View style={styles.modalCardTop}>
        <Text style={styles.modalCardEmoji}>{category.emoji}</Text>
        <View style={[styles.modalCardBadge, { backgroundColor: 'rgba(255,255,255,0.12)' }]}>
          <Text style={[styles.modalCardBadgeText, { color: category.textColor }]}>
            {category.questionCount} cards
          </Text>
        </View>
      </View>
      <Text style={[styles.modalCardName, { color: category.textColor }]}>
        {category.name}
      </Text>
      <Text style={[styles.modalCardDesc, { color: category.textColor }]}>
        {category.description}
      </Text>
      <View style={[styles.modalCardFooter, { borderTopColor: 'rgba(255,255,255,0.1)' }]}>
        <Text style={[styles.modalCardAction, { color: category.textColor }]}>
          Play this →
        </Text>
      </View>
    </TouchableOpacity>
  );
}