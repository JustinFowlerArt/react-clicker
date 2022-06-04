const randomizePosition = (multiplier: number) => {
	return Math.ceil(Math.random() * multiplier);
};

const randomizeEnemyStats = () => {
	const statBase = Math.ceil(Math.random() * 10);
	const size = statBase * 5;
	const hp = statBase;
	const value = statBase * statBase;
	return { size, hp, value };
};

export { randomizePosition, randomizeEnemyStats };
