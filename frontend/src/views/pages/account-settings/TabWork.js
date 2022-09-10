// ** React Imports
import { useState } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import { FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'

// ** Auth Imports
import { getLocalStorage } from 'src/hooks/helpers'

// ** Config
import authConfig from 'src/configs/auth'

// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import axios from 'axios'
import toast from 'react-hot-toast'

const TabWork = ({ data }) => {
  // ** State
  const [submit, setSubmit] = useState('save changes')

  // ** Hooks
  const router = useRouter()

  // Tokenization for server request
  const storageChecked = getLocalStorage('accessToken')

  const defaultValues = {
    shift: data.shift,
    labour: data.labour,
    travel: data.travel,
    vehicle: data.vehicle
  }

  // YUP validation rules
  const schema = yup.object().shape({
    shift: yup.string().required(),
    labour: yup.boolean().required(),
    vehicle: yup.boolean().required(),
    travel: yup.boolean().required()
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
    const { shift, labour, vehicle, travel } = data

    axios({
      method: 'PUT',
      url: 'http://localhost:8000/api/user/update/settings/work-tab',
      data: {
        shift,
        labour,
        travel,
        vehicle
      },
      headers: {
        Authorization: `Bearer ${storageChecked}`
      }
    })
      .then(async res => {
        window.localStorage.removeItem('userData')
        window.localStorage.removeItem(authConfig.storageTokenKeyName)
        window.localStorage.setItem(authConfig.storageTokenKeyName, res.data.accessToken)
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
            console.log('WORK INFO UPDATE SUCCESS', response)
            setSubmit('Save changes')
            toast.success('Your work details have been successfully updated!')
            router.push('/user-profile')
          })
          .catch(error => {
            console.log('WORK INFO UPDATE ERROR', error.data)
            toast.error('Your work details failed to update. Please try again!')
          })
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent>
        <Grid item xs={12} sm={12}>
          <FormControl sx={{ padding: '10px' }}>
            <FormLabel id='demo-radio-buttons-group-label'>Do you prefer day, night or both shifts? *</FormLabel>
            <Controller
              name='shift'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <RadioGroup
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.shift)}
                  aria-labelledby='demo-radio-buttons-group-label'
                  defaultValue='female'
                  name='radio-buttons-group'
                  sx={{ padding: '20px' }}
                >
                  <FormControlLabel value='Day' control={<Radio />} label='I prefer day shift only' />
                  <FormControlLabel value='Night' control={<Radio />} label='I prefer night shift only' />
                  <FormControlLabel
                    value='Day, Night'
                    control={<Radio />}
                    label='I will work both day and night shifts'
                  />
                </RadioGroup>
              )}
            />
            {errors.shift && <FormHelperText sx={{ color: 'error.main' }}>{errors.shift.message}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl sx={{ padding: '10px' }}>
            <FormLabel id='demo-radio-buttons-group-label'>
              Are you able and interested in doing labour shifts? The ability to move heavy objects is required. *
            </FormLabel>
            <Controller
              name='labour'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <RadioGroup
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.labour)}
                  aria-labelledby='demo-radio-buttons-group-label'
                  defaultValue='female'
                  name='radio-buttons-group'
                  sx={{ padding: '20px' }}
                >
                  <FormControlLabel value={true} control={<Radio />} label="Yes, I don't mind doing physical labour" />
                  <FormControlLabel value={false} control={<Radio />} label="No, I don't want to do physical labour" />
                </RadioGroup>
              )}
            />
            {errors.labour && <FormHelperText sx={{ color: 'error.main' }}>{errors.labour.message}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl sx={{ padding: '10px' }}>
            <FormLabel id='demo-radio-buttons-group-label'>Do you own or have a car to drive to work? *</FormLabel>
            <Controller
              name='vehicle'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <RadioGroup
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.vehicle)}
                  aria-labelledby='demo-radio-buttons-group-label'
                  defaultValue='female'
                  name='radio-buttons-group'
                  sx={{ padding: '20px' }}
                >
                  <FormControlLabel value={true} control={<Radio />} label='Yes, I have a car' />
                  <FormControlLabel value={false} control={<Radio />} label='No, I do not have a car' />
                </RadioGroup>
              )}
            />
            {errors.vehicle && <FormHelperText sx={{ color: 'error.main' }}>{errors.vehicle.message}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl sx={{ padding: '10px' }}>
            <FormLabel id='demo-radio-buttons-group-label'>Are you willing to drive long distances? *</FormLabel>
            <Controller
              name='travel'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <RadioGroup
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.travel)}
                  aria-labelledby='demo-radio-buttons-group-label'
                  defaultValue='female'
                  name='radio-buttons-group'
                  sx={{ padding: '20px' }}
                >
                  <FormControlLabel value={true} control={<Radio />} label='Yes, I can travel far distances' />
                  <FormControlLabel value={false} control={<Radio />} label="No, I can't travel far distances" />
                </RadioGroup>
              )}
            />
            {errors.travel && <FormHelperText sx={{ color: 'error.main' }}>{errors.travel.message}</FormHelperText>}
          </FormControl>
        </Grid>
        <Box>
          <Button variant='contained' sx={{ mr: 4 }} type='submit'>
            {submit}
          </Button>
          {/* <Button
            type='reset'
            variant='outlined'
            color='secondary'
            onClick={() => setValues({ ...values, currentPassword: '', newPassword: '', confirmNewPassword: '' })}
          >
            Reset
          </Button> */}
        </Box>
      </CardContent>
    </form>
  )
}

export default TabWork
