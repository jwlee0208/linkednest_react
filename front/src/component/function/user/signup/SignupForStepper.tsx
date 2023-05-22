import React, { useRef, useState } from 'react';
import Box                                from '@mui/material/Box';
import Stepper                            from '@mui/material/Stepper';
import Step                               from '@mui/material/Step';
import StepLabel                          from '@mui/material/StepLabel';
import Button                             from '@mui/material/Button';
import Typography                         from '@mui/material/Typography';
import SignUpDetailForStepper             from './SignUpDetailForStepper';
import { GoogleReCaptchaProvider }        from 'react-google-recaptcha-v3';
import { Divider, Hidden }                from '@mui/material';
import { DesktopBox, DesktopStepperBox, MobileBox, MobileStepperBox, SignupForStepperProps, moveToLogin, steps } from '.';
import { useNavigate } from 'react-router';

function SignupForStepper({refer} : SignupForStepperProps) {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped]       = useState(new Set<number>());
  const signUpRef                   = useRef<any>();  // 하위 컴포넌트의 함수 호출 위해 선언

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  function validInputForStep(activeStep : number) {
    switch (activeStep) {
      case 0 : return signUpRef.current?.validStep0_();
      case 1 : return signUpRef.current?.validStep1_();
      case 2 : return signUpRef.current?.validStep2_();
      default : return true;
    }
  }

  const handleNext = () => {
    let newSkipped = skipped;

    if (validInputForStep(activeStep) === false) {  // to-do : 단계별 입력 정보 유효성 체크
      return false;
    }

    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const mobileSignUpBtnArea = () => {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, width:'100%'}}>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button onClick={moveToLogin} variant='outlined' sx={{mr:4, ml:4}} size='medium' fullWidth={true}>Login</Button>
      </Box>        

    )
  }

  const desktopSignUpBtnArea = () => {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, width:'100%', pr:80, pl:80}}>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button onClick={moveToLogin} variant='outlined' sx={{mr:10, ml:10}} size='medium' fullWidth={true}>Login</Button>
      </Box>        
    )
  }

  const completeStep = () => {
    const signupResult = signUpRef.current?.signupAction();
    return (
      <Box sx={{width:'100%', textAlign:'center'}}>
        <Typography sx={{ mt: 15, mb: 15}} variant='body1'>
          All steps completed - you&apos;re finished

        </Typography>
        <Hidden smDown>{desktopSignUpBtnArea()}</Hidden>
        <Hidden smUp>{mobileSignUpBtnArea()}</Hidden>
      </Box>
    )
  }

  const signUpArea = (type : string) => {
    if (type === 'mobile') {
      return (<MobileBox>{commonSignUpArea()}</MobileBox>)
    }
    return (<DesktopBox>{commonSignUpArea()}</DesktopBox>)
  }

  const commonSignUpArea = () => {
    return (
      <>
        <GoogleReCaptchaProvider reCaptchaKey="6Leh2u4lAAAAAAQvtkg58iEDLK0HR0FDE5yBaOF4">
          <SignUpDetailForStepper stepId={activeStep} keyRef={signUpRef} refer={refer}/>
        </GoogleReCaptchaProvider>      
      </>
    )
  }

  const processStepBtnArea = (type : string) => {
    if (type === 'mobile') {
      return (<MobileBox>{commonProcessStepBtnGroup()}</MobileBox>)
    }
    return (<DesktopBox>{commonProcessStepBtnGroup()}</DesktopBox>)
  }

  const commonProcessStepBtnGroup = () => {
    return (
      <>
        <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }} className='signUpPriv'>
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        {isStepOptional(activeStep) && (
          <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
            Skip
          </Button>
        )}
        <Button onClick={handleNext} className='signUpNext'>
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>  
      </>
    )
  }

  const processStep = () => {
    return (
      <React.Fragment>    
        <Hidden smDown>{signUpArea('desktop')}</Hidden>
        <Hidden smUp>{signUpArea('mobile')}</Hidden>
        <Hidden smDown>{processStepBtnArea('desktop')}</Hidden>
        <Hidden smUp>{processStepBtnArea('mobile')}</Hidden>
      </React.Fragment>
    )
  }

  const commonStepperArea = () => {
    return (
      <Box sx={{width:'100%'}}>
        <Typography variant='h4' sx={{fontWeight:'bold', pr:3, pl:3}}>Sign Up</Typography>
        <Divider sx={{pt:3, mb:5, mr:3, ml:3}}/>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ml:2, mr:2, pt:3, pb:2, borderRadius:2, backgroundColor:'#efefef'}}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>      
      </Box>
    )
  }

  const stepperArea = (type : string) => {
    if (type === 'mobile') {
      return (<MobileStepperBox>{commonStepperArea()}</MobileStepperBox>)
    }
    return (<DesktopStepperBox>{commonStepperArea()}</DesktopStepperBox>)
  }

  const detailStepArea = () => {
    if (activeStep === steps.length) {
      return completeStep();
    }
    return processStep();
  }

  return (
    <Box sx={{ width: '100%'}}>
      <Hidden smDown>{stepperArea('desktop')}</Hidden>
      <Hidden smUp>{stepperArea('mobile')}</Hidden>
      {detailStepArea()}
    </Box>
  );
}

export default SignupForStepper;