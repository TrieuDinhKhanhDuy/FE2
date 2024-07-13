import { FormControl, Input, InputLabel } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'

const ProductFrom = () => {
    const { id} = useParams()
    console.log(id)
    
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel htmlFor="title-input">Title</InputLabel>
        <Input id="title-input" aria-describedby="title-helper-text" type='text' />
      </FormControl>

      <FormControl fullWidth>
        <InputLabel htmlFor="price-input">Price</InputLabel>
        <Input id="price-input" aria-describedby="price-helper-text" type='number' />
      </FormControl>

      <FormControl fullWidth>
        <InputLabel htmlFor="description-input">Description</InputLabel>
        <Input id="description-input" aria-describedby="description-helper-text" type='text' />
      </FormControl>

      <FormControl fullWidth>
        <InputLabel htmlFor="image-input">Image</InputLabel>
        <Input id="image-input" aria-describedby="image-helper-text" type='file' />
      </FormControl>
    </div>
  )
}

export default ProductFrom
