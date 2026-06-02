import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Animated,
  Alert,
  Easing
} from 'react-native';
import { Colors } from '../constants/colors';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import api from '../services/api';

const GENERATION_STEPS = [
  { id: '1', title: 'Analyzing room structure', duration: 2000 },
  { id: '2', title: 'Applying design style', duration: 3000 },
  { id: '3', title: 'Finalizing details', duration: 2000 },
];

const Spinner = () => {
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });
  
  const spinReverse = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['360deg', '0deg']
  });

  return (
    <View style={styles.spinnerContainer}>
      <Animated.View style={[styles.spinnerLayer, { transform: [{ rotate: spin }] }]}>
        <LinearGradient colors={Colors.gradientGenerating1} style={styles.spinnerGradient} />
        <View style={styles.spinnerInnerHole} />
      </Animated.View>
      <Animated.View style={[styles.spinnerLayer, { transform: [{ rotate: spinReverse }, { scale: 0.85 }] }]}>
        <LinearGradient colors={Colors.gradientGenerating2} style={styles.spinnerGradient} />
        <View style={styles.spinnerInnerHole} />
      </Animated.View>
    </View>
  );
};

export default function AIGenerateScreen({ navigation, route }) {
  const selectedStyles = route?.params?.styles || ['Modern Luxury'];
  const [phase, setPhase] = useState('idle'); // idle | uploading | generating | done
  const [imageUri, setImageUri] = useState(null);
  const [designId, setDesignId] = useState(null);
  const [currentStep, setCurrentStep] = useState(-1);
  const [progress, setProgress] = useState(0);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const startGeneration = async () => {
    if (!imageUri) {
      Alert.alert('Missing Image', 'Please upload a room photo first!');
      return;
    }

    setPhase('uploading');
    
    try {
      // 1. Upload Room to Backend
      let formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'room.jpg',
      });
      formData.append('designStyle', selectedStyles[0]);
      formData.append('roomType', 'Living Room');
      formData.append('budget', '10000');
      
      const uploadRes = await api.post('/design/upload-room', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      const dId = uploadRes.data.data._id;
      setDesignId(dId);
      
      // 2. Start Generate Animation & API call
      setPhase('generating');
      setCurrentStep(0);
      setProgress(0);

      // Call generate API in background
      api.post('/design/generate', { designId: dId }).catch(e => console.log('Generate error:', e));

      let step = 0;
      const totalDuration = GENERATION_STEPS.reduce((s, g) => s + g.duration, 0);
      let elapsed = 0;

      const runStep = () => {
        if (step >= GENERATION_STEPS.length) {
          setPhase('done');
          setProgress(1);
          return;
        }
        setCurrentStep(step);
        const dur = GENERATION_STEPS[step].duration;
        let tick = 0;
        const interval = setInterval(() => {
          tick += 50;
          const p = (elapsed + tick) / totalDuration;
          setProgress(Math.min(p, 0.99));
          if (tick >= dur) {
            clearInterval(interval);
            elapsed += dur;
            step++;
            runStep();
          }
        }, 50);
      };

      runStep();

    } catch (e) {
      console.log(e);
      Alert.alert('Upload Failed', 'Make sure your backend is running and reachable.');
      setPhase('idle');
    }
  };

  useEffect(() => {
    if (phase === 'done') {
      const timer = setTimeout(() => {
        navigation.navigate('Result');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  if (phase === 'generating' || phase === 'done') {
    return (
      <View style={[styles.container, styles.generatingContainer]}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" />
        <LinearGradient colors={['#111827', '#1f2937']} style={StyleSheet.absoluteFillObject} />
        
        <View style={styles.generatingContent}>
          <Spinner />
          
          <Text style={styles.generatingTitle}>AI is Working Its Magic</Text>
          <Text style={styles.generatingSubtitle}>Generating your {selectedStyles[0]} design...</Text>
          
          <View style={styles.progressWrapper}>
            <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
          </View>
          
          <View style={styles.stepsList}>
            {GENERATION_STEPS.map((step, i) => {
              const isActive = currentStep === i;
              const isDone = currentStep > i || phase === 'done';
              
              return (
                <View key={i} style={styles.stepItem}>
                  <View style={[
                    styles.stepDot, 
                    isActive && styles.stepDotActive,
                    isDone && styles.stepDotDone
                  ]}>
                    {isDone && <Feather name="check" size={10} color={Colors.white} />}
                  </View>
                  <Text style={[
                    styles.stepText,
                    (isActive || isDone) && styles.stepTextActive
                  ]}>{step.title}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    );
  }

  // IDLE / UPLOADING UI
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Upload Photo</Text>
        <View style={{ width: 44 }} />
      </View>

      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.uploadArea} 
          onPress={pickImage} 
          disabled={phase === 'uploading'}
          activeOpacity={0.8}
        >
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.previewImage} />
          ) : (
            <View style={styles.uploadPlaceholder}>
              <View style={styles.uploadIconWrapper}>
                <Feather name="camera" size={32} color={Colors.primary} />
              </View>
              <Text style={styles.uploadTextTitle}>Tap to Upload</Text>
              <Text style={styles.uploadTextSub}>JPG or PNG max 20MB</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.styleRecap}>
          <Text style={styles.styleRecapLabel}>Selected Style:</Text>
          <Text style={styles.styleRecapValue}>{selectedStyles[0]}</Text>
        </View>

        <TouchableOpacity 
          style={[styles.generateBtn, phase === 'uploading' && { opacity: 0.7 }]} 
          onPress={startGeneration} 
          activeOpacity={0.9} 
          disabled={phase === 'uploading'}
        >
          <LinearGradient
            colors={Colors.gradientPrimary}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={styles.generateBtnGradient}
          >
            {phase === 'uploading' ? (
              <Text style={styles.generateBtnText}>Uploading...</Text>
            ) : (
              <>
                <Feather name="zap" size={20} color={Colors.white} />
                <Text style={styles.generateBtnText}>Generate Design</Text>
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: Colors.white,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  content: {
    padding: 24,
  },
  uploadArea: {
    height: 300,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    overflow: 'hidden',
  },
  uploadPlaceholder: {
    alignItems: 'center',
  },
  uploadIconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primarySurface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  uploadTextTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  uploadTextSub: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  styleRecap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 16,
    marginBottom: 32,
  },
  styleRecapLabel: {
    fontSize: 15,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  styleRecapValue: {
    fontSize: 15,
    color: Colors.primary,
    fontWeight: '700',
  },
  generateBtn: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  generateBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  generateBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },

  // Generating Phase UI
  generatingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  generatingContent: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 32,
  },
  spinnerContainer: {
    width: 160,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  spinnerLayer: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    overflow: 'hidden',
  },
  spinnerGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  spinnerInnerHole: {
    position: 'absolute',
    top: 8, left: 8, right: 8, bottom: 8,
    borderRadius: 72,
    backgroundColor: '#1f2937', // Match dark background
  },
  generatingTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 8,
  },
  generatingSubtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 32,
  },
  progressWrapper: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 32,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary, // Could be gradient too
  },
  stepsList: {
    width: '100%',
    gap: 16,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepDotActive: {
    borderColor: Colors.primary,
  },
  stepDotDone: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  stepText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '500',
  },
  stepTextActive: {
    color: Colors.white,
  },
});
