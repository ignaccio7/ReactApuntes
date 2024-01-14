import { Container, Stack, Typography } from '@mui/material'
import './App.css'
import { LogoJavaScript } from './components/Logos'
import { Start } from './Start'
import { useQuestionsStore } from './store/questions.ts'
import { Game } from './Game.tsx'

function App() {  

  const questions = useQuestionsStore(state => state.questions)

  console.log(questions);
  

  return (
    <main>
      <Container maxWidth='sm'>
        <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
          <LogoJavaScript/>
          <Typography variant="h2" component="h1">
            JavaScript Quiz
          </Typography>
        </Stack>
      </Container>

      { questions.length === 0  && <Start/>}
      { questions.length > 0 && <Game/> }

    </main>
  )
}

export default App
