import React from 'react'
import { Box, Stack, Typography } from '@mui/material'

const Footer = () => {
  return (
    <div style={{backgroundColor: "black", width: "100%", marginTop: "70px"}} mt="80px" bgcolor="#fff3f4">
      <Stack gap="40px" alignItems="center" px="40px" pt="24px">
        <Typography variant="h4" fontWeight="600">
          CLICK <span style={{color: "red"}}>N</span> VISIT
        </Typography>
        <Typography variant="h5" pb="20px" mt="80px" fontSize="18px">
        &#169; Designed and Developed by Sanoop Nazeer
        </Typography>
      </Stack>
    </div>
  )
}

export default Footer