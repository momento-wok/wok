import { collection, getDocs } from 'firebase/firestore/lite';
import db from './db';

async function getMemories() {
  console.log("getMemories")
  const memoryDocs = await getDocs(collection(db, 'memory'));
  return memoryDocs.docs.map(doc => doc.data());
}

export { getMemories };
