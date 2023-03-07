import {
  Auth,
  createUserWithEmailAndPassword,
  deleteUser,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateEmail,
  updatePassword,
  updateProfile,
  User,
  UserCredential,
} from "firebase/auth";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  QuerySnapshot,
  setDoc,
  where,
} from "firebase/firestore";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Auth as auth, db } from "./FirebaseConfig";

export interface FirebaseProviderProps {
  children?: ReactNode;
}

export interface AuthContextModel {
  auth: Auth;
  currentUser: User | null;
  // // signIn: (email: string, password: string) => Promise<UserCredential>;
  // // signUp: (email: string, password: string) => Promise<UserCredential>;
  // // sendPasswordResetEmail?: (email: string) => Promise<void>;
  getUserData: (
    database: string | undefined,
    userTable: string
  ) => Promise<DocumentData | null>;
  queryUserData: (
    database: string,
    fieldName: string,
    queryValue: string
  ) => Promise<QuerySnapshot<DocumentData>>;
  updateUserData: (
    userEmail: string,
    userdataNew: {},
    merge: boolean
  ) => Promise<void>;
  anonymousLogin: () => Promise<UserCredential>;
  signOut: () => Promise<void>;
  deleteAccount: () => Promise<void> | null;
  updateDisplayName: (name: string) => Promise<void | null>;
  updatePhotoUrl: (url: string) => Promise<void | null>;
}

const FirebaseContext = createContext<AuthContextModel>({} as AuthContextModel);

export function useFirebase() {
  return useContext(FirebaseContext);
}

export function FirebaseProvider({
  children,
}: FirebaseProviderProps): JSX.Element {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const GoogleProvider = new GoogleAuthProvider();

  async function getUserData(
    database: string | undefined,
    userTable: string
  ): Promise<DocumentData | null> {
    const userInfoCollection = doc(
      db,
      database ? database : "UserInfo",
      userTable
    );
    const docSnap = await getDoc(userInfoCollection);
    if (docSnap.exists()) {
      const userData = docSnap?.data();
      return userData;
    } else {
      return null;
    }
  }

  async function queryUserData(
    database: string,
    fieldName: string,
    queryValue: string
  ): Promise<QuerySnapshot<DocumentData>> {
    const userInfoCollection = collection(db, database ? database : "UserInfo");
    const q = query(userInfoCollection, where(fieldName, "==", queryValue));
    const querySnapshot = await getDocs(q);
    return querySnapshot;
  }

  async function updateUserData(
    userEmail: string,
    userdataNew: {},
    merge: boolean
  ) {
    const userInfoCollection = doc(db, "UserInfo", userEmail);
    const docSnap = await getDoc(userInfoCollection);
    const userData = docSnap?.data();
    await setDoc(
      userInfoCollection,
      {
        ...userData,
        uid: currentUser?.uid,
        ...userdataNew,
      },
      { merge: merge ? true : false }
    );
  }

  // async function googleLogin(): Promise<UserCredential> {
  //   return await signInWithPopup(auth, GoogleProvider);
  // }

  function anonymousLogin(): Promise<UserCredential> {
    return signInAnonymously(auth);
  }

  // async function login(
  //   email: string,
  //   password: string
  // ): Promise<UserCredential> {
  //   return await signInWithEmailAndPassword(auth, email, password);
  // }

  // async function verifyEmail() {
  //   return currentUser && (await sendEmailVerification(currentUser));
  // }

  // function resetPassword(email: string) {
  //   return sendPasswordResetEmail(auth, email);
  // }

  async function signOut(): Promise<void> {
    return await auth.signOut();
  }

  function deleteAccount(): Promise<void> | null {
    return currentUser && deleteUser(currentUser);
  }

  // async function signUp(
  //   email: string,
  //   password: string
  // ): Promise<UserCredential> {
  //   return await createUserWithEmailAndPassword(auth, email, password);
  // }

  // function getUser() {
  //   return auth.currentUser;
  // }

  // async function updateUserPassword(password) {
  //   return currentUser && (await updatePassword(currentUser, password));
  // }

  async function updateDisplayName(name: string): Promise<void | null> {
    return (
      currentUser &&
      (await updateProfile(currentUser, {
        displayName: name,
      }))
    );
  }

  async function updatePhotoUrl(url: string): Promise<void | null> {
    return (
      currentUser &&
      (await updateProfile(currentUser, {
        photoURL: url,
      }))
    );
  }

  // async function updateEmailId(email: string) {
  //   return currentUser && (await updateEmail(currentUser, email));
  // }

  // function isAdmin() {
  //   return auth.currentUser?.getIdTokenResult().then((idTokenResult) => {
  //     if (!!idTokenResult.claims.admin) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   });
  // }

  // function isEditor() {}

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    auth,
    currentUser,
    getUserData,
    queryUserData,
    updateUserData,
    anonymousLogin,
    signOut,
    updateDisplayName,
    updatePhotoUrl,
    deleteAccount,
    // updateEmailId,
    // getUser,
    // login,
    // signOut,
    // signUp,
    // googleLogin,
    // resetPassword,
    // verifyEmail,
    // updateUserPassword,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {!loading && children}
    </FirebaseContext.Provider>
  );
}
