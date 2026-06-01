import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  StatusBar,
} from 'react-native';
import { Colors } from '../constants/colors';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const recentProjects = [
  { image: 'https://images.unsplash.com/photo-1704040686413-2c607dbd2f06?w=600&h=400&fit=crop', title: 'Modern Living Room', style: 'Contemporary', date: '2 days ago' },
  { image: 'https://images.unsplash.com/photo-1774437290582-1e859402001f?w=600&h=400&fit=crop', title: 'Minimalist Bedroom', style: 'Scandinavian', date: '5 days ago' },
  { image: 'https://images.unsplash.com/photo-1704428381527-71b82d7fc7d0?w=600&h=400&fit=crop', title: 'Industrial Kitchen', style: 'Loft', date: '1 week ago' }
];

const trendingStyles = [
  { name: 'Modern Luxury', image: 'https://images.unsplash.com/photo-1720247520862-7e4b14176fa8?w=400&h=300&fit=crop', color: ['transparent', '#f97316'] },
  { name: 'Scandinavian', image: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=400&h=300&fit=crop', color: ['transparent', '#06b6d4'] },
  { name: 'Minimalist', image: 'https://images.unsplash.com/photo-1603512500383-f1f87c13ffc4?w=400&h=300&fit=crop', color: ['transparent', '#475569'] },
  { name: 'Industrial Loft', image: 'https://images.unsplash.com/photo-1668438712649-ffd85f756de5?w=400&h=300&fit=crop', color: ['transparent', '#3f3f46'] },
];

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Hero Section */}
        <View style={styles.hero}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1745301558339-44eb3217d5da?w=800&h=1000&fit=crop' }} 
            style={StyleSheet.absoluteFillObject} 
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)']}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Transform Your Space{'\n'}with AI Magic</Text>
            <Text style={styles.heroSubtitle}>Upload a photo and watch AI redesign your room instantly</Text>
            
            <TouchableOpacity onPress={() => navigation.navigate('AIGenerate')} activeOpacity={0.9}>
              <LinearGradient
                colors={Colors.gradientPrimary}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={styles.btnPrimary}
              >
                <Feather name="upload" size={20} color={Colors.white} />
                <Text style={styles.btnPrimaryText}>Upload Room Photo</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          {/* Recent Projects */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Projects</Text>
            <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
          </View>
          
          {recentProjects.map((p, i) => (
            <TouchableOpacity key={i} style={styles.projectCard} activeOpacity={0.9}>
              <Image source={{ uri: p.image }} style={styles.projectImg} />
              <View style={styles.projectBody}>
                <Text style={styles.projectTitle}>{p.title}</Text>
                <Text style={styles.projectStyle}>{p.style}</Text>
                <Text style={styles.projectDate}>{p.date}</Text>
                <View style={styles.projectActions}>
                  <Text style={styles.actionView}>View</Text>
                  <Text style={styles.actionShare}>Share</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}

          {/* Trending Styles */}
          <Text style={[styles.sectionTitle, { marginTop: 24, marginBottom: 16 }]}>Trending Styles</Text>
          <View style={styles.styleGrid}>
            {trendingStyles.map((s, i) => (
              <TouchableOpacity 
                key={i} 
                style={styles.styleThumb} 
                activeOpacity={0.9}
                onPress={() => navigation.navigate('Styles')}
              >
                <Image source={{ uri: s.image }} style={StyleSheet.absoluteFillObject} />
                <LinearGradient colors={s.color} style={[StyleSheet.absoluteFillObject, { opacity: 0.8 }]} />
                <Text style={styles.styleLabel}>{s.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Premium Card */}
          <LinearGradient
            colors={Colors.gradientPremium}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={styles.premiumCard}
          >
            <View style={styles.premiumHeader}>
              <View>
                <Text style={styles.premiumTitle}>Go Premium</Text>
                <Text style={styles.premiumSub}>Unlimited AI generations</Text>
              </View>
              <Feather name="zap" size={28} color={Colors.white} />
            </View>
            <TouchableOpacity style={styles.btnWhite} activeOpacity={0.9}>
              <Text style={styles.btnWhiteText}>Upgrade Now</Text>
            </TouchableOpacity>
          </LinearGradient>
          
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  hero: {
    height: 500,
    width: '100%',
    position: 'relative',
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 8,
    lineHeight: 38,
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 15,
    marginBottom: 24,
  },
  btnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 12,
  },
  btnPrimaryText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
  content: {
    padding: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  seeAll: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  projectCard: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
  },
  projectImg: {
    width: 128,
    height: 128,
  },
  projectBody: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  projectTitle: {
    fontWeight: '600',
    fontSize: 15,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  projectStyle: {
    fontSize: 13,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  projectDate: {
    fontSize: 12,
    color: Colors.textLight,
  },
  projectActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
  },
  actionView: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '500',
  },
  actionShare: {
    color: Colors.textLight,
    fontSize: 12,
    fontWeight: '500',
  },
  styleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 32,
    justifyContent: 'space-between',
  },
  styleThumb: {
    width: (width - 48 - 16) / 2, // 24 padding each side, 16 gap
    height: 160,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },
  styleLabel: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    color: Colors.white,
    fontWeight: '600',
    fontSize: 13,
  },
  premiumCard: {
    borderRadius: 24,
    padding: 24,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.3,
    shadowRadius: 40,
    elevation: 16,
  },
  premiumHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  premiumTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 4,
  },
  premiumSub: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
  },
  btnWhite: {
    backgroundColor: Colors.white,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnWhiteText: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 15,
  },
});
