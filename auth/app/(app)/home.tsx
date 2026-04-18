import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { router } from 'expo-router'
import { supabase } from '../../lib/supabase'

export default function HomeScreen() {
  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.replace('/(auth)/signin')
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.greeting}>You're in.</Text>
        <Text style={styles.subtitle}>Welcome to your dashboard.</Text>
        <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F0F14',
    padding: 24,
  },
  card: {
    backgroundColor: '#1A1A24',
    borderRadius: 16,
    padding: 32,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A38',
  },
  greeting: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 32,
  },
  signOutButton: {
    backgroundColor: '#1F1F2E',
    borderWidth: 1,
    borderColor: '#3F3F5C',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
  },
  signOutText: {
    color: '#E05C5C',
    fontWeight: '600',
    fontSize: 15,
  },
})