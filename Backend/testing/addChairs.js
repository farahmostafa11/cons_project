const Chair = require('../controllers/chairController');
const con=require('./testConnection.js')

con.startConnection();

const room1= '61d8552a04ce814d3cad487a';//30
const room2= '61d85604e50dc24ad4ff3a5f';//20

const chairlist=['1A', '1B','1C','1D','1E','1F','1G','1H','1I','1J',
                '2A', '2B','2C','2D','2E','2F','2G','2H','2I','2J',
                '3A', '3B','3C','3D','3E','3F','3G','3H','3I','3J'];

for(let i=0;i<30;i++){
    Chair.addChair({
        roomID:room1,
        name:chairlist[i]
    });
}

for(let i=0;i<20;i++){
    Chair.addChair({
        roomID:room2,
        name:chairlist[i]
    });
}