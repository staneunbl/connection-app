import { Category } from "@/types/categories.types";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PreviewCard({
  category,
  onPress,
}: {
  category: Category;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.previewCard, { backgroundColor: category.color }]}
      activeOpacity={0.82}
      onPress={onPress}
    >
      <Text style={styles.previewEmoji}>{category.emoji}</Text>
      <View style={[styles.previewTag, { backgroundColor: 'rgba(255,255,255,0.12)' }]}>
        <Text style={[styles.previewTagText, { color: category.textColor }]}>
          {category.id.toUpperCase().replace('-', ' ')}
        </Text>
      </View>
      <Text style={[styles.previewName, { color: category.textColor }]}>
        {category.name}
      </Text>
      <Text style={[styles.previewDesc, { color: category.textColor }]}>
        {category.description}
      </Text>
      <View style={styles.previewFooter}>
        <Text style={[styles.previewCount, { color: category.textColor }]}>
          {category.questionCount} cards
        </Text>
        <View style={[styles.previewArrow, { backgroundColor: 'rgba(255,255,255,0.12)' }]}>
          <Text style={[styles.previewArrowText, { color: category.textColor }]}>→</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  previewCard: {
    width: 190,
    borderRadius: 22,
    padding: 20,
    gap: 8,
  },
  previewEmoji: {
    fontSize: 28,
    lineHeight: 34,
  },
  previewTag: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  previewTagText: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.8,
  },
  previewName: {
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 22,
  },
  previewDesc: {
    fontSize: 12,
    lineHeight: 17,
    opacity: 0.65,
  },
  previewFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  previewCount: {
    fontSize: 11,
    fontWeight: '500',
    opacity: 0.45,
  },
  previewArrow: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewArrowText: {
    fontSize: 13,
    fontWeight: '600',
  },    
})