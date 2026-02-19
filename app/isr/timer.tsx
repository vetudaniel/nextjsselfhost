'use client';

import { useState, useEffect } from 'react';

export function FreshnessTimer({ generatedAt }: { generatedAt: number }) {
  const [secondsElapsed, setSecondsElapsed] = useState<number | null>(0);

  useEffect(() => {
    const updateTimer = () => {
      setSecondsElapsed(Math.floor((Date.now() - generatedAt) / 1000));
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [generatedAt]);

  return (
    <p className="text-sm text-zinc-300">
      Daten sind seit:{' '}
      <span className="text-cyan-400">
        {secondsElapsed !== null
          ? `${secondsElapsed} Sekunde${secondsElapsed !== 1 ? 'n' : ''}`
          : ''}
      </span>{' '}
      aktuell
    </p>
  );
}