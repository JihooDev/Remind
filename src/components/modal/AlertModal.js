import React from 'react'
import Modal from 'react-native-modal';
import { useRecoilState } from 'recoil';
import { modalOpen } from '../../recoil/control';
import CustomText from '../CustomText';

const AlertModal = () => {
    const [modalState, setModalState] = useRecoilState(modalOpen);

    return (
        <Modal
            isVisible={modalState}
            onBackdropPress={() => setModalState(false)}
        >
            <CustomText text={'123'} />
        </Modal>
    )
}

export default AlertModal