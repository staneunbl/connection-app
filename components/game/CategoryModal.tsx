
import { CATEGORIES } from "@/data/categories";
import { Category } from "@/types/categories.types";
import React, { useCallback, useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CategoryCard from "./CategoryCard";

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

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#FFFBEA',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingBottom: 48,
    paddingTop: 12,
  },
  sheetHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(0,0,0,0.12)',
    alignSelf: 'center',
    marginBottom: 20,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  sheetTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  sheetClose: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.07)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetCloseText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  sheetSub: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  scrollArea: {
    maxHeight: 400,
  },
  modalCardList: {
    gap: 12,
    paddingBottom: 20,
  },
});