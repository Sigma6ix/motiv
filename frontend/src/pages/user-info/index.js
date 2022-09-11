// ** React Imports
import { useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import MuiLink from '@mui/material/Link'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import MuiCard from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import EyeOutline from 'mdi-material-ui/EyeOutline'

// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

// ** Hooks
import useBgColor from 'src/@core/hooks/useBgColor'
import { useAuth } from 'src/hooks/useAuth'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { Grid } from '@mui/material'
import { getLocalStorage } from 'src/hooks/helpers'

// ** Third Party Imports
import toast from 'react-hot-toast'

import axios from 'axios'
import uploadFile from 'src/configs/firebase/uploadFile'
import { v4 as uuidv4 } from 'uuid'

// ** Config
import authConfig from 'src/configs/auth'

// ** Styled Component
import StepperWrapper from 'src/@core/styles/mui/stepper'
import { useRouter } from 'next/router'

// ** Demo Imports

// ** Styled Components
const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center',
    paddingBottom: '20px'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: 450 }
}))

const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: '0.18px',
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: { marginTop: theme.spacing(8) }
}))

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(5),
  borderRadius: theme.shape.borderRadius
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required()
})

const defaultValues = {
  firstName: '',
  lirstName: ''
}

const UserInfoPage = () => {
  // ** States
  const [imgSrc, setImgSrc] = useState('/images/avatars/9.jpeg')
  const [newPhoto, setNewPhoto] = useState()

  // Tokenization for server request
  const storageChecked = getLocalStorage('accessToken')

  const onChange = e => {
    const file = e.target.files[0]
    if (file) {
      setImgSrc(file)
      const photoURL = URL.createObjectURL(file)
      setNewPhoto(photoURL)
    }
  }

  const [showPassword, setShowPassword] = useState(false)

  // ** Hooks
  const auth = useAuth()
  const bgClasses = useBgColor()
  const router = useRouter()

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = async data => {
    const file = imgSrc
    if (file) {
      // define all variables to send to backend
      const imageName = uuidv4() + '.' + file
      const photoURL = await uploadFile(file, `profile/${auth.user._id}/${imageName}`)

      if (photoURL) {
        const { firstName, lastName } = data

        axios({
          method: 'PUT',
          url: 'http://localhost:8000/api/user/update',
          data: {
            firstName,
            lastName,
            photoURL
          },
          headers: {
            Authorization: `Bearer ${storageChecked}`
          }
        })
          .then(async res => {
            window.localStorage.removeItem('userData')
            window.localStorage.removeItem(authConfig.storageTokenKeyName)
            window.localStorage.setItem(authConfig.storageTokenKeyName, res.data.accessToken)
            console.log('THE RESP', res.data)
          })
          .then(() => {
            axios
              .get(authConfig.meEndpoint, {
                headers: {
                  Authorization: window.localStorage.getItem(authConfig.storageTokenKeyName)
                }
              })
              .then(async response => {
                window.localStorage.setItem('userData', JSON.stringify(response.data.userData))
                console.log('onboarding success', response)
                toast.success('You have been successfully onboarded!')
                router.push('/')
              })
              .catch(error => {
                console.log('onboarding ERROR', error.data)
                router.push('/')
              })
          })
      }
    }
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ p: theme => `${theme.spacing(13, 7, 6.5)} !important` }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container sx={{ paddingRight: 5, paddingLeft: 5 }}>
              <Grid item xs={12} sx={{ my: 5, mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {newPhoto ? (
                    <ImgStyled src={newPhoto} alt='Profile Pic' />
                  ) : (
                    <ImgStyled src={imgSrc} alt='Profile Pic' />
                  )}
                  {/* <ImgStyled src={photoURL} alt='Profile Pic' /> */}
                  <Box>
                    <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                      Upload New Photo
                      <input
                        hidden
                        type='file'
                        onChange={onChange}
                        accept='image/png, image/jpeg, application/pdf'
                        id='account-settings-upload-image'
                      />
                    </ButtonStyled>

                    <Typography sx={{ mt: 4 }} component='p' variant='caption'>
                      Allowed PNG or JPEG. Max size of 800K.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ mb: 4 }}>
              <Controller
                name='firstName'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.firstName)}
                    fullWidth
                    label='First Name'
                  />
                )}
              />
              {errors.firstName && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.firstName.message}</FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} sx={{ mb: 4 }}>
              <Controller
                name='lastName'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.contactFirstName)}
                    fullWidth
                    label='Last Name'
                    placeholder='Carter'
                  />
                )}
              />
              {errors.lastName && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.lastName.message}</FormHelperText>
              )}
            </Grid>
            <Button sx={{ my: 4 }} size='large' variant='contained' type='Submit'>
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}
UserInfoPage.getLayout = page => <BlankLayout>{page}</BlankLayout>
UserInfoPage.acl = {
  action: 'manage',
  subject: 'onboarding-page'
}

export default UserInfoPage
