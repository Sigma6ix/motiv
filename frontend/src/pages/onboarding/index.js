// ** React Imports

// ** Next Imports

// ** MUI Components
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Third Party Imports
import * as yup from 'yup'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import { Grid } from '@mui/material'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import OnboardingForm from 'src/views/forms/form-wizard/OnboardingForm'

// ** Demo Imports

// ** Styled Components
const WrapperBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: 750 }
}))

const OnboardingPage = () => {
  return (
    <Box className='content-center'>
      <WrapperBox sx={{ zIndex: 1 }}>
        <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img width='60' height='33' alt='Github' src='/images/logos/Logo-TO.png' style={{ marginRight: '7px' }} />
          <Typography variant='h6' sx={{ ml: 2, lineHeight: 1, fontWeight: 700, fontSize: '1.5rem !important' }}>
            {themeConfig.templateName}
          </Typography>
        </Box>
        <Grid item xs={12}>
          <OnboardingForm />
        </Grid>
      </WrapperBox>
    </Box>
  )
}
OnboardingPage.getLayout = page => <BlankLayout>{page}</BlankLayout>
OnboardingPage.acl = {
  action: 'manage',
  subject: 'onboarding-page'
}
// OnboardingPage.guestGuard = true

export default OnboardingPage
