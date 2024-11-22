import type React from 'react';
import { useEffect, useState } from 'react';
import type Candidate from '../interfaces/Candidate.interface';
import CandidateCard from '../components/CandidateCard';


const SavedCandidates = () => {
    const [candidates, setCandidates] = useState<Candidate[]>([]);

    const removeFromStorage = (
      e: React.MouseEvent<SVGSVGElement, MouseEvent>,
      currentlyOnCandidateList: boolean | null | undefined,
      name: string | null
    ) => {
      e.preventDefault();
      if (currentlyOnCandidateList && name) {
        let parsedCandidates: Candidate[] = [];
        const storedCandidates = localStorage.getItem('Candidate');
        if (typeof storedCandidates === 'string') {
          parsedCandidates = JSON.parse(storedCandidates);
        }
        parsedCandidates = parsedCandidates.filter(
          (candidate) => candidate.name !== name
        );
        parsedCandidates = parsedCandidates.filter(candidate => candidate.name !== name);
        setCandidates(parsedCandidates);
        localStorage.setItem('Candidate', JSON.stringify(parsedCandidates));
      } 
    };

    useEffect(() => {
      const storedCandidates = localStorage.getItem('Candidate');
      console.log('Stored Candidates:', storedCandidates);
      if (storedCandidates) {
        const parsedCandidates = JSON.parse(storedCandidates);
        console.log('Parsed Candidates:', parsedCandidates);
        if (Array.isArray(parsedCandidates)) {
          setCandidates(parsedCandidates);
        }
      }
    }, []);

    return (
      <>
        <h1>Potential Candidates</h1>
        {candidates.length > 0 ? (
          candidates.map((candidate) => (
            <CandidateCard
              key={candidate.name} // Use a unique key for each candidate
              currentCandidate={candidate} // Pass the individual candidate
              removeFromStorage={removeFromStorage}
              onCandidateList={true} // Set this prop to true if the candidate is in the list
            />
          ))
        ) : (
          <h2>No saved candidates found.</h2>
        )}
      </>
    );
};

export default SavedCandidates;