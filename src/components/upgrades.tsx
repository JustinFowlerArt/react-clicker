import { useEffect, useState } from 'react';
import { upgradeList } from './upgradeList';

export interface Upgrade {
	id: number;
	title: string;
	level: number;
	modifier: number;
	price: number;
	max: number;
}

export function Upgrades(
	score: number,
	setScore: React.Dispatch<React.SetStateAction<number>>,
	setTimer: React.Dispatch<React.SetStateAction<number>>
) {
	const [upgrades, setUpgrades] = useState<Array<Upgrade>>([]);

	useEffect(() => {
		setUpgrades(upgradeList);
	}, []);

	const handleUpgrade = (upgrade: Upgrade) => {
		if (score < upgrade.price || upgrade.level === upgrade.max) return;
		setScore(score - upgrade.price);
		const currentUpgrade = upgrades.findIndex(
			upgradedItem => upgradedItem.id === upgrade.id
		);
		if (currentUpgrade >= 0) {
			const newUpgrades = [...upgrades];
			newUpgrades[currentUpgrade].level += 1;
			newUpgrades[currentUpgrade].modifier += 1;
			newUpgrades[currentUpgrade].price *= 2;
			setUpgrades(newUpgrades);
		} else {
			setUpgrades([...upgrades, upgrade]);
		}
		if (currentUpgrade === 2) {
			setTimer(1000 - upgrades[2].modifier * 100);
		}
	};

	return { upgrades, setUpgrades, handleUpgrade };
}
