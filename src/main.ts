import "prototypes/spawn"
import { ErrorMapper } from "utils/ErrorMapper";
import {roleHarvester} from "roles/harvester"
import {roleBuilder} from "roles/builder"
import {roleRepairer} from "roles/repairer"
import {roleUpgrader} from "roles/upgrader"
import {roleWallRepairer} from "roles/wall_repairer"


declare global {
  /*
    Example types, expand on these or remove them and add your own.
    Note: Values, properties defined here do no fully *exist* by this type definiton alone.
          You must also give them an implemention if you would like to use them. (ex. actually setting a `role` property in a Creeps memory)

    Types added in this `global` block are in an ambient, global context. This is needed because `main.ts` is a module file (uses import or export).
    Interfaces matching on name from @types/screeps will be merged. This is how you can extend the 'built-in' interfaces from @types/screeps.
  */
  // Memory extension samples
  interface Memory {
    uuid: number;
    log: any;
  }

  interface CreepMemory {
    role: string;
    room?: string;
    working?: boolean;
    building?: boolean;
  }

  interface Room {
      defendRoom(roomName: string): void;
  }

  interface StructureSpawn{
    createWorkerCreep(energy: number, roleName: string): ScreepsReturnCode;
  }
  // Syntax for adding proprties to `global` (ex "global.log")
  namespace NodeJS {
    interface Global {
      log: any;
    }
  }
}

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);
      // Global Variables
      var maxCreeps = 12;
      var minHarvesters = 6;
      var minUpgraders = 1;
      var minBuilders = 1;
      var minRepairers = 1;
      var minWallRepairer = 1;
      var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
      var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
      var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
      var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
      var wallRepairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'wall_repairer');
      var currentCreeps = _.filter(Game.creeps, (creep) => true);
      var energy = Game.spawns.Spawn1.room.energyCapacityAvailable;

      console.log('Harvesters: ' + harvesters.length + '|Builders: ' + builders.length +'|Upgraders: ' + upgraders.length + '|Repairers: ' + repairers.length + '|Wall Repairers: ' + wallRepairers.length);

      // Shows how much energy is in the room
      for(var name in Game.rooms) {
          console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
          Game.rooms[name].defendRoom
      }

      // Cleans up dead creeps from memory
      for(var name in Memory.creeps) {
          if(!Game.creeps[name]) {
              delete Memory.creeps[name];
              console.log('Clearing non-existing creep memory:', name);
          }
      }

      //TODO Cant show name of creep spawn right after command due to tick delay, will need to come up with a different method to handle this.

      //Creep Generation Logic
      if(harvesters.length < minHarvesters) {
          if(Game.spawns.Spawn1.createWorkerCreep(energy, 'harvester') == OK){
              // console.log('Spawning new harvester: ' + Game.spawns['Spawn1'].spawning.name);
          }
      }
      else if(upgraders.length < minUpgraders) {
          if(Game.spawns.Spawn1.createWorkerCreep(energy, 'upgrader') == OK){
              // console.log('Spawning new upgrader: ' + Game.spawns['Spawn1'].spawning.name);
          }
      }
      else if(builders.length < minBuilders) {
          if(Game.spawns.Spawn1.createWorkerCreep(energy, 'builder') == OK){
              // console.log('Spawning new builder: ' + Game.spawns['Spawn1'].spawning.name);
          }
      }else if(repairers.length < minRepairers) {
          if(Game.spawns.Spawn1.createWorkerCreep(energy, 'repairer') == OK){
              // console.log('Spawning new repairer: ' + Game.spawns['Spawn1'].spawning.name);
          }
      }
      else if(wallRepairers.length < minWallRepairer) {
          if(Game.spawns.Spawn1.createWorkerCreep(energy, 'wall_repairer') == OK) {
              // console.log('Spawning new repairer: ' + Game.spawns['Spawn1'].spawning.name);
          }
      }
      else if(currentCreeps.length < maxCreeps){
          if(Game.spawns.Spawn1.createWorkerCreep(energy, 'builder') == OK){
              // console.log('Spawning new builder: ' + Game.spawns.Spawn1.spawning.name);
          }
      }


      if(Game.spawns['Spawn1'].spawning) {
          var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
          Game.spawns['Spawn1'].room.visual.text(
              '🛠️' + spawningCreep.memory.role,
              Game.spawns['Spawn1'].pos.x + 1,
              Game.spawns['Spawn1'].pos.y,
              {align: 'left', opacity: 0.8});
      }



      for(var name in Game.creeps) {
          var creep = Game.creeps[name];
          switch (creep.memory.role){
              case 'harvester':
                  roleHarvester.run(creep);
                  break;
              case 'upgrader':
                  roleUpgrader.run(creep);
                  break;
              case 'builder':
                  roleBuilder.run(creep);
                  break;
              case 'repairer':
                  roleRepairer.run(creep);
                  break;
              case 'wall_repairer':
                  roleWallRepairer.run(creep);
                  break;
          }
      }


  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
});
