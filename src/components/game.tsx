import React, { useEffect, useState, useRef } from 'react';
import { Enemy } from './enemy';

interface Enemy {
	id: number;
	position: { x: number; y: number };
	size: number;
	hp: number;
	value: number;
}

export function Game() {
	const [score, setScore] = useState(0);
	const [enemies, setEnemies] = useState<Array<Enemy>>([]);
	const [counter, setCounter] = useState(1);

  const countRef = useRef(counter);
  countRef.current = counter;

	useEffect(() => {
		const initalizer = setInterval(() => {
      const stats = randomizeEnemyStats();
			setEnemies(enemies => [
				...enemies,
				{
					id: countRef.current,
					position: { x: randomizePosition(360), y: randomizePosition(360) },
					size: stats.size,
					hp: stats.hp,
					value: stats.value,
				},
			]);
			setCounter(counter => counter + 1);
      console.log(stats)
		}, 1000);
    return () => {
      clearInterval(initalizer);
    };
	}, []);

	const randomizePosition = (multiplier: number) => {
		return Math.ceil(Math.random() * multiplier);
	};

  const randomizeEnemyStats = () => {
    const statBase = Math.ceil(Math.random() * 10);
    const size = statBase * 5;
    const hp = statBase;
    const value = statBase;
    return {size, hp, value}
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

	return (
		<div className='flex flex-col items-center p-4'>
			<h1 className='text-3xl'>React Idler</h1>
			<h2 className='text-xl'>{score}</h2>
			<div className='relative bg-slate-500 w-96 h-96 m-4'>
				<div className='absolute right-48 top-48 w-4 h-4 bg-white'></div>
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
		</div>
	);
}