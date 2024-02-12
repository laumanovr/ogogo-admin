export const getItem = (key: string) => {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (error) {
    throw Error('Error getting data from localstorage, ' + error)
  }
}

export const setItem = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    throw Error('Error saving data from localstorage, ' + error)
  }
}

export const removeItem = (key: string) => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    throw Error('Error removing data from localstorage, ' + error)
  }
}
