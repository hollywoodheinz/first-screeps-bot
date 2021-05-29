import {roleUpgrader} from "./upgrader"
export class roleBuilder{

    /** @param {Creep} creep **/
    public static run(creep: Creep) {

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if(target) {
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }else{
            	roleUpgrader.run(creep);
			}
	    }
	    else {
	        let source = creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.harvest(source as Source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source as Source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};