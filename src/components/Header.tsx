import {useTimersContext} from '../store/timers-context.tsx'
import Button from './UI/Button.tsx'

export default function Header() {
    //

    const timerCtx = useTimersContext()

    function handleStartAndStop() {
        timerCtx.isRunning ? timerCtx.stopTimer() : timerCtx.startTimer()
    }

    return (
        <header>
            <h1>ReactTimer</h1>

            <Button onClick={handleStartAndStop}>
                {timerCtx.isRunning ? 'Stop' : 'Start'} Timers
            </Button>
        </header>
    )
}
