import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Image,
} from 'react-native';
import { Colors } from '../constants/colors';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const designers = [
  { name: 'Sarah Jenkins', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop', specialty: 'Modern Minimalist', rate: '₹4,000/hr' },
  { name: 'David Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop', specialty: 'Industrial & Loft', rate: '₹5,500/hr' },
  { name: 'Elena Rodriguez', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop', specialty: 'Scandinavian', rate: '₹3,500/hr' }
];

const furniture = [
  { name: 'Velvet Sofa', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=300&fit=crop', price: '₹45,000' },
  { name: 'Marble Table', image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=300&h=300&fit=crop', price: '₹28,000' },
  { name: 'Modern Chair', image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=300&h=300&fit=crop', price: '₹12,500' },
  { name: 'Floor Lamp', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=300&fit=crop', price: '₹8,900' }
];

const filters = ['All', 'Modern', 'Luxury', 'Budget', 'Scandinavian', 'Minimalist'];

export default function MarketplaceScreen() {
  const [activeTab, setActiveTab] = useState('designers');
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Marketplace</Text>
        <Text style={styles.headerSub}>Find Your Dream Partner</Text>
      </View>

      {/* Main Tabs */}
      <View style={styles.mainTabs}>
        <TouchableOpacity 
          style={[styles.mainTab, activeTab === 'designers' && styles.mainTabActive]}
          onPress={() => setActiveTab('designers')}
        >
          <Text style={[styles.mainTabText, activeTab === 'designers' && styles.mainTabTextActive]}>Designers</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.mainTab, activeTab === 'furniture' && styles.mainTabActive]}
          onPress={() => setActiveTab('furniture')}
        >
          <Text style={[styles.mainTabText, activeTab === 'furniture' && styles.mainTabTextActive]}>Furniture</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        
        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {filters.map((f, i) => (
            <TouchableOpacity 
              key={i} 
              style={[styles.filterChip, activeFilter === f && styles.filterChipActive]}
              onPress={() => setActiveFilter(f)}
            >
              <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {activeTab === 'designers' && (
          <View style={styles.listContainer}>
            {designers.map((d, i) => (
              <View key={i} style={styles.designerCard}>
                <Image source={{ uri: d.avatar }} style={styles.designerAvatar} />
                <View style={styles.designerInfo}>
                  <Text style={styles.designerName}>{d.name}</Text>
                  <Text style={styles.designerSpecialty}>{d.specialty}</Text>
                  <Text style={styles.designerRate}>{d.rate}</Text>
                </View>
                <TouchableOpacity style={styles.btnHire}>
                  <Text style={styles.btnHireText}>Hire</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'furniture' && (
          <View style={styles.furnitureGrid}>
            {furniture.map((f, i) => (
              <View key={i} style={styles.furnitureCard}>
                <Image source={{ uri: f.image }} style={styles.furnitureImage} />
                <View style={styles.furnitureInfo}>
                  <View>
                    <Text style={styles.furnitureName}>{f.name}</Text>
                    <Text style={styles.furniturePrice}>{f.price}</Text>
                  </View>
                  <TouchableOpacity style={styles.btnCart}>
                    <Feather name="shopping-cart" size={16} color={Colors.white} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        <View style={{ height: 100 }} />
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
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 16,
    backgroundColor: Colors.white,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  headerSub: {
    fontSize: 14,
    color: Colors.textMuted,
    marginTop: 4,
  },
  mainTabs: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  mainTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  mainTabActive: {
    backgroundColor: Colors.primarySurface,
  },
  mainTabText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  mainTabTextActive: {
    color: Colors.primary,
  },
  content: {
    paddingVertical: 24,
  },
  filterScroll: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
    backgroundColor: Colors.white,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  filterTextActive: {
    color: Colors.white,
  },
  listContainer: {
    paddingHorizontal: 24,
    gap: 16,
  },
  designerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 3,
  },
  designerAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  designerInfo: {
    flex: 1,
  },
  designerName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  designerSpecialty: {
    fontSize: 13,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  designerRate: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  btnHire: {
    backgroundColor: Colors.primarySurface,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  btnHireText: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  furnitureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    gap: 16,
    justifyContent: 'space-between',
  },
  furnitureCard: {
    width: (width - 48 - 16) / 2,
    backgroundColor: Colors.white,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 3,
  },
  furnitureImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  furnitureInfo: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  furnitureName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  furniturePrice: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.primary,
  },
  btnCart: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
