import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

const user_list = firestore().collection('user_list');
const folder = firestore().collection('folder');

// 회원가입
export const addUser = async (uid, user_name, pinCode) => {
    try {
        await user_list.doc(uid).set({
            uid,
            user_name,
            date_created: moment().unix(),
            folder: [],
            pin_code: pinCode,
            plan: [],
            active: true
        })

        return {
            status: true,
        }
    } catch (error) {
        console.error(error, '유저 추가 실패');

        return {
            status: false,
            error_message: error
        }
    }
}

// 유저가 로그인 했을 때 데이터 가져오기
export const getUser = async (uid, setLoading) => {
    try {
        setLoading(true);
        const query = await user_list.where('uid', '==', uid).get();

        const userData = query.docs.map(doc => doc.data());

        return {
            status: true,
            data: userData[0],
        };
    } catch (error) {
        return {
            status: false,
            error_message: error
        }
    } finally {
        setLoading(false);
    }
}

// 폴더 추가
export const createFolderPost = async (uid, data, setLoading) => {
    try {
        setLoading(true);

        const documentRef = user_list.doc(uid);
        const doc = await documentRef.get();
        const targetArray = doc.data()['folder'];

        targetArray.push(data);

        const updatedData = { ['folder']: targetArray };

        await documentRef.update(updatedData);

        return {
            status: true
        }
    } catch (error) {
        return {
            status: false,
            error_message: error
        }
    } finally {
        setLoading(false);
    }
}

// 메모 추가
export const createMemoPost = async (folderId, uid, postData) => {
    try {
        await user_list.where('uid', '==', uid).get().then((query) => {
            query.forEach(doc => {
                const folderData = doc.data().folder;


                const updateFolder = folderData.map(item => {
                    if (item.id === folderId) {

                        return {
                            ...item,
                            content: [...item.content, postData]
                        }
                    }

                    return item;
                })

                user_list.doc(uid).update({
                    folder: updateFolder
                })
            })
        })

        return {
            status: true
        }
    } catch (error) {
        console.error(error, '메모 추가 실패');

        return {
            status: false,
            error_message: error
        }
    }
}

// 메모 삭제 함수
export const deleteMemo = async (folderId, itemIdsToDelete) => {
    try {
        const uid = await AsyncStorage.getItem('uid');

        const batch = firestore().batch();
        console.log(batch);
        const userRef = user_list.doc(uid);
        const userDoc = await userRef.get();

        const folderData = userDoc.data().folder;

        const updateFolder = folderData.map((item) => {
            if (item.id === folderId) {
                item.content = item.content.filter(
                    (contentItem) => !itemIdsToDelete.includes(contentItem.id)
                );
            }
            return item;
        });

        batch.update(userRef, { folder: updateFolder });

        await batch.commit();

        return {
            status: true
        }
    } catch (error) {
        console.error(error, '메모 삭제 실패');

        return {
            status: false,
            error_message: error
        };
    }
};


// 메모 추가 이후 데이터 다시 불러오기
export const getRefleshMemoData = async (folderId, uid) => {
    try {
        let targetFolder;

        await user_list.where('uid', '==', uid).get().then((query) => {
            query.forEach(doc => {
                const folderData = doc.data().folder;

                targetFolder = folderData.filter(item => item.id === folderId)[0];

            })
        })

        return {
            status: true,
            data: targetFolder
        }
    } catch (error) {
        console.error(error, '메모 추가 이후 데이터 불러오기 실패');
        return {
            status: false,
            error_message: error
        }
    }
}

// 메모 수정 함수
export const editMemoPost = async (folderId, postData) => {
    try {
        const uid = await AsyncStorage.getItem('uid');
        await user_list.where('uid', '==', uid).get().then((query) => {
            query.forEach(doc => {
                const folderData = doc.data().folder;


                const updateFolder = folderData.map(item => {
                    if (item.id === folderId) {
                        item.content = item.content.map(contentValue => {
                            if (contentValue.id === postData.id) {
                                return postData;
                            }
                        })
                    }

                    return item;
                })

                user_list.doc(uid).update({
                    folder: updateFolder
                })
            })
        })

        return {
            status: true
        }
    } catch (error) {
        console.error(error, '메모 추가 실패');

        return {
            status: false,
            error_message: error
        }
    }
}

