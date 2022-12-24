import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyA2F1ji4i5hJsmXgiQpPAShTfA_P-7Y9ZU",
  authDomain: "bookify-d2844.firebaseapp.com",
  projectId: "bookify-d2844",
  storageBucket: "bookify-d2844.appspot.com",
  messagingSenderId: "387540679232",
  appId: "1:387540679232:web:27bc408dae3499da72fda5",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
// Auth Initialize
const FirebaseAuth = getAuth(app);
// google Initialize
const googleProvider = new GoogleAuthProvider();
// Firestore Initialize
const firestore = getFirestore(app);
// firebase Storage Initialize
const storage = getStorage(app);

// useFirebase hook for accessing firebase context
export const useFirebase = () => useContext(FirebaseContext);

// FirebaseProvider for wrapping the app with firebase context provider
export const FirebaseProvider = ({ children }) => {
  const [User, setUser] = useState(true);

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    // console.log("Firebase Initialized");
  }, []);

  // FireStore Methods
  const addBook = async (book) => {
    const { name, price, image, ISBN } = book;
    const imageRef = ref(storage, `images/upload/${Date.now()}-${image.name}`);
    const uploadResult = await uploadBytes(imageRef, image);
    return await addDoc(collection(firestore, "books"), {
      name,
      price,
      ISBN,
      imageUrl: uploadResult.ref.fullPath,
      userId: User.uid,
      userEmail: User.email,
      displayName: User.displayName,
      photoURL: User.photoURL,
    });
  };

  const allBooks = () => {
    return getDocs(collection(firestore, "books"));
  };
  const getBookImage = (path) => {
    return getDownloadURL(ref(storage, path));
  };
  const getBook = (id) => {
    return getDoc(doc(firestore, "books", id));
  };

  // ordered Methods
  const addOrdered = (id, quantity) => {
    const orderCollection = collection(firestore, "books", id, "orders");
    return addDoc(orderCollection, {
      userId: User.uid,
      userEmail: User.email,
      displayName: User.displayName,
      photoURL: User.photoURL,
      quantity: Number(quantity),
    });
  };
  const fetchMyBooks = async(uid) => {
    const collectionRef = collection(firestore, "books");
    const  q = query(collectionRef, where("userId", "==", uid));
    const response = await getDocs(q);
    return response;
  };
  const getMyOrders = async (id) => {
    const orderCollection = collection(firestore, "books", id, "orders");
    const response = await getDocs(orderCollection);
    return response;
  };



  // For Firebase Authentication Methods
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(FirebaseAuth, email, password);
  };
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(FirebaseAuth, email, password);
  };
  const signInWithGoogle = () => signInWithPopup(FirebaseAuth, googleProvider);

  const logout = () => signOut(FirebaseAuth);

  const isLoggedIn = User ? true : false;

  return (
    <FirebaseContext.Provider
      value={{
        User,
        signUp,
        signIn,
        signInWithGoogle,
        isLoggedIn,
        logout,
        addBook,
        allBooks,
        getBookImage,
        getBook,
        addOrdered,
        fetchMyBooks,
        getMyOrders,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
