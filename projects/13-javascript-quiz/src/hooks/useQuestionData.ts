import { useQuestionsStore } from "../store/questions"

export function useQuestionData () {
    const questions = useQuestionsStore(state => state.questions)

    let correct = 0
    let incorrect = 0
    let unanswered = 0

    questions.forEach(question => {
        const { userSelectedAnswer, correctAnswer } = question

        if (userSelectedAnswer == null) unanswered++
        else if (correctAnswer === userSelectedAnswer) correct++
        else incorrect++
    })

    return { correct, incorrect, unanswered }
}