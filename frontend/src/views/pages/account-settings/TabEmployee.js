// ** React Imports
import { useState } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { Box, FormHelperText, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

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

const TabPersonal = ({ data }) => {
  // ** State
  const [imgSrc, setImgSrc] = useState('/images/avatars/9.jpeg')
  const [newPhoto, setNewPhoto] = useState()
  const [submit, setSubmit] = useState('save changes')

  // ** Hooks
  const router = useRouter()

  // Tokenization for server request
  const storageChecked = getLocalStorage('accessToken')

  const onChange = e => {
    const file = e.target.files[0]
    if (file) {
      setImgSrc(file)
      const newPhotoURL = URL.createObjectURL(file)
      setNewPhoto(newPhotoURL)
    }
  }

  const defaultValues = {
    employeeFullName: '',
    landingPageURL: '',
    employeeLocation: ''
  }

  // YUP validation rules
  const schema = yup.object().shape({
    employeeFullName: yup.string().required(),
    landingPageURL: yup.string().required(),
    employeeLocation: yup.string().required()
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

  // Handle form submit
  const onSubmit = async data => {
    setSubmit('Saving...')
    const file = imgSrc
    if (file) {
      // define all variables to send to backend
      const imageName = uuidv4() + '.' + file
      const employeePhotoURL = await uploadFile(file, `employee/${data._id}/${imageName}`)
      const { employeeFullName, landingPageURL, employeeLocation } = data
      if (employeePhotoURL) {
        axios({
          method: 'POST',
          url: 'http://localhost:8000/api/employee/addnew',
          data: {
            employeeFullName,
            employeeLocation,
            landingPageURL,
            employeePhotoURL
          },
          headers: {
            Authorization: `Bearer ${storageChecked}`
          }
        })
          .then(response => {
            setSubmit('Save changes')
            console.log('Employee added', response)
            toast.success(response.data.message)
          })
          .catch(error => {
            console.log('New employee FAILED', error)
            toast.error(error.data.error)
          })
      }
    }
  }

  return (
    <CardContent>
      <form onSubmit={handleSubmit(onSubmit)}>
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
              name='employeeFullName'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.employeeFullName)}
                  required
                  fullWidth
                  label='Employee Full Name'
                  placeholder='Leonard'
                />
              )}
            />
            {errors.employeeFullName && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.employeeFullName.message}</FormHelperText>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name='landingPageURL'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.landingPageURL)}
                  required
                  fullWidth
                  label='Landing Page URL'
                  placeholder='Leonard'
                />
              )}
            />
            {errors.landingPageURL && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.landingPageURL.message}</FormHelperText>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name='employeeLocation'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.employeeLocation)}
                  required
                  fullWidth
                  label='Employee Location'
                  placeholder='Leonard'
                />
              )}
            />
            {errors.employeeLocation && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.employeeLocation.message}</FormHelperText>
            )}
          </Grid>
          <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(7)} !important` }}>
            <Button variant='contained' sx={{ mr: 4 }} type='submit'>
              {submit}
            </Button>
            {/* <Button type='reset' variant='outlined' color='secondary' onClick={() => setDate(null)}>
              Reset
            </Button> */}
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabPersonal
