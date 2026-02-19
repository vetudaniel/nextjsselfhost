'use client';

import { useEffect, useState } from 'react';

type Props = {
    generatedAt: number;
    revalidateSeconds: number;
};

export function FreshnessBadge({ generatedAt, revalidateSeconds }: Props) {
    const [isFresh, setIsFresh] = useState(true);

    useEffect(() => {
        // Check immediately on mount
        const check = () => {
            const ageMs = Date.now() - generatedAt;
            setIsFresh(ageMs < revalidateSeconds * 1000);
        };

        check();
        const interval = setInterval(check, 500);
        return () => clearInterval(interval);
    }, [generatedAt, revalidateSeconds]);

    return isFresh ? (
        <span className="inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Fresh
        </span>
    ) : (
        <span className="inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full bg-amber-950 border border-amber-800 text-amber-400">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Stale
        </span>
    );
}