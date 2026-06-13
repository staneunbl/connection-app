import { useRef, useState } from "react";
import { Dimensions, PanResponder } from "react-native";
import { runOnJS, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

const { width } = Dimensions.get("window");
const SWIPE_THRESHOLD = width * 0.28;

export function useCardSwipe(questions: any[]) {
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const goNext = () => {
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
      onMoveShouldSetPanResponder: (_, g) =>
        Math.abs(g.dx) > 6 || Math.abs(g.dy) > 6,

      onPanResponderMove: (_, g) => {
        translateX.value = g.dx;
        translateY.value = g.dy * 0.3;
      },

      onPanResponderRelease: (_, g) => {
        if (Math.abs(g.dx) > SWIPE_THRESHOLD) {
          const dir = g.dx > 0 ? 1 : -1;

          translateX.value = withTiming(
            dir * width * 1.5,
            { duration: 250 },
            () => runOnJS(goNext)()
          );
        } else {
          translateX.value = withSpring(0);
          translateY.value = withSpring(0);
        }
      },
    })
  ).current;

  return {
    index,
    finished,
    translateX,
    translateY,
    panResponder,
    setIndex,
    setFinished,
  };
}