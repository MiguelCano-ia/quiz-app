import { createRoot } from 'react-dom/client'
import { QuizApp } from './QuizApp'
import { StrictMode } from 'react'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QuizApp />
  </StrictMode>,
)
