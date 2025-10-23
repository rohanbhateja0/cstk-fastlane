import React from 'react';
import ServerCustomButton from '@/core/molecules/CTAButton/ServerCustomButton';
import { CTAButtonProps } from '@/core/types/Props';

export default function ServerCTAButton(props: CTAButtonProps) {

  const buttonSettings = props.button;
  
  return (
      <ServerCustomButton 
        button_image={buttonSettings.button_image}
        button_link={buttonSettings.button_link}
        button_style={buttonSettings.button_style}
        button_direction={buttonSettings.button_direction}
      />
  );
}
