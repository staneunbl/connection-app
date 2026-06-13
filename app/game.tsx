import CategoryModal from '@/components/game/CategoryModal';
import PreviewCard from '@/components/game/CategoryPreview';
import { CATEGORIES } from '@/data/categories';
import { Category } from '@/types/categories.types';
import { router } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

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
    { num: '1', label: 'Add your players', sub: 'Up to 10 people' },
    { num: '2', label: 'Pick a category', sub: 'Deep Talk or Chaos Mode' },
    { num: '3', label: 'Take turns answering', sub: 'No phones, just conversation' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Ambient background shapes */}
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
        {/* ── Hero ── */}
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

        {/* ── How it works ── */}
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

      {/* ── Sticky CTA ── */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF7EC',
    overflow: 'hidden',
  },
  scroll: {
    paddingBottom: 130,
  },

  // ── Ambient background ──
  bgGlowTop: {
    position: 'absolute',
    width: SCREEN_WIDTH * 1.1,
    height: SCREEN_WIDTH * 1.1,
    borderRadius: SCREEN_WIDTH,
    backgroundColor: '#FFE033',
    opacity: 0.35,
    top: -SCREEN_WIDTH * 0.62,
    right: -SCREEN_WIDTH * 0.35,
  },
  bgGlowBottom: {
    position: 'absolute',
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_WIDTH * 0.9,
    borderRadius: SCREEN_WIDTH,
    backgroundColor: '#F5A623',
    opacity: 0.16,
    bottom: -SCREEN_WIDTH * 0.45,
    left: -SCREEN_WIDTH * 0.35,
  },
  bgRing: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    borderWidth: 1.5,
    borderColor: 'rgba(26,26,26,0.06)',
    top: 90,
    right: -90,
  },
  bgDotGridWrap: {
    position: 'absolute',
    top: 70,
    left: 28,
    opacity: 0.5,
  },
  bgDotRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  bgDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: 'rgba(26,26,26,0.08)',
    marginRight: 14,
  },

  // Hero
  hero: {
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 36,
  },
  livePill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    gap: 7,
    marginBottom: 20,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFD700',
  },
  livePillText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFD700',
    letterSpacing: 0.3,
  },
  heroTitle: {
    fontSize: 46,
    fontWeight: '700',
    color: '#1A1A1A',
    letterSpacing: -1.5,
    lineHeight: 50,
    marginBottom: 14,
  },
  heroTitleItalic: {
    fontStyle: 'italic',
    color: '#B89A00',
  },
  heroSub: {
    fontSize: 15,
    fontWeight: '400',
    color: '#8A8A8A',
    lineHeight: 24,
  },

  // Section row
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 14,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#C4BFAE',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  sectionLink: {
    fontSize: 13,
    fontWeight: '500',
    color: '#B89A00',
  },

  // Preview cards
  previewScrollWrap: {
    marginBottom: 36,
  },
  previewScroll: {
    paddingHorizontal: 24,
    gap: 12,
  },

  // How it works
  howSection: {
    paddingHorizontal: 24,
    gap: 16,
  },
  stepsCard: {
    backgroundColor: 'rgba(255,255,255,0.78)',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(26,26,26,0.05)',
    marginTop: 14,
    shadowColor: '#1A1A1A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 24,
    elevation: 1,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  stepRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  stepNum: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFE033',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  stepNumText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4A3F00',
  },
  stepContent: {
    flex: 1,
    gap: 2,
  },
  stepLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  stepSub: {
    fontSize: 12,
    color: '#B0AB9C',
  },

  // CTA bar
  ctaBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingBottom: 36,
  },
  ctaBarFade: {
    position: 'absolute',
    top: -40,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FBF7EC',
    opacity: 0.92,
  },
  btnPlay: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#1A1A1A',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 6,
  },
  btnPlayText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFD700',
    letterSpacing: 0.2,
  },
  btnPlayIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(255,215,0,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPlayIconText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFD700',
  },
});