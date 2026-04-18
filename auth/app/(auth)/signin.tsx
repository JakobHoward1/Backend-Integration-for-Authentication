import { useState } from 'react'
import {
  Text, TextInput, TouchableOpacity,
  StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform, View
} from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { router } from 'expo-router'
import { supabase } from '../../lib/supabase'

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

type SignInForm = z.infer<typeof signInSchema>

export default function SignInScreen() {
  const [loading, setLoading] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

  const { control, handleSubmit, formState: { errors } } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
  })

  const onSubmit = async (data: SignInForm) => {
    setLoading(true)
    setAuthError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    setLoading(false)

    if (error) {
      if (error.message.includes('Invalid login')) {
        setAuthError('Incorrect email or password.')
      } else if (error.status === 0) {
        setAuthError('Network error. Please check your connection.')
      } else {
        setAuthError(error.message)
      }
      return
    }

    router.replace('/(app)/home')
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
      </View>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="Email"
            placeholderTextColor="#4B4B6A"
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.password && styles.inputError]}
            placeholder="Password"
            placeholderTextColor="#4B4B6A"
            secureTextEntry
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

      {authError && <Text style={styles.errorText}>{authError}</Text>}

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        {loading
          ? <ActivityIndicator color="#fff" />
          : <Text style={styles.buttonText}>Sign In</Text>
        }
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('/(auth)/signup')}>
        <Text style={styles.linkText}>Don't have an account? <Text style={styles.linkBold}>Sign Up</Text></Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#0F0F14',
  },
  header: {
    marginBottom: 36,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
  },
  input: {
    borderWidth: 1,
    borderColor: '#2A2A38',
    borderRadius: 10,
    padding: 14,
    marginBottom: 4,
    fontSize: 15,
    color: '#FFFFFF',
    backgroundColor: '#1A1A24',
  },
  inputError: {
    borderColor: '#E05C5C',
  },
  errorText: {
    color: '#E05C5C',
    fontSize: 13,
    marginBottom: 8,
    marginLeft: 2,
  },
  button: {
    backgroundColor: '#6C63FF',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 0.3,
  },
  linkText: {
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
  },
  linkBold: {
    color: '#6C63FF',
    fontWeight: '600',
  },
})