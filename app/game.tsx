import CategoryModal from '@/components/game/CategoryModal';
import PreviewCard from '@/components/game/CategoryPreview';
import { styles } from '@/components/game/styles';
import { CATEGORIES } from '@/data/categories';
import { Category } from '@/types/categories.types';
import { router } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function GameScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  const openModal = useCallback(() => {
    setModalVisible(true);
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      damping: 22,
      stiffness: 220,
    }).start();
  }, [slideAnim]);

  const closeModal = useCallback(() => {
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT,
      duration: 240,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  }, [slideAnim]);

  const handleCategorySelect = (category: Category) => {
    closeModal();
    router.push({
      pathname: '/card',
      params: { categoryId: category.id, categoryName: category.name },
    });
  };

  const STEPS = [
    { num: '1', label: 'Tap “Let’s Play”', sub: 'Start the game and gather your group' },
    { num: '2', label: 'Choose a category', sub: 'Deep Talk or Chaos Mode' },
    { num: '3', label: 'Take turns answering', sub: 'No phones—just conversation' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bgGlowTop} />
      <View style={styles.bgGlowBottom} />
      <View style={styles.bgRing} />
      <View style={styles.bgDotGridWrap}>
        {Array.from({ length: 5 }).map((_, row) => (
          <View key={row} style={styles.bgDotRow}>
            {Array.from({ length: 6 }).map((_, col) => (
              <View key={col} style={styles.bgDot} />
            ))}
          </View>
        ))}
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View style={styles.livePill}>
            <View style={styles.liveDot} />
            <Text style={styles.livePillText}>Party game</Text>
          </View>
          <Text style={styles.heroTitle}>
            {"Let's get\n"}
            <Text style={styles.heroTitleItalic}>talking.</Text>
          </Text>
          <Text style={styles.heroSub}>
            One device. Real questions.{'\n'}No awkward silences.
          </Text>
        </View>

        {/* ── Category preview ── */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionLabel}>Choose your vibe</Text>
          <TouchableOpacity onPress={openModal}>
            <Text style={styles.sectionLink}>See all →</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.previewScroll}
          style={styles.previewScrollWrap}
        >
          {CATEGORIES.map((cat) => (
            <PreviewCard key={cat.id} category={cat} onPress={openModal} />
          ))}
        </ScrollView>

        <View style={styles.howSection}>
          <Text style={styles.sectionLabel}>How it works</Text>
          <View style={styles.stepsCard}>
            {STEPS.map((step, i) => (
              <View
                key={i}
                style={[
                  styles.stepRow,
                  i < STEPS.length - 1 && styles.stepRowBorder,
                ]}
              >
                <View style={styles.stepNum}>
                  <Text style={styles.stepNumText}>{step.num}</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepLabel}>{step.label}</Text>
                  <Text style={styles.stepSub}>{step.sub}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.ctaBar}>
        <View style={styles.ctaBarFade} pointerEvents="none" />
        <TouchableOpacity
          style={styles.btnPlay}
          activeOpacity={0.85}
          onPress={openModal}
        >
          <Text style={styles.btnPlayText}>Let's Play</Text>
          <View style={styles.btnPlayIcon}>
            <Text style={styles.btnPlayIconText}>→</Text>
          </View>
        </TouchableOpacity>
      </View>

      <CategoryModal
        visible={modalVisible}
        onClose={closeModal}
        onSelectCategory={handleCategorySelect}
      />
    </SafeAreaView>
  );
}

