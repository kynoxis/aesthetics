module.exports = function Aesthetics(dispatch) {

	const Command = require('command'),
		command = Command(dispatch),
		strOn = '<font color="#56B4E9">enabled</font>',
		strOff = '<font color="#E69F00">disabled</font>';
		
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
	
		if (autoclear){
			resetSky();
			clearAllEffects();
		}

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
			
			case 'autoclear':
				autoclear = !autoclear
				command.message('[Aesthetics] Autoclear is ' + (autoclear ? strOn : strOff))
			break;
			
			case 'clear':
				resetSky();
				clearAllEffects();
			break;
		}
		
	});
	
	//FUNCTIONS	
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
		dispatch.toClient('S_AERO', 1, {
			enabled: 0,
			blendTime: 0,
			aeroSet: ''
		});
	}
};