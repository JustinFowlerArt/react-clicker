interface Props {
	handleReset: () => void;
}

export function Reset({ handleReset }: Props) {
	return (
		<button
			type='button'
			className='bg-slate-300 rounded-md py-2 px-4'
			onClick={handleReset}
		>
			Reset
		</button>
	);
}
