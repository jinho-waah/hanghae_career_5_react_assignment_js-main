import { db } from '@/firebase';
import {
  collection,
  doc,
  runTransaction,
  serverTimestamp,
} from 'firebase/firestore';

export const makePurchase = async (purchaseData, userId, cartData) => {
  try {
    await runTransaction(db, async (transaction) => {
      if (!cartData || cartData.length === 0) {
        throw new Error('장바구니가 비어 있습니다.');
      }

      const purchasesRef = collection(db, 'purchases');
      const newPurchaseRef = doc(purchasesRef);

      const cartItemDTOs = cartData.map((item) => ({
        productId: item.id,
        quantity: item.count,
        price: item.price,
      }));

      const newPurchaseData = {
        ...purchaseData,
        userId,
        createdAt: serverTimestamp(),
        status: 'pending',
        items: cartItemDTOs,
      };

      transaction.set(newPurchaseRef, newPurchaseData);
    });
  } catch (error) {
    console.error('Error making purchase: ', error);
    throw error;
  }
};
