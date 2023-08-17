import { MotiView, SafeAreaView } from 'moti'
import React, { useEffect, useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { ht, wt } from '../../responsive/responsive'
import { styled } from 'styled-components'
import CustomTextInput from './CustomTextInput'

const SearchBar = () => {

    const [searchValue, setSearchValue] = useState('');
    return (
        <SafeAreaView>
            <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles['search_bar']}>
                <SearchView>
                    <CustomTextInput
                        value={searchValue}
                        setValue={setSearchValue}
                    />
                </SearchView>
            </MotiView>
        </SafeAreaView>
    )
}

const SearchView = styled.View`
    width: 80%;
    height: 100%;
`

const styles = StyleSheet.create({
    search_bar: {
        width: "100%",
        height: ht(250),
        paddingHorizontal: wt(50),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.3)"
    }
})

export default SearchBar