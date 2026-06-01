import React, { useContext } from 'react';
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
import { AuthContext } from '../context/AuthContext';

const { width } = Dimensions.get('window');

const MenuItem = ({ icon, label, danger, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.menuItemLeft}>
      <View style={[styles.menuIconBg, danger && { backgroundColor: '#fee2e2' }]}>
        <Feather name={icon} size={20} color={danger ? Colors.error : Colors.primary} />
      </View>
      <Text style={[styles.menuLabel, danger && { color: Colors.error }]}>{label}</Text>
    </View>
    <Feather name="chevron-right" size={20} color={Colors.textLight} />
  </TouchableOpacity>
);

export default function ProfileScreen({ navigation }) {
  const { userInfo, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" />
      
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        {/* Banner */}
        <LinearGradient
          colors={Colors.gradientAvatar}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          style={styles.profileBanner}
        />
        
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop' }} 
            style={styles.avatar}
          />
          <Text style={styles.profileName}>{userInfo?.name || 'Jane Doe'}</Text>
          <View style={styles.proBadge}>
            <Feather name="star" size={12} color={Colors.warning} />
            <Text style={styles.proBadgeText}>
              {userInfo?.subscriptionPlan === 'free' ? 'Free Member' : 'Pro Member'}
            </Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Saved Designs</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Projects</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>Pro</Text>
            <Text style={styles.statLabel}>Current Plan</Text>
          </View>
        </View>

        {/* Menu List */}
        <View style={styles.menuSection}>
          <MenuItem icon="settings" label="Settings" />
          <MenuItem icon="credit-card" label="Billing & Subscription" />
          <MenuItem icon="help-circle" label="Help Center" />
          <MenuItem icon="log-out" label="Sign Out" danger onPress={logout} />
        </View>

        {/* Upgrade Card */}
        <View style={styles.upgradeCard}>
          <LinearGradient
            colors={['#1f2937', '#111827']}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={styles.upgradeContent}>
            <View>
              <Text style={styles.upgradeTitle}>Upgrade to Studio</Text>
              <Text style={styles.upgradeSub}>For professional interior designers</Text>
            </View>
            <TouchableOpacity style={styles.upgradeBtn}>
              <Text style={styles.upgradeBtnText}>Upgrade</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  profileBanner: {
    height: 180,
    width: '100%',
  },
  avatarSection: {
    alignItems: 'center',
    marginTop: -50,
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: Colors.background,
    marginBottom: 12,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  proBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#fef3c7', // amber-100
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 100,
  },
  proBadgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#d97706', // amber-600
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  menuSection: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    marginHorizontal: 24,
    padding: 8,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primarySurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  upgradeCard: {
    marginHorizontal: 24,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  upgradeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
  },
  upgradeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 4,
  },
  upgradeSub: {
    fontSize: 13,
    color: Colors.textLight,
  },
  upgradeBtn: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  upgradeBtnText: {
    color: Colors.textPrimary,
    fontWeight: '600',
    fontSize: 14,
  },
});
