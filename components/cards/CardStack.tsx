import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { styles } from './styles';

type Props = {
  finished: boolean;
  currentCard?: any;
  nextCard?: any;
  cardStyle: any;
  nextCardStyle: any;
  panHandlers: any;
  onRestart?: () => void; 
};

export default function CardStack({
  finished,
  currentCard,
  nextCard,
  cardStyle,
  nextCardStyle,
  panHandlers,
  onRestart
}: Props) {

  if (finished) {
    return (
      <View style={styles.stack}>
        <View style={styles.endCard}>
          <Text style={styles.endEmoji}>🎉</Text>
          <Text style={styles.endTitle}>That's a wrap!</Text>
          <Text style={styles.endSub}>
            You've gone through all the questions.
          </Text>
        <TouchableOpacity
          onPress={onRestart}
          style={styles.btnPrimary}
          activeOpacity={0.8}
        >
          <Text style={styles.btnPrimaryText}>
            Play again
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    );
  }

  return (
    <View style={styles.stack}>
      {/* NEXT CARD */}
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

      {/* CURRENT CARD */}
      {currentCard && (
        <Animated.View
          style={[styles.card, cardStyle]}
          {...panHandlers}
        >
          <Text
            style={[
              styles.cardLabel,
              currentCard.mode === 'chaos' && styles.cardLabelChaos,
            ]}
          >
            {currentCard.mode === 'chaos' ? '🍻 CHAOS MODE' : '🌙 DEEP TALK'}
          </Text>

          <Text style={styles.cardQuestion}>{currentCard.text}</Text>

          <Text style={styles.swipeHint}>
            ← Skip · Swipe right for next →
          </Text>
        </Animated.View>
      )}
    </View>
  );
}