import Block from "./Block"
import { convertDirectToDegre } from '../game'
const Map = ({mapInfo, currentPosition, currentDirection}) => {
    const {x,y} = currentPosition;
    const rotate = convertDirectToDegre(currentDirection)
    return (
        <div className="map">
            {
                mapInfo.map((blockRow,columnIdx) => blockRow.map((block,rowIdx) => (
                    <Block 
                    block={block} 
                    dataIndex={`${columnIdx}-${rowIdx}`} 
                    currentPosition={columnIdx === x && rowIdx === y} 
                    key={`${columnIdx}-${rowIdx}`}
                    test={rowIdx}
                    rotate={rotate}
                />)
                    ))
            }
        </div>
    )
}

export default Map;