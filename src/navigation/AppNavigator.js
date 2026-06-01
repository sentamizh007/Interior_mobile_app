import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from '../constants/colors';

import HomeScreen from '../screens/HomeScreen';
import StylesScreen from '../screens/StylesScreen';
import AIGenerateScreen from '../screens/AIGenerateScreen';
import ResultScreen from '../screens/ResultScreen';
import MarketplaceScreen from '../screens/MarketplaceScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { AuthContext } from '../context/AuthContext';
import { ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// ─── Custom Tab Bar ───────────────────────────────────────────────────────────
const CustomTabBar = ({ state, descriptors, navigation }) => {
  const tabs = [
    { icon: 'home', activeIcon: 'home', label: 'Home', route: 'Home' },
    { icon: 'layers', activeIcon: 'layers', label: 'Designs', route: 'Styles' },
    { icon: 'aperture', activeIcon: 'aperture', label: 'AI', route: 'AIGenerate', fab: true },
    { icon: 'shopping-bag', activeIcon: 'shopping-bag', label: 'Market', route: 'Marketplace' },
    { icon: 'user', activeIcon: 'user', label: 'Profile', route: 'Profile' },
  ];

  return (
    <View style={styles.tabBarWrapper}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const tab = tabs[index];

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          // AI Generate FAB (center)
          if (tab?.fab) {
            return (
              <View key={route.key} style={styles.fabWrapper}>
                <TouchableOpacity
                  style={styles.tabFAB}
                  onPress={onPress}
                  activeOpacity={0.9}
                >
                  <Feather name={tab.icon} size={28} color={Colors.white} />
                </TouchableOpacity>
              </View>
            );
          }

          return (
            <TouchableOpacity
              key={route.key}
              style={[styles.tabItem, isFocused && styles.tabItemActive]}
              onPress={onPress}
              activeOpacity={0.7}
            >
              <Feather 
                name={isFocused ? tab.activeIcon : tab.icon} 
                size={24} 
                color={isFocused ? Colors.primary : Colors.tabInactive} 
              />
              <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>
                {tab?.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

// ─── Tab Navigator ────────────────────────────────────────────────────────────
function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Styles" component={StylesScreen} />
      <Tab.Screen name="AIGenerate" component={AIGenerateScreen} />
      <Tab.Screen name="Marketplace" component={MarketplaceScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// ─── Auth Navigator ────────────────────────────────────────────────────────────
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: Colors.background } }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

// ─── Root Navigator ───────────────────────────────────────────────────────────
export default function AppNavigator() {
  const { isLoading, userToken } = React.useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: Colors.background },
        gestureEnabled: true,
        cardOverlayEnabled: true,
        presentation: 'card',
      }}
    >
      {userToken == null ? (
        <Stack.Screen name="Auth" component={AuthStack} />
      ) : (
        <>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen
            name="Result"
            component={ResultScreen}
            options={{
              presentation: 'modal',
              gestureEnabled: true,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    zIndex: 20,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.tabBackground,
    paddingVertical: 12,
    paddingHorizontal: 24,
    shadowColor: Colors.textPrimary,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 16,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  tabItemActive: {
    transform: [{ scale: 1.05 }],
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: Colors.tabInactive,
    marginTop: 4,
  },
  tabLabelActive: {
    color: Colors.primary,
  },

  // FAB (center AI button)
  fabWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -32,
    position: 'relative',
  },
  tabFAB: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 12,
  },
});
