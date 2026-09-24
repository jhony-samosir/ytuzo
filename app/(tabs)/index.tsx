import React, { useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable, Animated, Dimensions, SafeAreaView } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

// Reusable Animated Pressable for the shrinking effect
const FloatingCard = ({ children, style, onPress }: any) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress}>
      <Animated.View style={[style, { transform: [{ scale }] }]}>
        <BlurView intensity={30} tint="light" style={styles.cardBlur}>
          {children}
        </BlurView>
      </Animated.View>
    </Pressable>
  );
};

export default function CentralHubScreen() {
  return (
    <View style={styles.container}>
      {/* Background Orbs to create ambient lighting behind the glass */}
      <View style={StyleSheet.absoluteFill}>
        <View style={styles.backgroundBase} />
        <View style={[styles.orb, { top: 0, left: -50, backgroundColor: 'rgba(123, 44, 191, 0.4)' }]} />
        <View style={[styles.orb, { top: height * 0.4, right: -100, backgroundColor: 'rgba(0, 245, 212, 0.2)' }]} />
        <View style={[styles.orb, { bottom: 0, left: 20, backgroundColor: 'rgba(255, 255, 255, 0.1)' }]} />
        <BlurView intensity={100} tint="dark" style={StyleSheet.absoluteFill} />
      </View>

      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <View style={styles.header}>
            <Text style={styles.greeting}>Good Morning,</Text>
            <Text style={styles.title}>Your Life OS</Text>
          </View>

          {/* Large Summary Card */}
          <FloatingCard style={styles.summaryCard}>
            <View style={styles.summaryHeader}>
              <Text style={styles.summaryTitle}>Daily Progress</Text>
              <Ionicons name="analytics-outline" size={24} color="#00F5D4" />
            </View>
            <View style={styles.progressContainer}>
              <View style={styles.progressBarBg}>
                <LinearGradient
                  colors={['#7B2CBF', '#00F5D4']}
                  style={[StyleSheet.absoluteFill, { width: '75%', borderRadius: 10 }]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
              </View>
              <Text style={styles.progressText}>75% Optimal</Text>
            </View>
          </FloatingCard>

          {/* Bento Grid */}
          <View style={styles.bentoGrid}>
            
            {/* Finance & Sport */}
            <View style={styles.bentoRow}>
              <FloatingCard style={styles.bentoSquare}>
                <View style={[styles.iconContainer, { backgroundColor: 'rgba(0, 245, 212, 0.1)' }]}>
                  <Ionicons name="wallet-outline" size={28} color="#00F5D4" />
                </View>
                <Text style={styles.bentoTitle}>Finance</Text>
                <Text style={styles.bentoSubtitle}>$4,250</Text>
              </FloatingCard>

              <FloatingCard style={styles.bentoSquare}>
                <View style={[styles.iconContainer, { backgroundColor: 'rgba(255, 159, 28, 0.1)' }]}>
                  <Ionicons name="fitness-outline" size={28} color="#FF9F1C" />
                </View>
                <Text style={styles.bentoTitle}>Sport</Text>
                <Text style={styles.bentoSubtitle}>Active</Text>
              </FloatingCard>
            </View>

            {/* Wellness & Vehicle */}
            <View style={styles.bentoRow}>
              <FloatingCard style={styles.bentoSquare}>
                <View style={[styles.iconContainer, { backgroundColor: 'rgba(255, 107, 107, 0.1)' }]}>
                  <Ionicons name="medkit-outline" size={28} color="#FF6B6B" />
                </View>
                <Text style={styles.bentoTitle}>Healing</Text>
                <Text style={styles.bentoSubtitle}>Optimal</Text>
              </FloatingCard>

              <FloatingCard style={styles.bentoSquare}>
                <View style={[styles.iconContainer, { backgroundColor: 'rgba(123, 44, 191, 0.1)' }]}>
                  <Ionicons name="car-sport-outline" size={28} color="#7B2CBF" />
                </View>
                <Text style={styles.bentoTitle}>Vehicle</Text>
                <Text style={styles.bentoSubtitle}>Fuel: 80%</Text>
              </FloatingCard>
            </View>

          </View>
        </ScrollView>

        {/* Glass Pill Navigation */}
        <View style={styles.pillContainer}>
          <BlurView intensity={50} tint="light" style={styles.glassPill}>
            <Pressable style={styles.navItem}>
              <Ionicons name="home" size={24} color="#FFFFFF" />
            </Pressable>
            <Pressable style={styles.navItem}>
              <Ionicons name="stats-chart" size={24} color="rgba(255,255,255,0.5)" />
            </Pressable>
            
            {/* Prominent '+' FAB */}
            <Pressable style={styles.fab}>
              <LinearGradient
                colors={['#7B2CBF', '#00F5D4']}
                style={styles.fabGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="add" size={32} color="#FFFFFF" />
              </LinearGradient>
            </Pressable>

            <Pressable style={styles.navItem}>
              <Ionicons name="notifications" size={24} color="rgba(255,255,255,0.5)" />
            </Pressable>
            <Pressable style={styles.navItem}>
              <Ionicons name="person" size={24} color="rgba(255,255,255,0.5)" />
            </Pressable>
          </BlurView>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  backgroundBase: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#121212',
  },
  safeArea: {
    flex: 1,
  },
  orb: {
    position: 'absolute',
    width: 350,
    height: 350,
    borderRadius: 175,
    opacity: 0.7,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 120, // Space for the pill navigation
  },
  header: {
    marginBottom: 30,
  },
  greeting: {
    color: '#00F5D4',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: 'bold',
  },
  // Cards Styling
  cardBlur: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  summaryCard: {
    marginBottom: 20,
    // Anti-gravity Shadow
    shadowColor: '#7B2CBF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  summaryTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  progressContainer: {
    width: '100%',
  },
  progressBarBg: {
    height: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 5,
    marginBottom: 10,
    overflow: 'hidden',
  },
  progressText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    fontWeight: '500',
  },
  // Bento Grid
  bentoGrid: {
    gap: 16,
  },
  bentoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  bentoSquare: {
    flex: 1,
    aspectRatio: 1,
    // Soft White/Purple Glowing Shadow
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 8,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  bentoTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bentoSubtitle: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
  },
  // Glass Pill Navigation
  pillContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  glassPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 70,
    borderRadius: 35,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    overflow: 'hidden',
    // Glowing shadow for the pill
    shadowColor: '#00F5D4',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  navItem: {
    padding: 10,
  },
  fab: {
    top: -20,
    // Add glowing shadow to the FAB specifically
    shadowColor: '#7B2CBF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 12,
  },
  fabGradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#121212',
  }
});
