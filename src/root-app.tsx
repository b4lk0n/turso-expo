import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ActivityIndicator, Button, Modal } from "react-native"
import { createStyleSheet, useStyles } from "react-native-unistyles"
import { useAuth } from "./auth-context"
import { View } from "./components/view"
import HomeScreen from "./screens/home-screen"
import { NewContactScreen } from "./screens/new-contact-screen"
import SigninScreen from "./screens/signin-screen"

const Stack = createNativeStackNavigator()

export function RootApp() {
  const { isLoading, user, isSignOut, signOut } = useAuth()
  const { styles, theme } = useStyles(stylesheet)

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleStyle: {
            fontFamily: "Poppins",
            fontWeight: "500",
            color: theme.color.textTitle,
          },
        }}
      >
        {user ? (
          <Stack.Group>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={({ navigation }) => ({
                title: "Contacts",
                headerRight: () => (
                  <Button
                    title="Add"
                    onPress={() => navigation.navigate("NewContact")}
                    color={theme.color.textPrimary}
                  />
                ),
                headerLeft: () => (
                  <Button title="Sign out" onPress={() => signOut()} />
                ),
              })}
            />

            <Stack.Screen
              name="NewContact"
              component={NewContactScreen}
              options={{
                title: "New Contact",
                presentation: "modal",
              }}
            />
          </Stack.Group>
        ) : (
          <Stack.Screen
            name="SignIn"
            component={SigninScreen}
            options={{
              title: "Sign in",
              animationTypeForReplace: isSignOut ? "pop" : "push",
              headerShown: false,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const stylesheet = createStyleSheet(() => ({
  loading: {
    alignItems: "center",
    justifyContent: "center",
  },
}))
