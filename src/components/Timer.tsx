import Container from './UI/Container.tsx'
import {useTimersContext, type Timer as TimerProps} from '../store/timers-context.tsx'
import {useEffect, useRef, useState} from 'react'

export default function Timer({name, duration}: TimerProps) {
    const [remaining, setRemaining] = useState<number>(duration * 1000)
    const interval = useRef<number | null>(null)
    const {isRunning} = useTimersContext()

    useEffect(() => {
        let timer: number
        if (isRunning) {
            timer = setInterval(() => {
                setRemaining(prevRemaining => prevRemaining - 50)
            }, 50)
            interval.current = timer
        } else if (interval.current) {
            clearInterval(interval.current)
        }

        return () => {
            clearInterval(timer)
        }
    }, [isRunning])

    if (remaining <= 0) {
        clearInterval(interval.current!)
    }

    return (
        <Container as="article">
            <h2>{name}</h2>
            <p>
                <progress value={remaining} max={duration * 1000} />
            </p>
            <p>{(remaining / 1000).toFixed(2)}</p>
        </Container>
    )
}
