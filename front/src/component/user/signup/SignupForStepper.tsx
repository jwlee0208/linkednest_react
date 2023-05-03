import React, { useRef, useLayoutEffect } from 'react';
import Box                                from '@mui/material/Box';
import Stepper                            from '@mui/material/Stepper';
import Step                               from '@mui/material/Step';
import StepLabel                          from '@mui/material/StepLabel';
import Button                             from '@mui/material/Button';
import Typography                         from '@mui/material/Typography';
import SignUpDetailForStepper             from './SignUpDetailForStepper';

const steps = ['User Info', 'User Profile', 'Create Account'];

function SignupForStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped]       = React.useState(new Set<number>());
  const signUpRef                   = useRef<any>();  // 하위 컴포넌트의 함수 호출 위해 선언

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  function validInputForStep(activeStep : number) {
    switch (activeStep) {
      case 0 : 
        return signUpRef.current?.validStep0_();
      case 1 : 
        return signUpRef.current?.validStep1_();
      case 2 : 
        return signUpRef.current?.validStep2_();
      default : 
        return true;
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
    return <React.Fragment>
      <Typography sx={{ mt: 2, mb: 1 }}>
        All steps completed - you&apos;re finished
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button onClick={handleReset}>Reset</Button>
      </Box>
    </React.Fragment>
  }

  const processStep = () => {
    return <React.Fragment>    
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 1, m : 5, pl:30, pr:30}}>  
      <SignUpDetailForStepper stepId={activeStep} keyRef={signUpRef}/>
    </Box>      

    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, ml : 5, mr : 5, pl:30, pr:30 }}>
      <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
        Back
      </Button>
      <Box sx={{ flex: '1 1 auto' }} />
      {isStepOptional(activeStep) && (
        <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
          Skip
        </Button>
      )}
      <Button onClick={handleNext}>
        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
      </Button>
    </Box>
  </React.Fragment>
  }

  useLayoutEffect(() => {
    
  },[]);

  return (
    <Box sx={{ width: '100%', mt: 3 }}>
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