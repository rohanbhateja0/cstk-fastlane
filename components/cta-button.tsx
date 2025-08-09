import React from 'react';
import CustomButton from '@/core/molecules/CTAButton/CustomButton';
import { CTAButtonProps } from '@/core/types/Props';

export default function CTAButton(props: CTAButtonProps) {

  const buttonSettings = props.button;
  
  return (
      <CustomButton 
        button_image={buttonSettings.button_image}
        button_link={buttonSettings.button_link}
        button_style={buttonSettings.button_style}
        button_direction={buttonSettings.button_direction}
      />
  );
}
