// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Step from '@mui/material/Step'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Stepper from '@mui/material/Stepper'
import MenuItem from '@mui/material/MenuItem'
import StepLabel from '@mui/material/StepLabel'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'
import MobileDatePicker from '@mui/lab/MobileDatePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DatePicker from '@mui/lab/DatePicker'
import { FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, styled } from '@mui/material'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Custom Components Imports
import StepperCustomDot from './StepperCustomDot'

// ** Config
import authConfig from 'src/configs/auth'

// ** Third Party Imports
import toast from 'react-hot-toast'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import axios from 'axios'
import { getLocalStorage, isAuth } from 'src/hooks/helpers'
import uploadFile from 'src/configs/firebase/uploadFile'
import { v4 as uuidv4 } from 'uuid'

// ** Styled Component
import StepperWrapper from 'src/@core/styles/mui/stepper'
import { useRouter } from 'next/router'

// ** Styled Components
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

const steps = [
  {
    title: 'Account Details',
    subtitle: 'Setup Information'
  },
  {
    title: 'Location Info',
    subtitle: 'Business Address'
  },
  {
    title: 'Kickoff Details',
    subtitle: 'Business Information'
  }
]

const defaultValues = {
  businessName: '',
  contactFirstName: '',
  contactLastName: '',
  businessPhone: '',
  personalPhone: '',
  businessEmail: '',
  personalEmail: '',
  address: '',
  postalCode: '',
  city: '',
  province: '',
  country: '',
  numOfEmployees: '',
  startingStarRating: '',
  startingNumOfReviews: ''
}

const OnboaringForm = () => {
  // ** States
  const [typeSubmit, setTypeSubmit] = useState('button')
  const [activeStep, setActiveStep] = useState(0)
  const [basicPicker, setBasicPicker] = useState(new Date())
  const [imgSrc, setImgSrc] = useState('/images/avatars/9.jpeg')
  const [newPhoto, setNewPhoto] = useState()

  // ** Auth variables
  const auth = isAuth()
  const currentUser = auth
  const router = useRouter()

  // Tokenization for server request
  const storageChecked = getLocalStorage('accessToken')

  // Handle Stepper
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
    if (activeStep === steps.length - 1) {
      // setTypeSubmit('submit')
      toast.success('Form Submitted')
    }
  }

  const onChange = e => {
    const file = e.target.files[0]
    if (file) {
      setImgSrc(file)
      const photoURL = URL.createObjectURL(file)
      setNewPhoto(photoURL)
    }
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
    country: yup.string().required(),
    startingStarRating: yup.string().required(),
    startingNumOfReviews: yup.string().required(),
    numOfEmployees: yup.string().required()
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
    const file = imgSrc
    if (file) {
      // define all variables to send to backend
      const startDate = basicPicker
      const imageName = uuidv4() + '.' + file
      const photoURL = await uploadFile(file, `profile/${currentUser._id}/${imageName}`)

      if (photoURL) {
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
          province,
          postalCode,
          country,
          numOfEmployees,
          startingStarRating,
          startingNumOfReviews
        } = data

        axios({
          method: 'PUT',
          url: 'http://localhost:8000/api/user/update',
          data: {
            businessName,
            contactFirstName,
            contactLastName,
            businessPhone,
            personalPhone,
            businessEmail,
            personalEmail,
            address,
            city,
            province,
            postalCode,
            country,
            numOfEmployees,
            startingStarRating,
            startingNumOfReviews,
            startDate,
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
                toast.error('Onboarding failed. Please try again!')
              })
          })
      }
    }
  }

  const getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <Fragment>
            <Grid container sx={{ paddingRight: 5, paddingLeft: 5 }}>
              <Grid item xs={12} sx={{ my: 5 }}>
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
                    <ResetButtonStyled
                      color='error'
                      variant='outlined'
                      onClick={() => setImgSrc('/images/avatars/9.jpeg')}
                    >
                      Reset
                    </ResetButtonStyled>
                    <Typography sx={{ mt: 4 }} component='p' variant='caption'>
                      Allowed PNG or JPEG. Max size of 800K.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
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
          </Fragment>
        )
      case 1:
        return (
          <Fragment key={step}>
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
                {errors.country && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.country.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Fragment>
        )
      case 2:
        return (
          <Fragment key={step}>
            <Grid item xs={12} sm={6}>
              <Controller
                name='startingStarRating'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.startingStarRating)}
                    required
                    fullWidth
                    label='Starting Star Rating'
                  />
                )}
              />
              {errors.startingStarRating && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.startingStarRating.message}</FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='startingNumOfReviews'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.startingNumOfReviews)}
                    required
                    fullWidth
                    label='Starting Number Of Reviews'
                  />
                )}
              />
              {errors.startingNumOfReviews && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.startingNumOfReviews.message}</FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='numOfEmployees'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.numOfEmployees)}
                    required
                    fullWidth
                    label='Number of Employees'
                  />
                )}
              />
              {errors.numOfEmployees && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.numOfEmployees.message}</FormHelperText>
              )}
            </Grid>
          </Fragment>
        )
      default:
        return 'Unknown Step'
    }
  }

  const renderContent = () => {
    if (activeStep === steps.length) {
      return (
        <Fragment>
          <Typography>All steps are completed!</Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button size='large' variant='contained'>
              Go to application
            </Button>
          </Box>
        </Fragment>
      )
    } else {
      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                {steps[activeStep].title}
              </Typography>
              <Typography variant='caption' component='p'>
                {steps[activeStep].subtitle}
              </Typography>
            </Grid>
            {getStepContent(activeStep)}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Button size='large' variant='contained' disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
              </Box>
              {/* {activeStep === steps.length - 1 ? (
                <Button size='large' variant='contained' type='Submit'>
                  Submit
                </Button>
              ) : (
                <Button size='large' variant='contained' onClick={handleNext}>
                  Next
                </Button>
              )} */}
              <Box>
                <Button sx={{ mr: 4 }} size='large' variant='contained' type='Submit' disabled={activeStep === 0 - 1}>
                  Submit
                </Button>

                <Button
                  size='large'
                  variant='contained'
                  type={typeSubmit}
                  onClick={handleNext}
                  disabled={activeStep === 2}
                >
                  Next
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      )
    }
  }

  return (
    <Fragment>
      <StepperWrapper>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((step, index) => {
            return (
              <Step key={index}>
                <StepLabel StepIconComponent={StepperCustomDot}>
                  <div className='step-label'>
                    <div>
                      <Typography className='step-title'>{step.title}</Typography>
                      <Typography className='step-subtitle'>{step.subtitle}</Typography>
                    </div>
                  </div>
                </StepLabel>
              </Step>
            )
          })}
        </Stepper>
      </StepperWrapper>
      <Card sx={{ mt: 4 }}>
        <CardContent>{renderContent()}</CardContent>
      </Card>
    </Fragment>
  )
}

export default OnboaringForm
