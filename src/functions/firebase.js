import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

const user_list = firestore().collection('user_list');
const folder = firestore().collection('folder');

// 회원가입
export const addUser = async (uid, user_name) => {
    try {
        await user_list.doc(uid).set({
            uid,
            user_name,
            date_created: moment().unix(),
            folder: []
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
export const getUser = async (uid) => {
    const query = await user_list.where('uid', '==', uid).get();

    console.log(query);

    // const userData = query.docs.map(doc => doc.data());

    // return userData[0];
}