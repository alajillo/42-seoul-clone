const  Block = ({block, dataIndex, currentPosition, rotate}) => {
    const {color, destination} = block;
    return (
        <div 
            className={`block ${destination ? 'destination' : ''} ${currentPosition ? 'currentPosition' : ''}`} 
            style={{
            '--color' : color,
            '--rotate' : rotate
            }} 
            data-index={dataIndex} />
    )
}

export default Block;