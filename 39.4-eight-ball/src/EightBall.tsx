import {useState} from 'react'
import './EightBall.css'

interface EightBallFace {
    msg: string;
    color: string;
}

interface EightBallProps {
    eightBallMsgs?: EightBallFace[];
}

const defaultEightBallMsgs: EightBallFace[] = [
    { msg: "It is certain.", color: "green" },
    { msg: "It is decidedly so.", color: "green" },
    { msg: "Without a doubt.", color: "green" },
    { msg: "Yes - definitely.", color: "green" },
    { msg: "You may rely on it.", color: "green" },
    { msg: "As I see it, yes.", color: "green" },
    { msg: "Most likely.", color: "green" },
    { msg: "Outlook good.", color: "green" },
    { msg: "Yes.", color: "green" },
    { msg: "Signs point to yes.", color: "goldenrod" },
    { msg: "Reply hazy, try again.", color: "goldenrod" },
    { msg: "Ask again later.", color: "goldenrod" },
    { msg: "Better not tell you now.", color: "goldenrod" },
    { msg: "Cannot predict now.", color: "goldenrod" },
    { msg: "Concentrate and ask again.", color: "goldenrod" },
    { msg: "Don't count on it.", color: "red" },
    { msg: "My reply is no.", color: "red" },
    { msg: "My sources say no.", color: "red" },
    { msg: "Outlook not so good.", color: "red" },
    { msg: "Very doubtful.", color: "red" },
  ]

function EightBall({eightBallMsgs}: EightBallProps) {
    const msgAndColors = eightBallMsgs && eightBallMsgs.length > 0 ? eightBallMsgs : defaultEightBallMsgs;
    const n = msgAndColors.length

    const setMsgAndColor = () => {
        const randomIndex = Math.floor(Math.random() * n)
        setMsg(msgAndColors[randomIndex].msg)
        setColor(msgAndColors[randomIndex].color)
    }

    const [msg, setMsg] = useState("Think of a Question")
    const [color, setColor] = useState("black")

    return (
        <div className="eightball" onClick={setMsgAndColor} style={{backgroundColor: color}}>
            {msg}
        </div>
    )

}

export default EightBall