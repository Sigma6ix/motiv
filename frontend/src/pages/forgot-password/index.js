// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MuiLink from '@mui/material/Link'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import MuiCard from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import ChevronLeft from 'mdi-material-ui/ChevronLeft'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: 450 }
}))

const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: '0.18px',
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: { marginTop: theme.spacing(8) }
}))

const ForgotPassword = () => {
  // ** Hooks

  const handleSubmit = e => {
    e.preventDefault()
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ p: theme => `${theme.spacing(15.5, 7, 8)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img width='60' height='30' alt='Github' src='/images/logos/Logo-TO.png' style={{ marginRight: '7px' }} />
            <Typography variant='h6' sx={{ ml: 2, lineHeight: 1, fontWeight: 700, fontSize: '1.5rem !important' }}>
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <TypographyStyled variant='h5'>Forgot Password? 🔒</TypographyStyled>
            <Typography variant='body2'>
              Enter your email and we&prime;ll send you instructions to reset your password
            </Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <TextField autoFocus type='email' label='Email' sx={{ display: 'flex', mb: 4 }} />
            <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 5.25 }}>
              Send reset link
            </Button>
            <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Link passHref href='/login'>
                <Typography
                  component={MuiLink}
                  sx={{ display: 'flex', alignItems: 'center', color: 'primary.main', justifyContent: 'center' }}
                >
                  <ChevronLeft sx={{ mr: 1.5, fontSize: '2rem' }} />
                  <span>Back to login</span>
                </Typography>
              </Link>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}
ForgotPassword.guestGuard = true
ForgotPassword.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default ForgotPassword
