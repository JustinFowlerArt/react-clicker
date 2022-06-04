interface Props {
	id: number;
	position: { x: number; y: number };
	size: number;
	hp: number;
	value: number;
	handleClick: (
		e: React.MouseEvent<HTMLButtonElement>,
		id: number,
		hp: number
	) => void;
}

export function Enemy({ id, position, size, hp, value, handleClick }: Props) {
	const dynamicStyles = {
		left: position.x,
		top: position.y,
		width: size,
		height: size,
	};

	return (
		<button
			type='button'
			className={`absolute bg-black rounded-full`}
			style={dynamicStyles}
			onMouseDown={e => handleClick(e, id, hp)}
			value={value}
		></button>
	);
}
