import Anime from 'react-anime'
import React from 'react'

export const withAnime = (component, animationProps) => {
  return <Anime {...animationProps}>{component}</Anime>
}
