import { zodResolver } from "@hookform/resolvers/zod"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { eq } from "drizzle-orm"
import { Controller, useForm } from "react-hook-form"
import { Text, View } from "react-native"
import { z } from "zod"
import { Button } from "~/components/button"
import { Input } from "~/components/text-field"
import { authDb } from "~/db/auth-db"
import * as schema from "~/db/auth-schema"

const signInFormSchema = z.object({
  email: z.string().email(),
})
type FormData = z.infer<typeof signInFormSchema>

async function findUserByEmail(email: string) {
  try {
    const user = await authDb.query.consultants.findFirst({
      where: eq(schema.consultants.email, email),
    })

    return user ?? null
  } catch (e) {
    return null
  }
}

export default function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (data: FormData) => {
    const user = findUserByEmail(data.email)

    if (user) {
      const jsonUser = JSON.stringify(user)
      await AsyncStorage.setItem("user", jsonUser)

      // redirect to index page
    }

    // set root error - invalid credentials
  }

  return (
    <View className="flex-1 flex items-center justify-center">
      <View className="w-full gap-8 p-8">
        <View>
          <Text className="text-center text-2xl font-bold">
            Sign in to your account
          </Text>
          <Text className="text-center mt-2 text-sm text-muted-foreground">
            Welcome back! Please enter you email to sign in.
          </Text>
        </View>

        {/* Sign in form */}
        <View className="flex gap-6">
          <Controller
            control={control}
            name="email"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="gap-1">
                <Text className="font-semibold">Email address</Text>
                <Input
                  autoComplete="email"
                  className="w-full"
                  placeholder="you@website.com"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={value}
                />
                {errors.email && (
                  <Text className="text-sm font-medium text-red-500">
                    {errors.email?.message}
                  </Text>
                )}
              </View>
            )}
          />

          <Button label="Sign in" onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </View>
  )
}
