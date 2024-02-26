import { useRef, useState } from 'react';

export default function Player() {
	const [postaName, setPostaName] = useState('');

	const inputNode = useRef();

	const handleClick = () => {
		console.log(postaName);
		setPostaName(inputNode.current.value);
		inputNode.current.value = '';
	};
	return (
		<section id='player'>
			<h2>Welcome {postaName ? postaName : 'unknown person'}</h2>
			<p>
				<input type='text' ref={inputNode} />
				<button onClick={handleClick}>Set Name</button>
			</p>
		</section>
	);
}
