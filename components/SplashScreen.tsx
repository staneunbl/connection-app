import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export default function SplashScreen() {
  const router = useRouter();

  // shared values
  const logoScale = useSharedValue(0.5);
  const logoOpacity = useSharedValue(0);

  const textOpacity = useSharedValue(0);
  const screenOpacity = useSharedValue(1);

  useEffect(() => {
    // LOGO entrance
    logoScale.value = withSequence(
      withTiming(1.15, {
        duration: 500,
        easing: Easing.out(Easing.exp),
      }),
      withTiming(1, { duration: 300 })
    );

    logoOpacity.value = withTiming(1, { duration: 500 });

    // TEXT fade in slightly delayed
    textOpacity.value = withDelay(
      300,
      withTiming(1, { duration: 600 })
    );

    // gentle pulse loop
    logoScale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 1200 }),
        withTiming(1, { duration: 1200 })
      ),
      -1
    );

    // EXIT animation before navigation
    const timer = setTimeout(() => {
      screenOpacity.value = withTiming(0, { duration: 400 });

      setTimeout(() => {
        router.replace("/game");
      }, 400);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoOpacity.value,
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textOpacity.value ? 0 : 10 }],
  }));

  const screenStyle = useAnimatedStyle(() => ({
    opacity: screenOpacity.value,
  }));

  return (
    <Animated.View style={[styles.container, screenStyle]}>
      <Animated.View style={[styles.logoRing, logoStyle]}>
        <View style={styles.logoInner}>
          <View style={styles.iconHead} />
          <View style={styles.iconBody} />
        </View>
      </Animated.View>

      <Animated.Text style={[styles.title, textStyle]}>
        Connection
      </Animated.Text>

      <Animated.Text style={[styles.subtitle, textStyle]}>
        Questions that bring people closer
      </Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFD700",
    justifyContent: "center",
    alignItems: "center",
  },

  logoRing: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#FFE033",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },

  logoInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#1A1A1A",
    alignItems: "center",
    justifyContent: "center",
  },

  iconHead: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#FFD700",
    marginBottom: 2,
  },

  iconBody: {
    width: 22,
    height: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#FFD700",
  },

  title: {
    fontSize: 34,
    fontWeight: "600",
    color: "#1A1A1A",
  },

  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: "#4A3F00",
    textAlign: "center",
  },
});