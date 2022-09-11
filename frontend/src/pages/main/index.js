import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
// import  Link  from "next/link"
import Button from '@mui/material/Button';

import Hero from '../../styles/hero-style'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { useRouter } from 'next/router'

const HeroSection = () => {
  return (
    <>

    <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          outline: '1px solid red',
          position: "sticky",
          top: 0,
          backgroundColor: "#512E67",
          padding: "1rem",
          // opacity: 0.2,
          // filter: "blur(1rem)",
          // zIndex: 0
          // backgroundImage='image/home-digital-agency/hero-l7-bg.png'

        }}
      >
        <p style={{zIndex: 10}}>App Logo</p>
        <Button variant="contained" style={{backgroundColor: '#752A5A', borderRadius: "30px"}} href='/login'>
          Sign In
        </Button>
      </div>
    <Hero backgroundImage='image/home-digital-agency/hero-l7-bg.png'>


      <Container>
        <Row className='align-items-center justify-content-center'>
          <Col className='col-xl-9'>
            <Hero.Content className='text-center'>
              <Hero.Icon>
                <i className='fa fa-bell' />
              </Hero.Icon>
              <Hero.Title as='h1' fontColor='#fff'>
                What's your motive
              </Hero.Title>
              <Hero.Text fontColor='#fff'>
                A survey app for your employees.
                <br className='d-none d-xs-block' /> Find what motivates your employees.{' '}
              </Hero.Text>
            </Hero.Content>
          </Col>
        </Row>
      </Container>
    </Hero>
    </>
  )
}

HeroSection.getLayout = page => <BlankLayout>{page}</BlankLayout>
HeroSection.guestGuard = true

export default HeroSection
