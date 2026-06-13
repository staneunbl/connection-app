
import { getQuestionsByCategory } from '@/data/questions';
import { CardQuestion } from '@/types/categories.types';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useMemo, useRef, useState } from 'react';
import {
    Dimensions,
    PanResponder,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, {
    Extrapolation,
    interpolate,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.28;
const CARD_HEIGHT = height * 0.56;

export default function CardsScreen() {
  const params = useLocalSearchParams<{ categoryId?: string; categoryName?: string }>();
  const categoryId = params.categoryId ?? 'deep-talk';
  const categoryName = params.categoryName ?? 'Deep Talk';

  const questions = useMemo(() => {
    const list = getQuestionsByCategory(categoryId);
    return list.length > 0 ? list : getQuestionsByCategory('deep-talk');
  }, [categoryId]);

  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const currentCard: CardQuestion | undefined = questions[index];
  const nextCard: CardQuestion | undefined = questions[index + 1];

  const goNext = (skipped: boolean) => {
    if (index + 1 >= questions.length) {
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
    }
    translateX.value = 0;
    translateY.value = 0;
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) =>
        Math.abs(gesture.dx) > 6 || Math.abs(gesture.dy) > 6,
      onPanResponderMove: (_, gesture) => {
        translateX.value = gesture.dx;
        translateY.value = gesture.dy * 0.3;
      },
      onPanResponderRelease: (_, gesture) => {
        if (Math.abs(gesture.dx) > SWIPE_THRESHOLD) {
          const direction = gesture.dx > 0 ? 1 : -1;
          translateX.value = withTiming(
            direction * width * 1.5,
            { duration: 250 },
            () => {
              runOnJS(goNext)(false);
            }
          );
        } else {
          translateX.value = withSpring(0, { damping: 16, stiffness: 180 });
          translateY.value = withSpring(0, { damping: 16, stiffness: 180 });
        }
      },
    })
  ).current;

  const cardStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-width, 0, width],
      [-12, 0, 12],
      Extrapolation.CLAMP
    );
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate}deg` },
      ],
    };
  });

  const nextCardStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      Math.abs(translateX.value),
      [0, SWIPE_THRESHOLD],
      [0.94, 1],
      Extrapolation.CLAMP
    );
    const opacity = interpolate(
      Math.abs(translateX.value),
      [0, SWIPE_THRESHOLD],
      [0.6, 1],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ scale }],
      opacity,
    };
  });

  const leftStampStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [-SWIPE_THRESHOLD, 0], [1, 0], Extrapolation.CLAMP),
  }));

  const rightStampStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, SWIPE_THRESHOLD], [0, 1], Extrapolation.CLAMP),
  }));

  const handleSkip = () => {
    translateX.value = withTiming(-width * 1.5, { duration: 250 }, () => {
      runOnJS(goNext)(true);
    });
  };

  const handleNext = () => {
    translateX.value = withTiming(width * 1.5, { duration: 250 }, () => {
      runOnJS(goNext)(false);
    });
  };

  const restart = () => {
    setIndex(0);
    setFinished(false);
    translateX.value = 0;
    translateY.value = 0;
  };

  const modeLabel = currentCard?.mode === 'chaos' ? 'CHAOS MODE' : 'DEEP TALK';

  return (
    <SafeAreaView style={styles.container}>
      {/* Background orbs */}
      <View style={styles.orb1} />
      <View style={styles.orb2} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Text style={styles.backBtnText}>‹</Text>
        </TouchableOpacity>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerCategory}>{categoryName}</Text>
          <Text style={styles.headerProgress}>
            {finished ? questions.length : index + 1} / {questions.length}
          </Text>
        </View>
        <View style={styles.backBtnSpacer} />
      </View>

      {/* Progress bar */}
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${((finished ? questions.length : index) / questions.length) * 100}%` },
          ]}
        />
      </View>

      {/* Card stack */}
      <View style={styles.stack}>
        {finished ? (
          <View style={styles.endCard}>
            <Text style={styles.endEmoji}>🎉</Text>
            <Text style={styles.endTitle}>That's a wrap!</Text>
            <Text style={styles.endSub}>
              You've gone through all the questions in {categoryName}.
            </Text>
            <TouchableOpacity style={styles.btnPrimary} activeOpacity={0.85} onPress={restart}>
              <Text style={styles.btnPrimaryText}>Play again</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnGhost}
              activeOpacity={0.6}
              onPress={() => router.push('/game')}
            >
              <Text style={styles.btnGhostText}>Choose another category</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Next card preview (peeking behind) */}
            {nextCard && (
              <Animated.View style={[styles.card, styles.cardBehind, nextCardStyle]}>
                <Text
                  style={[
                    styles.cardLabel,
                    nextCard.mode === 'chaos' && styles.cardLabelChaos,
                  ]}
                >
                  {nextCard.mode === 'chaos' ? '🍻 CHAOS MODE' : '🌙 DEEP TALK'}
                </Text>
                <Text style={styles.cardQuestion}>{nextCard.text}</Text>
              </Animated.View>
            )}

            {/* Active card */}
            {currentCard && (
              <Animated.View
                style={[styles.card, cardStyle]}
                {...panResponder.panHandlers}
              >
                {/* SKIP stamp */}
                <Animated.View style={[styles.stamp, styles.stampSkip, leftStampStyle]}>
                  <Text style={[styles.stampText, styles.stampSkipText]}>SKIP</Text>
                </Animated.View>
                {/* NEXT stamp */}
                <Animated.View style={[styles.stamp, styles.stampNext, rightStampStyle]}>
                  <Text style={[styles.stampText, styles.stampNextText]}>NEXT</Text>
                </Animated.View>

                <Text
                  style={[
                    styles.cardLabel,
                    currentCard.mode === 'chaos' && styles.cardLabelChaos,
                  ]}
                >
                  {currentCard.mode === 'chaos' ? '🍻 CHAOS MODE' : '🌙 DEEP TALK'}
                </Text>
                <Text style={styles.cardQuestion}>{currentCard.text}</Text>

                <Text style={styles.swipeHint}>← Skip · Swipe right for next →</Text>
              </Animated.View>
            )}
          </>
        )}
      </View>

      {/* Bottom controls */}
      {!finished && (
        <View style={styles.bottomArea}>
          <TouchableOpacity style={styles.btnSkip} activeOpacity={0.8} onPress={handleSkip}>
            <Text style={styles.btnSkipText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnPrimary} activeOpacity={0.85} onPress={handleNext}>
            <Text style={styles.btnPrimaryText}>Next question</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBEA',
  },

  // Decorative orbs
  orb1: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#FFE033',
    opacity: 0.25,
    top: -100,
    right: -80,
  },
  orb2: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#F5A623',
    opacity: 0.18,
    bottom: 60,
    left: -40,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    zIndex: 1,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  backBtnSpacer: {
    width: 40,
  },
  backBtnText: {
    fontSize: 22,
    color: '#1A1A1A',
    fontWeight: '600',
    marginTop: -2,
  },
  headerTitleWrap: {
    alignItems: 'center',
  },
  headerCategory: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  headerProgress: {
    fontSize: 12,
    fontWeight: '500',
    color: '#B89A00',
    marginTop: 2,
  },

  // Progress bar
  progressTrack: {
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.06)',
    borderRadius: 2,
    marginHorizontal: 24,
    marginTop: 16,
    overflow: 'hidden',
    zIndex: 1,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 2,
  },

  // Card stack
  stack: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    position: 'absolute',
    width: width - 48,
    height: CARD_HEIGHT,
    borderRadius: 28,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 40,
  },
  cardBehind: {
    backgroundColor: '#2A2A2A',
  },
  cardLabel: {
    position: 'absolute',
    top: 28,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1.5,
    color: '#FFD700',
  },
  cardLabelChaos: {
    color: '#F5A623',
  },
  cardQuestion: {
    fontSize: 24,
    fontWeight: '500',
    color: '#F5F0D0',
    textAlign: 'center',
    lineHeight: 34,
  },
  swipeHint: {
    position: 'absolute',
    bottom: 28,
    fontSize: 11,
    fontWeight: '500',
    color: 'rgba(245,240,208,0.4)',
    letterSpacing: 0.4,
  },

  // Stamps
  stamp: {
    position: 'absolute',
    top: 36,
    borderWidth: 3,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 6,
    transform: [{ rotate: '-18deg' }],
    zIndex: 5,
  },
  stampSkip: {
    left: 24,
    borderColor: '#FF6B6B',
    transform: [{ rotate: '-18deg' }],
  },
  stampNext: {
    right: 24,
    borderColor: '#7ED957',
    transform: [{ rotate: '18deg' }],
  },
  stampText: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 2,
  },
  stampSkipText: {
    color: '#FF6B6B',
  },
  stampNextText: {
    color: '#7ED957',
  },

  // End card
  endCard: {
    width: width - 48,
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 28,
    paddingHorizontal: 32,
    paddingVertical: 48,
    gap: 14,
  },
  endEmoji: {
    fontSize: 48,
    marginBottom: 4,
  },
  endTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFD700',
  },
  endSub: {
    fontSize: 14,
    color: '#F5F0D0',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 12,
  },

  // Bottom controls
  bottomArea: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 24,
    paddingBottom: 28,
    paddingTop: 8,
    zIndex: 1,
  },
  btnSkip: {
    flex: 1,
    paddingVertical: 17,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSkipText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#888',
  },
  btnPrimary: {
    flex: 2,
    paddingVertical: 17,
    borderRadius: 18,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFD700',
    letterSpacing: 0.2,
  },
  btnGhost: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  btnGhostText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4A3F00',
  },
});