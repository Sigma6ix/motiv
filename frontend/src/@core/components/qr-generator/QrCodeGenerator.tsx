import React, { useState } from 'react'
import { InputField } from './InputField'
import { QRCode } from 'react-qrcode-logo'
import { SelectField } from './SelectField'
import { ImageUploadField } from './ImageUploadField'
import { CheckboxField } from './CheckboxField'
import ReactJson from 'react-json-view'
import html2canvas from 'html2canvas'
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  styled,
  TextField,
  Typography
} from '@mui/material'
import { InputFieldColor } from './InputFieldColor'

const App: React.FC = () => {
  const [state, setState] = useState({
    // we init this cause is more practical with TS, but eyeRadius is an optional prop
    eyeradius_0_outer_0: 0,
    eyeradius_0_outer_1: 0,
    eyeradius_0_outer_2: 0,
    eyeradius_0_outer_3: 0,
    eyeradius_0_inner_0: 0,
    eyeradius_0_inner_1: 0,
    eyeradius_0_inner_2: 0,
    eyeradius_0_inner_3: 0,
    eyeradius_1_outer_0: 0,
    eyeradius_1_outer_1: 0,
    eyeradius_1_outer_2: 0,
    eyeradius_1_outer_3: 0,
    eyeradius_1_inner_0: 0,
    eyeradius_1_inner_1: 0,
    eyeradius_1_inner_2: 0,
    eyeradius_1_inner_3: 0,
    eyeradius_2_outer_0: 0,
    eyeradius_2_outer_1: 0,
    eyeradius_2_outer_2: 0,
    eyeradius_2_outer_3: 0,
    eyeradius_2_inner_0: 0,
    eyeradius_2_inner_1: 0,
    eyeradius_2_inner_2: 0,
    eyeradius_2_inner_3: 0
  })

  const handleChange = ({ target }: any) => {
    setState(prevState => ({ ...prevState, [target.name]: target.value }))
  }

  const handleDownload = () => {
    html2canvas(document.querySelector('#react-qrcode-logo') as any).then(function (canvas) {
      const link = document.createElement('a')
      link.download = 'react-qrcode-logo.png'
      link.href = canvas.toDataURL()
      link.click()
    })
  }

  const buildEyeRadiusInput = (id: string) => {
    return (
      <Slider
        name={id}
        min={0}
        max={50}
        defaultValue={(state as any)[id]}
        aria-label='Default'
        valueLabelDisplay='auto'
        onChange={handleChange}
      />

      // <InputField
      //   name={id}
      //   type='range'
      //   handleChange={handleChange}
      //   min={0}
      //   max={50}
      //   hideLabel
      //   defaultValue={(state as any)[id]}
      // />
    )
  }

  return (
    <div className='app'>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', paddingRight: '30px' }}>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', paddingBottom: '30px' }}>
            <div style={{ width: '350px', display: 'flex', flexDirection: 'column', padding: '15px' }}>
              <TextField
                id='qr-code-url'
                name='value'
                label='QR Code URL'
                onChange={handleChange}
                size='small'
                sx={{ paddingBottom: '15px' }}
              />
              <FormControl sx={{ paddingBottom: '15px', paddingTop: '5px' }}>
                <Typography id='demo-simple-select-helper-label'>Error Correction Level</Typography>
                <Select
                  name='ecLevel'
                  size='small'
                  defaultValue='M'
                  id='demo-simple-select-helper'
                  labelId='demo-simple-select-helper-label'
                  onChange={handleChange}
                >
                  <MenuItem value='M'>M</MenuItem>
                  <MenuItem value='L'>L</MenuItem>
                  <MenuItem value='Q'>Q</MenuItem>
                  <MenuItem value='H'>H</MenuItem>
                </Select>
              </FormControl>
              <FormControlLabel
                sx={{ paddingBottom: '10px' }}
                control={<Checkbox />}
                label='Enable CORS'
                name='enableCORS'
                onChange={handleChange}
              />
              <Box sx={{ m: 1 }} />
              <Typography gutterBottom>QR Code Size</Typography>
              <Slider
                name='size'
                valueLabelDisplay='auto'
                aria-label='custom thumb label'
                defaultValue={150}
                onChange={handleChange}
                min={100}
                max={250}
              />
              <Box sx={{ m: 1 }} />
              <Typography gutterBottom>Quiet Zone</Typography>
              <Slider
                name='quietZone'
                valueLabelDisplay='auto'
                aria-label='custom thumb label'
                defaultValue={30}
                onChange={handleChange}
                min={20}
                max={50}
              />
              <Box sx={{ m: 1 }} />

              <div style={{ display: 'flex', flexDirection: 'row', marginTop: '15px', justifyContent: 'space-around' }}>
                <div>
                  <Typography sx={{ paddingBottom: '10px' }}>BG Color</Typography>
                  <div className='input-color-container'>
                    <InputField
                      name='bgColor'
                      type='color'
                      className='input-color'
                      defaultValue='#ffffff'
                      handleChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <Typography sx={{ paddingBottom: '10px' }}>FG Color</Typography>
                  <div className='input-color-container'>
                    <InputField
                      name='fgColor'
                      type='color'
                      className='input-color'
                      defaultValue='#000000'
                      handleChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div style={{ width: '350px', display: 'flex', flexDirection: 'column', padding: '15px' }}>
              <ImageUploadField name='logoImage' handleChange={handleChange} />
              <Box sx={{ m: 3 }} />
              <Typography gutterBottom>Logo Width</Typography>
              <Slider
                name='logoWidth'
                valueLabelDisplay='auto'
                aria-label='custom thumb label'
                onChange={handleChange}
                min={20}
                max={250}
              />
              <Box sx={{ m: 1 }} />
              <Typography gutterBottom>Logo Height</Typography>
              <Slider
                name='logoHeight'
                valueLabelDisplay='auto'
                aria-label='custom thumb label'
                onChange={handleChange}
                min={20}
                max={250}
              />
              <Box sx={{ m: 1 }} />
              <Typography gutterBottom>Logo Opacity</Typography>
              <Slider
                name='logoOpacity'
                valueLabelDisplay='auto'
                aria-label='custom thumb label'
                onChange={handleChange}
                min={0}
                max={1}
                step={0.1}
              />
              <Box sx={{ m: 1 }} />
              <FormControl sx={{ paddingBottom: '15px', paddingTop: '5px' }}>
                <Typography id='demo-simple-select-helper-label'>Error Correction Level</Typography>
                <Select
                  name='qrStyle'
                  size='small'
                  defaultValue='squares'
                  id='demo-simple-select-helper'
                  labelId='demo-simple-select-helper-label'
                  onChange={handleChange}
                >
                  <MenuItem value='squares'>Squares</MenuItem>
                  <MenuItem value='dots'>Circles</MenuItem>
                </Select>
              </FormControl>
              <FormControlLabel
                sx={{ paddingBottom: '10px' }}
                control={<Checkbox />}
                label='Remove Behind Logo'
                name='removeQrCodeBehindLogo'
                onChange={handleChange}
              />
            </div>
          </div>
          <div style={{ padding: '15px' }}>
            <Typography variant='h6'>Eye Radius</Typography>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ padding: '15px', width: '33%' }}>
                <p style={{ fontSize: 16, marginLeft: '-15px' }}>Top left eye</p>
                <p style={{ fontSize: 14 }}>Outer</p>
                {buildEyeRadiusInput('eyeradius_0_outer_0')}
                {buildEyeRadiusInput('eyeradius_0_outer_1')}
                {buildEyeRadiusInput('eyeradius_0_outer_2')}
                {buildEyeRadiusInput('eyeradius_0_outer_3')}
                <p style={{ fontSize: 14 }}>Inner</p>
                {buildEyeRadiusInput('eyeradius_0_inner_0')}
                {buildEyeRadiusInput('eyeradius_0_inner_1')}
                {buildEyeRadiusInput('eyeradius_0_inner_2')}
                {buildEyeRadiusInput('eyeradius_0_inner_3')}
              </div>
              <div style={{ padding: '15px', width: '33%' }}>
                <p style={{ fontSize: 16, marginLeft: '-15px' }}>Top right eye</p>
                <p style={{ fontSize: 14 }}>Outer</p>
                {buildEyeRadiusInput('eyeradius_1_outer_0')}
                {buildEyeRadiusInput('eyeradius_1_outer_1')}
                {buildEyeRadiusInput('eyeradius_1_outer_2')}
                {buildEyeRadiusInput('eyeradius_1_outer_3')}
                <p style={{ fontSize: 14 }}>Inner</p>
                {buildEyeRadiusInput('eyeradius_1_inner_0')}
                {buildEyeRadiusInput('eyeradius_1_inner_1')}
                {buildEyeRadiusInput('eyeradius_1_inner_2')}
                {buildEyeRadiusInput('eyeradius_1_inner_3')}
              </div>
              <div style={{ padding: '15px', width: '33%' }}>
                <p style={{ fontSize: 16, marginLeft: '-15px' }}>Bottom left eye</p>
                <p style={{ fontSize: 14 }}>Outer</p>
                {buildEyeRadiusInput('eyeradius_2_outer_0')}
                {buildEyeRadiusInput('eyeradius_2_outer_1')}
                {buildEyeRadiusInput('eyeradius_2_outer_2')}
                {buildEyeRadiusInput('eyeradius_2_outer_3')}
                <p style={{ fontSize: 14 }}>Inner</p>
                {buildEyeRadiusInput('eyeradius_2_inner_0')}
                {buildEyeRadiusInput('eyeradius_2_inner_1')}
                {buildEyeRadiusInput('eyeradius_2_inner_2')}
                {buildEyeRadiusInput('eyeradius_2_inner_3')}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            style={{
              width: 400,
              height: 400,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: 'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',
              borderRadius: '25px'
            }}
          >
            <QRCode
              {...{
                ...state,
                eyeRadius: [
                  // build eyeRadius manually
                  {
                    outer: [
                      state.eyeradius_0_outer_0,
                      state.eyeradius_0_outer_1,
                      state.eyeradius_0_outer_2,
                      state.eyeradius_0_outer_3
                    ],
                    inner: [
                      state.eyeradius_0_inner_0,
                      state.eyeradius_0_inner_1,
                      state.eyeradius_0_inner_2,
                      state.eyeradius_0_inner_3
                    ]
                  },
                  {
                    outer: [
                      state.eyeradius_1_outer_0,
                      state.eyeradius_1_outer_1,
                      state.eyeradius_1_outer_2,
                      state.eyeradius_1_outer_3
                    ],
                    inner: [
                      state.eyeradius_1_inner_0,
                      state.eyeradius_1_inner_1,
                      state.eyeradius_1_inner_2,
                      state.eyeradius_1_inner_3
                    ]
                  },
                  {
                    outer: [
                      state.eyeradius_2_outer_0,
                      state.eyeradius_2_outer_1,
                      state.eyeradius_2_outer_2,
                      state.eyeradius_2_outer_3
                    ],
                    inner: [
                      state.eyeradius_2_inner_0,
                      state.eyeradius_2_inner_1,
                      state.eyeradius_2_inner_2,
                      state.eyeradius_2_inner_3
                    ]
                  }
                ]
              }}
            />
          </div>
          <div>
            <Button fullWidth variant='contained' onClick={handleDownload} sx={{ marginTop: '40px', padding: '15px' }}>
              Download QR Code
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

{
  /* <div style={{ marginLeft: '15px' }}>
  <p>State snapshot (debug purposes)</p>
  <ReactJson src={state} style={{ marginBottom: 40 }} />
</div> */
}
