import { StyleSheet } from 'react-native';

export const Typography = StyleSheet.create({
  // Display
  displayLarge: {
    fontFamily: 'System',
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: -1,
    lineHeight: 44,
  },
  displayMedium: {
    fontFamily: 'System',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
    lineHeight: 36,
  },

  // Headlines
  headlineLarge: {
    fontFamily: 'System',
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.3,
    lineHeight: 32,
  },
  headlineMedium: {
    fontFamily: 'System',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.2,
    lineHeight: 28,
  },
  headlineSmall: {
    fontFamily: 'System',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.1,
    lineHeight: 24,
  },

  // Titles
  titleLarge: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  },
  titleMedium: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },

  // Body
  bodyLarge: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  bodyMedium: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  bodySmall: {
    fontFamily: 'System',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },

  // Labels
  labelLarge: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  labelMedium: {
    fontFamily: 'System',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    lineHeight: 16,
  },
  labelSmall: {
    fontFamily: 'System',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    lineHeight: 14,
    textTransform: 'uppercase',
  },
});
