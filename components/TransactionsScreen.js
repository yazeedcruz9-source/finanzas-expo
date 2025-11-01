import React, { useMemo, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity, TextInput } from 'react-native';

export default function TransactionsScreen({ navigation, data, onDelete }) {
  const transactions = data?.transactions ?? [];
  const accounts = data?.accounts ?? [];
  const accountsById = new Map(accounts.map(a => [a.id, a]));

  const [typeFilter, setTypeFilter] = useState('all'); // all | ingreso | gasto
  const [accountFilter, setAccountFilter] = useState('all'); // 'all' | accountId
  const [period, setPeriod] = useState('30'); // 7 | 30 | all
  const [categoryQuery, setCategoryQuery] = useState('');

  const filtered = useMemo(() => {
    const now = new Date();
    const days = period === 'all' ? Infinity : Number(period);
    const cutoff = days === Infinity ? null : new Date(now.getFullYear(), now.getMonth(), now.getDate() - (days - 1));
    return transactions.filter(t => {
      if (typeFilter !== 'all' && t.type !== typeFilter) return false;
      if (accountFilter !== 'all' && t.accountId !== accountFilter) return false;
      if (categoryQuery && !(t.category || '').toLowerCase().includes(categoryQuery.toLowerCase())) return false;
      if (cutoff) {
        const td = new Date(t.date || '');
        if (isNaN(+td)) return false;
        if (td < cutoff) return false;
      }
      return true;
    });
  }, [transactions, typeFilter, accountFilter, period, categoryQuery]);

  const totals = useMemo(() => {
    const income = filtered.filter(t => t.type === 'ingreso').reduce((s, t) => s + Number(t.amount || 0), 0);
    const expense = filtered.filter(t => t.type === 'gasto').reduce((s, t) => s + Number(t.amount || 0), 0);
    return { income, expense, net: +(income - expense).toFixed(2) };
  }, [filtered]);

  return (
    <View style={styles.container}>
      {/* Filtros */}
      <View style={styles.filters}>
        <Text style={styles.filterLabel}>Tipo</Text>
        <View style={styles.rowWrap}>
          {['all','ingreso','gasto'].map(v => (
            <TouchableOpacity key={v} onPress={() => setTypeFilter(v)} style={[styles.pill, typeFilter===v && styles.pillActive]}>
              <Text style={typeFilter===v ? styles.pillTextActive : styles.pillText}>{v==='all'?'Todos':v}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.filterLabel}>Cuenta</Text>
        <View style={styles.rowWrap}>
          <TouchableOpacity onPress={() => setAccountFilter('all')} style={[styles.pill, accountFilter==='all' && styles.pillActive]}>
            <Text style={accountFilter==='all' ? styles.pillTextActive : styles.pillText}>Todas</Text>
          </TouchableOpacity>
          {accounts.map(a => (
            <TouchableOpacity key={a.id} onPress={() => setAccountFilter(a.id)} style={[styles.pill, accountFilter===a.id && styles.pillActive]}>
              <Text style={accountFilter===a.id ? styles.pillTextActive : styles.pillText}>{a.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.filterLabel}>Período</Text>
        <View style={styles.rowWrap}>
          {['7','30','all'].map(v => (
            <TouchableOpacity key={v} onPress={() => setPeriod(v)} style={[styles.pill, period===v && styles.pillActive]}>
              <Text style={period===v ? styles.pillTextActive : styles.pillText}>{v==='all'?'Todo':`Últimos ${v}`}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.filterLabel}>Categoría</Text>
        <TextInput value={categoryQuery} onChangeText={setCategoryQuery} placeholder="Buscar categoría" style={styles.input} />
      </View>

      {/* Resumen */}
      <View style={styles.summary}>
        <Text>Ingresos: <Text style={styles.positive}>{totals.income.toLocaleString(undefined,{style:'currency',currency:'USD'})}</Text></Text>
        <Text>Gastos: <Text style={styles.negative}>-{totals.expense.toLocaleString(undefined,{style:'currency',currency:'USD'})}</Text></Text>
        <Text>Balance: <Text style={totals.net>=0?styles.positive:styles.negative}>{totals.net.toLocaleString(undefined,{style:'currency',currency:'USD'})}</Text></Text>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        renderItem={({ item }) => {
          const acc = accountsById.get(item.accountId);
          return (
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.category} • {acc?.name ?? 'N/A'}</Text>
                <Text style={styles.meta}>{item.date}</Text>
              </View>
              <Text style={[styles.amount, item.type === 'ingreso' ? styles.positive : styles.negative]}>
                {(item.type === 'ingreso' ? '' : '-') + Number(item.amount).toFixed(2)}
              </Text>
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => navigation.navigate('EditTransaction', { tx: item })} style={styles.actionBtn}>
                  <Text style={styles.actionText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDelete?.(item.id)} style={styles.actionBtnDanger}>
                  <Text style={[styles.actionText, { color: '#fff' }]}>Borrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={<Text style={{ color: '#555' }}>No hay transacciones aún.</Text>}
      />
      <View style={{ marginTop: 12 }}>
        <Button title="Agregar transacción" onPress={() => navigation.navigate('AddTransaction')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  filters: { marginBottom: 12 },
  filterLabel: { fontWeight: '600', marginTop: 8, marginBottom: 6 },
  rowWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pill: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16, borderWidth: 1, borderColor: '#ccc' },
  pillActive: { backgroundColor: '#007AFF', borderColor: '#007AFF' },
  pillText: { color: '#333' },
  pillTextActive: { color: '#fff', fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 12, height: 40, backgroundColor: '#fff' },
  summary: { flexDirection: 'row', columnGap: 16, justifyContent: 'space-between', marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#fff', padding: 12, borderRadius: 12, borderWidth: StyleSheet.hairlineWidth, borderColor: '#e5e5e5' },
  title: { fontWeight: '600' },
  meta: { fontSize: 12, color: '#666' },
  amount: { fontWeight: '700' },
  positive: { color: '#0a9957' },
  negative: { color: '#c0392b' },
  actions: { flexDirection: 'row', gap: 8, marginLeft: 8 },
  actionBtn: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: '#007AFF' },
  actionBtnDanger: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, backgroundColor: '#d32f2f' },
  actionText: { color: '#007AFF', fontWeight: '600' },
});
