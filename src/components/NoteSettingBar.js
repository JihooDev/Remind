import { MotiView } from 'moti'
import React from 'react'
import { styled } from 'styled-components'
import { ht, wt } from '../../responsive/responsive'
import { COLORS } from '../asset/colors'

const NoteSettingBar = ({
    show
}) => {
    return (
        <MotiView
            style={{
                backgroundColor: COLORS.white,
                width: '100%',
                height: ht(250),
                zIndex: !show ? -1 : 0,
                position: !show ? 'absolute' : 'relative',
                borderRadius: 20
            }}
            animate={{
                opacity: show ? 1 : 0,
                translateY: show ? 0 : -200,
                marginTop: show ? ht(120) : 0
            }}
        >

        </MotiView>
    )
}


export default NoteSettingBar