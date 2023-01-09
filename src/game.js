class Card {
    constructor({color,behavior, name}){
        this.color = color;
        this.behavior = behavior;
        this.name = name;
    }
    run(game,index){
        if(!this.color || game.getColor() === this.color){
            this?.behavior(game,index);
        }
    }
}

const rotate =({x,y},angle) => {
    const newAngle = angle.toFixed(2);
    const newX =  Math.cos(newAngle) * x + Math.sin(newAngle) * y;
    const newY =  Math.cos(newAngle) * y - Math.sin(newAngle) * x;
    return {
        x : Math.round(newX),
        y : Math.round(newY)
    }
  }

const goStraightFn = ({indicator, direction, position}) => {
    const {x,y} = position;
    const deltaX = direction.x;
    const deltaY = direction.y;
    const newPosition =  { x : x + deltaX, y : y + deltaY};
    return {
        indicator : indicator + 1,
        position : newPosition,
        direction : direction
    }
}

const turnLeftFn = ({indicator, direction, position}) => {
    const {x,y} = rotate(direction, -Math.PI / 2);
    return {
        indicator : indicator + 1,
        position,
        direction : {x,y}
    }
}

const turnRightFn = ({indicator, direction, position}) => {
    const {x,y} = rotate(direction, Math.PI / 2);
    return {
        indicator : indicator + 1,
        position,
        direction : {x,y}
    }
}

const recursiveFn = ({direction, position}) => {
    return {
        indicator : 0,
        position,
        direction
    }
}
const emptyFn = ({indicator, direction, position}) => {
    return {
        indicator : indicator + 1,
        position,
        direction
    }
}

const noActionFn = ({indicator, direction, position}) => {
    return {
        indicator, 
        direction, 
        position
    }

}
const fnList = [
    { behavior : goStraightFn, name : 'go'},
    { behavior : turnLeftFn, name : 'left'},
    { behavior : turnRightFn, name : 'right'},
    { behavior : recursiveFn, name : 'recursive'},
];

const colorList = ['red','green','blue'];

const convertDirectToDegre = (direction) => {
    const {x,y} = direction;
    if(x === 0 && y === 1) return '0deg';
    if(x === 1 && y === 0) return '90deg';
    if(x === -1 && y === 0) return '-90deg';
    if(x === 0 && y === -1) return '180deg';

}

const createCards = (length) => new Array(length).fill(0).map((_,index) => new Card({}));
export {
    fnList,
    colorList,
    createCards,
    convertDirectToDegre,
    emptyFn,
    noActionFn

}