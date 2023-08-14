import React, { useEffect, useRef, useState } from 'react'
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
import { Alert, FlatList, Image } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import CreatePlanForm from '../components/CreatePlanForm'
import { deleteServerPlan, getServerPlan } from '../functions/firebase'
import { useRecoilState } from 'recoil'
import { loadingControl } from '../recoil/control'
import Loading from '../components/Loading'
import PlanList from '../components/PlanList'
import { SwipeListView } from 'react-native-swipe-list-view'

const Planer = () => {

    const [selected, setSelected] = useState(moment().format('YYYY-MM-DD'));
    const [datePlanList, setDatePlanList] = useState([]);
    const createPlanModal = useRef(null);
    const [loading, setLoading] = useRecoilState(loadingControl);
    const [onDrag, setOnDrag] = useState(false);

    // 처음 / 선택 날짜를 불러오면 실행
    useEffect(() => {
        getPlanList();
    }, [selected])

    // Plan을 불러오는 함수
    const getPlanList = async () => {
        try {
            setLoading(true);
            setDatePlanList([]);
            const getPlanData = await getServerPlan(selected);

            if (getPlanData['status']) {
                setDatePlanList(getPlanData['data']);
            } else {
                throw Error(getPlanData['error_message']);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('다시 시도 해주세요');
        } finally {
            setLoading(false);
        }
    }

    // 모달을 닫는 함수
    const closeModal = () => {
        createPlanModal.current.close();
    }

    // 플랜 삭제 함수
    const deletePlan = async (data) => {
        const deletaData = await deleteServerPlan(data, setLoading);

        if (deletaData['status']) {
            await getPlanList();
        }
    }

    return (
        <CustomSafeAreaView backColor={COLORS.black}>
            {loading && <Loading />}
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
                    getPlanList={getPlanList}
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
                            <SwipeListView
                                data={datePlanList}
                                renderItem={item => { return <PlanList item={item.item} /> }}
                                style={{
                                    width: "100%",
                                    paddingVertical: ht(50)
                                }}
                                renderHiddenItem={(data, rowMap) => (
                                    <MotiView
                                        style={{
                                            position: 'absolute',
                                            overflow: "visible",
                                            right: 0,
                                            height: "100%",
                                        }}
                                        from={{ opacity: onDrag ? 1 : 0 }}
                                        animate={{ opacity: onDrag ? 1 : 0 }}
                                        transition={{ duration: 500 }}
                                    >
                                        <DeleteButton
                                            onPress={() => deletePlan(data.item)}
                                        >
                                            <Image
                                                source={ICON.trash}
                                                style={{ width: "40%", height: "40%", tintColor: COLORS.red }}
                                                resizeMode='contain'
                                            />
                                        </DeleteButton>
                                    </MotiView>
                                )}
                                disableRightSwipe={true}
                                onRowOpen={() => setOnDrag(true)}
                                onRowClose={() => setOnDrag(false)}
                                leftOpenValue={wt(500)}
                                rightOpenValue={wt(-500)}
                            />
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
                {
                    datePlanList.length > 0 &&
                    <MotiView
                        style={{
                            position: "absolute",
                            zIndex: 998,
                            bottom: ht(250),
                            right: wt(80)
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
                }
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

const DeleteButton = styled.TouchableOpacity`
    width: ${wt(500)}px;
    height: 100%;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    margin-top: ${ht(50)}px;
    background-color: red;
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