module.exports = function Aesthetics(dispatch) {

	const Command = require('command');
	const command = Command(dispatch);
	const {
		aero: 	AERO,
		aura: 	AURA,
		shield: SHIELD,
		hand: 	HAND,
		ground: GROUND,
		etc: 	ETC
	} = require('./values.json');
	
	let pcid,
		effects = [],
        autoclear = true;

	//HOOKS
	dispatch.hook('S_LOGIN', 2, (event) => {
		pcid = event.cid
	});
	
	//COMMANDS
	command.add('aes', (type, effect, arg3) => {
	
		if (type == 'clear' || autoclear){
			resetSky();
			clearAllEffects();
		}
		
		if (type == 'autoclear'){
			autoclear = !autoclear
			command.message('Aesthetics \'autoclear\' is ' + (autoclear ? 'enabled.' : 'disabled.'))
		}
	
		if (autoclear) {
			setTimeout(() => {
				handle(type, effect, arg3)
			}, 1000);
		} else {
			handle(type, effect, arg3)
		}
		
	});
	
	//FUNCTIONS
	function handle(type, effect, arg3){
		switch (type) {
			case 'sky':
				dispatch.toClient('S_AERO', 1, {
					enabled: 1,
					blendTime: 0,
					aeroSet: AERO[effect]
				});
			break;
			
			case 'aura':
				if (arg3 == 'rm')
					addEffect(AURA[effect]);
				else
					removeEffect(AURA[effect]);
			break;
			
			case 'shield':
				if (arg3 == 'rm')
					addEffect(SHIELD[effect]);
				else
					removeEffect(SHIELD[effect]);
			break;
			
			case 'hand':
				if (arg3 == 'rm')
					addEffect(HAND[effect]);
				else
					removeEffect(HAND[effect]);
			break;
			
			case 'ground':
				if (arg3 == 'rm')
					addEffect(GROUND[effect]);
				else
					removeEffect(GROUND[effect]);
			break;
			
			case 'etc':
				if (arg3 == 'rm')
					addEffect(ETC[effect]);
				else
					removeEffect(ETC[effect]);
			break;
		}
	}
	
	function addEffect(eid){
		dispatch.toClient('S_ABNORMALITY_BEGIN', 2, {
			target: pcid,
			source: 69696969,
			id: eid,
			duration: 0,
			unk: 0,
			stacks: 1,
			unk2: 0
		});
		
		effects.push(eid);
	}
	
	function removeEffect(eid){
		dispatch.toClient('S_ABNORMALITY_END', 1, {
			target: pcid,
			id: ground[effect]
		});
		
		effects.splice(effects.indexOf(eid), 1);
	}
	
	function clearAllEffects(){
		for (let eid of effects) {
			dispatch.toClient('S_ABNORMALITY_END', 1, {
				target: pcid,
				id: eid
			});
		}

		effects.splice(0, effects.length);		
	}
	
	function resetSky(){
		dispatch.toClient('S_START_ACTION_SCRIPT', 1, {
			cid: pcid,
			unk1: 105,
			unk2: 0
		});
	}
};