import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  Image,
} from 'react-native';
import { Colors } from '../constants/colors';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BeforeAfterSlider } from '../components/animated';

const { width } = Dimensions.get('window');

const similarDesigns = [
  { image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&h=400&fit=crop' },
  { image: 'https://images.unsplash.com/photo-1598928506311-c55dd1b3112b?w=400&h=400&fit=crop' },
  { image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop' },
  { image: 'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?w=400&h=400&fit=crop' }
];

export default function ResultScreen({ navigation }) {
  const [saved, setSaved] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Home')}>
          <Feather name="x" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Result</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <Feather name="share-2" size={20} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        
        {/* Compare Slider */}
        <View style={styles.compareWrapper}>
          <BeforeAfterSlider
            height={400}
            beforeGradient={['#C8B89A', '#9E8B76']}
            afterGradient={['#6C47FF', '#A855F7']}
            style={styles.sliderCard}
          />
        </View>

        {/* Result Card */}
        <View style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultTitle}>Modern Luxury</Text>
            <View style={styles.aiBadge}>
              <Feather name="zap" size={14} color={Colors.primary} />
              <Text style={styles.aiBadgeText}>AI Enhanced</Text>
            </View>
          </View>
          <Text style={styles.resultDesc}>
            Your space has been transformed with a modern luxury aesthetic. We incorporated sleek metallic accents, premium velvet textures, and a sophisticated monochromatic color palette.
          </Text>

          {/* Action Buttons */}
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.btnPrimary} activeOpacity={0.9}>
              <LinearGradient
                colors={Colors.gradientPrimary}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={styles.btnGradient}
              >
                <Feather name="download" size={18} color={Colors.white} />
                <Text style={styles.btnPrimaryText}>Download HD</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnWhatsapp} activeOpacity={0.9}>
              <Feather name="message-circle" size={18} color={Colors.white} />
              <Text style={styles.btnWhatsappText}>WhatsApp</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.btnSecondary, saved && { borderColor: Colors.primary, backgroundColor: Colors.primarySurface }]} 
            onPress={() => setSaved(!saved)}
            activeOpacity={0.7}
          >
            <Feather name={saved ? "check" : "bookmark"} size={18} color={saved ? Colors.primary : Colors.textPrimary} />
            <Text style={[styles.btnSecondaryText, saved && { color: Colors.primary }]}>
              {saved ? 'Saved to Collection' : 'Save to Collection'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Similar Designs */}
        <Text style={styles.sectionTitle}>Similar Designs</Text>
        <View style={styles.similarGrid}>
          {similarDesigns.map((d, i) => (
            <TouchableOpacity key={i} style={styles.similarCard} activeOpacity={0.9}>
              <Image source={{ uri: d.image }} style={styles.similarImage} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
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
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  iconBtn: {
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
  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },
  content: {
    padding: 24,
  },
  compareWrapper: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: Colors.shadowDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  sliderCard: {
    borderRadius: 24,
  },
  resultCard: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 4,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primarySurface,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 100,
    gap: 4,
  },
  aiBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
  },
  resultDesc: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: 24,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  btnPrimary: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  btnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 8,
  },
  btnPrimaryText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 15,
  },
  btnWhatsapp: {
    flex: 1,
    backgroundColor: '#25D366',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 8,
    shadowColor: '#25D366',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  btnWhatsappText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 15,
  },
  btnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    gap: 8,
  },
  btnSecondaryText: {
    color: Colors.textPrimary,
    fontWeight: '600',
    fontSize: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  similarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  similarCard: {
    width: (width - 48 - 16) / 2,
    height: 160,
    borderRadius: 20,
    overflow: 'hidden',
  },
  similarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
