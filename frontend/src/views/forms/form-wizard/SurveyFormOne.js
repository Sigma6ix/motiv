// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Step from '@mui/material/Step'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Stepper from '@mui/material/Stepper'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'

import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'

import { FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, styled } from '@mui/material'

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

// ** Styled Component
import StepperWrapper from 'src/@core/styles/mui/stepper'
import { useRouter } from 'next/router'

// ** Styled Components

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
    title: 'Question 1'
  },
  {
    title: 'Question 2'
  },
  {
    title: 'Question 3'
  },
  {
    title: 'Question 4'
  },
  {
    title: 'Question 5'
  }
]

const defaultValues = {
  question1: '',
  question2: '',
  question3: ''
}

const SurveyFormOne = () => {
  // ** States
  const [typeSubmit, setTypeSubmit] = useState('button')
  const [activeStep, setActiveStep] = useState(0)

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

  // YUP validation rules
  const schema = yup.object().shape({
    question1: yup.string().required(),
    question2: yup.string().required(),
    question3: yup.string().required()
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
    const { question1, question2, question3 } = data
    axios({
      method: 'PUT',
      url: 'http://localhost:8000/api/user/update',
      data: {
        question1,
        question2,
        question3
      },
      headers: {
        Authorization: `Bearer ${storageChecked}`
      }
    }).then(() => {
      axios
        .get(authConfig.meEndpoint, {
          headers: {
            Authorization: window.localStorage.getItem(authConfig.storageTokenKeyName)
          }
        })
        .then(async response => {
          console.log('survey posted', response)
          toast.success('You have finished your survey!')
          router.push('/')
        })
        .catch(error => {
          console.log('onboarding ERROR', error.data)
          toast.error('Survey failed. Please try again!')
        })
    })
  }

  const getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <Fragment>
            <Grid item xs={12} sm={12}>
              <FormControl sx={{ padding: '10px' }}>
                <FormLabel id='demo-radio-buttons-group-label'>What racial/ethnic groups do you belong to?</FormLabel>
                <Controller
                  name='question1'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <RadioGroup
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.question1)}
                      aria-labelledby='demo-radio-buttons-group-label'
                      defaultValue=''
                      name='radio-buttons-group'
                      sx={{ padding: '20px' }}
                    >
                      <FormControlLabel value={'CC'} control={<Radio />} label='Option 1' />
                      <FormControlLabel value={'LH'} control={<Radio />} label='Option 2' />
                      <FormControlLabel value={'TC'} control={<Radio />} label='Option 3' />
                      <FormControlLabel value={'C'} control={<Radio />} label='Option 4' />
                      <FormControlLabel value={'L'} control={<Radio />} label='Option 5' />
                      <FormControlLabel value={'D'} control={<Radio />} label='Option 6' />
                      <FormControlLabel value={'LH'} control={<Radio />} label='Option 7' />
                    </RadioGroup>
                  )}
                />
                {errors.question1 && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.question1.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Fragment>
        )
      case 1:
        return (
          <Fragment key={step}>
            <Grid item xs={12} sm={12}>
              <FormControl sx={{ padding: '10px' }}>
                <FormLabel id='demo-radio-buttons-group-label'>
                  How do you describe your gender identity? Select all that apply.
                </FormLabel>
                <Controller
                  name='question2'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <RadioGroup
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.question2)}
                      aria-labelledby='demo-radio-buttons-group-label'
                      defaultValue='female'
                      name='radio-buttons-group'
                      sx={{ padding: '20px' }}
                    >
                      <FormControlLabel value={'CC'} control={<Radio />} label='Male' />
                      <FormControlLabel value={'2'} control={<Radio />} label='Female' />
                      <FormControlLabel value={'3'} control={<Radio />} label='Non-binary' />
                      <FormControlLabel value={'4'} control={<Radio />} label='Transgender' />
                      <FormControlLabel value={'5'} control={<Radio />} label='I prefer not to say' />
                    </RadioGroup>
                  )}
                />
                {errors.question2 && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.question2.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Fragment>
        )
      case 2:
        return (
          <Fragment key={step}>
            <Grid item xs={12} sm={12}>
              <FormControl sx={{ padding: '10px' }}>
                <FormLabel id='demo-radio-buttons-group-label'>
                  Do you identify as a person with a disability or are you a person with accessibility needs?
                </FormLabel>
                <Controller
                  name='question3'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <RadioGroup
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.question3)}
                      aria-labelledby='demo-radio-buttons-group-label'
                      defaultValue='female'
                      name='radio-buttons-group'
                      sx={{ padding: '20px' }}
                    >
                      <FormControlLabel value={'1'} control={<Radio />} label='Option 1' />
                      <FormControlLabel value={'2'} control={<Radio />} label='Option 2' />
                      <FormControlLabel value={'3'} control={<Radio />} label='Option 3' />
                      <FormControlLabel value={'4'} control={<Radio />} label='Option 4' />
                      <FormControlLabel value={'5'} control={<Radio />} label='Option 5' />
                      <FormControlLabel value={'6'} control={<Radio />} label='Option 6' />
                    </RadioGroup>
                  )}
                />
                {errors.question3 && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.question3.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Fragment>
        )
      case 3:
        return (
          <Fragment key={step}>
            <Grid item xs={12} sm={12}>
              <FormControl sx={{ padding: '10px' }}>
                <FormLabel id='demo-radio-buttons-group-label'>
                  Do you identify as a person with a disability or are you a person with accessibility needs?
                </FormLabel>
                <Controller
                  name='question3'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <RadioGroup
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.question3)}
                      aria-labelledby='demo-radio-buttons-group-label'
                      defaultValue='female'
                      name='radio-buttons-group'
                      sx={{ padding: '20px' }}
                    >
                      <FormControlLabel value={'1'} control={<Radio />} label='Option 1' />
                      <FormControlLabel value={'2'} control={<Radio />} label='Option 2' />
                      <FormControlLabel value={'3'} control={<Radio />} label='Option 3' />
                      <FormControlLabel value={'4'} control={<Radio />} label='Option 4' />
                      <FormControlLabel value={'5'} control={<Radio />} label='Option 5' />
                      <FormControlLabel value={'6'} control={<Radio />} label='Option 6' />
                    </RadioGroup>
                  )}
                />
                {errors.question3 && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.question3.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Fragment>
        )
      case 4:
        return (
          <Fragment key={step}>
            <Grid item xs={12} sm={12}>
              <FormControl sx={{ padding: '10px' }}>
                <FormLabel id='demo-radio-buttons-group-label'>
                  Do you identify as a person with a disability or are you a person with accessibility needs?
                </FormLabel>
                <Controller
                  name='question3'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <RadioGroup
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.question3)}
                      aria-labelledby='demo-radio-buttons-group-label'
                      defaultValue='female'
                      name='radio-buttons-group'
                      sx={{ padding: '20px' }}
                    >
                      <FormControlLabel value={'1'} control={<Radio />} label='Option 1' />
                      <FormControlLabel value={'2'} control={<Radio />} label='Option 2' />
                      <FormControlLabel value={'3'} control={<Radio />} label='Option 3' />
                      <FormControlLabel value={'4'} control={<Radio />} label='Option 4' />
                      <FormControlLabel value={'5'} control={<Radio />} label='Option 5' />
                      <FormControlLabel value={'6'} control={<Radio />} label='Option 6' />
                    </RadioGroup>
                  )}
                />
                {errors.question3 && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.question3.message}</FormHelperText>
                )}
              </FormControl>
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
                <Button sx={{ mr: 4 }} size='large' variant='contained' type='Submit' disabled={activeStep < 4}>
                  Submit
                </Button>

                <Button
                  size='large'
                  variant='contained'
                  type={typeSubmit}
                  onClick={handleNext}
                  disabled={activeStep === 4}
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

export default SurveyFormOne
