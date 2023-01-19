import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
  if (!value) return;

  try {
    const json = typeof value !== 'string' ? JSON.stringify(value) : value;

    await AsyncStorage.setItem(key,json);

  } catch (error) {
    console.error(error);
  }
};

export const getStoredData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (!value) {
      return;
    } else {
      const json = typeof value !== 'string' ? JSON.parse(value) : value;
      return json
    }
  } catch (error) {
    console.error(error);
  }
};
