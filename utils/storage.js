import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "@finanzas_v1";

export async function saveData(obj) {
  try {
    const s = JSON.stringify(obj);
    await AsyncStorage.setItem(KEY, s);
  } catch (e) {
    console.warn("Error guardando datos", e);
  }
}

export async function loadData() {
  try {
    const s = await AsyncStorage.getItem(KEY);
    return s ? JSON.parse(s) : null;
  } catch (e) {
    console.warn("Error cargando datos", e);
    return null;
  }
}

// Normalize state shape and migrate accounts to include 'initial' balance if missing
export function normalizeState(state) {
  const accounts = Array.isArray(state?.accounts) ? state.accounts.map(a => ({
    id: a.id ?? 'a' + Math.random().toString(36).slice(2),
    name: a.name ?? 'Cuenta',
    // if 'initial' missing, take current balance as initial seed
    initial: typeof a.initial === 'number' ? a.initial : Number(a.balance || 0),
    balance: Number(a.balance || 0),
  })) : [];

  const transactions = Array.isArray(state?.transactions) ? state.transactions.map(t => ({
    id: String(t.id ?? ('t' + Math.random().toString(36).slice(2))),
    accountId: t.accountId,
    amount: Number(t.amount || 0),
    type: t.type === 'ingreso' || t.type === 'gasto' ? t.type : (t.type === 'income' ? 'ingreso' : 'gasto'),
    category: t.category ?? 'General',
    date: t.date ?? new Date().toISOString().slice(0,10),
  })) : [];

  const recomputed = recomputeAccounts(accounts, transactions);
  return { accounts: recomputed, transactions };
}

export function recomputeAccounts(accounts = [], transactions = []) {
  const map = new Map();
  // seed with initial
  for (const a of accounts) {
    map.set(a.id, { ...a, balance: Number(a.initial || 0) });
  }
  for (const t of transactions) {
    const a = map.get(t.accountId);
    if (!a) continue; // ignore tx without account
    const delta = t.type === 'ingreso' ? Number(t.amount || 0) : -Number(t.amount || 0);
    a.balance = Number((a.balance + delta).toFixed(2));
  }
  return Array.from(map.values());
}

// Optional helpers for derived values
export function computeBalance(accounts = []) {
  return accounts.reduce((sum, a) => sum + Number(a.balance || 0), 0);
}
