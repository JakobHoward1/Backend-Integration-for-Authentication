import { useEffect, useState } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { Redirect } from 'expo-router'
import { supabase } from '../lib/supabase'

export default function Index() {
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    )
  }

  if (session) return <Redirect href="/(app)/home" />
  return <Redirect href="/(auth)/signin" />
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F0F14',
  },
})