const createCell = (x,y,color) => ({
    position : {x,y},
    color,
    destination : false
})

const createMap = () => {

const map = [];
for( let i = 0; i < 8; i++){
    map[i] = [];
    for( let j =0; j < 15; j++){
        map[i][j] = createCell(i,j); 
    }
}

// fill the map
map[1][1].color = 'red';
map[1][2].color = 'red';
map[1][3].color = 'red';
map[1][4].color = 'red';
map[1][5].color = 'red';
map[1][6].color = 'red';
map[1][7].color = 'blue';
map[1][8].color = 'red';
// map[1][8].destination = true;
map[2][8].color = 'red';
map[2][9].color = 'red';
map[3][9].color = 'red';
map[3][10].color = 'red';
map[4][10].color = 'red';
map[4][11].color = 'red';
map[5][11].color = 'red';
map[5][12].color = 'red';
map[6][12].color = 'red';
map[6][13].color = 'red';
map[6][13].destination = true;

return map;
}

export default createMap;