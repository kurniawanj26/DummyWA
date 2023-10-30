import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomHeader from '../components/CustomHeader'
import { UserGroupIcon, VideoCameraIcon, SearchIcon, PhoneIcon, UserIcon } from 'react-native-heroicons/solid';

const ChatDescriptionScreen = ({ route, navigation }) => {

  const { name, type, chatID } = route.params;

  return (
    <SafeAreaView>
      <CustomHeader disabled={true} goBack title={type === 'dm' ? 'Contact Info' : 'Group Info'} />
      <View style={styles.content}>
        {type === 'dm' ? <UserIcon size={50} /> : <UserGroupIcon size={50} />}

        <Text>{name}</Text>

        <View style={styles.icons}>
          <TouchableOpacity disabled style={styles.iconCard}>
            <VideoCameraIcon size={30} color='grey' />
            <Text>Video</Text>
          </TouchableOpacity>
          <TouchableOpacity disabled style={[styles.iconCard, { marginHorizontal: 15 }]}>
            <PhoneIcon size={30} color='grey' />
            <Text>Audio</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ChatSearchScreen', { chatID: chatID })} style={styles.iconCard}>
            <SearchIcon size={30} />
            <Text>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ChatDescriptionScreen

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    paddingVertical: 10
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    alignItems: 'center',
    paddingVertical: 10
  },
  iconCard: {
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
    width: '20%'
  }
})