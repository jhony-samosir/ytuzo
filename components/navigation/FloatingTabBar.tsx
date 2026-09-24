import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { SymbolView } from 'expo-symbols';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableScale } from '../ui/TouchableScale';
import { Colors } from '../../constants/Colors';

export function FloatingTabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.floatingNavContainer, { bottom: insets.bottom > 0 ? insets.bottom : 20 }]}>
      <BlurView 
        intensity={Platform.OS === 'ios' ? 40 : 100} 
        tint="dark" 
        style={styles.floatingNavBackground}
      />
      <View style={styles.floatingNavItems}>
        {/* We map the actual routes so the active state is correct */}
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

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

          // Hardcoded icons for prototype - ideally we use options.tabBarIcon
          const getIcon = () => {
            const color = isFocused ? Colors.brand.yuzu : Colors.text.muted;
            if (route.name === 'index') {
              return <SymbolView name={{ ios: 'house.fill', android: 'home', web: 'home' }} size={24} tintColor={color} fallback={<Ionicons name="home" size={24} color={color} />} />;
            }
            if (route.name === 'settings') {
              return <SymbolView name={{ ios: 'gearshape', android: 'settings', web: 'settings' }} size={24} tintColor={color} fallback={<Ionicons name="settings-outline" size={24} color={color} />} />;
            }
            return <Ionicons name="alert" size={24} color={color} />;
          };

          return (
            <React.Fragment key={route.key}>
              <TouchableScale style={styles.navItem} onPress={onPress}>
                {getIcon()}
                {isFocused && <View style={styles.navIndicator} />}
              </TouchableScale>
              
              {/* Insert the FAB perfectly in the middle */}
              {index === 0 && (
                 <View style={styles.navFabPlaceholder}>
                   <TouchableScale style={styles.navFab} scaleTo={0.9}>
                     <LinearGradient
                       colors={[Colors.brand.yuzu, Colors.brand.blaze]}
                       style={styles.navFabGradient}
                     >
                       <SymbolView name={{ ios: 'plus', android: 'add', web: 'add' }} size={32} tintColor="#FFFFFF" fallback={<Ionicons name="add" size={32} color="#FFFFFF" />} />
                     </LinearGradient>
                   </TouchableScale>
                 </View>
              )}
            </React.Fragment>
          );
        })}
        {/* Mock other tabs for layout since we only have 2 real tabs currently */}
        <TouchableScale style={styles.navItem}>
          <SymbolView name={{ ios: 'bell', android: 'notifications', web: 'notifications' }} size={24} tintColor={Colors.text.muted} fallback={<Ionicons name="notifications-outline" size={24} color={Colors.text.muted} />} />
        </TouchableScale>
        <TouchableScale style={styles.navItem}>
          <SymbolView name={{ ios: 'person', android: 'person', web: 'person' }} size={24} tintColor={Colors.text.muted} fallback={<Ionicons name="person-outline" size={24} color={Colors.text.muted} />} />
        </TouchableScale>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingNavContainer: {
    position: 'absolute',
    left: 24,
    right: 24,
    height: 72,
    zIndex: 10,
  },
  floatingNavBackground: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: Platform.OS === 'android' ? Colors.background.navBaseAndroid : Colors.background.navBaseIOS,
    borderRadius: 36,
    borderWidth: 1,
    borderColor: Colors.border.lighter,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.6,
    shadowRadius: 24,
    elevation: 20,
  },
  floatingNavItems: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  navItem: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navIndicator: {
    position: 'absolute',
    bottom: 10,
    width: 12,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: Colors.brand.yuzu,
  },
  navFabPlaceholder: {
    flex: 1.2,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navFab: {
    top: -24,
    shadowColor: Colors.brand.blaze,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 16,
  },
  navFabGradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: Colors.background.primary,
  }
});
