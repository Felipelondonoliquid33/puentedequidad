import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Volume2, 
  VolumeX, 
  SkipForward, 
  RefreshCw, 
  ArrowRight, 
  HelpCircle,
  HelpCircle as QuestionIcon,
  Sparkles,
  Info
} from 'lucide-react';
import { Checkpoint, GameObject, GameState } from '../types';

// Bogotá gender equality questions & facts tailored for a general audience (Japandi Minimal Retro Style)
export const CHECKPOINTS: Checkpoint[] = [
  {
    checkpointX: 15,
    pregunta: "¿Cuántas horas diarias promedio dedican las mujeres colombianas en comparación con los hombres a tareas domésticas y de cuidado no remunerado?",
    opciones: [
      { texto: "Ellas dedican 7h 46m diarias; ellos solo 3h 6m (más del doble).", correcta: true },
      { texto: "Ambos dedican la misma cantidad de tiempo (un promedio de 4h).", correcta: false },
      { texto: "Ellas dedican 4h 30m diarias; ellos dedican 5h.", correcta: false }
    ],
    educativo: "El DANE revela la cruda realidad del cansancio invisible: las mujeres colombianas dedican más del doble del tiempo diario al cuidado del hogar y de personas de su familia. Esta 'penalidad de la maternidad' y del cuidado les arreata la oportunidad de competir en igualdad de condiciones en el mercado laboral formal o descansar."
  },
  {
    checkpointX: 30,
    pregunta: "Si un hombre y una mujer en Colombia trabajan las mismas horas en su empleo formal, ¿cuántas horas extra a la semana pasa una mujer haciendo trabajo doméstico y de cuidado NO remunerado?",
    opciones: [
      { texto: "Unas 5 horas.", correcta: false },
      { texto: "Alrededor de 12 horas.", correcta: false },
      { texto: "Más de 30 horas a la semana.", correcta: true }
    ],
    educativo: "¡Exacto! Las mujeres en Colombia asumen una jornada invisible. Según el DANE, dedican en promedio 31 horas semanales a cocinar, limpiar y cuidar, mientras que los hombres solo dedican 11. ¡Eso son 20 horas de desventaja para descansar, estudiar o programar!"
  },
  {
    checkpointX: 45,
    pregunta: "En el sector de empleo informal colombiano, ¿cuál es la brecha salarial promedio que enfrentan las madres cabeza de hogar frente a los hombres?",
    opciones: [
      { texto: "No hay brecha perceptible gracias a las regulaciones de la alcaldía.", correcta: false },
      { texto: "Las mujeres reciben un ingreso de hasta un 30% menor por las mismas labores.", correcta: true },
      { texto: "La diferencia salarial es de apenas un 3% en contra de las mujeres.", correcta: false }
    ],
    educativo: "La segregación laboral coloca a las madres solteras colombianas principalmente en trabajos informales o de apoyo con bajísima remuneración. La brecha salarial del 30% en la informalidad significa que por cada 100.000 pesos que gana un hombre en la misma labor, una madre recibe solo 70.000 pesos."
  },
  {
    checkpointX: 60,
    pregunta: "Esperanza quiere postularse a una vacante de tiempo completo, pero debe cuidar a su hijo. ¿Cuál es la principal razón por la que las mujeres en Colombia están en la informalidad o desempleo?",
    opciones: [
      { texto: "No quieren trabajar.", correcta: false },
      { texto: "No tienen estudios universitarios.", correcta: false },
      { texto: "Tienen que dedicarse exclusivamente a responsabilidades familiares.", correcta: true }
    ],
    educativo: "El 58% de las mujeres fuera del mercado laboral reporta que no puede buscar empleo porque 'no tiene con quién dejar a sus hijos o familiares'. Para los hombres en la misma situación, esta cifra no llega ni al 5%. ¡Falta infraestructura de cuidado!"
  },
  {
    checkpointX: 75,
    pregunta: "De las madres cabeza de familia solteras residentes en estratos 1, 2 y 3 en Colombia, ¿qué porcentaje logra acceder a posiciones directivas o de liderazgo?",
    opciones: [
      { texto: "Cerca de un 45% de ellas lidera departamentos o gerencias.", correcta: false },
      { texto: "Más del 60% alcanza cargos ejecutivos con flexibilidad horaria.", correcta: false },
      { texto: "Apenas entre el 8% y el 12% debido a la triple jornada y ausencia de sistemas de apoyo.", correcta: true }
    ],
    educativo: "Para las madres solteras de estratos populares en Colombia, el liderazgo parece un horizonte inalcanzable. El mito del esfuerzo individual ignora que, sin un Sistema Integral de Cuidado público sólido, la triple jornada obliga a las madres a rechazar promociones o cargos de liderazgo."
  },
  {
    checkpointX: 90,
    pregunta: "Esperanza se entera de que un colega hombre en su mismo puesto y con su misma experiencia gana más que ella. En promedio, ¿cuánto menos gana una mujer en las principales ciudades de Colombia comparado con un hombre?",
    opciones: [
      { texto: "Entre un 12% y un 15% menos.", correcta: true },
      { texto: "Ganan exactamente lo mismo.", correcta: false },
      { texto: "Un 2% menos.", correcta: false }
    ],
    educativo: "Aunque la ley dice que a igual trabajo, igual salario, la brecha salarial real en ciudades como Bogotá, Medellín o Cali ronda el 15%. Es como si las mujeres trabajaran gratis los últimos 45 días del año."
  },
  {
    checkpointX: 105,
    pregunta: "¿Cómo afecta la tasa de desempleo a las madres cabeza de hogar colombianas en comparación con los jefes de hogar masculinos?",
    opciones: [
      { texto: "Su tasa de desempleo supera el 18.2%, duplicando la de los hombres.", correcta: true },
      { texto: "La tasa es idéntica en ambos sexos gracias a las leyes de equidad social.", correcta: false },
      { texto: "Los hombres sufren el doble de desempleo que las madres solteras.", correcta: false }
    ],
    educativo: "La tasa de desempleo en mujeres cabeza de familia triplica a la de hombres solteros. El mercado de reclutamiento laboral penaliza la maternidad autónoma al etiquetar prejuiciosamente a las madres solteras como personal 'de alto riesgo de inasistencia' por emergencias de cuidado de los hijos."
  },
  {
    checkpointX: 120,
    pregunta: "Vas a saltar hacia una plataforma elevada que representa los cargos de Alta Gerencia y Juntas Directivas en Colombia. ¿Qué porcentaje de estos puestos top están liderados por mujeres actualmente?",
    opciones: [
      { texto: "El 10%", correcta: false },
      { texto: "El 70%", correcta: false },
      { texto: "Menos del 48% (y baja al 25% en juntas directivas grandes).", correcta: true }
    ],
    educativo: "A esto se le llama Techo de Cristal. Las mujeres estudian más (hay más graduadas universitarias que hombres), pero a medida que subes en la pirámide corporativa, los puestos se quedan en manos masculinas por culpa de sesgos de liderazgo."
  },
  {
    checkpointX: 135,
    pregunta: "Esperanza lidera su hogar sola. En Colombia, ¿qué porcentaje de los hogares urbanos dependen hoy en día exclusivamente de la jefatura de una mujer?",
    opciones: [
      { texto: "El 15%", correcta: false },
      { texto: "Casi la mitad (48.7%).", correcta: true },
      { texto: "El 80%", correcta: false }
    ],
    educativo: "¡La mitad del país! Casi 5 de cada 10 hogares en las ciudades colombianas son sostenidos por una mamá, abuela o tía soltera. Ellas llevan el peso económico y social de las nuevas generaciones sobre sus hombros."
  },
  {
    checkpointX: 150,
    pregunta: "De las madres cabeza de hogar que logran generar ingresos en el sector de la economía popular y cooperativas, ¿dónde se concentra la gran mayoría de sus ingresos?",
    opciones: [
      { texto: "Más de 5 salarios mínimos.", correcta: false },
      { texto: "Apenas entre 1 y 1.5 salarios mínimos para sostener a toda la familia.", correcta: true },
      { texto: "Reciben sueldos en dólares.", correcta: false }
    ],
    educativo: "El presupuesto está ultra ajustado. El 35% de las madres cabeza de familia en estos sectores vive al límite, haciendo malabares para pagar arriendo, servicios, comida y educación con poco más de un salario mínimo básico."
  },
  {
    checkpointX: 162,
    pregunta: "Esperanza quiere que su hijo tenga un mejor futuro, pero mira a su alrededor en su sector laboral. ¿Qué porcentaje de los graduados en carreras de Ciencia, Tecnología, Ingeniería y Matemáticas (STEM) en Colombia son mujeres?",
    opciones: [
      { texto: "Solo el 30%.", correcta: true },
      { texto: "El 50%", correcta: false },
      { texto: "El 90%", correcta: false }
    ],
    educativo: "La brecha empieza desde la educación. Los estereotipos de género hacen que menos mujeres elijan tecnología o ingeniería. ¡Menos mujeres en STEM significa menos mujeres en los trabajos mejor pagados del futuro!"
  }
];

