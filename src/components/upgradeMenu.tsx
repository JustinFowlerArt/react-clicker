import { Upgrade } from './upgrades';

interface Props {
	score: number;
	upgrades: Upgrade[];
	handleUpgrade: (upgrade: Upgrade) => void;
}

export default function UpgradeMenu({ score, upgrades, handleUpgrade }: Props) {
	return (
		<div className='flex flex-col items-center p-4'>
			<h2 className='text-xl'>Upgrades</h2>
			<ul className='flex flex-col w-44'>
				{upgrades?.map(upgrade => (
					<button
						key={upgrade.id}
						className={`rounded-md py-2 px-4 mt-2 ${
							upgrade.price <= score && upgrade.level !== upgrade.max
								? 'bg-green-500'
								: 'bg-red-500'
						}`}
						onClick={() => handleUpgrade(upgrade)}
					>
						<h3 className='font-semibold'>
							{upgrade.level} - {upgrade.title}
						</h3>
						<h4>
							Price: {upgrade.level !== upgrade.max ? upgrade.price : 'Max'}
						</h4>
					</button>
				))}
			</ul>
		</div>
	);
}
