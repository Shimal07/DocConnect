
import { query, where, getDoc, collection } from "firebase/firestore";
import { db } from './../../firebase'; // Import your Firestore instance

export async function getFullNameByEmail(email) {
  const userQuery = query(collection(db, "users"), where("email", "==", email));

  try {
    const querySnapshot = await getDoc(userQuery);
    if (querySnapshot.exists()) {
      const fullName = querySnapshot.data().fullName;
      return fullName;
    } else {
      console.log("No user found with the provided email!");
      return null;
    }
  } catch (error) {
    console.error("Error getting user document:", error);
    return null;
  }
}
