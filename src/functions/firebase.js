import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

const user_list = firestore().collection('user_list');

export const addUser = async (uid, user_name) => {
    try {
        await user_list.doc(uid).set({
            uid,
            user_name,
            date_created: moment().unix()
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