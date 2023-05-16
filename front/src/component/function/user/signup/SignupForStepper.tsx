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
import { DesktopBox, MobileBox, SignupForStepperProps, moveToHome, steps } from '.';


function SignupForStepper({refer} : SignupForStepperProps) {
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

  const completeStep = () => {
    const signupResult = signUpRef.current?.signupAction();
    return (
      <>
        <Typography sx={{ mt: 2, mb: 1 }}>
          All steps completed - you&apos;re finished
          {JSON.stringify(signupResult)}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button onClick={moveToHome}>Home</Button>
        </Box>        
      </>
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

  return (
    <Box sx={{ width: '100%'}}>
      <Typography variant='h4' sx={{fontWeight:'bold'}}>Sign Up</Typography>
      <Divider sx={{pt:3, mb:5}}/>
      <Stepper activeStep={activeStep} alternativeLabel>
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
      {activeStep === steps.length ? completeStep() : processStep()}
    </Box>
  );
}

export default SignupForStepper;