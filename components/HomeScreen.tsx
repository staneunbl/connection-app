import { useRouter } from "expo-router";
import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }: { navigation?: any }) {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      {/* Background orbs (decorative) */}
      <View style={styles.orb1} />
      <View style={styles.orb2} />

      {/* Top: Logo + title */}
      <View style={styles.topArea}>
        <View style={styles.logoRing}>
          <View style={styles.logoInner}>
            {/* Person icon — two circles representing head + body */}
            <View style={styles.iconHead} />
            <View style={styles.iconBody} />
          </View>
        </View>
        <Text style={styles.appName}>Connection</Text>
        <Text style={styles.tagline}>Questions that bring people closer</Text>
      </View>

      {/* Mid: Card preview */}
      <View style={styles.midArea}>
        <View style={styles.cardPreview}>
          <Text style={styles.cardLabel}>DEEP TALK</Text>
          <Text style={styles.cardQuestion}>
            "What's something you've never told anyone in this room?"
          </Text>
        </View>

        {/* Dots */}
        <View style={styles.dotsRow}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* Category badges */}
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>🌙 Deep Talks</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>🍻 Chaos Mode</Text>
          </View>
        </View>
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>✨ and More...</Text>
          </View>
        </View>
      </View>

      {/* Bottom: CTAs */}
      <View style={styles.bottomArea}>
        <TouchableOpacity
          style={styles.btnPrimary}
          activeOpacity={0.85}
          onPress={() => router.push("/game")}
        >
          <Text style={styles.btnPrimaryText}>Start session</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.btnGhost} activeOpacity={0.6}>
          <Text style={styles.btnGhostText}>How to play</Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD700',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingTop: 48,
    paddingBottom: 40,
    overflow: 'hidden',
  },

  // Decorative orbs
  orb1: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#FFF07A',
    opacity: 0.35,
    top: -80,
    right: -60,
  },
  orb2: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#F5A623',
    opacity: 0.25,
    bottom: 120,
    left: -30,
  },

  // Top area
  topArea: {
    alignItems: 'center',
    marginTop: 24,
    zIndex: 1,
  },
  logoRing: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: '#FFE033',
    borderWidth: 2,
    borderColor: 'rgba(26,26,26,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  logoInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Simple person icon drawn with views
  iconHead: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#FFD700',
    marginBottom: 2,
  },
  iconBody: {
    width: 20,
    height: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#FFD700',
  },

  appName: {
    fontSize: 40,
    fontWeight: '600',
    color: '#1A1A1A',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 15,
    fontWeight: '400',
    color: '#4A3F00',
    textAlign: 'center',
    maxWidth: 220,
    lineHeight: 22,
  },

  // Mid area
  midArea: {
    alignItems: 'center',
    gap: 12,
    zIndex: 1,
  },
  cardPreview: {
    backgroundColor: '#1A1A1A',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 24,
    width: width - 96,
    alignItems: 'center',
  },
  cardLabel: {
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 1.5,
    color: '#FFD700',
    marginBottom: 10,
  },
  cardQuestion: {
    fontSize: 15,
    fontWeight: '400',
    color: '#F5F0D0',
    textAlign: 'center',
    lineHeight: 24,
  },

  dotsRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#B89A00',
  },
  dotActive: {
    width: 18,
    borderRadius: 3,
    backgroundColor: '#1A1A1A',
  },

  badgeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#FFE033',
    borderWidth: 1.5,
    borderColor: 'rgba(26,26,26,0.12)',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4A3F00',
  },

  // Bottom area
  bottomArea: {
    width: '100%',
    alignItems: 'center',
    gap: 14,
    zIndex: 1,
    padding: 20,
  },
  btnPrimary: {
    width: '100%',
    paddingVertical: 17,
    borderRadius: 18,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
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