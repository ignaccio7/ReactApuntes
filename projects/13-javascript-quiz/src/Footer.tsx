import { Button } from "@mui/material"
import { useQuestionData } from "./hooks/useQuestionData"
import { useQuestionsStore } from "./store/questions"

export const Footer = () => {

    const { correct, incorrect, unanswered } = useQuestionData()
    const reset = useQuestionsStore(state => state.reset)

    const handleReset = () => {
        reset()
    }

    return (
        <footer style={{ marginTop: '1rem' }}>
            <strong>
                ✅ { correct } correct -
                ✖️ { incorrect } incorrect - 
                ❓ { unanswered } unanswered
            </strong>
            <div style={{ marginTop:'1rem' }}>
                <Button onClick={handleReset}> Reset Game </Button>
            </div>
        </footer>
    )
}