import React from 'react'
import ReactDOM from 'react-dom'
import * as R from 'ramda'
import App from './App'
import { StateProvider } from './state'
import './index.css'

const initialState = {
  isOpenModal: true,
  pokedex: [],
}

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'toggleModal':
      return {
        ...state,
        isOpenModal: !state.isOpenModal
      }
    case 'addPokemon':
      return {
        ...state,
        pokedex: [...state.pokedex, payload]
      }
    case 'removePokemon':
      return {
        ...state,
        pokedex: R.filter((item) => item.id !== payload.id, state.pokedex),
      }
    default:
      return state
  }
}


ReactDOM.render(<StateProvider initialState={initialState} reducer={reducer}><App /></StateProvider>, document.getElementById('root'))
