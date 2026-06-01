import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { Colors } from '../constants/colors';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const interiorStyles = [
  { name: 'Modern Luxury', image: 'https://images.unsplash.com/photo-1720247520862-7e4b14176fa8?w=400&h=300&fit=crop', description: 'Contemporary elegance with premium finishes', color: ['transparent', '#f97316'] },
  { name: 'Scandinavian', image: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=400&h=300&fit=crop', description: 'Clean lines and natural materials', color: ['transparent', '#06b6d4'] },
  { name: 'Minimalist', image: 'https://images.unsplash.com/photo-1603512500383-f1f87c13ffc4?w=400&h=300&fit=crop', description: 'Less is more, pure simplicity', color: ['transparent', '#475569'] },
  { name: 'Industrial Loft', image: 'https://images.unsplash.com/photo-1668438712649-ffd85f756de5?w=400&h=300&fit=crop', description: 'Raw materials and urban aesthetics', color: ['transparent', '#3f3f46'] },
  { name: 'Japandi', image: 'https://images.unsplash.com/photo-1610307522657-8c0304960189?w=400&h=300&fit=crop', description: 'Japanese minimalism meets Scandinavian', color: ['transparent', '#0d9488'] },
  { name: 'Luxury Classic', image: 'https://images.unsplash.com/photo-1648881806148-e5c51179c826?w=400&h=300&fit=crop', description: 'Timeless elegance and sophistication', color: ['transparent', '#4f46e5'] },
  { name: 'Indian Traditional', image: 'https://images.unsplash.com/photo-1688647063090-36f36f692d95?w=400&h=300&fit=crop', description: 'Rich colors and cultural heritage', color: ['transparent', '#db2777'] }
];

export default function StylesScreen({ navigation }) {
  const [selectedStyle, setSelectedStyle] = useState(null);

  const selectStyleAndGenerate = (name) => {
    setSelectedStyle(name);
    // Proceed to Generate screen passing the style
    navigation.navigate('AIGenerate', { styles: [name] });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      
      {/* Sticky Header */}
      <View style={styles.stickyHeader}>
        <Text style={styles.headerTitle}>Choose Your Style</Text>
        <Text style={styles.headerSubtitle}>Select a design aesthetic for your space</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {interiorStyles.map((s, i) => {
          const isSelected = selectedStyle === s.name;
          return (
            <TouchableOpacity 
              key={i} 
              style={[styles.styleItem, isSelected && styles.styleItemSelected]}
              activeOpacity={0.9}
              onPress={() => selectStyleAndGenerate(s.name)}
            >
              <Image source={{ uri: s.image }} style={StyleSheet.absoluteFillObject} />
              <LinearGradient colors={s.color} style={[StyleSheet.absoluteFillObject, { opacity: 0.7 }]} />
              
              <View style={styles.styleItemContent}>
                <Text style={styles.styleTitle}>{s.name}</Text>
                <Text style={styles.styleDesc}>{s.description}</Text>
                <View style={styles.aiBadge}>
                  <Feather name="zap" size={14} color={Colors.white} />
                  <Text style={styles.aiBadgeText}>AI Powered</Text>
                </View>
              </View>

              {isSelected && (
                <View style={styles.checkBadge}>
                  <Feather name="check" size={16} color={Colors.white} />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  stickyHeader: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingTop: 60, // Safe area approximation
    paddingHorizontal: 24,
    paddingBottom: 16,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  headerSubtitle: {
    color: Colors.textMuted,
    fontSize: 14,
  },
  content: {
    padding: 24,
    paddingBottom: 100, // Bottom nav padding
  },
  styleItem: {
    height: 224,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  styleItemSelected: {
    borderWidth: 4,
    borderColor: Colors.primary,
  },
  styleItemContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
  },
  styleTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 6,
  },
  styleDesc: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    marginBottom: 16,
  },
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  aiBadgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.white,
  },
  checkBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    backgroundColor: Colors.primary,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
