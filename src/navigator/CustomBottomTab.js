import React, { useEffect } from 'react'
import { styled } from 'styled-components'
import { ht } from '../../responsive/responsive'

const CustomBottomTab = ({ state, navigation }) => {

    useEffect(() => {
        console.log(state);
    }, [])

    return (
        <BottomBox
            style={{
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 9,
                },
                shadowOpacity: 0.50,
                shadowRadius: 12.35,

                elevation: 19,
            }}
        >

        </BottomBox>
    )
}

const BottomBox = styled.View`
    width: 100%;
    height: ${ht(400)}px;
    background-color: #fff;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export default CustomBottomTab