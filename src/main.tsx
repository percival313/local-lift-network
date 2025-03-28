
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { adsenseConfig } from './config/adsConfig.ts'

// Initialize AdSense if enabled and not in test mode
if (adsenseConfig.enabled && 
    adsenseConfig.clientId !== 'ADSENSE_CLIENT_ID' && 
    !adsenseConfig.testMode) {
  const adScript = document.createElement('script')
  adScript.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseConfig.clientId}`
  adScript.async = true
  adScript.crossOrigin = 'anonymous'
  document.head.appendChild(adScript)
  console.log('AdSense initialized from main.tsx')
}

createRoot(document.getElementById("root")!).render(<App />);

