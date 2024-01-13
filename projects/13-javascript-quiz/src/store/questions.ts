
import { create } from 'zustand'
import { type Question } from '../types.d'

interface State {
    questions: Question[]
    currentQuestion: number
    fetchQuestions: (limit: number) => Promise<void>
    selectAnswer: ( questionId: number, answerIndex: number ) => void
}

export const useQuestionsStore = create<State>((set, get) => {
    return {
        questions: [],
        currentQuestion: 0,
        fetchQuestions: async (limit: number) => {
            // set({
            //     questions: [
            //         {
            //             "id": 1,
            //             "question": "¿Cuál es la salida de este código?",
            //             "code": "console.log(typeof NaN)",
            //             "answers": [
            //                 "undefined",
            //                 "NaN",
            //                 "string",
            //                 "number"
            //             ],
            //             "correctAnswer": 3
            //         },
            //     ]
            // })
            const response = await fetch('http://localhost:5173/data.json')
            const json = await response.json()

            const questions = json.sort(() => Math.random() - 0.5).slice(0,limit)
            set({ questions })
        },

        selectAnswer: (questionId: number, answerIndex: number) => {
            // const state = get()
            const { questions } = get()
            // usar el structuredClone para clonar el objeto
            const newQuestions = structuredClone(questions)

            const questionIndex = newQuestions.findIndex(q=>q.id === questionId)
            const questionInfo = newQuestions[questionIndex]
            const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex

            //actiañoza,ps eñ estadp
        }
    }
})