import React from 'react';
import styled from 'styled-components';

import { rem } from 'styles';
import { brand, lightGrey } from 'styles/colors';

interface StepperProps {
  steps: string[];
  className?: string;
  currentStep: number;
  step?: number;
}
interface InnerProps {
  className?: string;
  currentStep: number;
  step: number;
}

const Stepper: React.FunctionComponent<StepperProps> = ({
  steps,
  className,
  currentStep,
}) => {
  return (
    <Container>
      <StyledStepper className={className}>
        <Circle step={0} currentStep={currentStep} className={className} />
        {steps.map((ste, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <React.Fragment key={index}>
                <Line
                  step={index}
                  currentStep={currentStep}
                  className={className}
                />
                <Circle
                  step={index}
                  currentStep={currentStep}
                  className={className}
                />
              </React.Fragment>
            )}
          </React.Fragment>
        ))}
      </StyledStepper>
      <LabelContainer>
        <Label currentStep={currentStep} step={1}>
          {steps[0]}
        </Label>
        {steps.map((ste, index) => (
          <React.Fragment key={index}>
            {index > 0 && index && (
              <React.Fragment key={index}>
                <LabelSpacer
                  step={index}
                  currentStep={currentStep}
                  className={className}
                />
                <Label
                  step={index + 1}
                  currentStep={currentStep}
                  className={className}
                >
                  {ste}
                </Label>
              </React.Fragment>
            )}
          </React.Fragment>
        ))}
      </LabelContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledStepper = styled.div<Partial<StepperProps>>`
  margin: ${rem(10)} auto;
  display: flex;
  outline: none;
  box-sizing: border-box;
  border: none;
  align-items: center;
  width: 100%;
  justify-content: center;
`;

const Circle = styled.div<InnerProps>`
  height: ${rem(10)};
  width: ${rem(10)};
  display: flex;
  box-sizing: border-box;
  z-index: 1;
  border-radius: 50%;
  background: ${({ step, currentStep }) =>
    currentStep > step ? brand : lightGrey};
  border: none;
  align-items: center;
  justify-content: center;
`;

const Line = styled.div<InnerProps>`
  height: ${rem(5)};
  margin: 0 ${rem(3)};
  display: flex;
  flex: 1;
  box-sizing: border-box;
  background: ${({ step, currentStep }) =>
    currentStep > step ? brand : lightGrey};
  border: none;
  align-items: center;
  justify-content: center;
`;

const LabelContainer = styled.div<Partial<StepperProps>>`
  margin: ${rem(10)} auto ${rem(30)};
  display: flex;
  outline: none;
  box-sizing: border-box;
  border-radius: ${rem(50)};
  border: none;
  align-items: center;
  width: 100%;
  justify-content: center;
`;

const Label = styled.div<InnerProps>`
  display: flex;
  justify-content: center;
  color: ${({ step, currentStep }) =>
    currentStep >= step ? brand : lightGrey};
`;

const LabelSpacer = styled.div<InnerProps>`
  height: ${rem(5)};
  margin: 0 ${rem(3)};
  display: flex;
  flex: 1;
  box-sizing: border-box;
  background: transparent;
  border: none;
  align-items: center;
  justify-content: center;
`;

export default Stepper;
