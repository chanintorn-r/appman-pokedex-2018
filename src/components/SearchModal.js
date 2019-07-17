import React, { useState, useEffect } from "react"
import * as R from 'ramda'
import styled from 'styled-components'
import { Flex, Box, Text } from 'rebass'
import CardItem from './CardItem'
import { useStateValue } from '../state'
import CardList from './CardList'
import SearchIcon from '../search.png'

const Wrapper = styled(Flex)`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 99;
`

const BackDrop = styled(Flex)`
  width: 100%;
  height: 100%;
`

const Input = styled.input`
  font-size: 1.5rem;
  width: 100%;
  outline: none;
  border: none;
  padding: 0 1rem;
`

const SearchBox = styled(Flex)`
  border: 1px solid ${props => props.theme.colors.Darkness};
  height: 50px;
`


const SearchModal = () => {
  const [hasError, setErrors] = useState(false)
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [cards, setCards] = useState([])
  const [state, dispatch] = useStateValue()

  const fetchData = async () => {
    const response = await fetch(`http://localhost:3030/api/cards?limit=30&name=${name}&type=${type}`)
    response
      .json()
      .then(({ cards }) => setCards(cards))
      .catch(err => setErrors(err))
  }

  useEffect(() => {

    fetchData()
  }, [name, type])

  const filterSelected = R.filter((item) => {
    const result = R.find(R.propEq('id', R.prop('id', item)))(state.pokedex)

    return R.isNil(result)
  })

  const combinedFilter = R.pipe(
    filterSelected,
    R.filter((item) => R.includes(name.toLowerCase(), item.name.toLowerCase()) || R.includes(type.toLowerCase(), item.type.toLowerCase()))
  )

  const filteredCards = R.isEmpty(name) && R.isEmpty(type) ? filterSelected(cards) : combinedFilter(cards)
  console.log(name, type)
  return(
    <Wrapper>
      <BackDrop p={4} onClick={() => dispatch({type: 'toggleModal'})}>
        <Flex
          flexDirection="column"
          width={1}
          p={3}
          bg='Colorless'
          style={{borderRadius: '10px'}}
          onClick={(e) => e.stopPropagation()}
        >
          <Flex>
          <SearchBox mb={3} width={1/2}>
            <Input type="text" placeholder="name" onChange={(e) => setName(e.target.value)} />
            <img src={SearchIcon} alt="search icon" width="50" />
          </SearchBox>
          <SearchBox mb={3} width={1/2}>
            <Input type="text" placeholder="type" onChange={(e) => setType(e.target.value)} />
            <img src={SearchIcon} alt="search icon" width="50" />
          </SearchBox>
          </Flex>
          <CardList items={filteredCards} type="search" />
          {/* <Flex flexDirection="column" flex={1} style={{overflowY: 'scroll'}}>
            {
              filteredCards.length > 0 ? filteredCards.map(item => {
                return <CardItem btn="add" imgWidth={1/6} key={item.id} {...item}/>
              })
              :
              <Text>No data</Text>
            }
          </Flex> */}
        </Flex>
      </BackDrop>
    </Wrapper>
  )
}

export default SearchModal
