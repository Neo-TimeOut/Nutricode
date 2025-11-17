import { Stack } from 'expo-router';

export default function MainLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right', 
        gestureEnabled: true, 
        animationDuration: 3,
      }}
      
    >
      <Stack.Screen
        name="index"
        options={{
          animation: 'fade',
          animationDuration: 3,
        }}
      />

      <Stack.Screen
        name="(auth)/signup/page"
        options={{
          animation: 'slide_from_bottom', 
          animationDuration: 3,
        }}
      />

      <Stack.Screen
        name="(panel)/profile/page"
        options={{
          animation: 'slide_from_right', 
          animationDuration: 3
        }}
      />
    </Stack>
  );
}

