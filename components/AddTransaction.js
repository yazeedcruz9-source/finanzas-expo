import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from '@expo/vector-icons';
import uuid from "react-native-uuid";
import { categories } from "../utils/theme";

export default function AddTransaction({ accounts = [], onAdd, navigation, theme }) {
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("gasto");
  const [category, setCategory] = useState("comida");
  const [accountId, setAccountId] = useState(accounts[0] ? accounts[0].id : "");

  const submit = () => {
    if (!amount || !accountId) return Alert.alert("Completa monto y cuenta");
    const tx = {
      id: uuid.v4(),
      desc,
      amount: Number(amount),
      type,
      category,
      accountId,
      date: new Date().toISOString().split("T")[0],
    };
    onAdd(tx);
    navigation.navigate("Dashboard");
  };

  const selectedCat = categories.find(c => c.value === category) || categories[0];

  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
      <View style={styles.container}>
        <View style={[styles.card, { backgroundColor: theme.card, ...theme.shadow }]}>
          <View style={styles.iconHeader}>
            <Ionicons name="receipt" size={28} color={theme.primary} />
            <Text style={[styles.formTitle, { color: theme.text }]}>Nueva transacción</Text>
          </View>

          <Text style={[styles.label, { color: theme.textSecondary }]}>Cuenta</Text>
          <View style={[styles.pickerContainer, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <Ionicons name="wallet" size={20} color={theme.primary} style={{ marginRight: 8 }} />
            <Picker 
              selectedValue={accountId} 
              onValueChange={(v) => setAccountId(v)} 
              style={[styles.picker, { color: theme.text }]}
            >
              {accounts.map(a => (
                <Picker.Item key={a.id} label={`${a.name} ($${Number(a.balance).toFixed(2)})`} value={a.id} />
              ))}
            </Picker>
          </View>

          <Text style={[styles.label, { color: theme.textSecondary }]}>Descripción</Text>
          <TextInput 
            placeholder="Ej: Café con amigos" 
            placeholderTextColor={theme.textLight}
            value={desc} 
            onChangeText={setDesc} 
            style={[styles.input, { borderColor: theme.border, backgroundColor: theme.surface, color: theme.text }]} 
          />

          <Text style={[styles.label, { color: theme.textSecondary }]}>Monto</Text>
          <TextInput 
            placeholder="0.00" 
            placeholderTextColor={theme.textLight}
            value={amount} 
            onChangeText={setAmount} 
            keyboardType="numeric" 
            style={[styles.input, { borderColor: theme.border, backgroundColor: theme.surface, color: theme.text }]} 
          />

          <Text style={[styles.label, { color: theme.textSecondary }]}>Tipo</Text>
          <View style={styles.typeRow}>
            <TouchableOpacity 
              onPress={() => setType("gasto")} 
              style={[
                styles.typeBtn, 
                { borderColor: theme.border, backgroundColor: theme.surface },
                type === "gasto" && { backgroundColor: theme.danger, borderColor: theme.danger }
              ]}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-down-circle" size={20} color={type === "gasto" ? "#fff" : theme.danger} />
              <Text style={[styles.typeText, { color: type === "gasto" ? "#fff" : theme.text }]}>Gasto</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setType("ingreso")} 
              style={[
                styles.typeBtn, 
                { borderColor: theme.border, backgroundColor: theme.surface },
                type === "ingreso" && { backgroundColor: theme.success, borderColor: theme.success }
              ]}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-up-circle" size={20} color={type === "ingreso" ? "#fff" : theme.success} />
              <Text style={[styles.typeText, { color: type === "ingreso" ? "#fff" : theme.text }]}>Ingreso</Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.label, { color: theme.textSecondary }]}>Categoría</Text>
          <View style={[styles.pickerContainer, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <Ionicons name={selectedCat.icon} size={20} color={selectedCat.color} style={{ marginRight: 8 }} />
            <Picker 
              selectedValue={category} 
              onValueChange={setCategory}
              style={[styles.picker, { color: theme.text }]}
            >
              {categories.map(cat => (
                <Picker.Item key={cat.value} label={cat.label} value={cat.value} />
              ))}
            </Picker>
          </View>

          <TouchableOpacity 
            style={[styles.btn, { backgroundColor: theme.primary, ...theme.shadow }]} 
            onPress={submit}
            activeOpacity={0.8}
          >
            <Ionicons name="checkmark-circle" size={20} color="#fff" />
            <Text style={styles.btnText}>Agregar transacción</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: { padding: 20, borderRadius: 16 },
  iconHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  formTitle: { fontSize: 22, fontWeight: '700', marginLeft: 10 },
  label: { marginTop: 16, marginBottom: 8, fontSize: 14, fontWeight: '600' },
  input: { borderWidth: 1, padding: 14, borderRadius: 12, fontSize: 16 },
  pickerContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 12, paddingLeft: 12 },
  picker: { flex: 1, height: 50 },
  typeRow: { flexDirection: "row", justifyContent: "space-between", gap: 12 },
  typeBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 14, borderRadius: 12, borderWidth: 1.5 },
  typeText: { fontWeight: '600', fontSize: 15, marginLeft: 6 },
  btn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 16, marginTop: 24, borderRadius: 12 },
  btnText: { color: "#fff", fontWeight: "700", fontSize: 16, marginLeft: 8 }
});
