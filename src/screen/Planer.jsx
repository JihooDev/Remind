import React, { useRef, useState } from 'react'
import CustomSafeAreaView from '../components/CustomSafeAreaView'
import { COLORS } from '../asset/colors'
import CustomStatusBar from '../components/CustomStatusBar'
import CalendarView from '../components/CalendarView'
import { styled } from 'styled-components'
import { ht, wt } from '../../responsive/responsive'
import moment from 'moment'
import CustomText from '../components/CustomText'
import { MotiView } from 'moti'
import { ICON } from '../asset/asset'
import { Image } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import CreatePlanForm from '../components/CreatePlanForm'

const Planer = () => {

    const [selected, setSelected] = useState(moment().format('YYYY-MM-DD'));
    const [datePlanList, setDatePlanList] = useState([]);
    const createPlanModal = useRef(null);

    const closeModal = () => {
        createPlanModal.current.close();
    }

    return (
        <CustomSafeAreaView backColor={COLORS.black}>
            <RBSheet
                ref={createPlanModal}
                closeOnDragDown={true}
                height={ht(1500)}
                customStyles={{
                    draggableIcon: {
                        backgroundColor: COLORS.white
                    },
                    container: {
                        backgroundColor: COLORS.black,
                        borderRadius: wt(80),
                        paddingHorizontal: wt(50),
                        paddingVertical: ht(50)
                    }
                }}
            >
                <CreatePlanForm
                    selected={selected}
                    closeModal={closeModal}
                />
            </RBSheet>
            <CustomStatusBar
                back={true}
                title={'계획 관리'}
            />
            <Container>
                <CalendarView
                    selected={selected}
                    setSelected={setSelected}
                />
                <DateView>
                    {
                        datePlanList?.length > 0
                            ?
                            <DateHeader>
                                <CustomText
                                    text={`${moment(selected).format('YYYY년 MM월 DD일')} 의 계획`}
                                    color={COLORS.white}
                                    size={20}
                                />
                            </DateHeader>
                            :
                            <NoDatePlanView>
                                <MotiView
                                    from={{ opacity: 0, translateY: -50 }}
                                    animate={{ opacity: 1, translateY: 0 }}
                                    delay={500}
                                >
                                    <CustomText
                                        text={'이 날은 계획이 없네요!'}
                                        color={COLORS.gray}
                                        size={17}
                                    />
                                </MotiView>
                                <MotiView
                                    from={{ opacity: 0, translateY: 50 }}
                                    animate={{ opacity: 1, translateY: 0 }}
                                    delay={800}
                                    style={{
                                        marginTop: ht(80)
                                    }}
                                >
                                    <PlusButton
                                        activeOpacity={.9}
                                        onPress={
                                            () => {
                                                createPlanModal.current.open()
                                            }
                                        }
                                    >
                                        <Image
                                            source={ICON.plus}
                                            style={{
                                                tintColor: COLORS.white,
                                                width: wt(100),
                                                height: ht(100)
                                            }}
                                        />
                                    </PlusButton>
                                </MotiView>
                            </NoDatePlanView>
                    }
                </DateView>
            </Container>
        </CustomSafeAreaView>
    )
}

const Container = styled.View`
    flex: 1;
    padding: 0 ${wt(30)}px;
`

const DateView = styled.View`
    flex: 1;
    align-items: center;
    padding: ${ht(50)}px;
`

const DateHeader = styled.View`
    width: 100%;
    height: ${ht(250)}px;
    justify-content: center;
    align-items: center;
`

const NoDatePlanView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

const PlusButton = styled.TouchableOpacity`
    width: ${wt(250)}px;
    height: ${ht(250)}px;
    background-color: #CC4F4F;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
`

export default Planer