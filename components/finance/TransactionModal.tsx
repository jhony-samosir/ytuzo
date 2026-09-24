import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, KeyboardAvoidingView, Platform, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Transaction, Wallet, Category } from '../../types/finance';

interface TransactionModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: Partial<Transaction>) => void;
  initialData?: Transaction | null;
  wallets?: Wallet[];
  categories?: Category[];
}

export const TransactionModal: React.FC<TransactionModalProps> = ({ visible, onClose, onSave, initialData, wallets = [], categories = [] }) => {
  const [title, setTitle] = useState(initialData ? initialData.title : '');
  const [amount, setAmount] = useState(initialData ? initialData.amount.toString() : '');
  const [type, setType] = useState<'INCOME' | 'EXPENSE'>(initialData ? initialData.type : 'EXPENSE');
  const [selectedWalletId, setSelectedWalletId] = useState(initialData?.wallet_id || (wallets.length > 0 ? wallets[0].id : 'w-1'));
  const [selectedCategoryId, setSelectedCategoryId] = useState(initialData?.category_id || (categories.length > 0 ? categories[0].id : 'cat-1'));
  const [selectedDate, setSelectedDate] = useState<Date>(initialData ? new Date(initialData.created_at) : new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date(selectedDate));
  const [calendarMode, setCalendarMode] = useState<'DATE' | 'MONTH'>('DATE');

  const handleSave = () => {
    if (!title.trim() || !amount.trim()) {
      Alert.alert('Validation Error', 'Please enter a valid title and amount.');
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert('Validation Error', 'Amount must be a positive number.');
      return;
    }

    // Find selected category for icon/color mapping
    const category = categories.find(c => c.id === selectedCategoryId);

    onSave({
      title: title.trim(),
      subtitle: category ? category.name : (type === 'INCOME' ? 'Income' : 'Expense'),
      amount: parsedAmount,
      type: type,
      icon: category ? category.icon : (type === 'INCOME' ? 'arrow-down' : 'arrow-up'),
      color: category ? category.color : (type === 'INCOME' ? '#10B981' : '#F43F5E'),
      wallet_id: selectedWalletId,
      category_id: selectedCategoryId,
      created_at: selectedDate.getTime()
    });
    onClose();
  };

  const renderCalendar = () => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    
    if (calendarMode === 'MONTH') {
      return (
        <View style={styles.calContainer}>
          <View style={styles.calHeaderRow}>
            <TouchableOpacity onPress={() => setCalendarMonth(new Date(year - 1, month, 1))}>
              <Ionicons name="chevron-back" size={20} color={Colors.text.primary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCalendarMode('DATE')}>
              <Text style={styles.calMonthText}>{year}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCalendarMonth(new Date(year + 1, month, 1))}>
              <Ionicons name="chevron-forward" size={20} color={Colors.text.primary} />
            </TouchableOpacity>
          </View>
          <View style={styles.calGrid}>
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, idx) => (
              <TouchableOpacity 
                key={m} 
                style={[styles.calMonthBtn, month === idx && styles.calDaySelected]}
                onPress={() => {
                  setCalendarMonth(new Date(year, idx, 1));
                  setCalendarMode('DATE');
                }}
              >
                <Text style={[styles.calMonthBtnText, month === idx && styles.calDayTextSelected]}>{m}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      );
    }

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.calDay} />);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const thisDate = new Date(year, month, i);
      const isSelected = selectedDate.getDate() === i && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;
      
      days.push(
        <TouchableOpacity 
          key={`day-${i}`} 
          style={[styles.calDay, isSelected && styles.calDaySelected]}
          onPress={() => {
            setSelectedDate(thisDate);
            setShowCalendar(false);
          }}
        >
          <Text style={[styles.calDayText, isSelected && styles.calDayTextSelected]}>{i}</Text>
        </TouchableOpacity>
      );
    }
    
    return (
      <View style={styles.calContainer}>
        <View style={styles.calHeaderRow}>
          <TouchableOpacity onPress={() => setCalendarMonth(new Date(year, month - 1, 1))}>
            <Ionicons name="chevron-back" size={20} color={Colors.text.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCalendarMode('MONTH')}>
            <Text style={styles.calMonthText}>
              {calendarMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCalendarMonth(new Date(year, month + 1, 1))}>
            <Ionicons name="chevron-forward" size={20} color={Colors.text.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.calDaysHeader}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, idx) => (
            <Text key={`dw-${idx}`} style={styles.calHeaderText}>{d}</Text>
          ))}
        </View>
        <View style={styles.calGrid}>{days}</View>
      </View>
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.overlay}
      >
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{initialData ? 'Edit Transaction' : 'New Transaction'}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color={Colors.text.primary} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
            {/* Type Selector */}
            <View style={styles.typeSelector}>
              <TouchableOpacity 
                style={[styles.typeBtn, type === 'EXPENSE' && styles.typeBtnExpense]}
                onPress={() => setType('EXPENSE')}
              >
                <Text style={[styles.typeBtnText, type === 'EXPENSE' && styles.typeBtnTextActive]}>Expense</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.typeBtn, type === 'INCOME' && styles.typeBtnIncome]}
                onPress={() => setType('INCOME')}
              >
                <Text style={[styles.typeBtnText, type === 'INCOME' && styles.typeBtnTextActive]}>Income</Text>
              </TouchableOpacity>
            </View>

            {/* Wallet Picker */}
            <Text style={styles.label}>Account / Wallet</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pickerScroll} contentContainerStyle={styles.pickerContent}>
              {wallets.map(w => (
                <TouchableOpacity 
                  key={w.id} 
                  style={[styles.pickerItem, selectedWalletId === w.id && { borderColor: w.color_theme, backgroundColor: w.color_theme + '20' }]}
                  onPress={() => setSelectedWalletId(w.id)}
                >
                  <Ionicons name={w.type === 'BANK' ? 'card' : w.type === 'CASH' ? 'cash' : 'wallet'} size={20} color={selectedWalletId === w.id ? w.color_theme : Colors.text.muted} />
                  <Text style={[styles.pickerText, selectedWalletId === w.id && { color: w.color_theme, fontWeight: '700' }]}>{w.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Category Picker */}
            <Text style={styles.label}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pickerScroll} contentContainerStyle={styles.pickerContent}>
              {categories.map(c => (
                <TouchableOpacity 
                  key={c.id} 
                  style={[styles.pickerItem, selectedCategoryId === c.id && { borderColor: c.color, backgroundColor: c.color + '20' }]}
                  onPress={() => setSelectedCategoryId(c.id)}
                >
                  <Ionicons name={c.icon as any} size={20} color={selectedCategoryId === c.id ? c.color : Colors.text.muted} />
                  <Text style={[styles.pickerText, selectedCategoryId === c.id && { color: c.color, fontWeight: '700' }]}>{c.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Date Pill */}
            <View style={styles.dateRow}>
              <Text style={styles.label}>Date</Text>
              <TouchableOpacity 
                style={styles.datePill}
                onPress={() => setShowCalendar(!showCalendar)}
              >
                <Ionicons name="calendar" size={16} color={Colors.brand.yuzu} />
                <Text style={styles.datePillText}>
                  {selectedDate.getDate() === new Date().getDate() && selectedDate.getMonth() === new Date().getMonth() && selectedDate.getFullYear() === new Date().getFullYear() 
                    ? `Today, ${selectedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}`
                    : selectedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                </Text>
                <Ionicons name={showCalendar ? "chevron-up" : "chevron-down"} size={16} color={Colors.text.muted} />
              </TouchableOpacity>
            </View>

            {/* Collapsible Calendar */}
            {showCalendar && renderCalendar()}

            {/* Form Inputs */}
            <View style={styles.inputRow}>
              <View style={[styles.inputGroup, { flex: 2, marginRight: 12 }]}>
                <Text style={styles.label}>Amount</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="0"
                  placeholderTextColor={Colors.text.muted}
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="decimal-pad"
                />
              </View>
              <View style={[styles.inputGroup, { flex: 3 }]}>
                <Text style={styles.label}>Title</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="e.g. Coffee"
                  placeholderTextColor={Colors.text.muted}
                  value={title}
                  onChangeText={setTitle}
                />
              </View>
            </View>

            {/* Save Button */}
            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.saveBtnText}>{initialData ? 'Update Transaction' : 'Add Transaction'}</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalContainer: {
    backgroundColor: Colors.background.secondary,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    paddingBottom: 40,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text.primary,
  },
  closeBtn: {
    padding: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
  },
  typeSelector: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 4,
    marginBottom: 24,
  },
  typeBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  typeBtnExpense: {
    backgroundColor: Colors.brand.ruby,
  },
  typeBtnIncome: {
    backgroundColor: Colors.brand.mint,
  },
  typeBtnText: {
    color: Colors.text.secondary,
    fontWeight: '600',
    fontSize: 15,
  },
  typeBtnTextActive: {
    color: '#FFF',
    fontWeight: '700',
  },
  pickerScroll: {
    marginBottom: 24,
  },
  pickerContent: {
    paddingRight: 24,
  },
  pickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
  },
  pickerText: {
    color: Colors.text.secondary,
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  inputGroup: {},
  label: {
    color: Colors.text.secondary,
    marginBottom: 8,
    fontWeight: '500',
    fontSize: 14,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 16,
    color: Colors.text.primary,
    fontSize: 16,
  },
  saveBtn: {
    backgroundColor: Colors.brand.yuzu,
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  saveBtnText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 16,
  },
  /* Date Pill & Calendar Styles */
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  datePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  datePillText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    marginHorizontal: 8,
  },
  calContainer: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
  },
  calHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  calMonthText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
  calDaysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  calHeaderText: {
    color: 'rgba(255,255,255,0.4)',
    fontWeight: '600',
    width: 40,
    textAlign: 'center',
    fontSize: 13,
  },
  calGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  calDay: {
    width: '14.28%', // 100 / 7
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
    borderRadius: 18,
  },
  calDayText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
  },
  calDaySelected: {
    backgroundColor: Colors.brand.yuzu,
  },
  calDayTextSelected: {
    color: '#000',
    fontWeight: '800',
  },
  calMonthBtn: {
    width: '33.33%',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    marginVertical: 4,
  },
  calMonthBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  }
});
