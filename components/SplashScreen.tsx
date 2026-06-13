import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";

export default function SplashScreen() {
  const router = useRouter();

  // animation values
  const scale = useSharedValue(0.6);
  const opacity = useSharedValue(0);

  useEffect(() => {
    // entry animation
    scale.value = withSequence(
      withTiming(1.1, { duration: 500, easing: Easing.out(Easing.exp) }),
      withTiming(1, { duration: 200 })
    );

    opacity.value = withTiming(1, { duration: 600 });

    // subtle pulse loop
    scale.value = withRepeat(
      withTiming(1.05, { duration: 1200 }),
      -1,
      true
    );

    // navigate after 2s
    const timer = setTimeout(() => {
      router.replace("/home");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const logoStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  return (
    <View style={styles.container}>
      {/* Animated Logo */}
      <Animated.View style={[styles.logoRing, logoStyle]}>
        <View style={styles.logoInner}>
          <View style={styles.iconHead} />
          <View style={styles.iconBody} />
        </View>
      </Animated.View>

      <Animated.Text style={[styles.title, logoStyle]}>
        Connection
      </Animated.Text>

      <Text style={styles.subtitle}>
        Questions that bring people closer
      </Text>
    </View>
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