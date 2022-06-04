import React, { useEffect, useState, useRef } from 'react';
import {randomizePosition, randomizeEnemyStats} from './utilities'
import { Enemy } from './enemy';
import { Reset } from './reset';

interface Enemy {
	id: number;
	position: { x: number; y: number };
	size: number;
	hp: number;
	value: number;
  speed: number;
}

export function Game() {
	const [score, setScore] = useState(0);
	const [enemies, setEnemies] = useState<Array<Enemy>>([]);
	const [counter, setCounter] = useState(0);

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
		}, 1000);
		return () => {
			clearInterval(initializer);
		};
	}, []);

  function moveEnemies() {
    enemies.forEach(enemy => enemy.position.x += enemy.speed)
  }
  
	const handleClick = (
		e: React.MouseEvent<HTMLButtonElement>,
		id: number,
		hp: number
	): void => {
		const value = parseInt(e.currentTarget.value);
		const hitEnemy = enemies.findIndex(enemy => enemy.id === id);
		const updatedEnemies = [...enemies];
		updatedEnemies[hitEnemy].hp -= 1;
		setEnemies(updatedEnemies);
		if (hp <= 1) {
			setScore(score + value);
			setEnemies(enemies.filter(enemy => enemy.id !== id));
		}
	};

	const handleReset = () => {
    setScore(0);
		setEnemies([]);
		setCounter(0);
	};

	return (
		<div className='flex flex-col items-center p-4'>
			<h1 className='text-3xl'>React Idler</h1>
			<h2 className='text-xl'>{score}</h2>
			<div className='relative bg-slate-500 w-96 h-96 m-4'>
				<div className='absolute right-48 top-48 w-4 h-4 bg-white rounded-full'></div>
				{enemies?.map(enemy => (
					<Enemy
						key={enemy.id}
						id={enemy.id}
						position={enemy.position}
						size={enemy.size}
						hp={enemy.hp}
						value={enemy.value}
						handleClick={handleClick}
					/>
				))}
			</div>
			<Reset handleReset={handleReset} />
		</div>
	);
}
