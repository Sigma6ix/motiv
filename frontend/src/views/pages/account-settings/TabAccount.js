// ** React Imports
import { useState } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import { LocalizationProvider, MobileDatePicker } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { CardHeader, Divider, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'

// ** Auth Imports
import { getLocalStorage } from 'src/hooks/helpers'

// ** Config
import authConfig from 'src/configs/auth'

// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import uploadFile from 'src/configs/firebase/uploadFile'
import { v4 as uuidv4 } from 'uuid'
import * as yup from 'yup'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(5),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
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

// ** Auth variables
// const auth = isAuth()
// const currentUser = auth

const TabAccount = ({ data }) => {
  // ** State
  // const [openAlert, setOpenAlert] = useState(true)
  const [basicPicker, setBasicPicker] = useState(new Date())
  const [imgSrc, setImgSrc] = useState('/images/avatars/9.jpeg')
  const [newPhoto, setNewPhoto] = useState()
  const [submit, setSubmit] = useState('save changes')

  // Tokenization for server request
  const storageChecked = getLocalStorage('accessToken')

  // ** Hooks
  const router = useRouter()

  const onChange = e => {
    const file = e.target.files[0]
    if (file) {
      setImgSrc(file)
      const newPhotoURL = URL.createObjectURL(file)
      setNewPhoto(newPhotoURL)
    }
  }

  const defaultValues = {
    businessName: '',
    contactFirstName: '',
    contactLastName: '',
    businessPhone: '',
    personalPhone: '',
    businessEmail: '',
    personalEmail: '',
    address: '',
    city: '',
    postalCode: '',
    province: '',
    country: ''
  }

  // YUP validation rules
  const schema = yup.object().shape({
    businessName: yup.string().required(),
    contactFirstName: yup.string().required(),
    contactLastName: yup.string().required(),
    businessPhone: yup.string().required(),
    personalPhone: yup.string().required(),
    businessEmail: yup.string().email().required(),
    personalEmail: yup.string().email().required(),
    address: yup.string().required(),
    city: yup.string().required(),
    province: yup.string().required(),
    postalCode: yup.string().required(),
    country: yup.string().required()
  })

  // React Hook controller
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  // Handle form submit to database
  const onSubmit = async data => {
    setSubmit('Saving...')
    const file = imgSrc
    if (file) {
      // define all variables to send to backend
      const startDate = basicPicker
      const imageName = uuidv4() + '.' + file
      const photoURL = await uploadFile(file, `profile/${data._id}/${imageName}`)
      const {
        businessName,
        contactFirstName,
        contactLastName,
        businessPhone,
        personalPhone,
        businessEmail,
        personalEmail,
        address,
        city,
        postalCode,
        province,
        country
      } = data

      if (photoURL) {
        axios({
          method: 'PUT',
          url: 'http://localhost:8000/api/user/update/settings/account-tab',
          data: {
            businessName,
            contactFirstName,
            contactLastName,
            businessPhone,
            personalPhone,
            businessEmail,
            personalEmail,
            photoURL,
            startDate,
            address,
            city,
            postalCode,
            province,
            country
          },
          headers: {
            Authorization: `Bearer ${storageChecked}`
          }
        })
          .then(response => {
            setSubmit('Save changes')
            console.log('User info update success', response)
            toast.success('Your profile has been updated! Please log in again to see updates.')
            router.push('/user-profile/')
          })
          .catch(error => {
            console.log('User info update FAILED', error.response.data)
            toast.error('Your profile failed to update. Please try again or contact support if the problem continues')
          })
      }
    }
  }

  // fdhska

  return (
    <CardContent>
      <Typography variant='h6' sx={{ fontWeight: 600 }}>
        Add New - Company Onboarding Form
      </Typography>
      <Divider sx={{ my: 4 }} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid item xs={12} sx={{ mb: 3 }}>
          <Typography variant='body2' sx={{ fontWeight: 600 }}>
            1. Account Details
          </Typography>
        </Grid>
        <Grid container spacing={6}>
          <Grid item xs={12} sx={{ my: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {newPhoto ? <ImgStyled src={newPhoto} alt='Profile Pic' /> : <ImgStyled src={imgSrc} alt='Profile Pic' />}
              {/* <ImgStyled src={photoURL} alt='Profile Pic' /> */}
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload Logo
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg, application/pdf'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/avatars/9.jpeg')}>
                  Reset
                </ResetButtonStyled>
                <Typography sx={{ mt: 4 }} component='p' variant='caption'>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name='businessName'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.businessName)}
                  fullWidth
                  label='Business Name'
                  placeholder='ACME Co.'
                />
              )}
            />
            {errors.businessName && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.businessName.message}</FormHelperText>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                label='Start Date'
                value={basicPicker}
                onChange={newValue => setBasicPicker(newValue)}
                renderInput={params => <TextField fullWidth {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name='contactFirstName'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.contactFirstName)}
                  fullWidth
                  label='Contact First Name'
                  placeholder='Carter'
                />
              )}
            />
            {errors.contactFirstName && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.contactFirstName.message}</FormHelperText>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name='contactLastName'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.contactLastName)}
                  fullWidth
                  label='Contact Last Name'
                  placeholder='Carter'
                />
              )}
            />
            {errors.contactLastName && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.contactLastName.message}</FormHelperText>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name='businessPhone'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.businessPhone)}
                  required
                  fullWidth
                  label='Business Phone'
                  placeholder='123-456-7891'
                />
              )}
            />
            {errors.businessPhone && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.businessPhone.message}</FormHelperText>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name='personalPhone'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.personalPhone)}
                  required
                  fullWidth
                  label='Personal Phone'
                  placeholder='123-456-7891'
                />
              )}
            />
            {errors.personalPhone && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.personalPhone.message}</FormHelperText>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name='businessEmail'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.businessEmail)}
                  required
                  fullWidth
                  type='email'
                  label='Business Email'
                  placeholder='carterleonard@gmail.com'
                />
              )}
            />
            {errors.businessEmail && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.businessEmail.message}</FormHelperText>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name='personalEmail'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.personalEmail)}
                  required
                  fullWidth
                  type='email'
                  label='Personal Email'
                  placeholder='carterleonard@gmail.com'
                />
              )}
            />
            {errors.personalEmail && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.personalEmail.message}</FormHelperText>
            )}
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ mb: 0 }} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body2' sx={{ fontWeight: 600 }}>
              2. Business Location
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name='address'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.address)}
                  required
                  fullWidth
                  label='Street Address'
                  placeholder='Leonard'
                />
              )}
            />
            {errors.address && <FormHelperText sx={{ color: 'error.main' }}>{errors.address.message}</FormHelperText>}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name='postalCode'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.postalCode)}
                  required
                  fullWidth
                  label='Postal Code'
                  placeholder='A0A 0A0'
                />
              )}
            />
            {errors.postalCode && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.postalCode.message}</FormHelperText>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name='city'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.city)}
                  required
                  fullWidth
                  label='City'
                  placeholder='Toronto'
                />
              )}
            />
            {errors.city && <FormHelperText sx={{ color: 'error.main' }}>{errors.city.message}</FormHelperText>}
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id='stepper-alternative-personal-province-select-label'>Province</InputLabel>
              <Controller
                name='province'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <Select
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.province)}
                    required
                    id='stepper-alternative-personal-multiple-select'
                    labelId='stepper-alternative-personal-province-select-label'
                    input={<OutlinedInput label='Province' id='stepper-alternative-select-multiple-language' />}
                  >
                    <MenuItem value='Alberta'>Alberta</MenuItem>
                    <MenuItem value='British Columbia'>British Columbia</MenuItem>
                    <MenuItem value='Manitoba'>Manitoba</MenuItem>
                    <MenuItem value='New Brunswick'>New Brunswick</MenuItem>
                    <MenuItem value='Newfoundland and Labrador'>Newfoundland and Labrador</MenuItem>
                    <MenuItem value='Northwest Territories'>Northwest Territories</MenuItem>
                    <MenuItem value='Nunavut'>Nunavut</MenuItem>
                    <MenuItem value='Ontario'>Ontario</MenuItem>
                    <MenuItem value='Prince Edward Island'>Prince Edward Island</MenuItem>
                    <MenuItem value='Quebec'>Quebec</MenuItem>
                    <MenuItem value='Saskatchewan'>Saskatchewan</MenuItem>
                    <MenuItem value='Yukon'>Yukon</MenuItem>
                  </Select>
                )}
              />
              {errors.province && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.province.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id='stepper-alternative-personal-select-label'>Country</InputLabel>
              <Controller
                name='country'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <Select
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.country)}
                    label='Country'
                    id='stepper-alternative-personal-select'
                    labelId='stepper-alternative-personal-select-label'
                  >
                    <MenuItem value='Canada'>Canada</MenuItem>
                  </Select>
                )}
              />
              {errors.country && <FormHelperText sx={{ color: 'error.main' }}>{errors.country.message}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ mb: 0 }} />
          </Grid>
          <Grid item xs={12}>
            <Button variant='contained' sx={{ mr: 4 }} type='submit'>
              {submit}
            </Button>
            {/* <Button type='reset' variant='outlined' color='secondary'>
              Reset
            </Button> */}
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
