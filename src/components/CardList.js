import React, { useState, useEffect } from "react"
import { Flex, Box, Text } from 'rebass'
import CardItem from './CardItem'

const CardList = ({ items = [], type = '' }) => {

  return(
    <Flex alignItems="start" flex={1} style={{overflowY: 'scroll'}} flexWrap="wrap" justifyContent="space-between">
      {
        items.length > 0 ? items.map(item => {
          return <CardItem key={item.id} {...item} type={type} />
        })
        :
        <Text>No data</Text>
      }
    </Flex>
  )
}

export default CardList
