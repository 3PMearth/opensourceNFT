import { firebaseDB } from './FireBaseInit';

class Repository {
    storeInfo(userId, info) {
        firebaseDB.ref(`info/${userId}/${info.id}`).set(info);
    }

    deleteInfo(userId, info) {
        firebaseDB.ref(`info/${userId}/${info.id}`).remove();
    }
    readInfo(userId, onUpdate) {
        const dbRef = firebaseDB.ref(`info/${userId}`);
        dbRef.on('value', snapshot => {
            const data = snapshot.val();
            data && onUpdate(data);
        })
        return dbRef.off;
    }
}
export default Repository;