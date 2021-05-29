// module.exports = function() {
//     // create a new function for StructureSpawn
//     StructureSpawn.prototype.createWorkerCreep =
//         function(energy, roleName) {
//             // create a balanced body as big as possible with the given energy
//             var name = toTitleCase(roleName) + Game.time;
//             var numberOfParts = Math.floor(energy / 200);
//             var body = [];
//             for (let i = 0; i < numberOfParts; i++) {
//                 body.push(WORK);
//             }
//             for (let i = 0; i < numberOfParts; i++) {
//                 body.push(CARRY);
//             }
//             for (let i = 0; i < numberOfParts; i++) {
//                 body.push(MOVE);
//             }

//             // create creep with the created body and the given role
//             return this.spawnCreep(body, name, { memory: {role: roleName}});
//         };

//     StructureSpawn.prototype.createMeleeSoldierCreep =
//         function(energy){
//             var name = 'melee_soldier' + Game.time;
//             var numberOfParts = Math.floor(energy/200);
//             var body = [];
//             for (let i = 0; i < numberOfParts; i++) {
//                 body.push(MOVE);
//             }
//             for (let i = 0; i < numberOfParts; i++) {
//                 body.push(MOVE);
//             }
//             for (let i = 0; i < numberOfParts; i++) {
//                 body.push(ATTACK);
//             }
//             for (let i = 0; i < numberOfParts; i++) {
//                 body.push(TOUGH);
//             }
//             for (let i = 0; i < numberOfParts; i++) {
//                 body.push(TOUGH);
//             }

//             return this.spawnCreep(body, name, { role: 'melee_soldier'});
//         };
    
//     StructureSpawn.prototype.createRangedSoldierCreep = 
//         function(energy){
//             var name = 'ranged_soldier' + Game.time;
//             var numberOfParts = Math.floor(energy/200);
//             var body = [];
//             for (let i = 0; i < numberOfParts; i++) {
//                 body.push(MOVE);
//             }
//             for (let i = 0; i < numberOfParts; i++) {
//                 body.push(RANGED_ATTACK);
//             }

//             return this.spawnCreep(body, name, { memory:{ role: 'ranged_soldier'}});
//         };
// };

function toTitleCase(str: string) {
    return str.replace(
        /\w\S*/g,
        function(txt: string) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

StructureSpawn.prototype.createWorkerCreep = function(energy: number, roleName: string){
        // create a balanced body as big as possible with the given energy
        var name = toTitleCase(roleName) + Game.time;
        var numberOfParts = Math.floor(energy / 200);
        let body: BodyPartConstant[] = [];
        for (let i = 0; i < numberOfParts; i++) {
            body.push(WORK);
        }
        for (let i = 0; i < numberOfParts; i++) {
            body.push(CARRY);
        }
        for (let i = 0; i < numberOfParts; i++) {
            body.push(MOVE);
        }
    
        // create creep with the created body and the given role
        return this.spawnCreep(body, name, { memory: {role: roleName}});
}


// StructureSpawn.prototype.createWorkerCreep =

// };
