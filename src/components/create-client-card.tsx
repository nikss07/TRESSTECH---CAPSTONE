import { StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import {
  BorderRadii,
  Dimensions,
  FontWeights,
  Shadows,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type CreateClientCardProps = {
  clientName: string;
  contact: string;
  onClientNameChange: (text: string) => void;
  onContactChange: (text: string) => void;
  onSave: () => void;
  loading?: boolean;
};

export function CreateClientCard({
  clientName,
  contact,
  onClientNameChange,
  onContactChange,
  onSave,
  loading = false,
}: CreateClientCardProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.cardContainer,
        {
          backgroundColor: theme.card,
          borderColor: theme.borderSubtle,
        },
      ]}>
      {/* Field 1: Client Name */}
      <View style={styles.fieldGroup}>
        <ThemedText style={[styles.fieldLabel, { color: theme.text }]}>
          Client name
        </ThemedText>
        <TextInput
          value={clientName}
          onChangeText={onClientNameChange}
          placeholder="Jamie Taylor"
          placeholderTextColor={theme.textMuted}
          style={[
            styles.input,
            {
              backgroundColor: theme.surfaceSecondary,
              borderColor: theme.borderSubtle,
              color: theme.text,
            },
          ]}
          autoCapitalize="words"
          autoCorrect={false}
          accessibilityLabel="Client name input"
        />
      </View>

      {/* Field 2: Contact */}
      <View style={styles.fieldGroup}>
        <ThemedText style={[styles.fieldLabel, { color: theme.text }]}>
          Contact
        </ThemedText>
        <TextInput
          value={contact}
          onChangeText={onContactChange}
          placeholder="Email or phone"
          placeholderTextColor={theme.textMuted}
          style={[
            styles.input,
            {
              backgroundColor: theme.surfaceSecondary,
              borderColor: theme.borderSubtle,
              color: theme.text,
            },
          ]}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          accessibilityLabel="Contact email or phone input"
        />
      </View>

      {/* Save Action Button */}
      <Button
        title="Save client and continue"
        variant="primary"
        size="lg"
        fullWidth
        loading={loading}
        onPress={onSave}
        style={styles.saveButton}
        textStyle={styles.saveButtonText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    padding: Spacing.four,
    borderRadius: BorderRadii.xl,
    borderWidth: 1,
    gap: Spacing.four,
    ...(Shadows.sm as object),
  },
  fieldGroup: {
    gap: Spacing.two,
  },
  fieldLabel: {
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.bold,
  },
  input: {
    width: '100%',
    height: Dimensions.inputHeight,
    borderRadius: BorderRadii.md,
    borderWidth: 1,
    paddingHorizontal: Spacing.four,
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.regular,
  },
  saveButton: {
    borderRadius: BorderRadii.pill,
    height: 52,
    marginTop: Spacing.one,
  },
  saveButtonText: {
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.semiBold,
  },
});
