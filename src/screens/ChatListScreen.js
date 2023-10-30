import { ActivityIndicator, Dimensions, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { getChats } from '../api/chat';
import { useQuery } from '@tanstack/react-query';
import { UserCircleIcon, UserGroupIcon } from 'react-native-heroicons/solid';
import CustomHeader from '../components/CustomHeader';

const ChatListScreen = ({ navigation }) => {

  const chatQuery = useQuery({
    queryKey: ['chats'],
    queryFn: getChats
  })

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('ChatScreen', { chatID: item.id, name: item.name, type: item.type })}
      >
        {item.type === 'dm' ?
          <UserCircleIcon size={40} color={'#1F8A70'} /> :
          <UserGroupIcon size={40} color={'#1F8A70'} />
        }

        <View style={styles.text}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.message}>{item.latest_message}</Text>
        </View>
      </TouchableOpacity >)
  }

  return (
    <SafeAreaView>
      <CustomHeader title='My Messages' />

      {chatQuery.isLoading && <ActivityIndicator />}
      {chatQuery.isError && <Text>Error</Text>}

      <FlatList
        data={chatQuery.data}
        renderItem={renderItem}
        estimatedItemSize={10}
        contentContainerStyle={{ height: '100%' }}
        initialNumToRender={10}
      />
    </SafeAreaView>
  )
}

export default ChatListScreen

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E2E2'
  },
  text: {
    marginLeft: 15
  },
  name: {
    fontSize: 16,
    fontWeight: '700'
  },
  message: {
    color: '#7D7C7C'
  }
})