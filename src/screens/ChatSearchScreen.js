import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import CustomHeader from '../components/CustomHeader'
import { SearchIcon } from 'react-native-heroicons/solid'
import { useGetFetchQuery } from '../hooks/useChat'

const ChatSearchScreen = ({ route }) => {

  const { chatID } = route.params

  const dataOriginal = useGetFetchQuery(['chats', chatID])
  const [dataForSearch, setDataForSearch] = useState(dataOriginal)
  const [noData, setNoData] = useState(false)


  function search(text) {
    let keyword = text.toLowerCase()
    let filteredChat = dataForSearch.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.toLocaleLowerCase().includes(keyword)))

    if (text === '' || !text) {
      setDataForSearch(dataOriginal)
      setNoData(false)
    } else if (!filteredChat.length) {
      setNoData(true)
    } else {
      setDataForSearch(filteredChat)
      setNoData(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title='Search' goBack />

      <View style={styles.searchBarContainer}>
        <View style={styles.inputContainer}>
          <SearchIcon />
          <TextInput
            style={styles.input}
            autoComplete='off'
            autoCorrect={false}
            returnKeyType='search'
            onChangeText={text => search(text)}
          />
        </View>
      </View>

      <ScrollView style={{ paddingHorizontal: 10 }}>
        {noData ? <Text style={styles.notFound}>Not found</Text> :
          dataForSearch.map((item, index) =>

            <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={[item.sender_type == 'friend' ? styles.bubbleFriend : styles.bubbleSelf]}>
                <Text style={item.sender_type == 'friend' ? styles.messageFriend : styles.messageSelf}>{item.message}</Text>
              </View>
            </View>
          )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default ChatSearchScreen

const styles = StyleSheet.create({
  input: {
    flex: 1,
    marginLeft: 5,
    height: 40
  },
  inputContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#E8E1D9',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchBarContainer: {
    padding: 5
  },
  container: {
    backgroundColor: 'FFF',
    flex: 1
  },
  bubbleSelf: {
    marginBottom: 15,
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    borderRadius: 10,
    maxWidth: '60%',
    marginLeft: 'auto',
    padding: 5
  },
  bubbleFriend: {
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#CDFAD5',
    maxWidth: '60%',
    padding: 5
  },
  notFound: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500'
  }
})