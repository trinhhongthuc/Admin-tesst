import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth, db } from "../firebase/config";

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const history = useHistory();

  const [listMenu, setListMenu] = React.useState([]);

  React.useEffect(() => {
    const unSubscibed = auth.onAuthStateChanged((user) => {
      if (user) {
        const { uid } = user;
        let collectionRef = db.collection("users");
        collectionRef.onSnapshot((snapshot) => {
          const documents = snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              id: doc.id,
            };
          });
          const dataUser = documents.filter((item) => item.uid === uid);
          setUser(dataUser[0]);
          return;
        });
      } else {
        history.push("/login");
      }
      // reset user info
      setUser("");
    });

    // clean function
    return () => {
      unSubscibed();
    };
  }, [history]);

  React.useEffect(() => {
    db.collection("Menu")
      .orderBy("createdAt", "desc")
      .get()
      .then((snapshot) => {
        let dataMenu = snapshot.docs.map((doc) => ({
          nameMenu: doc.data().nameMenu,
          status: doc.data().status,
          parentId: doc.data().parentId,
          menuId: doc.data().menuId,
          id: doc.id,
          image: doc.data().image,
        }));
        setListMenu(dataMenu);
      })
      .catch((err) => {
        console.log("Đây là Err get all Menu", err);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, listMenu, setListMenu }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
