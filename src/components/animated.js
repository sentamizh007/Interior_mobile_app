import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Colors } from '../constants/colors';

const { width } = Dimensions.get('window');

// ─── Before/After Slider ─────────────────────────────────────────────────────
export const BeforeAfterSlider = ({
  beforeLabel = 'BEFORE',
  afterLabel = 'AFTER',
  beforeGradient = ['#C8B89A', '#A89880'],
  afterGradient = ['#6C47FF', '#A855F7'],
  height = 220,
  style,
}) => {
  const sliderX = useRef(new Animated.Value(0.5)).current;
  const [sliderPos, setSliderPos] = useState(0.5);
  const containerRef = useRef(null);
  const containerWidth = useRef(width - 40);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx, x0 }) => {
        const newPos = Math.max(0.05, Math.min(0.95, (x0 + dx) / containerWidth.current));
        setSliderPos(newPos);
        sliderX.setValue(newPos);
      },
    })
  ).current;

  const leftWidth = sliderX.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const handleLeft = sliderX.interpolate({
    inputRange: [0, 1],
    outputRange: ['-50%', '50%'],
  });

  return (
    <View
      style={[styles.sliderContainer, { height }, style]}
      ref={containerRef}
      onLayout={(e) => {
        containerWidth.current = e.nativeEvent.layout.width;
      }}
    >
      {/* After (right) layer - full width */}
      <View style={[styles.sliderLayer, { backgroundColor: afterGradient[0] }]}>
        <View style={[StyleSheet.absoluteFill, {
          backgroundColor: afterGradient[1],
          opacity: 0.6,
        }]} />
        <View style={styles.sliderRoomPreview}>
          <Text style={styles.sliderRoomEmoji}>✨</Text>
          <Text style={styles.sliderRoomText}>AI Generated</Text>
        </View>
        <View style={[styles.sliderLabel, styles.sliderLabelRight]}>
          <Text style={styles.sliderLabelText}>{afterLabel}</Text>
        </View>
      </View>

      {/* Before (left) layer - clipped */}
      <Animated.View style={[styles.sliderLayerAbsolute, { width: leftWidth }]}>
        <View style={[StyleSheet.absoluteFill, { backgroundColor: beforeGradient[0] }]} />
        <View style={[StyleSheet.absoluteFill, {
          backgroundColor: beforeGradient[1],
          opacity: 0.4,
        }]} />
        <View style={styles.sliderRoomPreview}>
          <Text style={styles.sliderRoomEmoji}>🏠</Text>
          <Text style={styles.sliderRoomText}>Original</Text>
        </View>
        <View style={[styles.sliderLabel, styles.sliderLabelLeft]}>
          <Text style={styles.sliderLabelText}>{beforeLabel}</Text>
        </View>
      </Animated.View>

      {/* Divider handle */}
      <Animated.View
        style={[styles.sliderHandle, { left: leftWidth }]}
        {...panResponder.panHandlers}
      >
        <View style={styles.sliderHandleLine} />
        <View style={styles.sliderHandleCircle}>
          <Text style={styles.sliderHandleArrows}>◀ ▶</Text>
        </View>
        <View style={styles.sliderHandleLine} />
      </Animated.View>
    </View>
  );
};

// ─── Pulsing Dot ─────────────────────────────────────────────────────────────
export const PulsingDot = ({ color = Colors.primary, size = 10, style }) => {
  const pulse = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animate = () => {
      Animated.loop(
        Animated.parallel([
          Animated.sequence([
            Animated.timing(pulse, { toValue: 2, duration: 800, useNativeDriver: true }),
            Animated.timing(pulse, { toValue: 1, duration: 200, useNativeDriver: true }),
          ]),
          Animated.sequence([
            Animated.timing(opacity, { toValue: 0.2, duration: 800, useNativeDriver: true }),
            Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
          ]),
        ])
      ).start();
    };
    animate();
  }, []);

  return (
    <View style={[{ width: size * 2, height: size * 2, alignItems: 'center', justifyContent: 'center' }, style]}>
      <Animated.View
        style={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          opacity,
          transform: [{ scale: pulse }],
        }}
      />
      <View style={{ width: size / 2, height: size / 2, borderRadius: size / 4, backgroundColor: color }} />
    </View>
  );
};

// ─── Shimmer Loader ───────────────────────────────────────────────────────────
export const ShimmerBox = ({ width: w, height: h, borderRadius = 12, style }) => {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(shimmer, { toValue: 0, duration: 900, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const backgroundColor = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: ['#F0EDFF', '#E0D9FF'],
  });

  return (
    <Animated.View
      style={[{ width: w, height: h, borderRadius, backgroundColor }, style]}
    />
  );
};

// ─── Rating Stars ─────────────────────────────────────────────────────────────
export const RatingStars = ({ rating, size = 12, style }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', gap: 2 }, style]}>
      {Array.from({ length: 5 }, (_, i) => (
        <Text key={i} style={{ fontSize: size, color: i < full ? '#F5A623' : '#E0D9FF' }}>
          {i < full ? '★' : (i === full && half ? '⯨' : '☆')}
        </Text>
      ))}
      <Text style={{ fontSize: size - 1, color: Colors.textSecondary, marginLeft: 3, fontWeight: '600' }}>
        {rating}
      </Text>
    </View>
  );
};

// ─── Animated Progress Bar ────────────────────────────────────────────────────
export const ProgressBar = ({ progress, color = Colors.primary, height = 6, style }) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: progress,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const width = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[{ height, backgroundColor: Colors.border, borderRadius: height / 2, overflow: 'hidden' }, style]}>
      <Animated.View
        style={{
          height,
          width,
          backgroundColor: color,
          borderRadius: height / 2,
        }}
      />
    </View>
  );
};

// ─── Floating Action Button ────────────────────────────────────────────────────
export const FAB = ({ icon, label, onPress, style }) => {
  const scale = useRef(new Animated.Value(1)).current;

  return (
    <Animated.View style={[styles.fab, { transform: [{ scale }] }, style]}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={() => Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start()}
        onPressOut={() => Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start()}
        style={styles.fabInner}
        activeOpacity={0.9}
      >
        <Text style={styles.fabIcon}>{icon}</Text>
        {label && <Text style={styles.fabLabel}>{label}</Text>}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#eee',
  },
  sliderLayer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderLayerAbsolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderRoomPreview: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderRoomEmoji: {
    fontSize: 40,
  },
  sliderRoomText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 6,
    letterSpacing: 0.3,
  },
  sliderLabel: {
    position: 'absolute',
    bottom: 12,
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
    backdropFilter: 'blur(10px)',
  },
  sliderLabelLeft: { left: 12 },
  sliderLabelRight: { right: 12 },
  sliderLabelText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  sliderHandle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -1.5,
  },
  sliderHandleLine: {
    flex: 1,
    width: 2,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  sliderHandleCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  sliderHandleArrows: {
    fontSize: 9,
    color: Colors.primary,
    fontWeight: '700',
  },
  fab: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  fabInner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 100,
    gap: 8,
  },
  fabIcon: {
    fontSize: 20,
  },
  fabLabel: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
});
