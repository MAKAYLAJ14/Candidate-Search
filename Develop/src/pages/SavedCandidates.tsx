import type React from 'react';
import { useEffect, useState } from 'react';
import type Candidate from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
    const [filmsToWatch, setFilmsToWatch] = useState<Candidate[]>([]);
  
    const removeFromStorage = (
      e: React.MouseEvent<SVGSVGElement, MouseEvent>,
      currentlyOnWatchList: boolean | null | undefined,
      currentlyOnSeenItList: boolean | null | undefined,
      title: string | null
    ) => {
      e.preventDefault();
      if (currentlyOnWatchList) {
        let parsedFilmsToWatch: Candidate[] = [];
  
        const storedFilmsToWatch = localStorage.getItem('filmsToWatch');
        if (typeof storedFilmsToWatch === 'string') {
          parsedFilmsToWatch = JSON.parse(storedFilmsToWatch);
        }
        parsedFilmsToWatch = parsedFilmsToWatch.filter(
          (Candidate) => Candidate.Name !== title
        );
        setFilmsToWatch(parsedFilmsToWatch);
        localStorage.setItem('filmsToWatch', JSON.stringify(parsedFilmsToWatch));
      } else if (currentlyOnSeenItList) {
        let parsedAlreadySeenFilms: Candidate[] = [];
        const storedAlreadySeenFilms = localStorage.getItem('alreadySeenFilms');
        if (typeof storedAlreadySeenFilms === 'string') {
          parsedAlreadySeenFilms = JSON.parse(storedAlreadySeenFilms);
        }
        parsedAlreadySeenFilms = parsedAlreadySeenFilms.filter(
          (Candidate) => Candidate.Name !== title
        );
        localStorage.setItem(
          'alreadySeenFilms',
          JSON.stringify(parsedAlreadySeenFilms)
        );
      }
    };
  
    useEffect(() => {
      const parsedFilmsToWatch = JSON.parse(
        localStorage.getItem('filmsToWatch') as string
      );
      setFilmsToWatch(parsedFilmsToWatch);
    }, []);
  return (
    <>
      <h1>Potential Candidates</h1>
    </>
  );
};

export default SavedCandidates;
