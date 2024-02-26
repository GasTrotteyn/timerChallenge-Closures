import { useRef, useState } from 'react';
import ResultModal from './ResultModal';

export const TimerChallenge = ({ title, targetTime }) => {
	const [running, setRunning] = useState(false);
	const [finished, setFinished] = useState(false);

	const timer = useRef();
	const modalRef = useRef();

	const handleStart = () => {
		setRunning(true);
		setFinished(false);
		timer.current = setTimeout(() => {
			setFinished(true);
			setRunning(false);
			modalRef.current.showModal();
		}, targetTime * 1000);
	};

	const handleStop = () => {
		clearTimeout(timer.current);
		setRunning(false);
	};

	// esto prueba que las closures no persisten los re-renderizados:
	// si se clickea el botón 'para el closure', la variable privada crece
	//(incluso cada TimerChallenge tiene su propia variable privada)
	// pero si se re-evalúa el componente por un setRunning, por ejemplo,
	// la variable privada vuelve al valor de original.
	const handleClosure = () => {
		let counter = 5;
		return () => {
			counter++;
			console.log(`en el timerChallenge: ${title}`, counter);
		};
	};

	const ejecutarClosure = handleClosure();
	//sin embargo, si estas líneas de arriba se pasan afuera
	//de la función del componente, la closure funciona como se espera:
	//igual que una ref, en el sentido de que persiste luego de las
	//re-evaluaciones. No iguala a las refs en el sentido de que
	//no se genera una instancia nueva por cada TimerChallenge,
	//sino que todos afectan a una única variable privada.

	return (
		<>
			<ResultModal ref={modalRef} targetTime={targetTime} result={'lost!'} />
			<section className='challenge'>
				<h2>{title}</h2>
				<p>{finished ? 'you lost' : ''}</p>
				<p className='challenge-time'>
					{targetTime} second{targetTime > 1 ? 's' : ''}
				</p>
				<p>
					<button onClick={running ? handleStop : handleStart}>{running ? 'Stop' : 'Start'}</button>
				</p>
				<p className={running ? 'active' : ''}>{running ? 'Time is running' : 'timer inactive'}</p>
				<button onClick={ejecutarClosure}>para el closure</button>
			</section>
		</>
	);
};
