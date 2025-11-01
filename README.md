# 💰 Finanzas Pro# finanzas-expo



Una aplicación profesional de gestión financiera personal construida con React Native y Expo. Gestiona tus cuentas, transacciones y visualiza tus gastos con gráficos interactivos.Pequeña app de finanzas personales con Expo + React Navigation.



## ✨ Características## Características

- Dashboard con gráfico (react-native-chart-kit)

- 📊 **Dashboard Visual**: Visualiza tu balance total y gastos por categoría con gráficos PieChart- Agregar transacciones (ingresos/gastos)

- 💳 **Múltiples Cuentas**: Gestiona efectivo, bancos y otras cuentas- Gestión simple de cuentas y balances

- 📝 **Transacciones**: Registra ingresos y gastos con categorías- Persistencia local con AsyncStorage

- 🔍 **Filtros Avanzados**: Filtra transacciones por tipo, cuenta, período y categoría

- ✏️ **Edición Completa**: Edita o elimina transacciones con confirmación## Estructura

- 🌙 **Tema Claro/Oscuro**: Cambia entre temas con un toque (ícono en Dashboard)```

- 💾 **Persistencia Local**: Tus datos se guardan automáticamente en AsyncStoragefinanzas-expo/

- 📱 **Multiplataforma**: Funciona en iOS, Android y Web├── App.js

├── package.json

## 🎨 Diseño Profesional├── /components

│   ├── Dashboard.js

- Sistema de tema consistente con paleta de colores profesional│   ├── AddTransaction.js

- Íconos Ionicons en toda la interfaz│   └── AccountsScreen.js

- Sombras y bordes redondeados├── /utils

- Animaciones suaves en interacciones│   └── storage.js

- Interfaz intuitiva y moderna└── README.md

```

## 🚀 Instalación y Uso

## Ejecutar

### Requisitos previos

- Node.js 18+- Dispositivo o emulador

- Expo CLI

```powershell

### Iniciar el proyectonpm start

```

```bash

# Instalar dependencias- Web (opcional)

npm install

```powershell

# Iniciar el servidor de desarrollonpm run web

npx expo start```



# Para webSi usas web, los gráficos usan `react-native-svg` y deberían funcionar en Expo Web.

npx expo start --web

## Notas

# Para Android- La entrada del proyecto apunta a `App.js`.

npx expo start --android- React Navigation requiere `react-native-gesture-handler`, `react-native-safe-area-context` y `react-native-screens` (ya instalados).


# Para iOS
npx expo start --ios
```

## 📁 Estructura del Proyecto

```
finanzas-expo/
├── App.js                      # Navegación y estado global
├── components/
│   ├── Dashboard.js            # Pantalla principal con gráficos
│   ├── AccountsScreen.js       # Gestión de cuentas
│   ├── AddTransaction.js       # Formulario de nueva transacción
│   ├── TransactionsScreen.js   # Lista filtrable de transacciones
│   └── EditTransaction.js      # Editar/eliminar transacciones
├── utils/
│   ├── storage.js              # AsyncStorage y cálculo de balances
│   └── theme.js                # Sistema de temas y colores
└── package.json
```

## 🎯 Flujo de Uso

1. **Agregar una cuenta**: Ve a la pestaña "Cuentas" y crea tu primera cuenta (ej: Efectivo, Banco)
2. **Registrar transacción**: Presiona el botón flotante "+" para agregar un ingreso o gasto
3. **Visualizar Dashboard**: Ve tus balances totales y gráfico de gastos por categoría
4. **Filtrar transacciones**: Usa la pestaña "Transacciones" para ver y filtrar tu historial
5. **Editar/Eliminar**: Toca cualquier transacción para editarla o eliminarla
6. **Cambiar tema**: Toca el ícono de sol/luna en el Dashboard para cambiar entre tema claro y oscuro

## 🔧 Tecnologías

- **React Native** - Framework de UI
- **Expo SDK 54** - Herramientas y APIs
- **React Navigation** - Navegación con tabs y modals
- **AsyncStorage** - Persistencia de datos
- **react-native-chart-kit** - Gráficos PieChart
- **@expo/vector-icons** - Íconos Ionicons
- **@react-native-picker/picker** - Selectores nativos

## 💡 Categorías Predefinidas

- 🍔 **Comida** - Restaurantes, supermercado, delivery
- 🚗 **Transporte** - Gasolina, transporte público, Uber
- 🎮 **Entretenimiento** - Cine, streaming, videojuegos
- 💊 **Salud** - Médico, farmacia, gimnasio
- 📦 **Otros** - Todo lo demás

## 🎨 Paleta de Colores

### Tema Claro
- Primary: `#2563EB` (Azul profesional)
- Success: `#10B981` (Verde para ingresos)
- Danger: `#EF4444` (Rojo para gastos)
- Background: `#F9FAFB`

### Tema Oscuro
- Primary: `#3B82F6`
- Background: `#111827`
- Surface: `#1F2937`

## 📝 Notas de Desarrollo

- Los balances de cuenta se recalculan automáticamente desde el historial de transacciones
- Las transacciones incluyen: descripción, monto, tipo, categoría, cuenta y fecha
- El toggle de tema está en el header del Dashboard (ícono sol/luna)
- Los datos persisten automáticamente con cada cambio
- El FAB (botón flotante) está disponible en todas las pestañas

## 🐛 Solución de Problemas

Si el servidor no inicia:
```bash
npx expo start --clear
```

Si hay problemas con dependencias:
```bash
rm -rf node_modules
npm install
```

## 📄 Licencia

MIT

## 👨‍💻 Autor

Desarrollado con ❤️ usando React Native y Expo

---

**¿Preguntas?** Abre un issue en el repositorio o contacta al desarrollador.
