// Sistema de tema profesional con paleta de colores consistente
export const lightTheme = {
  // Colores principales
  primary: '#2563EB',      // Azul profesional
  primaryDark: '#1D4ED8',
  secondary: '#10B981',    // Verde para ingresos
  danger: '#EF4444',       // Rojo para gastos
  warning: '#F59E0B',      // Amarillo/naranja
  
  // Backgrounds
  background: '#F9FAFB',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  
  // Texto
  text: '#111827',
  textSecondary: '#6B7280',
  textLight: '#9CA3AF',
  
  // Bordes y divisores
  border: '#E5E7EB',
  divider: '#F3F4F6',
  
  // Estados
  success: '#10B981',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Sombras
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  shadowLight: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  }
};

export const darkTheme = {
  // Colores principales
  primary: '#3B82F6',
  primaryDark: '#2563EB',
  secondary: '#34D399',
  danger: '#F87171',
  warning: '#FBBF24',
  
  // Backgrounds
  background: '#111827',
  surface: '#1F2937',
  card: '#1F2937',
  
  // Texto
  text: '#F9FAFB',
  textSecondary: '#D1D5DB',
  textLight: '#9CA3AF',
  
  // Bordes y divisores
  border: '#374151',
  divider: '#2D3748',
  
  // Estados
  success: '#34D399',
  error: '#F87171',
  info: '#60A5FA',
  
  // Sombras
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  shadowLight: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 1,
  }
};

// Categorías con colores e íconos
export const categories = [
  { value: 'comida', label: 'Comida', icon: 'restaurant', color: '#F59E0B' },
  { value: 'transporte', label: 'Transporte', icon: 'car', color: '#3B82F6' },
  { value: 'entretenimiento', label: 'Entretenimiento', icon: 'game-controller', color: '#8B5CF6' },
  { value: 'salud', label: 'Salud', icon: 'fitness', color: '#10B981' },
  { value: 'otros', label: 'Otros', icon: 'ellipsis-horizontal', color: '#6B7280' },
];

// Espaciado consistente
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};

// Bordes redondeados
export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 999,
};

// Tipografía
export const typography = {
  h1: { fontSize: 32, fontWeight: '700' },
  h2: { fontSize: 24, fontWeight: '700' },
  h3: { fontSize: 20, fontWeight: '600' },
  h4: { fontSize: 18, fontWeight: '600' },
  body: { fontSize: 16, fontWeight: '400' },
  bodyBold: { fontSize: 16, fontWeight: '600' },
  small: { fontSize: 14, fontWeight: '400' },
  tiny: { fontSize: 12, fontWeight: '400' },
};
