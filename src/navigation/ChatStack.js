import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ChatListScreen, ChatScreen, ChatDescriptionScreen, ChatSearchScreen } from '../screens'

const Stack = createNativeStackNavigator()

const ChatStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      animation: 'slide_from_right',
      headerShown: false,
      headerBackTitleVisible: false
    }} >
      <Stack.Screen name='ChatListScreen' component={ChatListScreen} />
      <Stack.Screen name='ChatScreen' component={ChatScreen} />
      <Stack.Screen name='ChatDescriptionScreen' component={ChatDescriptionScreen} />
      <Stack.Screen name='ChatSearchScreen' component={ChatSearchScreen} />
    </Stack.Navigator>
  )
}

export default ChatStack