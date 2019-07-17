import React from 'react'
import * as R from 'ramda'
import styled from 'styled-components'
import { Flex, Box, Text } from 'rebass'
import CuteIcon from '../cute.png'
import { useStateValue } from '../state'

const Wrapper = styled(Flex)`
  border-radius: 10px;
  position: relative;
  :hover {
    .actionBtn {
      display: block;
    }
  }
`

const Gage = styled(Flex)`
  border-radius: 30px;
`

const ActionBtn = styled(Text)`
  position: absolute;
  top: 10px;
  right: 10px;
  color: ${props => props.theme.colors.Fire};
  cursor: pointer;
  display: none;
`

const getHp = (val) => {
  const hp = R.defaultTo(0)(parseInt(val))
  if (hp > 100) {
    return 100
  }

  return hp
}

const getDmg = (val) => {
  return val.reduce((acc, curr, idx) => {

    const result = curr.damage.replace(/(\+|\*)/g, '')
    return acc + R.defaultTo(0)(parseInt(result))
  }, 0)

}

const CardItem = (props) => {
  const [state, dispatch] = useStateValue()
  const stat = {
    hp:  getHp(R.pathOr(0, ['hp'], props)),
    str: R.pathOr(0, ['attacks', 'length'], props) >= 1 && R.pathOr(0, ['attacks', 'length'], props) <= 2 ? R.pathOr(0, ['attacks', 'length'], props) * 50 : 0,
    weak: R.pathOr(0, ['weaknesses', 'length'], props) === 1 ? 100 : 0,
    dmg: getDmg(R.pathOr([], ['attacks'], props))
  }
  const lv = ((stat.hp / 10) + (stat.dmg / 10 ) + 10 - (stat.weak)) / 5
  console.log(props)
  return (
    <Wrapper width={props.type === 'search' ? 1 : (1/2.1)} mx={props.type === 'search' ? 0 : 2} p={3} mb={3} bg="lightgray">
      {props.type === 'search' && <ActionBtn className="actionBtn" onClick={() => dispatch({type: 'addPokemon', payload: props})} mb={2} fontSize="1.5rem">Add</ActionBtn>}
      {props.type === 'list' && <ActionBtn className="actionBtn" onClick={() => dispatch({type: 'removePokemon', payload: props})} mb={2} fontSize="1.5rem">X</ActionBtn>}
      <Box width={props.type === 'search' ? (1/6) : (1/3)}>
        <img src={props.imageUrl} alt={props.name} style={{width: '100%'}} />
      </Box>
      <Flex flex={1} p={2} pl={4} flexDirection="column">
        <Text mb={2} fontSize="1.5rem">{props.name}</Text>
        <Flex mb={1}>
          <Flex width={1/6}><Text>HP</Text></Flex>
          <Flex width={3/6} px={2}>
            <Gage bg="Fairy" width={`${stat.hp}%`}/>
          </Flex>
        </Flex>
        <Flex mb={1}>
          <Flex width={1/6}><Text>STR</Text></Flex>
          <Flex width={3/6} px={2}>
            <Gage bg="Fairy" width={`${stat.str}%`}/>
          </Flex>
        </Flex>
        <Flex mb={2}>
          <Flex width={1/6}><Text>WEAK</Text></Flex>
          <Flex width={3/6} px={2}>
            <Gage bg="Fairy" width={`${stat.weak}%`}/>
          </Flex>
        </Flex>
        <Box>
          {
            lv > 0 && Array.apply(null, Array(lv)).map((item, index) => <img key={`cute-${index}`} src={CuteIcon} alt="cute" width="50px"/>)
          }

        </Box>
      </Flex>
    </Wrapper>
  )
}

export default CardItem