// 계획 추가
export const createPlan = async (postData) => {
    try {
        const uid = await AsyncStorage.getItem('uid');
        await user_list.where('uid', '==', uid).get().then((query) => {
            query.forEach(doc => {
                const planData = doc.data().plan;


                const updateFolder = [...planData, postData];

                console.log(updateFolder);

                user_list.doc(uid).update({
                    plan: updateFolder
                })
            })
        })

        return {
            status: true
        }
    } catch (error) {
        console.error(error, '메모 추가 실패');

        return {
            status: false,
            error_message: error
        }
    }
}

// 해당 날짜의 계획을 가져오는 함수
export const getServerPlan = async (date) => {
    try {
        const uid = await AsyncStorage.getItem('uid');
        let planList = [];

        await user_list.where('uid', '==', uid).get().then((query) => {
            query.forEach(doc => {
                const planData = doc.data().plan;

                planList = planData.filter(dataValue => dataValue.date === date);
            })
        })

        return {
            status: true,
            data: planList
        }

    } catch (error) {
        console.error(error, '계획 가져오기 실패');
        return {
            status: false,
            error_message: error
        }
    }
}

// 계획 삭제 함수
export const deleteServerPlan = async (data, loading) => {
    try {
        loading(true);
        const uid = await AsyncStorage.getItem('uid');
        await user_list.where('uid', '==', uid).get().then((query) => {
            query.forEach(doc => {
                const planData = doc.data().plan;

                const updateFolder = planData.filter(planValue => planValue.id !== data.id);

                console.log(updateFolder);

                user_list.doc(uid).update({
                    plan: updateFolder
                })
            })
        })

        return {
            status: true
        }
    } catch (error) {
        return {
            status: false,
            error_message: error
        }
    } finally {
        loading(false);
    }
}

// 핀코드 재설정
export const resetPinCode = async (value) => {
    try {
        const uid = await AsyncStorage.getItem('uid');

        await user_list.where('uid', '==', uid).get().then((query) => {
            query.forEach(doc => {
                user_list.doc(uid).update({
                    pin_code: value
                })
            })
        })

        return {
            status: true
        }
    } catch (error) {
        console.error(error);
        return {
            status: false,
            error_message: error
        }
    }
}

// 폴더 잠금/해제 함수
export const lockFolder = async (value, id) => {
    try {
        const uid = await AsyncStorage.getItem('uid');

        await user_list.where('uid', '==', uid).get().then((query) => {
            query.forEach(doc => {
                const folderData = doc.data().folder;

                const updateFolder = folderData.map(item => {
                    if (item.id === id) {

                        return {
                            ...item,
                            security: value
                        }
                    }

                    return item;
                })

                user_list.doc(uid).update({
                    folder: updateFolder
                })
            })
        })

        return {
            status: true
        }
    } catch (error) {
        console.error(error);
        return {
            status: false,
            error_message: error
        }
    }
}

// 계획 삭제 함수
export const deleteFolder = async (data, loading) => {
    try {
        loading(true);
        const uid = await AsyncStorage.getItem('uid');
        await user_list.where('uid', '==', uid).get().then((query) => {
            query.forEach(doc => {
                const folder = doc.data().folder;

                const updateFolder = folder.filter(folderValue => folderValue.id !== data.id);

                console.log(updateFolder);

                user_list.doc(uid).update({
                    folder: updateFolder
                })
            })
        })

        return {
            status: true
        }
    } catch (error) {
        console.error(error);
        return {
            status: false,
            error_message: error
        }
    } finally {
        loading(false);
    }
}

// 닉네임 변경 함수
export const resetNicName = async (value) => {
    try {
        const uid = await AsyncStorage.getItem('uid');

        await user_list.where('uid', '==', uid).get().then((query) => {
            query.forEach(doc => {
                user_list.doc(uid).update({
                    user_name: value
                })
            })
        })

        return {
            status: true
        }
    } catch (error) {
        console.error(error);
        return {
            status: false,
            error_message: error
        }
    }
}

// 유저 탈퇴 함수
export const userOutFuc = async () => {
    try {
        const uid = await AsyncStorage.getItem('uid');

        await user_list.where('uid', '==', uid).get().then((query) => {
            query.forEach(doc => {
                user_list.doc(uid).update({
                    active: false
                })
            })
        })

        return {
            status: true
        }
    } catch (error) {
        console.error(error);
        return {
            status: false,
            error_message: error
        }
    }
}

