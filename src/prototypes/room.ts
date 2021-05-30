Room.prototype.defendRoom = function (){
    
    var hostiles = this.find(FIND_HOSTILE_CREEPS);
    if(hostiles.length > 0) {
        let username = hostiles[0].owner.username;
        let towers: StructureTower[] = []
        Game.notify(`User ${username} spotted in room ${this.name}`);
        let structures = this.find(
            FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        for(var structure of structures){
            if(structure instanceof StructureTower){
                towers.push(structure);
            }
        }
        
        towers.forEach(tower => tower.attack(hostiles[0]));
    }
}