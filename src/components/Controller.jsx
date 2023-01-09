import { useEffect, useState } from "react";
import { fnList, colorList, emptyFn } from "../game";

const checkGame = (map, currentPosition) => {
    const {x,y} = currentPosition;
    const {color, destination} = map[x][y];
    if(!color) return {
            success : false,
            fail : true
        };
    if(destination) return {
        success : true,
        fail : false
    };
    return {
        success : false,
        fail : false
    }
}

const Controller = ({cards, setCards, setCurrentPosition, setCurrentDirection, currentPosition, currentDirection, map}) => {
    const [currentIndicator, setCurrentIndicartor] = useState(0);
    const [isStarted,setIsStarted] = useState(false);
    const [currentColor, setCurrentColor] = useState('');
    const [currentFn, setCurrentFn] = useState({});
    const [status,setStatus] =useState(false);
    const onHandleCard = (index) => {
            setCards(v => v.map((card,cardIdx) => {
                if(index !== cardIdx) return card;
                return {
                    ...card,
                    color : currentColor,
                    behavior : currentFn.behavior,
                    fnName : currentFn.name || '',
                }
    }))
        }
    useEffect(() => {
        if(!isStarted || status) return;
        let intervalId = setInterval(
            () => {
                const payLoad = {
                    indicator : currentIndicator,
                    position : currentPosition,
                    direction : currentDirection
                }
                if(!cards[currentIndicator]){
                    clearInterval(intervalId);
                    setStatus('종료')
                    return;
                }
                const {x,y} = currentPosition;
                const mapColor = map[x][y].color;
                const isRun = mapColor === cards[currentIndicator].color || !cards[currentIndicator].color;
                const behavior = cards[currentIndicator].behavior || emptyFn;
                const fn =  isRun ? behavior : emptyFn;
                const {
                    indicator,
                    position,
                    direction
                } = fn(payLoad);
                setCurrentIndicartor(indicator);
                setCurrentPosition({...position});
                setCurrentDirection({...direction});
                const {success, fail} = checkGame(map,position);
                if(success) {
                    clearInterval(intervalId);
                    setStatus('성공')
                    return;
                }
                if(fail) {
                    console.info('실패')
                    clearInterval(intervalId);
                    setStatus('실패')
                    return;
                }
            },1000)
            return () => clearInterval(intervalId)
    },[isStarted, currentPosition, currentDirection, currentIndicator, status])
    return (
        <div className="controller-container">
            <div className="fn-color-container">
                <div className="function-list">
                    {
                        fnList.map((fn,index) => <div 
                                                    className={`fn ${fn.name} ${currentFn.name === fn.name && 'selected'}`} 
                                                    key={index}
                                                    onClick={() => {
                                                        if(fn.name === currentFn.name) setCurrentFn(undefined);
                                                        else setCurrentFn(fn);
                                                    }}
                                                    /> 
                            )
                    }
                </div>
                <div className="color-list">
                    {
                    colorList.map((color,index) => <div 
                                                        className={`color ${color} ${currentColor === color && 'selected'}`} 
                                                        key={index}
                                                        onClick={() => {
                                                            if(color === currentColor) setCurrentColor(undefined);
                                                            else setCurrentColor(color);
                                                        }}
                                                    /> 
                            )
                    }
                </div>
            </div>
            <div className="card-list">
                <div className="card fn-card">Fn0</div>
                {
                    cards.map((card,index) => (
                        <div 
                            key={index}
                            className={
                                `
                                    card 
                                    ${card.fnName} 
                                    ${card.color} 
                                    ${isStarted && currentIndicator === index && 'indicator'}
                                `
                            } 
                            onClick={() => {
                                onHandleCard(index)
                            }}   
                        />
                    ))
                }
            </div>
            <button 
                className="run-button"
                onClick={() => {
                    setIsStarted(true)
                }}
            >
                Run!
            </button>
            <div className={`modal-text ${status && 'show'}`}>{status}</div>
        </div>
    )
}

export default Controller;