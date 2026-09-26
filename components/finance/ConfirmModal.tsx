import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface ConfirmModalProps {
  visible: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'danger' | 'warning' | 'info';
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ 
  visible, 
  title, 
  description, 
  confirmText = 'Confirm', 
  cancelText = 'Cancel', 
  onConfirm, 
  onCancel,
  type = 'danger'
}) => {
  const iconColor = type === 'danger' ? Colors.brand.ruby : type === 'warning' ? Colors.brand.yuzu : Colors.brand.mint;
  const iconName = type === 'danger' ? 'trash-outline' : type === 'warning' ? 'warning-outline' : 'information-circle-outline';

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onCancel}>
      <View style={styles.modalOverlay}>
        <Animated.View entering={FadeInDown.springify()} style={styles.confirmModalContent}>
          <View style={[styles.confirmIconContainer, { backgroundColor: iconColor + '20' }]}>
            <Ionicons name={iconName} size={32} color={iconColor} />
          </View>
          <Text style={styles.confirmTitle}>{title}</Text>
          <Text style={styles.confirmDesc}>{description}</Text>
          
          <View style={styles.confirmActions}>
            <TouchableOpacity 
              style={styles.confirmCancelBtn} 
              onPress={onCancel}
            >
              <Text style={styles.confirmCancelText}>{cancelText}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.confirmDeleteBtn, { backgroundColor: iconColor }]} 
              onPress={onConfirm}
            >
              <Text style={styles.confirmDeleteText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  confirmModalContent: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 32,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  confirmIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  confirmTitle: {
    color: Colors.text.primary,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  confirmDesc: {
    color: Colors.text.secondary,
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  confirmActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  confirmCancelBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginRight: 12,
    alignItems: 'center',
  },
  confirmCancelText: {
    color: Colors.text.primary,
    fontWeight: '600',
    fontSize: 15,
  },
  confirmDeleteBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  confirmDeleteText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 15,
  },
});
