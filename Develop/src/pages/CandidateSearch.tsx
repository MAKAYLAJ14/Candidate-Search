import {  type FormEvent, useState } from 'react';
import { searchGithubUser } from '../api/API';
import type Candidate from '../interfaces/Candidate.interface';
import CandidateCard from '../components/CandidateCard';

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate>({
    Name: '',
    Username: '',
    Location: '',
    Avatar: '',
    Email: '',
    Html_Url: '',
    Company: '',
  });

  const [searchInput, setSearchInput] = useState<string>('');

  const addToCandidateList = () => {
    let parsedCandidates: Candidate[] = [];
    const storedCandidates = localStorage.getItem('Candidates');
    if (typeof storedCandidates === 'string') {
      parsedCandidates = JSON.parse(storedCandidates);
    }
    parsedCandidates.push(currentCandidate);
    localStorage.setItem('Candidates', JSON.stringify(parsedCandidates));
  };

  const searchForCandidateByName = async (event: FormEvent, candidate_name: string) => {
    event.preventDefault();
    const data: Candidate = await searchGithubUser (candidate_name);

    setCurrentCandidate(data);
  };

  return (  
    <>
    <h1>CandidateSearch</h1>
    <section id='searchSection'>
        <form
          onSubmit={(event: FormEvent) =>
            searchForCandidateByName(event, searchInput)
          }
        >
          <input
            type='text'
            name=''
            id=''
            placeholder='Enter a Candidate'
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type='submit' id='searchBtn'>
            Search
          </button>
        </form>
      </section>
      <CandidateCard
        currentCandidate={currentCandidate}
        addToCandidateList={addToCandidateList}
      />
    </>
  );
};

export default CandidateSearch;
