import { useState, useEffect, useMemo, useCallback } from 'react';
import db from '../modules/firebaseDB';
import { Rank } from '../types';

export default function useRank() {
  const [init, setInit] = useState(false);
  const [originRanks, setOriginRanks] = useState<Rank[]>([]);
  useEffect(() => {
    if (init) {
      return;
    }
    (async () => {
      const data = await db.getList();
      if (data) {
        setOriginRanks(data);
      }
      setInit(true);
    })();
  }, [init]);

  const ranks = useMemo(() => {
    return [...originRanks].sort((a, b) => a.score - b.score).slice(0, 10);
  }, [originRanks]);

  const addRank = useCallback(
    async (nickname: string, score: number) => {
      db.addScore(nickname, score);
      setOriginRanks([...originRanks, { nickname, score }]);
    },
    [originRanks, setOriginRanks],
  );

  return {
    ranks,
    addRank,
  };
}
