import { Category } from "@/types/categories.types";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

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