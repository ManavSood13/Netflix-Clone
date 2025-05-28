import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyBnFdDLohqR1i9ECAwFjrWt3SCBu6guIfI",
  authDomain: "netflix-clone-6affd.firebaseapp.com",
  projectId: "netflix-clone-6affd",
  storageBucket: "netflix-clone-6affd.firebasestorage.app",
  messagingSenderId: "815069633146",
  appId: "1:815069633146:web:92e5393692cbb8890639c3"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    })
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const login = async (email, password)=>{
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const logout =  ()=>{
  signOut(auth);
}

export {auth , db, login, signup, logout}