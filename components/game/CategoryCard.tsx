import { Category } from "@/types/categories.types";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CategoryCard({
  category,
  onSelect,
}: {
  category: Category;
  onSelect: (c: Category) => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.modalCard, { backgroundColor: category.color }]}
      activeOpacity={0.82}
      onPress={() => onSelect(category)}
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

const styles = StyleSheet.create({
  modalCardList: {
    gap: 12,
  },
  modalCard: {
    borderRadius: 20,
    padding: 20,
    gap: 8,
  },
  modalCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  modalCardEmoji: {
    fontSize: 30,
  },
  modalCardBadge: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  modalCardBadgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  modalCardName: {
    fontSize: 22,
    fontWeight: '700',
  },
  modalCardDesc: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.7,
  },
  modalCardFooter: {
    borderTopWidth: 1,
    paddingTop: 12,
    marginTop: 4,
  },
  modalCardAction: {
    fontSize: 13,
    fontWeight: '600',
    opacity: 0.8,
  },
});