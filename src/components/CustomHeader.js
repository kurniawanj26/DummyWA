import { Platform, StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import { ChevronLeftIcon } from "react-native-heroicons/solid"
import { useNavigation } from '@react-navigation/native'

const CustomHeader = ({ goBack, title, type, disabled, chatID }) => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <View style={{ width: 40 }}>
        {goBack ?
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size={40} />
          </TouchableOpacity> : <View style={{ height: 40 }} />
        }
      </View>

      {/* TITLE */}
      <TouchableOpacity
        disabled={disabled}
        onPress={() => navigation.navigate('ChatDescriptionScreen', { name: title, type: type, chatID: chatID })}
        style={styles.containerText}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>

      <View style={{ width: 40 }} />
    </View>
  )
}

export default CustomHeader

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: Platform.OS == 'android' ? 20 : 0,
    borderBottomColor: '#E8E2E2',
    borderBottomWidth: 1
  },
  containerText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000'
  }
})