import { db, collection, addDoc } from './../../firebase';

const addData = async (collectionName, data, refreshDataList) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log('Data added successfully with ID: ', docRef.id);
    if (refreshDataList) {
      refreshDataList();
    }
  } catch (error) {
    console.error('Error adding data:', error);
  }
};

export default addData;
