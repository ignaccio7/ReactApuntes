
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useStore } from './hooks/useStore';

import { Container, Row, Col, Button, Stack } from 'react-bootstrap';
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from './constants';
import { IconInterchange, IconCopyClipBoard, IconSpeaker } from './components/Icons.jsx'
import { LanguageSelector } from './components/LanguageSelector.js';
import { SectionType } from './types.d';
import { TextArea } from './components/TextArea.js';
import { useEffect } from 'react'
import { translate } from './services/translate.js';
import { useDebounce } from './hooks/useDebounce.js';

function App() {

  const { loading,
    fromLanguage,
    toLanguage,
    fromText,
    result,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult } = useStore()

  // const debouncedFromText = useDebounce(fromText, 1000)
  const debouncedFromText = useDebounce<string>(fromText, 1000)

  useEffect(() => {
    // console.log('Use effect',fromText);

    if (debouncedFromText === '') return setResult('')

    translate({ fromLanguage, toLanguage, text: debouncedFromText })
      .then(result => {
        if (result === null) return

        setResult(result)
      })
      .catch(() => {
        // console.log('Error al traducir');        
        setResult('Error al traducir')
      })

  }, [debouncedFromText, fromLanguage, toLanguage])

  // -> para el copyclipboard
  const handleCopyClipBoard = () => {
    navigator.clipboard.writeText(result).catch(() => { })
  }
  // -> para el speaker
  const handleSpeaker = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage] // esto para el tipo de voz
    utterance.rate = 0.9 // esto es para la velocidad
    speechSynthesis.speak(utterance)
  }

  return (
    <>
      <Container fluid>
        <h1>Google Translate</h1>
        {/* <button  
          onClick={()=>{
            dispatch({type:'SET_FROM_LANGUAGE', payload:'es'})
          }}
        >
          Cambiar a Español
        </button> */}
        {/* { fromLanguage }
        <button
          onClick={()=>{
            setFromLanguage('es')
          }}
        >
          Cambiar a Español
        </button> */}

        <Row>
          <Col>
            <Stack gap={2}>
              <h2>From</h2>
              <LanguageSelector
                onChange={setFromLanguage}
                type={SectionType.From}
                value={fromLanguage}
              />
              {/* {fromLanguage} */}
              <TextArea
                type={SectionType.From}
                value={fromText}
                onChange={setFromText}
              />
            </Stack>
          </Col>
          <Col xs='auto'>
            <Button variant='link'
              onClick={interchangeLanguages}
              disabled={fromLanguage === AUTO_LANGUAGE}
            >
              <IconInterchange />
            </Button>
          </Col>
          <Col>
            <Stack gap={2}>
              <h2>To</h2>
              <LanguageSelector
                onChange={setToLanguage}
                type={SectionType.To}
                value={toLanguage}
              />
              {/* {toLanguage} */}
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', right: 0, bottom: 0, display:'flex', gap:'0rem'}}>
                  <Button
                    variant='link'
                    onClick={handleCopyClipBoard}
                    style={{ color: 'black' }}
                  >
                    <IconCopyClipBoard />
                  </Button>
                  <Button
                    variant='link'
                    onClick={handleSpeaker}
                    style={{ color: 'black' }}
                  >
                    <IconSpeaker />
                  </Button>
                </div>
                <TextArea
                  loading={loading}
                  type={SectionType.To}
                  value={result}
                  onChange={setResult}
                />
              </div>
            </Stack>
          </Col>
        </Row>

      </Container>
    </>
  )
}

export default App
