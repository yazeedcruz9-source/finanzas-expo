import React, { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Ionicons } from '@expo/vector-icons';
import { categories } from "../utils/theme";

const screenWidth = Dimensions.get("window").width - 24;

export default function Dashboard({ navigation, data, theme }) {
  const totalBalance = (data.accounts || []).reduce((s, a) => s + (Number(a.balance) || 0), 0).toFixed(2);

  // resumen gastos por categoría
  const byCategory = useMemo(() => {
    const map = {};
    (data.transactions || []).forEach(t => {
      if (t.type === "gasto") {
        map[t.category] = (map[t.category] || 0) + Number(t.amount);
      }
    });
    return Object.entries(map).map(([name, value]) => {
      const cat = categories.find(c => c.value === name) || categories[4];
      return { 
        name: cat.label, 
        value, 
        color: cat.color, 
        legendFontColor: theme.textSecondary, 
        legendFontSize: 12 
      };
    });
  }, [data.transactions, theme]);

  return (
    <ScrollView style={{ backgroundColor: theme.background }} contentContainerStyle={styles.container}>
      <View style={[styles.header, { backgroundColor: theme.card, ...theme.shadow }]}>
        <Text style={[styles.hTitle, { color: theme.textSecondary }]}>Balance total</Text>
        <Text style={[styles.hAmount, { color: theme.text }]}>${totalBalance}</Text>
      </View>

      <View style={styles.row}>
        <TouchableOpacity 
          style={[styles.card, { backgroundColor: theme.card, ...theme.shadowLight }]} 
          onPress={() => navigation.navigate("Accounts")}
          activeOpacity={0.7}
        >
          <Ionicons name="card-outline" size={24} color={theme.primary} />
          <Text style={[styles.cardTitle, { color: theme.textSecondary }]}>Cuentas</Text>
          <Text style={[styles.cardValue, { color: theme.text }]}>{(data.accounts || []).length}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.card, { backgroundColor: theme.card, ...theme.shadowLight }]} 
          onPress={() => navigation.navigate("AddTransaction")}
          activeOpacity={0.7}
        >
          <Ionicons name="add-circle-outline" size={24} color={theme.success} />
          <Text style={[styles.cardTitle, { color: theme.textSecondary }]}>Nueva transacción</Text>
          <Text style={[styles.cardValue, { color: theme.text }]}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.chartCard, { backgroundColor: theme.card, ...theme.shadowLight }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Gastos por categoría</Text>
        {byCategory.length === 0 ? (
          <Text style={{ marginTop: 12, color: theme.textSecondary }}>No hay gastos aún — agrega una transacción.</Text>
        ) : (
          <PieChart
            data={byCategory}
            width={screenWidth}
            height={220}
            accessor="value"
            backgroundColor={"transparent"}
            paddingLeft="15"
            absolute
          />
        )}
      </View>

      <View style={[styles.section, { backgroundColor: theme.card, ...theme.shadowLight }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Últimas transacciones</Text>
        {(data.transactions || []).slice(0, 6).map(tx => (
          <View key={tx.id} style={[styles.txRow, { borderBottomColor: theme.border }]}>
            <View>
              <Text style={[styles.txDesc, { color: theme.text }]}>{tx.desc || tx.category}</Text>
              <Text style={[styles.txMeta, { color: theme.textLight }]}>{tx.date} · {tx.accountId}</Text>
            </View>
            <Text style={[styles.txAmount, { color: tx.type === "gasto" ? theme.danger : theme.success }]}>
              {tx.type === "gasto" ? "-" : "+"}${Number(tx.amount).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12, paddingBottom: 40 },
  header: { marginVertical: 8, alignItems: "center", padding: 20, borderRadius: 16 },
  hTitle: { fontSize: 16 },
  hAmount: { fontSize: 36, fontWeight: "700", marginTop: 4 },
  row: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
  card: { flex: 1, margin: 6, padding: 16, borderRadius: 16 },
  cardTitle: { fontSize: 13, marginTop: 8 },
  cardValue: { fontSize: 24, fontWeight: "700", marginTop: 4 },
  chartCard: { marginTop: 18, padding: 16, borderRadius: 16 },
  section: { marginTop: 18, padding: 16, borderRadius: 16 },
  sectionTitle: { fontWeight: "700", fontSize: 18, marginBottom: 8 },
  txRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 12, borderBottomWidth: 0.5 },
  txDesc: { fontSize: 15, fontWeight: "500" },
  txMeta: { fontSize: 12, marginTop: 2 },
  txAmount: { fontWeight: "700", fontSize: 16, minWidth: 80, textAlign: "right" }
});
