const API_URL = 'https://private-947c0-jayadikurniawan.apiary-mock.com'

export const getChats = async () => {
  const data = await fetch(`${API_URL}/chats`)
  const result = await data.json()
  return result.data
}

export const getChatContent = async (id) => {
  const data = await fetch(`${API_URL}/chats/${id}`)
  const result = await data.json()
  return result.data.messages
}