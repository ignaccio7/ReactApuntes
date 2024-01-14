
import { create } from 'zustand'
import { type Question } from '../types.d'

import { persist } from 'zustand/middleware'

interface State {
    questions: Question[]
    currentQuestion: number
    fetchQuestions: (limit: number) => Promise<void>
    selectAnswer: (questionId: number, answerIndex: number) => void
    goNextQuestion: () => void
    goPreviousQuestion: () => void
    reset: () => void
}

// sin persistencia
/*export const useQuestionsStore = create<State>((set, get) => {
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

            const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
            set({ questions })
        },

        selectAnswer: (questionId: number, answerIndex: number) => {
            // const state = get()
            const { questions } = get()
            // usar el structuredClone para clonar el objeto
            const newQuestions = structuredClone(questions)
            // encontramos el indice de la pregunta
            const questionIndex = newQuestions.findIndex(q => q.id === questionId)
            // obtenemos la informacion de la pregunta
            const questionInfo = newQuestions[questionIndex]
            // averiguamos si el usuario a seleccionado la respuesta correcta
            const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex
            // cambiamos esta informacion en la copia de la pregunta
            newQuestions[questionIndex] = {
                ...questionInfo,
                isCorrectUserAnswer,
                userSelectedAnswer: answerIndex
            }
            // actualizamos el estado
            set({
                questions: newQuestions
            })
        
        },

        goNextQuestion: () => {
            const{ currentQuestion, questions } = get()
            const nextQuestion = currentQuestion + 1

            if (nextQuestion < questions.length) {
                set({ currentQuestion: nextQuestion })
            }
        },

        goPreviousQuestion: () => {
            const { currentQuestion } = get()
            const previousQuestion = currentQuestion - 1

            if (previousQuestion >= 0) {
                set({ currentQuestion: previousQuestion })
            }

        }

    }
})*/

/*export const useQuestionsStore = create<State>()(persist((set, get) => {
    return {
        questions: [],
        currentQuestion: 0,
        fetchQuestions: async (limit: number) => {
            const response = await fetch('http://localhost:5173/data.json')
            const json = await response.json()

            const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
            set({ questions })
        },

        selectAnswer: (questionId: number, answerIndex: number) => {
            // const state = get()
            const { questions } = get()
            // usar el structuredClone para clonar el objeto
            const newQuestions = structuredClone(questions)
            // encontramos el indice de la pregunta
            const questionIndex = newQuestions.findIndex(q => q.id === questionId)
            // obtenemos la informacion de la pregunta
            const questionInfo = newQuestions[questionIndex]
            // averiguamos si el usuario a seleccionado la respuesta correcta
            const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex
            // cambiamos esta informacion en la copia de la pregunta
            newQuestions[questionIndex] = {
                ...questionInfo,
                isCorrectUserAnswer,
                userSelectedAnswer: answerIndex
            }
            // actualizamos el estado
            set({
                questions: newQuestions
            })
        
        },

        goNextQuestion: () => {
            const{ currentQuestion, questions } = get()
            const nextQuestion = currentQuestion + 1

            if (nextQuestion < questions.length) {
                set({ currentQuestion: nextQuestion })
            }
        },

        goPreviousQuestion: () => {
            const { currentQuestion } = get()
            const previousQuestion = currentQuestion - 1

            if (previousQuestion >= 0) {
                set({ currentQuestion: previousQuestion })
            }

        },
        
        reset: () => {
            set({ currentQuestion:0, questions:[] })
        }

    }
}, {
    name:'questions'
}))
*/

// la extension ed reduxdevtools tambien se puede usar con zustand
// como creariamos un middleware
const logger = (config) => (set, get, api) => {
    // set,
    // get,
    // api
    return config(
        (...args) => {
            console.log("applyng",args);
            set(...args)
            console.log("new state, get()");            
        },
    get,
    api
    )
} 

// añadiendo el middleware
export const useQuestionsStore = create<State>()(logger(persist((set, get) => {
    return {
        questions: [],
        currentQuestion: 0,
        fetchQuestions: async (limit: number) => {
            const response = await fetch('http://localhost:5173/data.json')
            const json = await response.json()

            const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
            set({ questions })
        },

        selectAnswer: (questionId: number, answerIndex: number) => {
            // const state = get()
            const { questions } = get()
            // usar el structuredClone para clonar el objeto
            const newQuestions = structuredClone(questions)
            // encontramos el indice de la pregunta
            const questionIndex = newQuestions.findIndex(q => q.id === questionId)
            // obtenemos la informacion de la pregunta
            const questionInfo = newQuestions[questionIndex]
            // averiguamos si el usuario a seleccionado la respuesta correcta
            const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex
            // cambiamos esta informacion en la copia de la pregunta
            newQuestions[questionIndex] = {
                ...questionInfo,
                isCorrectUserAnswer,
                userSelectedAnswer: answerIndex
            }
            // actualizamos el estado
            set({
                questions: newQuestions
            })
        
        },

        goNextQuestion: () => {
            const{ currentQuestion, questions } = get()
            const nextQuestion = currentQuestion + 1

            if (nextQuestion < questions.length) {
                set({ currentQuestion: nextQuestion })
            }
        },

        goPreviousQuestion: () => {
            const { currentQuestion } = get()
            const previousQuestion = currentQuestion - 1

            if (previousQuestion >= 0) {
                set({ currentQuestion: previousQuestion })
            }

        },
        
        reset: () => {
            set({ currentQuestion:0, questions:[] })
        }

    }
}, {
    name:'questions'
})))