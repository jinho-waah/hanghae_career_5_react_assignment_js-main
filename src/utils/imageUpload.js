import { auth, storage } from '@/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const uploadImage = async (file) => {
  if (!file) return null;
  const user = auth.currentUser;

  if (!user) {
    throw new Error('User not authenticated');
  }

  const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
  const idToken = await user.getIdToken();

  const metadata = {
    customMetadata: {
      token: idToken,
    },
  };

  await uploadBytes(storageRef, file, metadata);
  return getDownloadURL(storageRef);
};
