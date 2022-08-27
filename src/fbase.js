import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
initializeApp(firebaseConfig);

/**
 * Auth
 */
export const auth = getAuth();

export function registerUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function loginWithSocial(social) {
  let provider;
  if (social === "google") {
    provider = new GoogleAuthProvider();
  } else if (social === "github") {
    provider = new GithubAuthProvider();
  }
  return signInWithPopup(auth, provider);
}

export function logout() {
  return signOut(auth);
}

/**
 * DB
 */
export const dbService = getFirestore();

export function addNewNweet(nweet, attachmentUrl, creatorId) {
  return addDoc(collection(dbService, "nweets"), {
    text: nweet,
    createdAt: Date.now(),
    creatorId: creatorId,
    attachmentUrl: attachmentUrl,
  });
}

export function deleteNweet(nweetId) {
  const nweetTextRef = doc(dbService, "nweets", `${nweetId}`);
  deleteDoc(nweetTextRef);
}

export function updateNweet(nweetId, nweetText) {
  const nweetTextRef = doc(dbService, "nweets", `${nweetId}`);
  updateDoc(nweetTextRef, { text: nweetText });
}

/**
 * File
 */
export async function uploadAttachment(uid, attachment) {
  const storageService = getStorage();
  const attachmentRef = ref(storageService, `${uid}/${v4()}`);
  await uploadString(attachmentRef, attachment, "data_url");
  return await getDownloadURL(ref(storageService, attachmentRef));
}

export function deleteAttachment(attachmentUrl) {
  if (attachmentUrl !== "") {
    const storageService = getStorage();
    const attachmentRef = ref(storageService, attachmentUrl);
    deleteObject(attachmentRef);
  }
}
