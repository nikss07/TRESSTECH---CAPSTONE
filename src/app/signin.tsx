import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { BrandWordmark } from '@/components/brand-wordmark';
import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  BorderRadii,
  FontWeights,
  IconSizes,
  Shadows,
  Spacing,
  Typography,
} from '@/constants/theme';

export default function SignInScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    if (!email || !password) {
      if (Platform.OS === 'web') {
        window.alert('Please enter your email and password.');
      } else {
        Alert.alert('Sign In', 'Please enter your email and password.');
      }
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 600);
  };

  const handleForgotPassword = () => {
    if (Platform.OS === 'web') {
      window.alert('Password reset instructions will be sent to your email.');
    } else {
      Alert.alert('Reset Password', 'Password reset instructions will be sent to your email.');
    }
  };

  const handleCreateAccount = () => {
    router.push('/signup');
  };

  return (
    <ImageBackground
      source={require('@/assets/images/signin-background.png')}
      style={styles.backgroundImage}
      resizeMode="cover">
      <StatusBar style="dark" />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardAvoid}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            {/* Top Brand Bar (Logo on Left) */}
            <View style={styles.topBrandBar}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="TressTech Home"
                onPress={() => router.replace('/')}
                style={styles.brandRow}>
                <Image
                  source={require('@/assets/images/tresstechlogo.png')}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
                <BrandWordmark style={styles.brandTitle} />
              </Pressable>
            </View>

            {/* Elevated Sign-In Card */}
            <View style={styles.cardContainer}>
              {/* Card Header with Circle Return Button & Overline */}
              <View style={styles.cardHeaderRow}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Return to landing page"
                  onPress={() => router.replace('/')}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  style={({ pressed }) => [
                    styles.circleBackButton,
                    pressed && styles.circleButtonPressed,
                  ]}>
                  <SymbolView
                    name={{
                      ios: 'chevron.left',
                      android: 'arrow_back',
                      web: 'arrow_back',
                    }}
                    size={16}
                    tintColor="#0F3D3A"
                  />
                </Pressable>
                <ThemedText style={styles.overline}>WELCOME BACK</ThemedText>
              </View>

              <ThemedText style={styles.cardHeading}>
                Safer hair decisions start here.
              </ThemedText>

              <ThemedText style={styles.cardSubtitle}>
                Your private hair analysis library, designed for informed salon care.
              </ThemedText>

              {/* Form Inputs */}
              <View style={styles.formContainer}>
                <Input
                  label="Email"
                  placeholder="you@example.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                <Input
                  label="Password"
                  placeholder="•••••••"
                  value={password}
                  onChangeText={setPassword}
                  isPassword
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                {/* Primary CTA Button */}
                <Button
                  title="Sign In"
                  size="lg"
                  variant="primary"
                  loading={loading}
                  fullWidth
                  style={styles.signInButton}
                  textStyle={styles.signInButtonText}
                  onPress={handleSignIn}
                />

                {/* Auxiliary Links */}
                <View style={styles.linksContainer}>
                  <Pressable
                    accessibilityRole="button"
                    onPress={handleForgotPassword}>
                    <ThemedText style={styles.forgotPasswordText}>
                      Forgot password?
                    </ThemedText>
                  </Pressable>

                  <View style={styles.createAccountRow}>
                    <ThemedText style={styles.newHereText}>New here? </ThemedText>
                    <Pressable
                      accessibilityRole="button"
                      onPress={handleCreateAccount}>
                      <ThemedText style={styles.createAccountLink}>
                        Create an account
                      </ThemedText>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>

            {/* Bottom Security Assurance Note */}
            <View style={styles.securityNote}>
              <SymbolView
                name={{
                  ios: 'lock.fill',
                  android: 'lock',
                  web: 'lock',
                }}
                size={IconSizes.sm}
                tintColor="#EDE4D6"
              />
              <ThemedText style={styles.securityText}>
                Your data is encrypted and never sold.
              </ThemedText>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.four,
    paddingTop: Platform.select({ ios: Spacing.two, default: Spacing.four }),
    paddingBottom: Spacing.six,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topBrandBar: {
    width: '100%',
    maxWidth: 420,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: Spacing.two,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  circleBackButton: {
    width: 32,
    height: 32,
    borderRadius: BorderRadii.full,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8CAB5',
    alignItems: 'center',
    justifyContent: 'center',
    ...(Shadows.sm as object),
  },
  circleButtonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.94 }],
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  logoImage: {
    width: 32,
    height: 32,
    borderRadius: BorderRadii.full,
  },
  brandTitle: {
    fontSize: Typography.subtitle.fontSize,
    fontWeight: FontWeights.bold,
  },
  cardContainer: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#FAF5EE',
    borderRadius: 28,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.five,
    marginVertical: Spacing.four,
    gap: Spacing.three,
    borderWidth: 1,
    borderColor: '#E6DCCA',
    ...(Shadows.md as object),
  },
  overline: {
    color: '#CC9F4D',
    fontSize: Typography.caption.fontSize,
    fontWeight: FontWeights.bold,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  cardHeading: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: FontWeights.bold,
    color: '#0F3D3A',
  },
  cardSubtitle: {
    color: '#4A625E',
    fontSize: Typography.small.fontSize,
    lineHeight: 20,
    fontWeight: FontWeights.regular,
  },
  formContainer: {
    width: '100%',
    gap: Spacing.three,
    marginTop: Spacing.two,
  },
  signInButton: {
    borderRadius: BorderRadii.pill,
    height: 52,
    marginTop: Spacing.one,
  },
  signInButtonText: {
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.bold,
  },
  linksContainer: {
    alignItems: 'center',
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
  forgotPasswordText: {
    color: '#0F3D3A',
    fontSize: Typography.small.fontSize,
    textDecorationLine: 'underline',
    fontWeight: FontWeights.medium,
  },
  createAccountRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newHereText: {
    color: '#0F3D3A',
    fontSize: Typography.small.fontSize,
    fontWeight: FontWeights.regular,
  },
  createAccountLink: {
    color: '#0F3D3A',
    fontSize: Typography.small.fontSize,
    fontWeight: FontWeights.bold,
    textDecorationLine: 'underline',
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.two,
  },
  securityText: {
    color: 'rgba(237, 228, 214, 0.9)',
    fontSize: Typography.caption.fontSize,
    fontWeight: FontWeights.medium,
  },
});
