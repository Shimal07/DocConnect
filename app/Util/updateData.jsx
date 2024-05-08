import { db, updateDoc, doc } from './../../firebase';

const updateData = async (collectionName, id, newData, refreshDataList) => {
  try {
    await updateDoc(doc(db, collectionName, id), newData);
    console.log('Document updated successfully:', id);
    if (refreshDataList) {
      refreshDataList();
    }
  } catch (error) {
    console.error('Error updating document:', error);
  }
};

export default updateData;
