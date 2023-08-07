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
import AsyncStorage from '@react-native-async-storage/async-storage';

// type = 'setting' | 'confirm' | 'resetting'

const PinCodeModal = ({
    actionFuc,
    type = "setting"
}) => {

    const [modalState, setModalState] = useRecoilState(pinCodeState);
    const [pincodeValue, setPinCodeValue] = useState([null, null, null, null]);
    const [copyPinCode, setCopyPinCode] = useState([]);
    const [alertText, setAlertText] = useState({
        text: "핀코드를 입력 해주세요",
        color: COLORS.white
    })

    useEffect(() => {
        if (pincodeValue.join('').length === 4) {
            actionPinCode();
        }
    }, [pincodeValue])

    // 핀코드 입력 시 실행 함수
    const pressPinCode = (val) => {
        const newPincodeValue = [...pincodeValue];
        console.log(val);
        if (val !== 'back') {
            const nullIndex = newPincodeValue.findIndex((item) => item === null);
            if (nullIndex !== -1) {
                newPincodeValue[nullIndex] = val;
                setPinCodeValue(newPincodeValue);
            }
        } else {
            for (let i = 0; i < newPincodeValue.length; i++) {
                if (newPincodeValue[i] === null && typeof newPincodeValue[i - 1] === 'string') {
                    newPincodeValue[i - 1] = null;
                    setPinCodeValue(newPincodeValue);
                    break;
                }
            }
        }
    }

    // 핀코드 입력이 완료되면 실행되야 할 함수
    const actionPinCode = async () => {
        // 새롭게 생성일 때
        if (type === 'setting') {
            if (copyPinCode.length === 0) {
                setTimeout(() => {
                    setCopyPinCode(pincodeValue);
                    setPinCodeValue([null, null, null, null]);
                    setAlertText({
                        ...alertText,
                        text: "한번 더 입력해주세요"
                    })
                }, 200)
            } else {
                if (pincodeValue.join('') === copyPinCode.join('')) {
                    setAlertText({
                        text: "저장 되었습니다",
                        color: COLORS.success
                    })
                    setTimeout(() => {
                        actionFuc(pincodeValue.join(''))
                    }, 200)
                } else {
                    setCopyPinCode([]);
                    setPinCodeValue([null, null, null, null]);
                    setAlertText({
                        color: COLORS.red,
                        text: "일치하지 않습니다. 다시 입력해주세요"
                    })
                }
            }
        }

        // 확인 일 때
        if (type === 'confirm') {
            const userPinCode = await AsyncStorage.getItem('pincode');

            if (pincodeValue.join('') === userPinCode) {
                setAlertText({
                    color: COLORS.success,
                    text: "확인 되었습니다"
                })
                setTimeout(() => {
                    actionFuc();
                }, 200)
            } else {
                setPinCodeValue([null, null, null, null]);
                setAlertText({
                    color: COLORS.red,
                    text: "일치하지 않습니다. 다시 입력해주세요"
                })
            }
        }
    }



    return (
        <Modal
            isVisible={modalState}
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            animationInTiming={1000}
            style={{
                margin: 0,
            }}
            onModalHide={() => {
                setPinCodeValue([null, null, null, null]);
                setCopyPinCode([]);
                setAlertText({
                    color: COLORS.white,
                    text: "핀코드를 입력해주세요"
                })
            }}
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
                        <CustomText
                            text={alertText.text}
                            color={alertText.color}
                        />
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
    justify-content: center;
    align-items: center;
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