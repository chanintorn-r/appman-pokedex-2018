import React, { Component } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { Flex, Box, Text, Button } from 'rebass'
import CardList from './components/CardList'
import SearchModal from './components/SearchModal'
import { useStateValue } from './state';

const COLORS = {
  Psychic: "#f8a5c2",
  Fighting: "#f0932b",
  Fairy: "#c44569",
  Normal: "#f6e58d",
  Grass: "#badc58",
  Metal: "#95afc0",
  Water: "#3dc1d3",
  Lightning: "#f9ca24",
  Darkness: "#574b90",
  Colorless: "#FFF",
  Fire: "#eb4d4b"
}

const theme = {
  colors: COLORS,
}

const PlusBtn = styled(Button)`
  font-family: 'Atma', cursive;
  background-color: ${props => props.theme.colors.Fire};
  position: absolute;
  width: 120px;
  height: 120px;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  border-radius: 100%;
  outline: none;
  cursor: pointer;
`

const App = () => {
  const [state, dispatch] = useStateValue()
  console.log(state)
  return (
    <ThemeProvider theme={theme}>
      <Flex flexDirection="column" style={{width: "100%", height: '100%', position: 'relative'}}>
        {!state.isOpenModal && <SearchModal/>}
        <Box width={1} py={2}>
          <Text textAlign="center" fontSize="3rem">My Pokedex</Text>
        </Box>
        <Box width={1} flex={1} style={{overflowY: 'scroll'}}>
          <CardList items={state.pokedex} type="list"/>
        </Box>
        <Box width={1} bg="Fire" style={{position: 'relative', height: '70px'}}>
          <PlusBtn onClick={() => dispatch({
            type: 'toggleModal'
          })} fontSize="4.5rem" color='white'>+</PlusBtn>
        </Box>
      </Flex>
    </ThemeProvider>
  )
}

export default App
