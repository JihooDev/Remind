import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

const user_list = firestore().collection('user_list');

export const addUser = async (uid, user_name) => {
    try {
        await user_list.add({
            user_name,
            uid,
            time_stamp: moment().unix()
        })

        console.log('유저추가 성공');

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