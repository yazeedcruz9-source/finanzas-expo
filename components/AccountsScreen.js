import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import uuid from "react-native-uuid";

export default function AccountsScreen({ accounts = [], addAccount, navigation, theme }) {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");

  const onAdd = () => {
    if (!name) return Alert.alert("Nombre requerido");
    const acc = { id: uuid.v4(), name, balance: Number(balance) || 0 };
    addAccount(acc);
    setName(""); setBalance("");
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.form, { backgroundColor: theme.card, ...theme.shadow }]}>
        <View style={styles.iconHeader}>
          <Ionicons name="card" size={28} color={theme.primary} />
          <Text style={[styles.formTitle, { color: theme.text }]}>Nueva cuenta</Text>
        </View>
        <TextInput 
          placeholder="Nombre de la cuenta (ej. Banco, Efectivo)" 
          placeholderTextColor={theme.textLight}
          value={name} 
          onChangeText={setName} 
          style={[styles.input, { borderColor: theme.border, backgroundColor: theme.surface, color: theme.text }]} 
        />
        <TextInput 
          placeholder="Saldo inicial" 
          placeholderTextColor={theme.textLight}
          value={balance} 
          onChangeText={setBalance} 
          keyboardType="numeric" 
          style={[styles.input, { borderColor: theme.border, backgroundColor: theme.surface, color: theme.text }]} 
        />
        <TouchableOpacity style={[styles.btn, { backgroundColor: theme.success }]} onPress={onAdd} activeOpacity={0.8}>
          <Ionicons name="add-circle-outline" size={20} color="#fff" />
          <Text style={styles.btnText}>Agregar cuenta</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.sectionTitle, { color: theme.text }]}>Tus cuentas</Text>
      <FlatList
        data={accounts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.row, { backgroundColor: theme.card, borderBottomColor: theme.border, ...theme.shadowLight }]}>
            <View style={styles.rowLeft}>
              <Ionicons name="wallet" size={20} color={theme.primary} />
              <Text style={[styles.accountName, { color: theme.text }]}>{item.name}</Text>
            </View>
            <Text style={[styles.accountBalance, { color: theme.text }]}>${Number(item.balance).toFixed(2)}</Text>
          </View>
        )}
        ListEmptyComponent={
          <View style={[styles.emptyState, { backgroundColor: theme.card, ...theme.shadowLight }]}>
            <Ionicons name="wallet-outline" size={48} color={theme.textLight} />
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>No tienes cuentas aún.</Text>
            <Text style={[styles.emptyHint, { color: theme.textLight }]}>Agrega una cuenta para empezar</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  form: { padding: 16, borderRadius: 16, marginBottom: 16 },
  iconHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  formTitle: { fontSize: 20, fontWeight: '700', marginLeft: 8 },
  input: { borderWidth: 1, padding: 12, marginTop: 8, borderRadius: 12, fontSize: 15 },
  btn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 14, marginTop: 12, borderRadius: 12 },
  btnText: { color: "#fff", fontWeight: "700", fontSize: 16, marginLeft: 6 },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: 'center', paddingVertical: 16, paddingHorizontal: 16, marginBottom: 8, borderRadius: 12, borderBottomWidth: 0 },
  rowLeft: { flexDirection: 'row', alignItems: 'center' },
  accountName: { fontSize: 16, fontWeight: '500', marginLeft: 10 },
  accountBalance: { fontWeight: "700", fontSize: 18 },
  emptyState: { alignItems: 'center', padding: 32, borderRadius: 16, marginTop: 8 },
  emptyText: { fontSize: 16, fontWeight: '600', marginTop: 12 },
  emptyHint: { fontSize: 14, marginTop: 4 }
});
