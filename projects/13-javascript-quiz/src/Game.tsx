
import { IconButton, Stack, Card, Typography, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { useQuestionsStore } from './store/questions'
import { type Question as QuestionType } from './types.d'
import Syntaxhighlighter from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import confetti from 'canvas-confetti'
import { Footer } from './Footer'

// al dejarla fuera funcion que se crea una vez
const getBackgroundColor = (info: QuestionType, index: number) => {
    const { userSelectedAnswer, correctAnswer } = info
    // usuario no ha seleccionado nada todavia
    if (userSelectedAnswer == null) return 'transparent'
    // si ya selecciono pero la solucion es incorrecta
    if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'
    // si esta la solucion correcta
    if (userSelectedAnswer === correctAnswer) confetti()
    if (index === correctAnswer) return 'green'
    // si esta la seleccion del usuario pero no es correcta
    if (index === userSelectedAnswer) return 'red'
    //sino es ninguna
    return 'transparent'
}


const Question = ({ info }: { info: QuestionType }) => {

    const selectAnswer = useQuestionsStore(state => state.selectAnswer)

    // lo hacemos de esta manera porque creamos una funcion que va devolver una funcion 
    // const createHandleClick = (answerIndex: number) => (aqui le llegaria el event) => {
    const createHandleClick = (answerIndex: number) => () => {
        selectAnswer(info.id, answerIndex)
    }

    return (
        <Card variant='outlined' sx={{ bgcolor: '#222', p: 2, textAlign: 'left', marginTop: 4 }}>
            <Typography variant="h4">
                {info.question}
            </Typography>

            <Syntaxhighlighter language='javascript' style={gradientDark}>
                {info.code}
            </Syntaxhighlighter>
            <List sx={{ bgcolor: '#333' }} disablePadding>
                {info.answers.map((answer, index) => {
                    return (
                        <ListItem key={index} disablePadding divider
                        >
                            {/* <ListItemButton onClick={() => {
                                selectAnswer(info.id, index)
                            }} > */}
                            <ListItemButton
                                disabled={ info.userSelectedAnswer != null }
                                onClick={createHandleClick(index)}
                                sx={{ backgroundColor: getBackgroundColor(info, index) }}
                            >
                                <ListItemText
                                    sx={{ textAlign: 'center' }}
                                    primary={answer}>
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>
        </Card>
    )
}

export const Game = () => {

    const questions = useQuestionsStore(state => state.questions)
    const currentQuestion = useQuestionsStore(state => state.currentQuestion)
    const goNextQuestion = useQuestionsStore(state => state.goNextQuestion)
    const goPreviousQuestion = useQuestionsStore(state => state.goPreviousQuestion)

    const questionInfo = questions[currentQuestion]

    return (
        <>
            <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
                <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
                    <ArrowBackIosIcon />
                </IconButton>

                { currentQuestion + 1 } \ { questions.length }

                <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length - 1}>
                    <ArrowForwardIosIcon />
                </IconButton>
            </Stack>
            <Question info={questionInfo} />
            <Footer/>
        </>
    )
}