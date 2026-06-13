
import { CATEGORIES } from "@/data/categories";
import { Category } from "@/types/categories.types";
import React, { useCallback, useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import CategoryCard from "./CategoryCard";
import { styles } from "./styles";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelectCategory: (category: Category) => void;
};

export default function CategoryModal({
  visible,
  onClose,
  onSelectCategory,
}: Props) {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  // OPEN animation
  useEffect(() => {
    if (visible) {
      slideAnim.setValue(SCREEN_HEIGHT);

      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        damping: 20,
        stiffness: 200,
      }).start();
    }
  }, [visible]);

  const closeModal = useCallback(() => {
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT,
      duration: 250,
      useNativeDriver: true,
    }).start(() => onClose());
  }, [slideAnim, onClose]);

  const handleSelect = (cat: Category) => {
    closeModal();
    onSelectCategory(cat);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={closeModal}
    >
      <Pressable style={styles.overlay} onPress={closeModal}>
        <Animated.View
          style={[styles.sheet, { transform: [{ translateY: slideAnim }] }]}
        >
          <Pressable>
            <View style={styles.sheetHandle} />

            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Pick a category</Text>
              <TouchableOpacity onPress={closeModal} style={styles.sheetClose}>
                <Text style={styles.sheetCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sheetSub}>
              Choose the vibe for tonight
            </Text>

            <ScrollView
              style={styles.scrollArea}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.modalCardList}
            >
              {CATEGORIES.map((cat) => (
                <CategoryCard
                  key={cat.id}
                  category={cat}
                  onSelect={handleSelect}
                />
              ))}
            </ScrollView>
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}
