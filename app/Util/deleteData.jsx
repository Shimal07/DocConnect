import { db, deleteDoc, doc } from './../../firebase';

const deleteData = async (collectionName, id, refreshDataList) => {
  try {
    await deleteDoc(doc(db, collectionName, id));
    console.log('Document deleted successfully:', id);
    // After deleting the document, refresh the data list
    if (refreshDataList) {
      refreshDataList();
    }
  } catch (error) {
    console.error('Error deleting document:', error);
  }
};

export default deleteData;
