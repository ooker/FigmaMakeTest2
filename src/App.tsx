import { useState, useEffect, useRef } from 'react';
import { Button } from './components/ui/button';
import { Sparkles } from 'lucide-react';

const PICTIONARY_WORDS = [
  'Elephant', 'Rainbow', 'Pizza', 'Guitar', 'Robot', 'Castle', 'Dragon', 'Umbrella',
  'Butterfly', 'Telescope', 'Mountain', 'Rocket', 'Lighthouse', 'Dinosaur', 'Sunflower',
  'Octopus', 'Waterfall', 'Bicycle', 'Pyramid', 'Volcano', 'Penguin', 'Tornado',
  'Skateboard', 'Snowman', 'Helicopter', 'Cactus', 'Treasure', 'Astronaut', 'Jellyfish',
  'Campfire', 'Windmill', 'Parachute', 'Mushroom', 'Carousel', 'Thunderstorm', 'Igloo',
  'Telescope', 'Peacock', 'Compass', 'Lighthouse', 'Hammock', 'Cupcake', 'Trophy',
  'Anchor', 'Balloon', 'Crown', 'Drumset', 'Ferris Wheel', 'Giraffe', 'Iceberg',
  'Kangaroo', 'Lantern', 'Mermaid', 'Ninja', 'Owl', 'Panda', 'Quicksand', 'Raccoon',
  'Sailboat', 'Toucan', 'Unicorn', 'Volleyball', 'Wizard', 'Xylophone', 'Yeti', 'Zebra',
  'Airplane', 'Beehive', 'Camera', 'Dolphin', 'Eiffel Tower', 'Flamingo', 'Galaxy',
  'Horseshoe', 'Iguana', 'Jackpot', 'Kite', 'Ladybug', 'Mango', 'Narwhal', 'Orchestra',
  'Pineapple', 'Quokka', 'Rollercoaster', 'Starfish', 'Trampoline', 'UFO', 'Violin',
  'Watermelon', 'Yo-yo', 'Zeppelin', 'Accordion', 'Bonfire', 'Chandelier', 'Dreamcatcher'
];

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export default function App() {
  const [currentWord, setCurrentWord] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning]);

  const handleStart = () => {
    if (!isRunning) {
      // Select random word and reset timer
      const randomIndex = Math.floor(Math.random() * PICTIONARY_WORDS.length);
      setCurrentWord(PICTIONARY_WORDS[randomIndex]);
      setTimeElapsed(0);
      setIsRunning(true);
      setWordCount(wordCount + 1);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: '#FFE951' }}>
      {/* Content */}
      <div className="w-full max-w-2xl">
        <div className="bg-white border-8 border-black p-12" style={{ boxShadow: '12px 12px 0px 0px #000000' }}>
          {/* Title */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Sparkles className="w-10 h-10" style={{ color: 'oklch(76.8% 0.233 130.85)' }} />
              <h1 className="text-5xl" style={{ color: '#000000', fontWeight: 700 }}>Pictionary</h1>
              <Sparkles className="w-10 h-10" style={{ color: 'oklch(76.8% 0.233 130.85)' }} />
            </div>
            <p className="text-xl" style={{ color: '#000000' }}>Draw the word!</p>
            <p className="text-sm mt-2" style={{ color: '#666666' }}>{wordCount}/{PICTIONARY_WORDS.length}</p>
          </div>

          {/* Word Display */}
          {currentWord && (
            <div className="mb-8 text-center">
              <div className="inline-block px-8 py-6 border-6 border-black" 
                   style={{ 
                     backgroundColor: 'oklch(76.8% 0.233 130.85)',
                     boxShadow: '8px 8px 0px 0px #000000',
                     borderWidth: '6px'
                   }}>
                <p className="text-6xl tracking-wide" style={{ color: '#000000', fontWeight: 700 }}>
                  {currentWord}
                </p>
              </div>
            </div>
          )}

          {/* Timer Display */}
          {currentWord && (
            <div className="mb-10 text-center">
              <div className="inline-block px-12 py-4 border-6 border-black" 
                   style={{ 
                     backgroundColor: 'oklch(52% 0.105 223.128)',
                     boxShadow: '8px 8px 0px 0px #000000',
                     borderWidth: '6px'
                   }}>
                <p className="text-5xl tabular-nums" style={{ color: '#FFFFFF' }}>
                  {formatTime(timeElapsed)}
                </p>
              </div>
            </div>
          )}

          {/* Placeholder when no word */}
          {!currentWord && (
            <div className="mb-10 text-center py-20">
              <p className="text-3xl" style={{ color: '#666666' }}>Press Start to get your word!</p>
            </div>
          )}

          {/* Control Button */}
          <div className="text-center">
            {!isRunning ? (
              <Button
                onClick={handleStart}
                size="lg"
                className="text-3xl px-16 py-8 border-6 border-black text-black transition-all hover:translate-x-1 hover:translate-y-1"
                style={{ 
                  backgroundColor: 'oklch(76.8% 0.233 130.85)',
                  boxShadow: '8px 8px 0px 0px #000000',
                  borderWidth: '6px',
                  borderRadius: '0'
                }}
              >
                Start
              </Button>
            ) : (
              <Button
                onClick={handleStop}
                size="lg"
                className="text-3xl px-16 py-8 border-6 border-black text-white transition-all hover:translate-x-1 hover:translate-y-1"
                style={{ 
                  backgroundColor: 'oklch(52% 0.105 223.128)',
                  boxShadow: '8px 8px 0px 0px #000000',
                  borderWidth: '6px',
                  borderRadius: '0'
                }}
              >
                Stop
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}