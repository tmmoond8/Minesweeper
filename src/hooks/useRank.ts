import { useState, useEffect, useMemo, useCallback } from 'react';
import db from '../modules/firebaseDB';
import { Rank } from '../types';

export default function useRank() {
  const [inital, setInital] = useState(false);
  const [originRanks, setOriginRanks] = useState<Rank[]>([]);
  useEffect(() => {
    if (inital) {
      return;
    }
    (async () => {
      const data = await db.getList();
      if (data) {
        console.log(data);
        setOriginRanks(data);
      }
      setInital(true);
    })();
  }, [inital]);

  const ranks = useMemo(() => {
    originRanks.sort((a, b) => a.score - b.score);
    return originRanks.slice(0, 10);
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
