import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import { useRecoilState } from 'recoil';
import { pinCodeState } from '../../recoil/control';
import { styled } from 'styled-components';
import { COLORS } from '../../asset/colors';
import VirtualKeyboard from 'react-native-virtual-keyboard';
import { ht, wt } from '../../../responsive/responsive';
import { SafeAreaView, StatusBar } from 'react-native';
import CustomSafeAreaView from '../CustomSafeAreaView';
import CustomStatusBar from '../CustomStatusBar';
import CustomText from '../CustomText';

// type = 'setting' | 'confirm' | 'resetting'

const PinCodeModal = ({
    actionFuc,
    type = "setting"
}) => {

    const [modalState, setModalState] = useRecoilState(pinCodeState);
    const [pincodeValue, setPinCodeValue] = useState([null, null, null, null]);
    const [copyPinCode, setCopyPinCode] = useState([]);

    useEffect(() => {
        console.log(pincodeValue);
    }, [pincodeValue])

    // 핀코드 입력 시 실행 함수
    const pressPinCode = (val) => {
        const newPincodeValue = [...pincodeValue];
        const nullIndex = newPincodeValue.findIndex((item) => item === null);
        if (nullIndex !== -1) {
            newPincodeValue[nullIndex] = val;
            setPinCodeValue(newPincodeValue);
        }
    }

    // 핀코드 입력이 완료되면 실행되야 할 함수
    const actionPinCode = async () => {
        if (type === 'setting') {

        }
    }



    return (
        <Modal
            isVisible={modalState}
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            style={{
                margin: 0,
            }}
            onModalHide={() => setPinCodeValue([null, null, null, null])}
            backdropOpacity={1}
        >
            <CustomSafeAreaView backColor={COLORS.black}>
                <ModalView>
                    <ResultView>
                        <CustomStatusBar
                            title={'핀코드 입력'}
                            type={'modal'}
                            closeFuc={() => setModalState(false)}
                            back={true}
                        />
                        <PinCodeResultView>
                            {
                                pincodeValue.map((val, idx) => (
                                    <PinCodeResultBox
                                        key={idx}
                                    >
                                        <CustomText
                                            text={'*'}
                                            size={40}
                                            color={
                                                !val
                                                    ? COLORS.gray
                                                    : COLORS.white
                                            }
                                        />
                                    </PinCodeResultBox>
                                ))
                            }
                        </PinCodeResultView>
                    </ResultView>
                    <PressView>
                        <VirtualKeyboard
                            onPress={val => pressPinCode(val)}
                            color={COLORS.white}
                            pressMode="char"
                            cellStyle={{
                                borderColor: COLORS.white,
                                height: ht(300),
                            }}
                            textStyle={{
                                fontFamily: "Pretendard-Bold"
                            }}
                        />
                    </PressView>
                </ModalView>
            </CustomSafeAreaView>
        </Modal>
    )
}

const ModalView = styled.View`
    flex: 1;
    background-color: ${COLORS.black};
`

const ResultView = styled.View`
    flex: 1;
`

const PinCodeResultView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`

const PressView = styled.View`
    width: 100%;
    height: ${ht(1800)}px;
    justify-content: center;
`

const PinCodeResultBox = styled.View`
    width: ${wt(200)}px;
    height: ${ht(200)}px;
    justify-content: center;
    align-items: center;
`

export default PinCodeModal