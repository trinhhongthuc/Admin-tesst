import firebase, { auth, db } from "firebase/config";
export const addDocument = (collection, data) => {
  const query = db.collection(collection);
  let dataSaveCode = {};
  query
    .add({
      ...data,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then((res) => {
      if (res) dataSaveCode = res;
    })
    .catch((err) => {
      console.log(err);
    });

  return dataSaveCode;
};
