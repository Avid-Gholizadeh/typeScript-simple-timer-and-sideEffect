import {createContext, type ReactNode, useContext, useReducer} from 'react'

export type Timer = {
    duration: number
    name: string
}
type TimersState = {
    isRunning: boolean
    timers: Timer[]
}

type TimersContextValue = TimersState & {
    addTimer: (timer: Timer) => void
    startTimer: () => void
    stopTimer: () => void
}

const TimersContext = createContext<TimersContextValue | null>(null)

export function useTimersContext() {
    const ctxObj = useContext(TimersContext)
    if (ctxObj === null) {
        throw new Error('Context object must not be null.')
    }

    return ctxObj
}

type PropTypes = {
    children: ReactNode
}
type TimersAction = {type: 'addTimer'; payload: Timer} | {type: 'startTimer'} | {type: 'stopTimer'}

function timerReducer(state: TimersState, action: TimersAction) {
    switch (action.type) {
        case 'addTimer':
            return {...state, timers: [...state.timers, action.payload]}
        case 'startTimer':
            return {...state, isRunning: true}
        case 'stopTimer':
            return {...state, isRunning: false}
        default:
            return state
    }
}
export default function TimerContextProvider({children}: PropTypes) {
    const [timerState, dispatch] = useReducer(timerReducer, {isRunning: false, timers: []})

    const ctxObj: TimersContextValue = {
        isRunning: timerState.isRunning,
        timers: timerState.timers,
        addTimer: timer => dispatch({type: 'addTimer', payload: timer}),
        startTimer: () => dispatch({type: 'startTimer'}),
        stopTimer: () => dispatch({type: 'stopTimer'}),
    }

    return <TimersContext.Provider value={ctxObj}>{children}</TimersContext.Provider>
}
