import CategoryModal from '@/components/game/CategoryModal';
import PreviewCard from '@/components/game/CategoryPreview';
import { CATEGORIES } from '@/data';
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
      pathname: '/(tabs)/cards',
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
        <TouchableOpacity
          style={styles.btnPlay}
          activeOpacity={0.85}
          onPress={openModal}
        >
          <Text style={styles.btnPlayText}>Let's Play</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnFriends}
          activeOpacity={0.8}
          onPress={() => router.push('/(tabs)/friends')}
        >
          <Text style={styles.btnFriendsEmoji}>👥</Text>
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

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBEA',
  },
  scroll: {
    paddingBottom: 120,
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
    fontSize: 44,
    fontWeight: '700',
    color: '#1A1A1A',
    letterSpacing: -1.5,
    lineHeight: 48,
    marginBottom: 14,
  },
  heroTitleItalic: {
    fontStyle: 'italic',
    color: '#B89A00',
  },
  heroSub: {
    fontSize: 15,
    fontWeight: '400',
    color: '#888',
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
    color: '#BBB',
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
    backgroundColor: '#fff',
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
    marginTop: 14,
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
    color: '#AAA',
  },

  // CTA bar
  ctaBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 24,
    paddingBottom: 36,
    paddingTop: 16,
    backgroundColor: '#FFFBEA',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.06)',
  },
  btnPlay: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPlayText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFD700',
    letterSpacing: 0.2,
  },
  btnFriends: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#FFE033',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnFriendsEmoji: {
    fontSize: 22,
  },
});