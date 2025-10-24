import React from 'react';
import ServerCustomButton from '@/core/molecules/CTAButton/ServerCustomButton';
import { CTAButtonProps } from '@/core/types/Props';
import { Locale } from '@/lib/i18n';

interface ServerCTAButtonProps extends CTAButtonProps {
  locale: Locale;
}

export default function ServerCTAButton(props: ServerCTAButtonProps) {
  const { locale, button } = props;
  const buttonSettings = button;
  
  return (
      <ServerCustomButton 
        button_image={buttonSettings.button_image}
        button_link={buttonSettings.button_link}
        button_style={buttonSettings.button_style}
        button_direction={buttonSettings.button_direction}
        locale={locale}
      />
  );
}
