import React, { useState } from 'react';
import { CookiesContent } from './CookiesContent'

const COOKIE_CONSENT_PERSISTANCE_KEY = 'showCookieConsent';
const hasAcceptedBefore = localStorage.getItem(COOKIE_CONSENT_PERSISTANCE_KEY);

export const CookiesConsent = () => {
  const [hasAccepted, setAccepted] = useState(hasAcceptedBefore ? JSON.parse(hasAcceptedBefore) : false)

  const handleAccept = () => {
    setAccepted(true);
    localStorage.setItem(COOKIE_CONSENT_PERSISTANCE_KEY, JSON.stringify(true));
  }

  return(
    hasAccepted 
    ? null 
    : <CookiesContent onAccept={ handleAccept }/>
  )
};