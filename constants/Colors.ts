export const Colors = {
  background: {
    primary: '#09090B', // Zinc 950 - deeper, warmer black
    secondary: '#18181B', // Zinc 900
    card: 'rgba(39, 39, 42, 0.7)', // Zinc 800 glass
    navBaseAndroid: 'rgba(9, 9, 11, 0.98)',
    navBaseIOS: 'rgba(9, 9, 11, 0.8)',
  },
  text: {
    primary: '#FAFAFA',
    secondary: '#A1A1AA',
    muted: '#71717A',
    title: '#F4F4F5',
  },
  brand: {
    // The YTuzo Signature Colors
    yuzu: '#FACC15', // Vibrant Yellow/Gold
    blaze: '#F97316', // Neon Orange
    ruby: '#F43F5E', // Rose/Red for alerts
    mint: '#10B981', // Emerald for success
  },
  border: {
    brand: 'rgba(250, 204, 21, 0.3)', // Tinted with the brand yellow
    light: 'rgba(255, 255, 255, 0.1)',
    lighter: 'rgba(255, 255, 255, 0.15)',
    faint: 'rgba(255, 255, 255, 0.05)',
  }
};

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: Colors.brand.yuzu,
    tabIconDefault: '#ccc',
    tabIconSelected: Colors.brand.yuzu,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: Colors.brand.yuzu,
    tabIconDefault: '#ccc',
    tabIconSelected: Colors.brand.yuzu,
  },
};
