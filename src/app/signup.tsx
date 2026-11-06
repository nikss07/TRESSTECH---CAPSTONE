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
  Shadows,
  Spacing,
  Typography,
} from '@/constants/theme';

export default function SignUpScreen() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateAccount = () => {
    if (!name || !email || !password) {
      if (Platform.OS === 'web') {
        window.alert('Please fill in your name, email, and password.');
      } else {
        Alert.alert('Incomplete Form', 'Please fill in your name, email, and password.');
      }
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 600);
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
            {/* Top Brand Header Bar (Logo on Left) */}
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

            {/* Elevated Sign-Up Card Container */}
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
                <ThemedText style={styles.overline}>GET STARTED</ThemedText>
              </View>

              <ThemedText style={styles.cardHeading}>
                Create your TressTech{'\n'}account.
              </ThemedText>

              <ThemedText style={styles.cardSubtitle}>
                Your private hair analysis library, designed for informed salon care.
              </ThemedText>

              {/* Registration Form Fields */}
              <View style={styles.formContainer}>
                <Input
                  label="Name"
                  placeholder="Junaica Layno"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                  autoCorrect={false}
                />

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
                  placeholder="••••••••"
                  value={password}
                  onChangeText={setPassword}
                  isPassword
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                {/* Primary CTA Button */}
                <Button
                  title="Create account"
                  size="lg"
                  variant="primary"
                  loading={loading}
                  fullWidth
                  style={styles.createAccountButton}
                  textStyle={styles.createAccountButtonText}
                  onPress={handleCreateAccount}
                />

                {/* Switch to Sign In Link */}
                <View style={styles.signInRow}>
                  <ThemedText style={styles.alreadyHaveText}>
                    Already have an account?{' '}
                  </ThemedText>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Sign in to existing account"
                    onPress={() => router.push('/signin')}>
                    <ThemedText style={styles.signInLink}>Sign in</ThemedText>
                  </Pressable>
                </View>
              </View>
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
    justifyContent: 'center',
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
    marginVertical: Spacing.three,
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
  createAccountButton: {
    borderRadius: BorderRadii.pill,
    height: 52,
    marginTop: Spacing.one,
  },
  createAccountButtonText: {
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.bold,
  },
  signInRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.two,
  },
  alreadyHaveText: {
    color: '#0F3D3A',
    fontSize: Typography.small.fontSize,
    fontWeight: FontWeights.regular,
  },
  signInLink: {
    color: '#0F3D3A',
    fontSize: Typography.small.fontSize,
    fontWeight: FontWeights.bold,
    textDecorationLine: 'underline',
  },
});
