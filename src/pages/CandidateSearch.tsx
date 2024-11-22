import { type FormEvent, useState, useEffect } from 'react';
import { searchGithubUser } from '../api/API';
import type Candidate from '../interfaces/Candidate.interface';
import CandidateCard from '../components/CandidateCard';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]); // List of candidates
  const [currentIndex, setCurrentIndex] = useState<number>(0); // Current candidate index
  const [searchInput, setSearchInput] = useState<string>('');

  const addToCandidateList = (candidate: Candidate) => {
    let parsedCandidates: Candidate[] = [];
    const storedCandidates = localStorage.getItem('Candidates');
    if (typeof storedCandidates === 'string') {
      parsedCandidates = JSON.parse(storedCandidates);
    }
    parsedCandidates.push(candidate);
    localStorage.setItem('Candidates', JSON.stringify(parsedCandidates));
  };

  const searchForCandidateByName = async (event: FormEvent) => {
    event.preventDefault();
    const data: Candidate = await searchGithubUser(searchInput);
    
    // If candidate is found, add to candidates list
    if (data) {
      setCandidates(prevCandidates => {
        const updatedCandidates = [...prevCandidates, data];
        setCurrentIndex(updatedCandidates.length - 1); // Set to the last candidate added
        return updatedCandidates; // Return the updated candidates array
      });
    }
  };

  const handleNextCandidate = () => {
    if (currentIndex < candidates.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Optionally loop back to the start
    }
  };

  const handleSaveCandidate = () => {
    if (candidates[currentIndex]) {
      addToCandidateList(candidates[currentIndex]);
      handleNextCandidate(); // Move to the next candidate after saving
    }
  };

  useEffect(() => {
    console.log(candidates);
  }, [candidates]);

  return (  
    <>
      <h1>Candidate Search</h1>
      <section id='searchSection'>
        <form onSubmit={searchForCandidateByName}>
          <input
            type='text'
            placeholder='Enter a Candidate'
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type='submit' id='searchBtn'>
            Search
          </button>
        </form>
      </section>
      {candidates.length > 0 && currentIndex < candidates.length ? 
        <CandidateCard
          currentCandidate={candidates[currentIndex]}
          onSave={handleSaveCandidate} // Pass save handler
          onNext={handleNextCandidate} // Pass next handler
          onCandidateList={false} // Adjust based on your logic
        />
      : <p>No Candidates found!</p>}
    </>
  );
};

export default CandidateSearch;