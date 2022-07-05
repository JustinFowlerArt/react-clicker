import { Upgrade } from './upgrades';

export const upgradeList: Upgrade[] = [
	{
		id: 1,
		title: 'Damage +1',
		level: 1,
		modifier: 1,
		price: 500,
		max: 10,
	},
	{
		id: 2,
		title: 'Score +1',
		level: 1,
		modifier: 1,
		price: 1000,
		max: 10,
	},
	{
		id: 3,
		title: 'Spawn Rate +1',
		level: 1,
		modifier: 0,
		price: 2000,
		max: 10,
	},
];