export default function PuenteDeEquidad() {
  // Game state
  const [gameState, setGameState] = useState<GameState>('START_SCREEN');
  const [distance, setDistance] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [energy, setEnergy] = useState<number>(3); // Simple 3 energy points
  const [isMuted, setIsMuted] = useState<boolean>(false);
  
  // Custom High Score
  const [highScore, setHighScore] = useState<number>(() => {
    return Number(localStorage.getItem('puente_high_score_japandi') || '0');
  });

  // Jumping & physics state
  const [isJumping, setIsJumping] = useState<boolean>(false);
  const [jumpTime, setJumpTime] = useState<number>(0);
  const [invulnerableFrames, setInvulnerableFrames] = useState<number>(0);

  // Entities & obstacle generators
  const [gameObjects, setGameObjects] = useState<GameObject[]>([]);
  const [currentCheckpointIndex, setCurrentCheckpointIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answeredState, setAnsweredState] = useState<'UNANSWERED' | 'CORRECT' | 'INCORRECT'>('UNANSWERED');
  const [speed, setSpeed] = useState<number>(1.1); // Calmer and approachable starting speed

  // Synchronized Game Refs to prevent frame stuttering on jump updates
  const playerYOffsetRef = useRef(0);
  const speedRef = useRef(speed);
  const currentCheckpointIndexRef = useRef(currentCheckpointIndex);

  const [activeCheckpoints, setActiveCheckpoints] = useState<Checkpoint[]>(CHECKPOINTS);
  const activeCheckpointsRef = useRef<Checkpoint[]>(CHECKPOINTS);

  const shuffleCheckpoints = () => {
    const distances = [27, 54, 81, 108, 135, 162, 189, 216, 243, 270, 297];
    const shuffled = [...CHECKPOINTS]
      .sort(() => Math.random() - 0.5)
      .map((item, idx) => ({
        ...item,
        checkpointX: distances[idx] || (idx + 1) * 27
      }));
    setActiveCheckpoints(shuffled);
    activeCheckpointsRef.current = shuffled;
  };

  // Keep refs up to date on each render
  speedRef.current = speed;
  currentCheckpointIndexRef.current = currentCheckpointIndex;

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(800);

  useEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => {
      setContainerWidth(containerRef.current?.getBoundingClientRect().width || 800);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [gameState]);

  // Sound generator
  const playSoundFX = (type: 'jump' | 'coin' | 'hit' | 'win' | 'lose' | 'click') => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      const now = ctx.currentTime;

      if (type === 'jump') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.exponentialRampToValueAtTime(450, now + 0.15);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'coin') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'hit') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.linearRampToValueAtTime(40, now + 0.22);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(350, now);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'win') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(261.63, now); // C4
        osc.frequency.setValueAtTime(329.63, now + 0.08); // E4
        osc.frequency.setValueAtTime(392.00, now + 0.16); // G4
        osc.frequency.setValueAtTime(523.25, now + 0.24); // C5
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
      } else if (type === 'lose') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.setValueAtTime(110, now + 0.15);
        osc.frequency.setValueAtTime(80, now + 0.3);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      }
    } catch (e) {
      // Audio engine muted or blocked by standard iframe policy
    }
  };

  const jump = () => {
    if (gameState !== 'PLAYING') return;
    if (isJumping) return;
    playSoundFX('jump');
    setIsJumping(true);
    setJumpTime(0);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        if (gameState === 'PLAYING') {
          jump();
        } else if (gameState === 'START_SCREEN') {
          startGame();
        }
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, isJumping]);

  // Handle jump parabola cycle (frame-rate independent)
  useEffect(() => {
    if (!isJumping) return;
    let animId: number;
    let lastJumpTime: number | null = null;
    
    const updateJump = (now: number) => {
      if (lastJumpTime === null) {
        lastJumpTime = now;
      }
      const delta = now - lastJumpTime;
      lastJumpTime = now;
      const frameScale = delta / 16.667;
      
      setJumpTime(prevT => {
        const nextT = prevT + (0.026 * frameScale);
        if (nextT >= 1) {
          setIsJumping(false);
          return 0;
        }
        return nextT;
      });
      animId = requestAnimationFrame(updateJump);
    };
    animId = requestAnimationFrame(updateJump);
    return () => cancelAnimationFrame(animId);
  }, [isJumping]);

  // Graceful high parabolic formula
  const playerYOffset = isJumping ? 4 * 135 * jumpTime * (1 - jumpTime) : 0;
  playerYOffsetRef.current = playerYOffset;

  const startGame = () => {
    playSoundFX('click');
    shuffleCheckpoints();
    setGameState('PLAYING');
    setDistance(0);
    setScore(0);
    setEnergy(3);
    setGameObjects([]);
    setCurrentCheckpointIndex(0);
    setSpeed(1.1); // Calmer and approachable starting speed
  };

  const spawnObstacle = () => {
    const obstacleChance = Math.random();
    let type: GameObject['type'] = 'POTHOLE';
    let height = 22;
    let width = 36;
    let offsetFromFloor = 0;

    if (obstacleChance < 0.3) {
      type = 'POTHOLE'; // Gap or deep pothole
      height = 18;
      width = 44;
    } else if (obstacleChance < 0.6) {
      type = 'CONE'; // Traffic barrier cone
      height = 36;
      width = 24;
    } else if (obstacleChance < 0.8) {
      type = 'COIN'; // Yellow coin of solidarity
      height = 24;
      width = 24;
      offsetFromFloor = 45; // elevated
    } else {
      type = 'BOOK'; // Book item representing study time
      height = 24;
      width = 24;
      offsetFromFloor = 55; // elevated
    }

    const item: GameObject = {
      id: `game-obj-${Math.random()}`,
      type,
      x: containerWidth + 20,
      y: offsetFromFloor,
      width,
      height
    };

    setGameObjects(prev => [...prev, item]);
  };

  // Main high-performance game tick loop (frame-rate independent)
  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    let lastTime = performance.now();
    let secondsCounter = 0;

    const tick = (now: number) => {
      const delta = Math.min(now - lastTime, 40);
      lastTime = now;
      const frameScale = delta / 16.667;

      // Update walking meters with smooth slower factor
      setDistance(prev => {
        const nextDist = prev + (0.026 * speedRef.current * frameScale);
        
        // Accumulate active score
        setScore(prevScore => {
          const nextScore = prevScore + (0.12 * speedRef.current * frameScale);
          const flooredScore = Math.floor(nextScore);
          if (flooredScore > highScore) {
            setHighScore(flooredScore);
            localStorage.setItem('puente_high_score_japandi', String(flooredScore));
          }
          return nextScore;
        });

        // Trigger station quiz checkpoint
        if (currentCheckpointIndexRef.current < activeCheckpointsRef.current.length) {
          const check = activeCheckpointsRef.current[currentCheckpointIndexRef.current];
          if (nextDist >= check.checkpointX) {
            setGameState('QUIZ');
            setAnsweredState('UNANSWERED');
            setSelectedOption(null);
            return check.checkpointX;
          }
        }

        // Final Victory point
        if (nextDist >= 320) {
          setGameState('VICTORY');
          playSoundFX('win');
          return 320;
        }

        return nextDist;
      });

      // Spawn manager - much sparser and less frantic
      secondsCounter += delta;
      if (secondsCounter > 2400 / speedRef.current) {
        spawnObstacle();
        secondsCounter = 0;
      }

      setInvulnerableFrames(prev => Math.max(0, prev - frameScale));

      // Move entities and verify fast overlap hitbox collisions
      setGameObjects(prev => {
        const kept: GameObject[] = [];
        const charX = 150; // Player resides at X 150px
        const charWidth = 40;
        const charHeight = 52;
        const charY = playerYOffsetRef.current;

        for (let obj of prev) {
          const nextX = obj.x - (2.4 * speedRef.current * frameScale); // Gentle scroll transition
          if (nextX < -50) continue; // Out of frame

          const updatedObj = { ...obj, x: nextX };

          // Realtime hitbox overlap calculations - extremely generous and forgiving margins for a casual friendly experience
          if (!updatedObj.collected) {
            const hitX = (charX + charWidth - 12 > nextX) && (charX + 12 < nextX + obj.width);
            const hitY = (charY < obj.y + obj.height - 6) && (charY + charHeight - 10 > obj.y);

            if (hitX && hitY) {
              updatedObj.collected = true;

              if (obj.type === 'POTHOLE' || obj.type === 'CONE') {
                // Hazardous street elements
                setInvulnerableFrames(f => {
                  if (f === 0) {
                    playSoundFX('hit');
                    setEnergy(life => {
                      const updatedLife = life - 1;
                      if (updatedLife <= 0) {
                        setGameState('GAME_OVER');
                        playSoundFX('lose');
                      }
                      return updatedLife;
                    });
                    return 50; // Invulnerable period (~1s)
                  }
                  return f;
                });
              } else {
                // Helpful items
                playSoundFX('coin');
                if (obj.type === 'COIN') {
                  setScore(s => s + 150);
                } else if (obj.type === 'BOOK') {
                  setScore(s => s + 250);
                }
              }
            }
          }
          kept.push(updatedObj);
        }
        return kept;
      });

      frameId = requestAnimationFrame(tick);
    };

    let frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [gameState]);

  const handleTriviaAnswer = (index: number) => {
    if (answeredState !== 'UNANSWERED') return;
    setSelectedOption(index);

    const check = activeCheckpoints[currentCheckpointIndex];
    if (check?.opciones[index]?.correcta) {
      playSoundFX('win');
      setAnsweredState('CORRECT');
      setScore(s => s + 500);
      setEnergy(e => Math.min(3, e + 1));
    } else {
      playSoundFX('lose');
      setAnsweredState('INCORRECT');
    }
  };

  const handleNextStage = () => {
    playSoundFX('click');
    setCurrentCheckpointIndex(idx => idx + 1);
    setGameState('PLAYING');
    setGameObjects([]);
    // Brief distance leap to avoid immediate spawn blockage
    setDistance(d => d + 4);
  };

  // Aesthetic ground lines scroll offset - calibrated for real-time 3-layered parallax
  const groundScroll = -(distance * 180) % 800; // Foreground road speed (1.0 factor)
  const layer2Scroll = -(distance * 72) % 400; // Middleground speed (buildings) (0.4 factor)
  const layer3Scroll = -(distance * 180) % 600; // Foreground lampposts/signs details (1.0 factor)

  // Next target checkpoint distance
  const currentTargetDistance = currentCheckpointIndex < activeCheckpoints.length 
    ? activeCheckpoints[currentCheckpointIndex].checkpointX 
    : 320;

  // Percentage of progress (0 to 100) inside the thin top status bar
  const progressPercent = Math.min((distance / 320) * 100, 100);

  return (
    <div className="w-full min-h-screen bg-[#FFCC00] text-black font-sans flex flex-col justify-between p-4 sm:p-5 pr-4 pl-4 pb-20 sm:pb-8 animate-fade-in select-none">
      
      {/* 1. Header Frame - Extremely Minimalist Japandi Aesthetics with Fancy Custom Typography */}
      <header className="w-full max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between border-b-2 border-black pb-4 mb-4 pt-2">
        <div className="flex flex-col text-center sm:text-left">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase leading-none font-youthful text-zinc-950 flex items-center justify-center sm:justify-start gap-1">
            PUENTE DE EQUIDAD
          </h1>
          <p className="text-[10px] sm:text-xs font-mono tracking-wider mt-1 text-black/75 uppercase">
            Acompaña a Esperanza, madre cabeza de familia colombiana, en su senda diaria hacia la paridad
          </p>
        </div>

      </header>

      {/* Floating retro Sound / Mute toggle button in corner keeps the titles absolutely clean */}
      <button 
        onClick={() => { playSoundFX('click'); setIsMuted(!isMuted); }}
        className="fixed bottom-4 right-4 z-40 flex items-center gap-2 bg-black text-[#FFCC00] hover:bg-white hover:text-black border-4 border-black font-mono font-bold text-xs px-4 py-3 shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all active:translate-y-0.5 active:shadow-[2px_2px_0_rgba(0,0,0,1)] cursor-pointer"
        title="Quitar/Activar Sonido"
      >
        {isMuted ? <VolumeX className="h-4.5 w-4.5 text-zinc-400" /> : <Volume2 className="h-4.5 w-4.5 text-[#FFCC00]" />}
        <span className="font-black text-[11px] leading-none uppercase">{isMuted ? 'MUTE' : 'SONIDO'}</span>
      </button>

      {/* 2. Primary Game Space Viewport - Styled specifically to match the yellow/black screenshots */}
      <main className="w-full max-w-5xl mx-auto flex-1 flex flex-col items-center justify-center py-4">
        
        {/* BIG RETRO SCOREBOARD & STATUS CENTER - Placed right above and closer to the game canvas */}
        <div className="w-full max-w-[940px] flex flex-col md:flex-row justify-between items-stretch gap-4 mb-4 font-mono select-none">
          
          <div className="flex gap-4 flex-1">
            {/* CURRENT SCORE BOARD */}
            <div className="bg-black text-[#FFCC00] border-4 border-black p-3 px-6 flex-1 flex flex-col justify-center items-center shadow-[6px_6px_0_rgba(0,0,0,1)] hover:scale-[1.01] transition-transform">
              <span className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase mb-1">PUNTAJE EXPERIENCIA</span>
              <span className="text-3xl font-black tracking-wider leading-none">{Math.floor(score)} <span className="text-xs">PTS</span></span>
            </div>

            {/* HIGH RECORD BOARD */}
            <div className="bg-white text-black border-4 border-black p-3 px-6 flex-1 flex flex-col justify-center items-center shadow-[6px_6px_0_rgba(0,0,0,1)] hover:scale-[1.01] transition-transform">
              <span className="text-[9px] font-bold tracking-widest text-zinc-500 uppercase mb-1">RECORD MÁXIMO</span>
              <span className="text-3xl font-black tracking-wider leading-none text-red-600">{Math.floor(highScore)} <span className="text-xs text-black">PTS</span></span>
            </div>
          </div>

          {/* DYNAMIC PROGRESS TIMELINE CARD */}
          <div className="bg-[#110526] text-white border-4 border-black p-3 px-6 flex flex-col justify-center shadow-[6px_6px_0_rgba(0,0,0,1)] md:min-w-[320px]">
            <span className="text-[9px] font-bold tracking-widest text-[#FFCC00] uppercase mb-1.5 text-center md:text-left block">PROGRESO DE LA JORNADA</span>
            <div className="flex items-center gap-3 w-full">
              <div className="flex-1 h-3.5 bg-black/50 border border-zinc-700 p-0.5 relative">
                <div 
                  className="h-full bg-[#FFCC00] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-sm font-black text-[#FFCC00] whitespace-nowrap leading-none">{Math.floor(distance)}M / 320M</span>
            </div>
          </div>

        </div>

        {/* Viewport Frame Box - Immersive 3-Layered Bogota Sunset Parallax (NOW LARGER) */}
        <div ref={containerRef} className="relative w-full max-w-[940px] h-[510px] bg-gradient-to-b from-[#180a2b] via-[#3d194c] via-[#852f50] to-[#cb5c43] overflow-hidden select-none border-4 border-black shadow-[10px_10px_0_rgba(0,0,0,1)]">
          
          {/* LAYER 1 (Far background): Fixed Cerros Orientales Outline Silhouette */}
          <div className="absolute inset-x-0 bottom-[48px] h-[130px] pointer-events-none opacity-90 z-0">
            <svg className="w-full h-full" viewBox="0 0 800 130" preserveAspectRatio="none">
              <polygon points="0,130 0,65 90,50 140,60 200,32 260,55 330,42 390,62 460,28 520,53 590,36 650,60 730,30 800,48 800,130" fill="#130722" />
              {/* Monserrate Sanctuary outline on peak at x=200 */}
              <rect x="196" y="24" width="8" height="9" fill="#130722" />
              <polygon points="193,24 200,17 207,24" fill="#130722" />
              {/* Guadalupe Statue icon outline on peak at x=460 */}
              <rect x="458" y="18" width="4" height="11" fill="#130722" />
              <circle cx="460" cy="16" r="2.5" fill="#130722" />
            </svg>
          </div>

          {/* LAYER 2 (Middle ground): Pixel-art buildings scrolling with distance * 0.4 */}
          <div className="absolute inset-x-0 bottom-[48px] h-[155px] pointer-events-none z-10 overflow-hidden">
            <div 
              className="flex w-[1600px] h-full absolute top-0 left-0"
              style={{ transform: `translateX(${layer2Scroll}px)` }}
            >
              {[...Array(4)].map((_, chunkIndex) => (
                <div key={chunkIndex} className="w-[400px] h-full relative flex items-end">
                  {/* Building 1 */}
                  <div className="w-[75px] h-[110px] bg-[#1a0a2c] border-r border-[#10051e] relative flex flex-col justify-start p-2 gap-1 ml-4 shadow-[inset_-3px_0_0_rgba(0,0,0,0.4)]">
                    <div className="grid grid-cols-3 gap-1">
                      {[...Array(12)].map((_, w) => (
                        <div 
                          key={w} 
                          className={`w-[5px] h-[5px] ${
                            (w + chunkIndex * 3) % 4 === 0 ? 'bg-[#FFCC00]' : 'bg-[#29133a]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  {/* Building 2 - tall */}
                  <div className="w-[85px] h-[135px] bg-[#140624] border-r border-[#0d0319] relative flex flex-col justify-start p-3 gap-1.5 ml-2 shadow-[inset_-3px_0_0_rgba(0,0,0,0.5)]">
                    <div className="grid grid-cols-4 gap-1">
                      {[...Array(16)].map((_, w) => (
                        <div 
                          key={w} 
                          className={`w-[5px] h-[5px] ${
                            (w * 7 + chunkIndex) % 5 === 1 ? 'bg-[#FFCC00]' : 'bg-[#210c32]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  {/* Building 3 */}
                  <div className="w-[60px] h-[95px] bg-[#1e0c30] border-r border-[#120521] relative flex flex-col justify-start p-2 gap-1 ml-2 shadow-[inset_-2px_0_0_rgba(0,0,0,0.4)]">
                    <div className="grid grid-cols-2 gap-1.5">
                      {[...Array(8)].map((_, w) => (
                        <div 
                          key={w} 
                          className={`w-[4.5px] h-[4.5px] ${
                            (w + chunkIndex) % 3 === 2 ? 'bg-[#FFCC00]' : 'bg-[#2c1345]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  {/* Building 4 */}
                  <div className="w-[80px] h-[120px] bg-[#170828] border-r border-[#0e021c] relative flex flex-col justify-start p-2 gap-1.5 ml-3 shadow-[inset_-3px_0_0_rgba(0,0,0,0.4)]">
                    <div className="grid grid-cols-3 gap-1.5">
                      {[...Array(12)].map((_, w) => (
                        <div 
                          key={w} 
                          className={`w-[5px] h-[5px] ${
                            (w * 3 + chunkIndex * 2) % 4 === 1 ? 'bg-[#FFCC00]' : 'bg-[#240e3b]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* LAYER 3 (Foreground details): Lampposts & city signs passing at speed distance * 1.0 */}
          <div className="absolute inset-x-0 bottom-[48px] h-[150px] pointer-events-none z-15 overflow-hidden">
            <div 
              className="flex w-[2400px] h-full absolute top-0 left-0"
              style={{ transform: `translateX(${layer3Scroll}px)` }}
            >
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-[305px] h-full relative">
                  {/* Retro lamppost with warm glowing shade */}
                  <div className="absolute bottom-0 left-[80px] w-4 h-[115px] flex flex-col items-center">
                    <div className="w-[3px] h-[95px] bg-[#111111]" />
                    <div className="w-[5px] h-[12px] bg-[#2d3748] absolute bottom-0" />
                    <div className="w-[14px] h-[4px] bg-[#111111] absolute top-[16px] left-[1px]" />
                    <div className="w-[10px] h-[8px] bg-[#FFCC00] absolute top-[20px] left-[3px] shadow-[0_0_15px_rgba(255,204,0,0.8)] animate-pulse rounded-b-sm" />
                    <div className="w-[6px] h-[4px] bg-[#222] absolute top-[16px] left-[3px]" />
                  </div>

                  {/* Retro Urban Sign indicators - "PARIDAD" / "BOGOTÁ" */}
                  {i % 2 === 0 && (
                    <div className="absolute bottom-0 left-[210px] w-[35px] h-12 flex flex-col items-center">
                      <div className="w-[2px] h-10 bg-black" />
                      <div className="absolute top-2.5 w-12 bg-black border border-white p-[2px] text-center shadow-sm">
                        <span className="text-[5px] font-mono font-bold text-[#FFCC00] uppercase block leading-none tracking-tight">PARIDAD</span>
                        <div className="w-full h-[1px] bg-white opacity-40 my-[1px]" />
                        <span className="text-[4px] font-mono text-white block leading-none">BOGOTÁ</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ACTIVE STATE OVERLAYS */}

          {/* START GAME OVERLAY */}
          {gameState === 'START_SCREEN' && (
            <div className="absolute inset-0 bg-neutral-950/95 z-30 flex flex-col items-center p-4 sm:p-6 overflow-y-auto select-text custom-scrollbar">
              
              {/* Elegant Retro Headers */}
              <div className="text-center w-full max-w-3xl mt-1 mb-2">
                <span className="text-[10px] font-mono tracking-widest text-[#FFCC00] uppercase font-black bg-black px-2.5 py-1 inline-block border border-zinc-800">
                  CRÓNICA DE LA CORRESPONSABILIDAD
                </span>
                <h2 className="text-2xl sm:text-4xl font-black uppercase text-center leading-tight mt-2 font-youthful text-white tracking-tight">
                  TE DAMOS LA BIENVENIDA A LA <span className="text-[#FFCC00]">CARRERA INVISIBLE</span>
                </h2>
              </div>

              {/* The Narrative Story Card */}
              <div className="w-full max-w-3xl bg-[#0a0a0a] border-2 border-zinc-800 p-4 sm:p-5 text-left text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans space-y-4 max-h-[300px] overflow-y-auto shadow-inner">
                
                {/* 1. Hook */}
                <div className="border-l-4 border-[#FFCC00] pl-3 py-1 bg-zinc-900/50">
                  <p className="font-mono text-zinc-100 font-bold italic leading-tight text-xs sm:text-sm">
                    "Seguro has jugado plataformeros donde el jefe final es un dragón, un alien o un robot gigante. Sencillo, ¿no? Solo saltas, esquivas y ganas. Pero hoy vas a jugar en el modo más difícil que existe: el mundo real."
                  </p>
                </div>

                {/* 2. Meet Esperanza */}
                <p>
                  Te presentamos a <strong>Esperanza</strong>. Vive en el sur de la ciudad, es fanática de la tecnología y, además, es madre cabeza de hogar. Su misión diaria no es salvar el universo; su misión es llegar a fin de mes y alimentar a su familia.
                </p>

                {/* 3. Real obstacles */}
                <div>
                  <p className="font-mono text-[#FFCC00] font-bold uppercase tracking-wider mb-2 text-[11px]">
                    ⚠️ OBSTÁCULOS REALES QUE ENFRENTARÁS:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-zinc-950 p-3 border border-zinc-800">
                      <strong className="text-white block mb-1 text-[11px] uppercase tracking-wide">🚏 El bus lleno y el tiempo en contra</strong>
                      <p className="text-[11px] text-zinc-400">Porque en Colombia, las mujeres trabajan casi el doble de horas invisibles (limpiar, cocinar, cuidar) antes de que empiece su jornada laboral oficial.</p>
                    </div>
                    
                    <div className="bg-zinc-950 p-3 border border-zinc-800">
                      <strong className="text-white block mb-1 text-[11px] uppercase tracking-wide">🧱 Los muros de cristal</strong>
                      <p className="text-[11px] text-zinc-400">Ascensos que desaparecen misteriosamente y salarios que, a igual trabajo que un hombre, valen menos.</p>
                    </div>

                    <div className="bg-zinc-950 p-3 border border-zinc-800">
                      <strong className="text-white block mb-1 text-[11px] uppercase tracking-wide">📈 La inflación de la crianza</strong>
                      <p className="text-[11px] text-zinc-400">Estirar un solo ingreso familiar para que rinda por tres seres queridos.</p>
                    </div>
                  </div>
                </div>

                {/* 4. Conclusion */}
                <p className="font-mono text-[11px] text-zinc-400">
                  Cada metro que recorras con Esperanza es una barrera superada. Pero ojo: en los puntos de control, la ciudad te va a poner a prueba. Si respondes bien, ganas impulso. Si fallas... entenderás por qué el camino es el doble de pesado.
                </p>

                <p className="font-mono text-center text-white font-bold uppercase tracking-widest text-xs pt-1">
                  ¿Crees que tienes los reflejos para romper la brecha?
                </p>

              </div>

              {/* Start Game Action */}
              <div className="mt-4 flex flex-col items-center">
                <button
                  onClick={startGame}
                  className="px-10 py-3 bg-[#FFCC00] hover:bg-white text-black font-mono font-black text-xs tracking-widest border-4 border-black uppercase hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-[6px_6px_0_rgba(0,0,0,1)] z-10"
                >
                  START GAME • INICIAR JORNADA ➔
                </button>
              </div>

            </div>
          )}

          {/* PLAYING GAMEPLAY LOOP */}
          {(gameState === 'PLAYING' || gameState === 'QUIZ') && (
            <>
              {/* Distance Traveled Info */}
              <div className="absolute top-4 left-4 z-20 flex gap-2">
                <div className="bg-black text-[#FFCC00] px-3 py-1 border-2 border-black font-mono text-xs font-black">
                  DISTANCIA: {Math.floor(distance)}m
                </div>
                <div className="bg-white text-black px-3 py-1 border-2 border-black font-mono text-xs font-black">
                  PUNTAJE: {Math.floor(score)}
                </div>
              </div>

              {/* Energy Lives HUD Container */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-black text-white px-2.5 py-1 border-2 border-black">
                {[...Array(3)].map((_, idx) => (
                  <Heart
                    key={idx}
                    className={`h-4.5 w-4.5 ${idx < energy ? 'text-[#FFCC00] fill-[#FFCC00]' : 'text-zinc-700'}`}
                  />
                ))}
              </div>

              {/* Game Objects rendered beautifully */}
              {gameObjects.map((obj) => (
                <div
                  key={obj.id}
                  className={`absolute z-30 ${obj.collected ? 'invisible' : 'visible'}`}
                  style={{
                    bottom: `${48 + obj.y}px`,
                    left: `${obj.x}px`,
                    width: `${obj.width}px`,
                    height: `${obj.height}px`,
                  }}
                >
                  {/* Highly optimized retro pixel silhouette */}
                  {obj.type === 'POTHOLE' && (
                    <svg viewBox="0 0 44 18" className="w-full h-full">
                      {/* Black gap/pit in bottom platform */}
                      <rect x="0" y="2" width="44" height="16" fill="black" />
                      <rect x="4" y="0" width="36" height="2" fill="#FFCC00" />
                    </svg>
                  )}

                  {obj.type === 'CONE' && (
                    <svg viewBox="0 0 24 36" className="w-full h-full drop-shadow-[0_4px_4px_rgba(0,0,0,0.6)]">
                      {/* Black contour background */}
                      <polygon points="12,0 -1,36 25,36" fill="black" />
                      
                      {/* Top Orange Section */}
                      <polygon points="11,4 13,4 14.5,11 9.5,11" fill="#FF5E00" />
                      
                      {/* White Stripe 1 */}
                      <polygon points="9.5,11 14.5,11 16.5,18 7.5,18" fill="white" />
                      
                      {/* Middle Orange Section */}
                      <polygon points="7.5,18 16.5,18 19,25 5,25" fill="#FF5E00" />
                      
                      {/* White Stripe 2 */}
                      <polygon points="5,25 19,25 21,32 3,32" fill="white" />
                      
                      {/* Bottom Orange Collar flange */}
                      <polygon points="3,32 21,32 22,34 2,34" fill="#FF5E00" />
                      
                      {/* Black plastic base disk at the very bottom */}
                      <ellipse cx="12" cy="34" rx="11" ry="1.5" fill="black" />
                      <ellipse cx="12" cy="34" rx="9" ry="1" fill="#111" />
                    </svg>
                  )}
 
                  {obj.type === 'COIN' && (
                    <div className="w-full h-full flex flex-col items-center justify-center relative animate-pulse">
                      <span className="text-3xl filter drop-shadow-[0_2px_3px_rgba(0,0,0,0.85)]">🧺</span>
                      <span className="absolute -bottom-3 bg-red-600 text-white text-[7px] px-1 font-mono font-black border border-black uppercase tracking-tighter whitespace-nowrap leading-none py-0.5 rounded shadow-[1px_1px_0_#000]">
                        VÍVERES
                      </span>
                    </div>
                  )}
 
                  {obj.type === 'BOOK' && (
                    <div className="w-full h-full flex flex-col items-center justify-center relative animate-pulse">
                      <span className="text-3xl filter drop-shadow-[0_2px_3px_rgba(0,0,0,0.85)]">📘</span>
                      <span className="absolute -bottom-3 bg-blue-600 text-white text-[7px] px-1 font-mono font-black border border-black uppercase tracking-tighter whitespace-nowrap leading-none py-0.5 rounded shadow-[1px_1px_0_#000]">
                        ESTUDIO
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </>
          )}

          {/* DYNAMIC RETRO PLATFORM FLOOR (Ground) - Styled perfectly as real black asphalt with double dashed yellow lines */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-[48px] bg-[#1a1a1a] border-t-4 border-[#2c2c2c] z-20"
          >
            {/* Dashed pixel-art yellow lane lines */}
            <div 
              className="w-full h-2 absolute top-[18px] opacity-90"
              style={{
                backgroundImage: 'repeating-linear-gradient(90deg, #FFCC00, #FFCC00 24px, transparent 24px, transparent 55px)',
                backgroundPositionX: `${groundScroll}px`
              }}
            />
            {/* Curb tactile line */}
            <div className="w-full h-[3px] bg-[#333333] absolute top-0" />
          </div>

          {/* CHARACTERS OR ELEMENT AT ANCHOR */}
          {(gameState === 'PLAYING' || gameState === 'QUIZ' || gameState === 'START_SCREEN') && (
            <div 
              className={`absolute left-[150px] z-30 ${
                invulnerableFrames > 0 && Math.floor(invulnerableFrames / 3) % 2 === 0 ? 'opacity-30' : 'opacity-100'
              }`}
              style={{
                bottom: `${48 + playerYOffset}px`,
                width: '40px',
                height: '52px',
              }}
            >
              <div className={gameState === 'PLAYING' && !isJumping ? 'run-anim' : ''}>
                <svg viewBox="0 0 40 52" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
                  {/* Heartwarming Adorable Pixel-Art Mother with Child in Sling */}
                  {/* Hair - Cute rounded chestnut brown look */}
                  <rect x="6" y="4" width="28" height="22" fill="#52321c" />
                  <rect x="4" y="8" width="32" height="14" fill="#52321c" />
                  <rect x="10" y="2" width="20" height="4" fill="#52321c" />
                  
                  {/* Cute Hair Bow / Ribbon - details */}
                  <rect x="28" y="2" width="6" height="6" fill="#F08080" />
                  <rect x="26" y="4" width="10" height="2" fill="#F08080" />

                  {/* Face - Warm soft skin tone */}
                  <rect x="10" y="10" width="20" height="15" fill="#FFE5D9" />
                  
                  {/* Adorable shiny expressive eyes */}
                  <rect x="13" y="13" width="4" height="4" fill="#1A1A1A" />
                  <rect x="15" y="13" width="2" height="2" fill="#FFFFFF" />
                  
                  <rect x="23" y="13" width="4" height="4" fill="#1A1A1A" />
                  <rect x="25" y="13" width="2" height="2" fill="#FFFFFF" />

                  {/* Rosy blushing checks */}
                  <rect x="11" y="17" width="4" height="3" fill="#FFA6B9" />
                  <rect x="25" y="17" width="4" height="3" fill="#FFA6B9" />

                  {/* Sweet friendly smile */}
                  <rect x="18" y="18" width="4" height="2" fill="#C74555" />

                  {/* Mother's lovely coral pink warm woolen clothes */}
                  <rect x="8" y="25" width="24" height="17" fill="#E67E80" />
                  <rect x="11" y="25" width="18" height="2" fill="#FFFFFF" />

                  {/* Cute Warm Turquoise Baby Carrier Wrap with Little Sleeping Baby */}
                  <rect x="10" y="28" width="11" height="11" fill="#75C2C0" />
                  <rect x="11" y="27" width="9" height="1" fill="#75C2C0" />
                  {/* Sleeping Baby's Little Head */}
                  <rect x="12" y="24" width="7" height="6" fill="#FFE5D9" />
                  {/* Sleping baby hair and closed eyes */}
                  <rect x="13" y="23" width="5" height="2" fill="#52321c" />
                  <rect x="13" y="26" width="1" height="1" fill="#1A1A1A" />
                  <rect x="17" y="26" width="1" height="1" fill="#1A1A1A" />
                  {/* Little baby blush */}
                  <rect x="15" y="27" width="1" height="1" fill="#FFA6B9" />

                  {/* Soft brown travel boots for gentle long walks */}
                  <rect x="11" y="42" width="6" height="8" fill="#52321c" />
                  <rect x="9" y="48" width="8" height="3" fill="black" />
                  
                  <rect x="23" y="42" width="6" height="8" fill="#52321c" />
                  <rect x="23" y="48" width="8" height="3" fill="black" />
                </svg>
              </div>
            </div>
          )}

        </div>

        {/* 3. Action Controls Row: Simple and Accessible for All Sectors with SALTAR (without trabajo) */}
        <div className="w-full max-w-[940px] mt-4 flex flex-col sm:flex-row justify-between items-center gap-4 bg-black border-2 border-black p-4 select-none">
          
          <div className="text-white text-xs font-mono text-center sm:text-left">
            <span className="text-[#FFCC00] font-bold">🎮 CONTROLES:</span> Usa el botón grande o presiona <strong className="text-white bg-zinc-800 px-1 py-0.5 rounded">ESPACIO</strong> en tu teclado para saltar las alcantarillas e imperfecciones.
          </div>

          <button
            onClick={jump}
            disabled={gameState !== 'PLAYING' || isJumping}
            className="w-full sm:w-auto px-12 py-4 bg-[#FFCC00] text-black font-black text-xl border-4 border-black shadow-[4px_4px_0_#000] active:translate-y-1 active:shadow-none hover:bg-white transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer uppercase flex items-center justify-center gap-2"
          >
            SALTAR 🦘
          </button>

        </div>

      </main>

      {/* 4. Footer Information Layout: Clear and readable for anyone */}
      <footer className="w-full max-w-5xl mx-auto mt-8 border-t-2 border-black pt-4 flex flex-col md:flex-row justify-between items-start gap-6 text-xs font-mono select-none">
        <div className="flex-1 text-left text-black/80 max-w-md">
          <span className="font-bold uppercase text-black block mb-1">¿CÓMO FUNCIONA?</span>
          <p className="font-sans leading-normal">
            El juego simula el camino y dificultades cotidianas que recorren día a día millones de mujeres "madres cabeza de familia" Colombianas! A medida que Esperanza avanza, se topa con baches y barreras (el tiempo limitado, conos u obstáculos del hogar). Evitarlos mantendrá su energía alta, mientras que las estaciones de diálogo revelan realidades de género para aprender sobre corresponsabilidad en el hogar.
          </p>
        </div>

        {/* Legend Panel of items */}
        <div className="flex flex-col text-left font-mono min-w-[240px]">
          <span className="font-bold uppercase mb-1">ELEMENTOS RECOGIDOS:</span>
          <div className="flex flex-col gap-1.5 text-[11px] text-zinc-950">
            <span className="flex items-center gap-1.5"><span className="text-sm">🧺</span> <strong>Víveres (+150 XP)</strong>: Canasta familiar y sustento básico.</span>
            <span className="flex items-center gap-1.5"><span className="text-sm">📘</span> <strong>Estudio (+250 XP)</strong>: Educación, capacitación y progreso.</span>
            <span className="flex items-center gap-1.5"><span className="text-sm">🟧⬜</span> <strong>Obstáculos</strong>: Conos de desvío y baches viales (restan energía).</span>
          </div>
        </div>

        <div className="flex flex-col text-left font-mono">
          <span className="font-bold uppercase mb-1">PROYECTIL DE APRENDIZAJE:</span>
          <span className="text-black/80">★ Bogotá Distrito Federal</span>
          <span className="text-black/80">★ Dirección de Equidad e Igualdad</span>
          <span className="text-[#1a1a1a] text-[10px] mt-2 font-bold select-text">
            Hecho desde el enfoque de género, Developed by <a href="https://www.li4uid.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-red-700 transition-colors">Liquid agency ltda.</a>
          </span>
        </div>
      </footer>

      {/* QUIZ TRIVIA FLOATING OVERLAY MODAL - Escapes overflow restraints */}
      {gameState === 'QUIZ' && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-[3px] z-50 flex items-center justify-center p-4 sm:p-6 select-text overflow-y-auto">
          
          <style>{`
            @keyframes pixel-pop {
              0% { transform: scale(0.95); opacity: 0; }
              100% { transform: scale(1); opacity: 1; }
            }
            .animate-pixel-pop {
              animation: pixel-pop 0.2s cubic-bezier(0.19, 1, 0.22, 1) forwards;
            }
            @keyframes blink-alert {
              0%, 100% { opacity: 1; filter: drop-shadow(0 0 6px rgba(239, 68, 68, 0.8)); }
              50% { opacity: 0.5; filter: none; }
            }
            .animate-blink-alert {
              animation: blink-alert 0.7s infinite steps(2);
            }
          `}</style>

          <div className="bg-zinc-950 p-1 border-4 border-black outline outline-2 outline-white select-none animate-pixel-pop max-w-[645px] w-full shadow-[0_12px_45px_rgba(0,0,0,0.95)] max-h-[95vh] overflow-y-auto my-auto">
            <div className="border-4 border-double border-[#FFCC00] p-5 sm:p-7 bg-gradient-to-b from-[#130925] to-[#0a0515] text-white flex flex-col items-center">
              
              <div className="animate-blink-alert bg-red-600 text-white font-mono text-[10px] sm:text-xs font-black tracking-[0.2em] px-4 py-1.5 uppercase border border-black shadow-[2px_2px_0_rgba(0,0,0,1)] mb-4">
                ⚠️ ALERTA DE BRECHA DE GÉNERO ⚠️
              </div>

              {/* Question header - 100% robust, beautiful, non-truncated typography */}
              <h3 className="text-base sm:text-lg md:text-xl font-black tracking-tight uppercase leading-relaxed text-center text-zinc-100 max-w-xl my-2 px-1 font-sans">
                {activeCheckpoints[currentCheckpointIndex]?.pregunta}
              </h3>

              {/* Option selection buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mt-5 select-none">
                {activeCheckpoints[currentCheckpointIndex]?.opciones.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = option.correcta;
                  
                  let btnStyle = "bg-[#20133c] text-stone-100 border-2 border-zinc-700 hover:bg-[#FFCC00] hover:text-black hover:border-white hover:scale-[1.02] hover:shadow-[0_0_12px_rgba(255,204,0,0.7)] active:scale-95";
                  if (answeredState !== 'UNANSWERED') {
                    if (isCorrect) {
                      btnStyle = "bg-[#39FF14] text-black border-4 border-white font-black shadow-[0_0_20px_#39FF14] scale-[1.02]";
                    } else if (isSelected) {
                      btnStyle = "bg-[#E30B5D] text-white border-4 border-white font-black shadow-[0_0_20px_#E30B5D]";
                    } else {
                      btnStyle = "bg-zinc-900/90 text-zinc-600 border border-zinc-800 opacity-25 line-through select-none pointer-events-none";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={answeredState !== 'UNANSWERED'}
                      onClick={() => handleTriviaAnswer(idx)}
                      className={`p-3.5 text-xs font-bold uppercase tracking-tight text-center leading-normal transition-all duration-150 rounded border ${btnStyle} ${
                        answeredState === 'UNANSWERED' ? 'cursor-pointer' : 'cursor-default'
                      }`}
                    >
                      {option.texto}
                    </button>
                  );
                })}
              </div>

              {/* Educational Fact section revealed after answering */}
              {answeredState !== 'UNANSWERED' && (
                <div className={`mt-5 p-4 sm:p-5 border-4 border-double text-left w-full select-text animate-pixel-pop ${
                  answeredState === 'CORRECT' 
                    ? 'bg-[#0a200f] border-[#39FF14] text-stone-100 shadow-[0_0_15px_rgba(57,255,20,0.15)]' 
                    : 'bg-[#21040f] border-[#E30B5D] text-stone-100 shadow-[0_0_15px_rgba(227,11,93,0.15)]'
                }`}>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl leading-none">
                      {answeredState === 'CORRECT' ? '✅' : '❌'}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`font-mono text-[9px] sm:text-[10px] font-black tracking-widest px-2.5 py-1 uppercase ${
                          answeredState === 'CORRECT' ? 'bg-[#39FF14] text-black' : 'bg-[#E30B5D] text-white'
                        }`}>
                          {answeredState === 'CORRECT' ? 'RESPUESTA CORRECTA • EQUIDAD DE GÉNERO' : 'ALERTA DE REALIDAD • BRECHA DE GÉNERO'}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-medium leading-relaxed text-zinc-200">
                        {activeCheckpoints[currentCheckpointIndex]?.educativo}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleNextStage}
                    className={`mt-4 w-full text-black text-[10px] sm:text-xs font-black tracking-widest uppercase py-3 border border-black active:translate-y-0.5 transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 ${
                      answeredState === 'CORRECT'
                        ? 'bg-[#39FF14] hover:bg-white hover:text-black'
                        : 'bg-[#FFCC00] hover:bg-white hover:text-black'
                    }`}
                  >
                    CONTINUAR RECORRIDO ➔
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>
      )}

      {/* GAME OVER CARD VIEW OVERLAY */}
      {gameState === 'GAME_OVER' && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-[3px] z-50 flex flex-col items-center justify-center p-6 text-center select-text overflow-y-auto">
          <div className="p-6 bg-black border-4 border-[#FFCC00] max-w-md w-full shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <span className="text-[10px] text-[#FFCC00] tracking-widest uppercase block mb-1">STATION ALERT</span>
            <h2 className="text-3xl font-black text-[#FFCC00] font-sans uppercase">
              AGOTAMIENTO VIAL
            </h2>
            
            <p className="text-gray-300 text-xs mt-3 leading-relaxed">
              Las barreras socioeconómicas y la falta de tiempo detuvieron temporalmente a Esperanza. ¡Pero el cambio se construye paso a paso con corresponsabilidad en el hogar!
            </p>

            <div className="my-4 p-3 bg-zinc-900 border border-zinc-800 text-left font-mono text-xs text-stone-200">
              <div className="flex justify-between mb-1">
                <span>Metros Alcanzados:</span>
                <span className="font-bold text-[#FFCC00]">{Math.floor(distance)}m</span>
              </div>
              <div className="flex justify-between">
                <span>Puntaje Logrado:</span>
                <span className="font-bold text-[#FFCC00]">{Math.floor(score)} pts</span>
              </div>
            </div>

            <button
              onClick={startGame}
              className="w-full py-3 bg-[#FFCC00] text-black font-bold uppercase tracking-wider text-xs border-2 border-black hover:bg-white transition-all cursor-pointer"
            >
              VOLVER A INTENTAR
            </button>
          </div>
        </div>
      )}

      {/* VICTORY VIREFRAME OVERLAY */}
      {gameState === 'VICTORY' && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-[3px] z-50 flex flex-col items-center justify-center p-6 text-center select-text overflow-y-auto">
          <div className="p-7 bg-[#FFCC00] text-black border-4 border-black max-w-lg shadow-[8px_8px_0_rgba(0,0,0,1)]">
            <span className="text-3xl">🏆</span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-black mt-2 font-sans">
              ¡CAMINO COMPLETADO!
            </h2>
            
            <p className="text-zinc-950 text-xs sm:text-sm mt-3 font-sans leading-relaxed text-left">
              Has guiado con éxito a Esperanza por todo el trayecto de la inclusión urbana en Bogotá. Conquistaste los retos de seguridad, respondiste a las preguntas críticas sobre la brecha de género y el empleo informal, ¡y diste fuerza a la corresponsabilidad!
            </p>

            <div className="my-4 grid grid-cols-2 gap-3 p-3 bg-black text-white border-2 border-black font-mono text-xs">
              <div>
                <span className="text-zinc-400 text-[10px] block uppercase">Puntaje Final</span>
                <span className="text-xl font-bold text-[#FFCC00]">{Math.floor(score)} PTS</span>
              </div>
              <div>
                <span className="text-zinc-400 text-[10px] block uppercase">Máximo Récord</span>
                <span className="text-xl font-bold text-white">{Math.floor(Math.max(score, highScore))} PTS</span>
              </div>
            </div>

            <button
              onClick={startGame}
              className="w-full py-3 bg-black text-[#FFCC00] font-bold uppercase text-xs border border-transparent hover:bg-white hover:text-black border-2 border-black active:scale-95 transition-all cursor-pointer font-mono"
            >
              REPETIR EXPERIENCIA
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
