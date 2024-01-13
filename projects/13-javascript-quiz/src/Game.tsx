
import { IconButton, Stack, Card, Typography, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { useQuestionsStore } from './store/questions'
import { type Question as QuestionType } from './types.d'
import Syntaxhighlighter from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'


const Question = ({ info }: { info: QuestionType }) => {
    return (
        <Card variant='outlined' sx={ { bgcolor:'#222', p:2, textAlign:'left', marginTop: 4 } }>
            <Typography variant="h4">
                {info.question}
            </Typography>

            <Syntaxhighlighter language='javascript' style={gradientDark}>
                {info.code}
            </Syntaxhighlighter>
            <List sx={{ bgcolor:'#333' }} disablePadding>
                { info.answers.map((answer, index)=>{
                    return(
                        <ListItem key={index} disablePadding divider> 
                            <ListItemButton>
                                <ListItemText 
                                    sx={{ textAlign:'center' }}
                                    primary={answer}>    
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                    )
                }) }
            </List>
        </Card>
    )
}

export const Game = () => {

    const questions = useQuestionsStore(state => state.questions)
    const currentQuestion = useQuestionsStore(state => state.currentQuestion)

    const questionInfo = questions[currentQuestion]

    return (
        <>
            <Question info={questionInfo} />
        </>
    )
}