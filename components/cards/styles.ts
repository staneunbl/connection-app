import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");
export const CARD_HEIGHT = height * 0.56;

export const styles = StyleSheet.create({
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
})