import React, { useEffect, useState, useRef } from 'react';
import { randomizePosition, randomizeEnemyStats } from './utilities';
import { Enemy } from './enemy';
import { Reset } from './reset';
import { Upgrades } from './upgrades';
import UpgradeMenu from './upgradeMenu';
import { upgradeList } from './upgradeList';

interface Enemy {
	id: number;
	position: { x: number; y: number };
	size: number;
	hp: number;
	value: number;
	speed: number;
}

interface Player {
	damage: number;
}

export function Game() {
	const [score, setScore] = useState(0);
	const [highScore, setHighScore] = useState(0);
	const [playerStats, setPlayerStats] = useState<Player>({
		damage: 1,
	});
	const [enemies, setEnemies] = useState<Array<Enemy>>([]);
	const [counter, setCounter] = useState(0);
	const [timer, setTimer] = useState(1000);

	const { upgrades, setUpgrades, handleUpgrade } = Upgrades(
		score,
		setScore,
		setTimer
	);

	const countRef = useRef(counter);
	countRef.current = counter;

	useEffect(() => {
		const initializer = setInterval(() => {
			const stats = randomizeEnemyStats();
			setEnemies(enemies => [
				...enemies,
				{
					id: countRef.current,
					position: { x: randomizePosition(320), y: randomizePosition(320) },
					size: stats.size,
					hp: stats.hp,
					value: stats.value,
					speed: 10,
				},
			]);
			setCounter(counter => counter + 1);
		}, timer);
		return () => {
			clearInterval(initializer);
		};
	}, [timer]);

	//   function moveEnemies() {
	//     enemies.forEach(enemy => enemy.position.x += enemy.speed)
	//   }

	const handleClick = (
		e: React.MouseEvent<HTMLButtonElement>,
		id: number
	): void => {
		const value = parseInt(e.currentTarget.value);
		const hitEnemy = enemies.findIndex(enemy => enemy.id === id);
		const updatedEnemies = [...enemies];
		updatedEnemies[hitEnemy].hp -= playerStats.damage + upgrades[0].modifier;
		setEnemies(updatedEnemies);
		if (updatedEnemies[hitEnemy].hp <= 0) {
			const scoreModifier =
				value + Math.ceil(Math.sqrt(value) * upgrades[1].modifier);
			setScore(score + scoreModifier);
			if (score >= highScore) {
				setHighScore(score + scoreModifier);
			}
			setEnemies(enemies.filter(enemy => enemy.id !== id));
		}
	};

	const handleReset = () => {
		setScore(0);
		setEnemies([]);
		setCounter(0);
		setUpgrades(upgradeList);
	};

	return (
		<main className='flex justify-center items-center'>
			<div className='flex flex-col items-center p-4'>
				<h1 className='text-3xl'>React Clicker</h1>
				<h2 className='text-xl'>
					Score: {score} - High Score: {highScore}
				</h2>
				<div className='relative bg-slate-500 w-96 h-96 m-4'>
					<div className='absolute right-48 top-48 w-4 h-4 bg-white rounded-full'></div>
					{enemies?.map(enemy => (
						<Enemy
							key={enemy.id}
							id={enemy.id}
							position={enemy.position}
							size={enemy.size}
							value={enemy.value}
							handleClick={handleClick}
						/>
					))}
				</div>
				<Reset handleReset={handleReset} />
			</div>
			<UpgradeMenu
				score={score}
				upgrades={upgrades}
				handleUpgrade={handleUpgrade}
			/>
		</main>
	);
}
