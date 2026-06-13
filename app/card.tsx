import CardStack from '@/components/cards/Cardstack';
import GameControls from '@/components/cards/GameControls';
import GameHeader from '@/components/cards/GameHeader';
import { styles } from '@/components/cards/styles';
import { getQuestionsByCategory } from '@/data/questions';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useMemo, useRef, useState } from 'react';
import { Dimensions, PanResponder, SafeAreaView, View } from 'react-native';
import {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.28;

export default function CardsScreen() {
  const params = useLocalSearchParams<{
    categoryId?: string | string[];
    categoryName?: string;
  }>();

  const categoryId = Array.isArray(params.categoryId)
    ? params.categoryId[0]
    : params.categoryId ?? 'deep-talk';

  const categoryName = params.categoryName ?? 'Deep Talk';

  const questions = useMemo(() => {
    const list = getQuestionsByCategory(categoryId);
    return list.length ? list : getQuestionsByCategory('deep-talk');
  }, [categoryId]);

  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const currentCard = questions[index];
  const nextCard = questions[index + 1];

  const goNext = () => {
    if (index + 1 >= questions.length) {
      setFinished(true);
      return;
    }

    setIndex((i) => i + 1);
    translateX.value = 0;
    translateY.value = 0;
  };

  const resetAnimation = () => {
    translateX.value = 0;
    translateY.value = 0;
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) =>
        Math.abs(g.dx) > 6 || Math.abs(g.dy) > 6,

      onPanResponderMove: (_, g) => {
        translateX.value = g.dx;
        translateY.value = g.dy * 0.3;
      },

      onPanResponderRelease: (_, g) => {
        if (Math.abs(g.dx) > SWIPE_THRESHOLD) {
          const direction = g.dx > 0 ? 1 : -1;

          translateX.value = withTiming(
            direction * width * 1.5,
            { duration: 250 },
            () => runOnJS(goNext)()
          );
        } else {
          translateX.value = withSpring(0, {
            damping: 16,
            stiffness: 180,
          });

          translateY.value = withSpring(0, {
            damping: 16,
            stiffness: 180,
          });
        }
      },
    })
  ).current;

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  const nextCardStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      Math.abs(translateX.value),
      [0, SWIPE_THRESHOLD],
      [0.6, 1],
      Extrapolation.CLAMP
    ),
    transform: [
      {
        scale: interpolate(
          Math.abs(translateX.value),
          [0, SWIPE_THRESHOLD],
          [0.94, 1],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));

  const handleSkip = () => {
    translateX.value = withTiming(-width * 1.5, { duration: 250 }, () =>
      runOnJS(goNext)()
    );
  };

  const handleNext = () => {
    translateX.value = withTiming(width * 1.5, { duration: 250 }, () =>
      runOnJS(goNext)()
    );
  };

  const restart = () => {
    setIndex(0);
    setFinished(false);
    resetAnimation();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.orb1} />
      <View style={styles.orb2} />

      <GameHeader
        categoryName={categoryName}
        progress={`${finished ? questions.length : index + 1} / ${
          questions.length
        }`}
        onBack={() => router.back()}
      />

      <CardStack
        finished={finished}
        currentCard={currentCard}
        nextCard={nextCard}
        cardStyle={cardStyle}
        nextCardStyle={nextCardStyle}
        panHandlers={panResponder.panHandlers}
        onRestart={restart}
      />

      {!finished && (
        <GameControls onSkip={handleSkip} onNext={handleNext} />
      )}
    </SafeAreaView>
  );
}