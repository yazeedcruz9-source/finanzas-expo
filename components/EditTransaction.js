import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, Alert } from 'react-native';

export default function EditTransaction({ route, navigation, accounts = [], onUpdate, onDelete }) {
  const tx = route.params?.tx;
  const [amount, setAmount] = useState(String(tx?.amount ?? ''));
  const [category, setCategory] = useState(tx?.category ?? 'General');
  const [type, setType] = useState(tx?.type ?? 'gasto');
  const [accountId, setAccountId] = useState(tx?.accountId ?? accounts[0]?.id ?? null);
  const [date, setDate] = useState(tx?.date ?? new Date().toISOString().slice(0,10));

  const onSave = () => {
    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) {
      Alert.alert('Monto inválido', 'Ingresa un número mayor a 0.');
      return;
    }
    if (!accountId) {
      Alert.alert('Sin cuenta', 'Selecciona o crea una cuenta.');
      return;
    }
    const updated = { ...tx, amount: value, category, type, accountId, date };
    onUpdate?.(updated);
    navigation.goBack();
  };

  const confirmDelete = () => {
    Alert.alert('Borrar transacción', '¿Confirmas borrar esta transacción?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Borrar', style: 'destructive', onPress: () => { onDelete?.(tx.id); navigation.goBack(); } },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tipo</Text>
      <View style={styles.row}>
        <View style={styles.rowBtn}>
          <Button title="Gasto" color={type === 'gasto' ? '#c0392b' : undefined} onPress={() => setType('gasto')} />
        </View>
        <View style={styles.rowBtn}>
          <Button title="Ingreso" color={type === 'ingreso' ? '#0a9957' : undefined} onPress={() => setType('ingreso')} />
        </View>
      </View>

      <Text style={styles.label}>Monto</Text>
      <TextInput value={amount} onChangeText={setAmount} keyboardType="decimal-pad" placeholder="0.00" style={styles.input} />

      <Text style={styles.label}>Categoría</Text>
      <TextInput value={category} onChangeText={setCategory} placeholder="Ej: Comida" style={styles.input} />

      <Text style={styles.label}>Fecha (YYYY-MM-DD)</Text>
      <TextInput value={date} onChangeText={setDate} placeholder="2025-10-31" style={styles.input} />

      <Text style={styles.label}>Cuenta</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {accounts.map((a) => (
          <TouchableOpacity key={a.id} onPress={() => setAccountId(a.id)} style={[styles.accountPill, accountId === a.id && styles.accountPillActive]}>
            <Text style={accountId === a.id ? styles.pillTextActive : styles.pillText}>{a.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ marginTop: 16, gap: 8 }}>
        <Button title="Guardar cambios" onPress={onSave} />
        <Button title="Borrar" color="#d32f2f" onPress={confirmDelete} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { fontSize: 14, fontWeight: '600', marginTop: 12, marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 12, height: 44, backgroundColor: '#fff' },
  row: { flexDirection: 'row', gap: 12 },
  rowBtn: { flex: 1 },
  accountPill: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16, borderWidth: 1, borderColor: '#ccc' },
  accountPillActive: { backgroundColor: '#007AFF', borderColor: '#007AFF' },
  pillText: { color: '#333' },
  pillTextActive: { color: '#fff', fontWeight: '600' },
});
