import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';

const firebaseConfig = {
  // COLE AQUI as suas credenciais do passo 4.2
  apiKey: "AIzaSyA7SJLlmUdYk-zGfSN3w65Ds8Sjax_LIiA",
  authDomain: "cairn-generator.firebaseapp.com",
  projectId: "cairn-generator",
  storageBucket: "cairn-generator.firebasestorage.app",
  messagingSenderId: "716096398325",
  appId: "1:716096398325:web:cf0ae806be406ef70536bc"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export async function loginAnonimo() {
  try {
    const resultado = await signInAnonymously(auth);
    return resultado.user.uid;
  } catch (erro) {
    console.error("Erro no login:", erro);
    return null;
  }
}