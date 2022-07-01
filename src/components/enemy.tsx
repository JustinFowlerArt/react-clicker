interface Props {
	id: number;
	position: { x: number; y: number };
	size: number;
	value: number;
	handleClick: (e: React.MouseEvent<HTMLButtonElement>, id: number) => void;
}

export function Enemy({ id, position, size, value, handleClick }: Props) {
	const dynamicStyles = {
		left: position.x,
		top: position.y,
		width: size,
		height: size,
	};

	return (
		<button
			type='button'
			className='absolute bg-black rounded-full'
			style={dynamicStyles}
			onMouseDown={e => handleClick(e, id)}
			value={value}
		></button>
	);
}
