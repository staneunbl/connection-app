import { Dimensions, StyleSheet } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get('window');
export const styles = StyleSheet.create({
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
  previewCard: {
    width: 190,
    borderRadius: 22,
    padding: 20,
    gap: 8,
  },
  previewEmoji: {
    fontSize: 28,
    lineHeight: 34,
  },
  previewTag: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  previewTagText: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.8,
  },
  previewName: {
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 22,
  },
  previewDesc: {
    fontSize: 12,
    lineHeight: 17,
    opacity: 0.65,
  },
  previewFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  previewCount: {
    fontSize: 11,
    fontWeight: '500',
    opacity: 0.45,
  },
  previewArrow: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewArrowText: {
    fontSize: 13,
    fontWeight: '600',
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
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#FFFBEA',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingBottom: 48,
    paddingTop: 12,
  },
  sheetHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(0,0,0,0.12)',
    alignSelf: 'center',
    marginBottom: 20,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  sheetTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  sheetClose: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.07)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetCloseText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  sheetSub: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  scrollArea: {
    maxHeight: 400,
  },
  modalCardList: {
    gap: 12,
    paddingBottom: 20,
  },
  modalCard: {
    borderRadius: 20,
    padding: 20,
    gap: 8,
  },
  modalCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  modalCardEmoji: {
    fontSize: 30,
  },
  modalCardBadge: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  modalCardBadgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  modalCardName: {
    fontSize: 22,
    fontWeight: '700',
  },
  modalCardDesc: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.7,
  },
  modalCardFooter: {
    borderTopWidth: 1,
    paddingTop: 12,
    marginTop: 4,
  },
  modalCardAction: {
    fontSize: 13,
    fontWeight: '600',
    opacity: 0.8,
  },
});