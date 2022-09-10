// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MuiCard from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import MuiFormControlLabel from '@mui/material/FormControlLabel'

import { styled } from '@mui/material/styles'

import Typography from '@mui/material/Typography'

// ** Third Party Imports
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.min.css'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { useRouter } from 'next/router'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: 450 }
}))

const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: '0.18px',
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: { marginTop: theme.spacing(8) }
}))

const EmailSentPage = () => {
  // ** Hooks and Link variables
  const router = useRouter()
  const href = 'intent://my_host#Intent;scheme=my_scheme;action=android.intent.action.VIEW;end'
  const gmail = 'https://www.google.com/gmail'
  const outlook = 'https://outlook.live.com/mail/'

  // ** Opem email application mobile
  const checkEmail = () => {
    router.push(href)
  }

  // Open Gmail
  const checkGmail = () => {
    router.push(gmail)
  }

  // Open Outlook
  const checkOutlook = () => {
    router.push(outlook)
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ p: theme => `${theme.spacing(13, 7, 6.5)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img width='60' height='30' alt='Github' src='/images/logos/Logo-TO.png' style={{ marginRight: '7px' }} />
            <Typography variant='h6' sx={{ ml: 2, lineHeight: 1, fontWeight: 700, fontSize: '1.5rem !important' }}>
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <TypographyStyled variant='h5'>{`Email has been sent! 📨`}</TypographyStyled>
            <Typography variant='body2'>
              Please click the button below to check your email and verify your account
            </Typography>
          </Box>
          <form noValidate autoComplete='off'>
            <Button fullWidth size='large' type='submit' variant='contained' sx={{ mt: 7 }} onClick={checkEmail}>
              Check your mail
            </Button>
            <Button fullWidth size='large' type='submit' variant='outlined' sx={{ my: 3 }} onClick={checkEmail}>
              Open Gmail
            </Button>
            <Button fullWidth size='large' type='submit' variant='outlined' sx={{ mb: 3 }} onClick={checkEmail}>
              Open Outlook
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}
EmailSentPage.getLayout = page => <BlankLayout>{page}</BlankLayout>
EmailSentPage.guestGuard = true

// export async function getStaticPaths(context) {
//   const { params } = context
//   const fetchedToken = params.token
// }

export default EmailSentPage
