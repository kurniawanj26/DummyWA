import { ActivityIndicator, Dimensions, FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getChatContent } from '../api/chat';
import { useQuery } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native-safe-area-context'
import { MailIcon, PaperAirplaneIcon } from 'react-native-heroicons/solid'
import CustomHeader from '../components/CustomHeader';


const emojis = ['👏🏻', '👍🏻', '🙃', '🥳', '❤️']

const ChatScreen = ({ navigation, route }) => {

  const { chatID, name, type } = route.params;

  const [chat, setChat] = useState([])
  const [text, setText] = useState('')
  const [showEmoji, setShowEmoji] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState()

  const chatQuery = useQuery({
    queryKey: ['chats', chatID],
    queryFn: () => getChatContent(chatID)
  })

  const handleSubmitText = () => {
    let data = {
      "message": text,
      "sender_type": "self"
    }

    if (!text) return

    setChat([...chat, data])
    setText('')
  }

  useEffect(() => {
    setChat(chatQuery.data)
  }, [chatQuery.data])

  const handleLongPress = (index) => {
    if (selectedMessage !== index) {
      setShowEmoji(true)
    } else if (selectedMessage === index && showEmoji === false) {
      setShowEmoji(true)
    } else {
      setShowEmoji(false)
    }
    setSelectedMessage(index)
  }

  const handleApplyEmoji = emoji => {
    // adding emoji to the message
    chat[selectedMessage].emoji = emoji
    setShowEmoji(false)
  }

  const renderEmojis = () => {
    return (
      emojis.map((item, index) =>
        <TouchableOpacity key={index} onPress={() => handleApplyEmoji(item)}>
          <Text style={styles.emoji}>{item}</Text>
        </TouchableOpacity>)
    )
  }

  const renderMessage = ({ item, index }) => {
    return (
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onLongPress={() => handleLongPress(index)} style={[item.sender_type == 'friend' ? styles.bubbleFriend : styles.bubbleSelf]}>
            <Text style={item.sender_type == 'friend' ? styles.messageFriend : styles.messageSelf}>{item.message}</Text>
          </TouchableOpacity>
          {item.emoji && <Text style={{ left: -20, top: 9 }}> {item.emoji}</Text>}
        </View>
        <View style={{ flexDirection: 'row' }}>
          {showEmoji && index === selectedMessage && item.sender_type === 'friend' && renderEmojis()}
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container} >
      <CustomHeader goBack title={name} type={type} chatID={chatID} />

      {chatQuery.isLoading && <ActivityIndicator style={{ marginTop: 10 }} />}
      {chatQuery.isError && <Text>Error</Text>}

      <FlatList
        data={chat}
        renderItem={renderMessage}
        extraData={chat}
        initialNumToRender={50}
        contentContainerStyle={styles.flatlistContent}
        showsVerticalScrollIndicator={false}
        inverted
      />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''}>
        <View style={[styles.textInputContainer]}>
          <TextInput
            autoCorrect={false}
            autoComplete='off'
            spellCheck={false}
            multiline
            style={styles.textInput}
            value={text}
            onChangeText={(text) => setText(text)}
          />
          <TouchableOpacity style={styles.send} onPress={handleSubmitText}>
            <PaperAirplaneIcon />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageFriend: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10
  },
  messageSelf: {
    textAlign: 'right',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  bubbleSelf: {
    marginBottom: 15,
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    borderRadius: 10,
    maxWidth: '60%',
    marginLeft: 'auto',
  },
  bubbleFriend: {
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#CDFAD5',
    maxWidth: '60%'
  },
  textInputContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderTopColor: '#E8E2E2',
    borderTopWidth: 1
  },
  textInput: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 5,
    borderRadius: 5,
    height: 40
  },
  send: {
    paddingHorizontal: 5
  },
  emoji: {
    marginHorizontal: 5,
    fontSize: 14,
    marginTop: -20
  },
  flatlistContent: {
    paddingHorizontal: 10,
    paddingBottom: 5,
    flexDirection: 'column-reverse'
  }
})