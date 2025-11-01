import React, { useEffect, useState, createContext, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar, View, TouchableOpacity, useColorScheme } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Dashboard from "./components/Dashboard";
import AccountsScreen from "./components/AccountsScreen";
import AddTransaction from "./components/AddTransaction";
import TransactionsScreen from "./components/TransactionsScreen";
import EditTransaction from "./components/EditTransaction";
import { loadData, saveData, recomputeAccounts } from "./utils/storage";
import { lightTheme, darkTheme } from "./utils/theme";

// Context para el tema
export const ThemeContext = createContext();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');
  const theme = isDarkMode ? darkTheme : lightTheme;
  
  const [state, setState] = useState({
    accounts: [],
    transactions: [],
  });

  // cargar persistencia al iniciar
  useEffect(() => {
    (async () => {
      const saved = await loadData();
      if (saved) setState(saved);
    })();
  }, []);

  // guardar cada vez que cambie state
  useEffect(() => {
    saveData(state);
  }, [state]);

  const addAccount = (account) => {
    setState(prev => {
      const nextAccounts = [...prev.accounts, { ...account, initial: typeof account.initial === 'number' ? account.initial : Number(account.balance || 0) }];
      const recomputed = recomputeAccounts(nextAccounts, prev.transactions);
      return { ...prev, accounts: recomputed };
    });
  };

  const addTransaction = (tx) => {
    // actualizar cuenta balance simple: resta o suma al balance del accountId
    setState(prev => {
      const transactions = [tx, ...prev.transactions];
      const accounts = recomputeAccounts(prev.accounts, transactions);
      return { ...prev, transactions, accounts };
    });
  };

  const editTransaction = (updatedTx) => {
    setState(prev => {
      const transactions = prev.transactions.map(t => t.id === updatedTx.id ? { ...t, ...updatedTx } : t);
      const accounts = recomputeAccounts(prev.accounts, transactions);
      return { ...prev, transactions, accounts };
    });
  };

  const deleteTransaction = (id) => {
    setState(prev => {
      const transactions = prev.transactions.filter(t => t.id !== id);
      const accounts = recomputeAccounts(prev.accounts, transactions);
      return { ...prev, transactions, accounts };
    });
  };

  const Tabs = ({ navigation }) => (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: theme.surface,
        },
        headerTintColor: theme.text,
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopColor: theme.border,
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        headerRight: () => (
          route.name === 'Dashboard' ? (
            <TouchableOpacity onPress={() => setIsDarkMode(!isDarkMode)} style={{ paddingHorizontal: 16 }}>
              <Ionicons name={isDarkMode ? 'sunny' : 'moon'} size={24} color={theme.primary} />
            </TouchableOpacity>
          ) : null
        ),
        tabBarIcon: ({ color, size }) => {
          const map = { 
            Dashboard: 'wallet-outline', 
            Accounts: 'card-outline', 
            Transactions: 'list-outline' 
          };
          const name = map[route.name] || 'ellipse';
          return <Ionicons name={name} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" options={{ title: 'Inicio' }}>
        {props => <Dashboard {...props} data={state} theme={theme} />}
      </Tab.Screen>
      <Tab.Screen name="Accounts" options={{ title: 'Cuentas' }}>
        {props => <AccountsScreen {...props} accounts={state.accounts} addAccount={addAccount} theme={theme} />}
      </Tab.Screen>
      <Tab.Screen name="Transactions" options={{ title: 'Transacciones' }}>
        {props => <TransactionsScreen {...props} data={state} onDelete={deleteTransaction} theme={theme} />}
      </Tab.Screen>
    </Tab.Navigator>
    {/* Floating Action Button */}
    <TouchableOpacity
      onPress={() => navigation.navigate('AddTransaction')}
      style={{ 
        position: 'absolute', 
        right: 20, 
        bottom: 30, 
        backgroundColor: theme.primary, 
        width: 56, 
        height: 56, 
        borderRadius: 28, 
        alignItems: 'center', 
        justifyContent: 'center',
        ...theme.shadow
      }}
      activeOpacity={0.85}
    >
      <Ionicons name="add" size={28} color="#fff" />
    </TouchableOpacity>
    </View>
  );

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme: () => setIsDarkMode(!isDarkMode) }}>
      <NavigationContainer>
        <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: theme.surface },
            headerTintColor: theme.text,
            contentStyle: { backgroundColor: theme.background }
          }}
        >
          <Stack.Screen name="HomeTabs" component={Tabs} options={{ headerShown: false }} />
          <Stack.Screen name="AddTransaction" options={{ title: "Agregar transacción", presentation: 'modal' }}>
            {props => <AddTransaction {...props} accounts={state.accounts} onAdd={addTransaction} theme={theme} />}
          </Stack.Screen>
          <Stack.Screen name="EditTransaction" options={{ title: "Editar transacción" }}>
            {props => <EditTransaction {...props} accounts={state.accounts} onUpdate={editTransaction} onDelete={deleteTransaction} theme={theme} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}
