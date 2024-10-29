import { zodResolver } from "@hookform/resolvers/zod"
import { eq } from "drizzle-orm"
import { Controller, useForm } from "react-hook-form"
import { createStyleSheet, useStyles } from "react-native-unistyles"
import { z } from "zod"
import { useAuth } from "~/auth-context"
import { Alert } from "~/components/alert"
import { Button } from "~/components/button"
import { SafeAreaView } from "~/components/safe-area-view"
import { Text } from "~/components/text"
import { TextField } from "~/components/text-field"
import { View } from "~/components/view"
import { authDb } from "~/db/auth-db"
import * as authSchema from "~/db/auth-schema"

const schema = z.object({
  email: z.string().email(),
})
type FormData = z.input<typeof schema>

export default function SigninScreen() {
  const { styles } = useStyles(stylesheet)
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })
  const { signIn } = useAuth()

  const onSubmit = async (data: FormData) => {
    try {
      const user = await authDb.query.consultants.findFirst({
        where: eq(authSchema.consultants.email, data.email),
      })

      if (!user) {
        throw new Error("No user found")
      }

      signIn(user)
    } catch {
      setError("root", {
        message: "Invalid credentials",
      })
    }
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.inner}>
        <View style={styles.card}>
          <View>
            <Text variant="title" weight="medium" color="textTitle">
              Welcome back
            </Text>

            <Text variant="caption">Enter your email to sign in</Text>
          </View>

          <View style={styles.form}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  disabled={isSubmitting}
                  placeholder="you@website.com"
                  autoComplete="email"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.email?.message}
                />
              )}
            />

            <Button
              label="Sign in"
              disabled={isSubmitting}
              onPressOut={handleSubmit(onSubmit)}
            />
          </View>

          {errors.root?.message && (
            <Alert variant="critical" text={errors.root.message} />
          )}
        </View>
      </View>
    </SafeAreaView>
  )
}

const stylesheet = createStyleSheet((theme) => ({
  root: {
    justifyContent: "center",
    alignItems: "stretch",
  },
  inner: {
    paddingHorizontal: theme.spacing(6),
  },
  card: {
    padding: theme.spacing(3),
    borderRadius: theme.radius.large,
    gap: theme.spacing(6),
  },
  form: {
    gap: theme.spacing(6),
  },
}))
