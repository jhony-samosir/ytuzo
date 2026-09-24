import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useSQLiteContext } from 'expo-sqlite';

import { Colors } from '../../constants/Colors';
import { TouchableScale } from '../../components/ui/TouchableScale';
import { SummaryCard } from '../../components/dashboard/SummaryCard';
import { QuickActionsGrid } from '../../components/dashboard/QuickActionsGrid';
import { RecentActivityList } from '../../components/dashboard/RecentActivityList';

const { width } = Dimensions.get('window');

export default function CentralMenuScreen() {
  const insets = useSafeAreaInsets();
  const db = useSQLiteContext();
  const [firstName, setFirstName] = useState('User');

  useEffect(() => {
    async function loadUser() {
      const user = await db.getFirstAsync<{ first_name: string }>('SELECT first_name FROM user_profile LIMIT 1');
      if (user) {
        setFirstName(user.first_name);
      }
    }
    loadUser();
  }, [db]);
  
  return (
    <View style={styles.container}>
      {/* Dynamic Background Elements */}
      <View style={StyleSheet.absoluteFill}>
        <View style={styles.backgroundBase} />
        <LinearGradient
          colors={[Colors.background.secondary, Colors.background.primary]}
          style={StyleSheet.absoluteFill}
        />
        {/* Glow Effects - Positioned relatively to handle different screen sizes */}
        <View style={[styles.glow, { top: '-10%', left: '-15%', backgroundColor: 'rgba(250, 204, 21, 0.15)' }]} />
        <View style={[styles.glow, { top: '30%', right: '-20%', backgroundColor: 'rgba(249, 115, 22, 0.12)' }]} />
        <View style={[styles.glow, { bottom: '-5%', left: '10%', backgroundColor: 'rgba(244, 63, 94, 0.1)' }]} />
      </View>

      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <ScrollView 
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 120 }]}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.headerTextContainer}>
              <View style={styles.statusRow}>
                <Text style={styles.dateText}>
                  {(() => {
                    const d = new Date();
                    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]}`.toUpperCase();
                  })()}
                </Text>
              </View>
              <Text style={styles.greetingText}>Welcome back,</Text>
              <Text style={styles.nameText} numberOfLines={1} adjustsFontSizeToFit>{firstName}</Text>
            </View>
            
            <TouchableScale style={styles.headerActionBtn}>
              <Ionicons name="scan" size={22} color={Colors.brand.yuzu} />
            </TouchableScale>
          </View>

          <SummaryCard />
          <QuickActionsGrid />
          <RecentActivityList />
          
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  backgroundBase: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: Colors.background.primary,
  },
  glow: {
    position: 'absolute',
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: width * 0.45,
    opacity: 0.6,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  headerTextContainer: {
    flex: 1,
    paddingRight: 16,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateText: {
    color: Colors.text.secondary,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  greetingText: {
    color: Colors.text.title,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  nameText: {
    color: Colors.text.primary,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  headerActionBtn: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(250, 204, 21, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(250, 204, 21, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
