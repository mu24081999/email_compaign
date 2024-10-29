// src/context/EmailContext.js
import React, { createContext, useContext, useState } from "react";

// Create context
const EmailContext = createContext();

export const useEmail = () => useContext(EmailContext);

export const EmailProvider = ({ children }) => {
  const [smtpSettings, setSmtpSettings] = useState(null); // SMTP credentials
  const [imapSettings, setImapSettings] = useState(null); // IMAP credentials

  return (
    <EmailContext.Provider
      value={{ smtpSettings, setSmtpSettings, imapSettings, setImapSettings }}
    >
      {children}
    </EmailContext.Provider>
  );
};
