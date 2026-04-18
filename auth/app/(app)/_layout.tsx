import { useEffect, useState } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { Stack, router } from 'expo-router'
import { supabase } from '../../lib/supabase'

export default function AppLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.replace('/(auth)/signin')
      setIsAuthenticated(!!session)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.replace('/(auth)/signin')
      setIsAuthenticated(!!session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (isAuthenticated === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    )
  }

  return <Stack screenOptions={{ headerShown: false }} />
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F0F14',
  },
})