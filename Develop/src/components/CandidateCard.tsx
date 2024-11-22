import type React from 'react';
import type Candidate from '../interfaces/Candidate.interface';
import { ImCross } from 'react-icons/im';
import { CgPlayListAdd } from 'react-icons/cg';

type CandidateCardProps = {
  currentCandidate: Candidate;
  onSave?: () => void; // Function to save the candidate
  onNext?: () => void; // Function to go to the next candidate
  onCandidateList?: boolean | null;
  removeFromStorage?:
    | ((
        e: React.MouseEvent<SVGSVGElement, MouseEvent>,
        currentlyOnCandidateList: boolean | null | undefined,
        Name: string | null
      ) => void)
    | null;
};

const CandidateCard = ({
  currentCandidate,
  onSave,
  onNext,
  onCandidateList,
  removeFromStorage,
}: CandidateCardProps) => {
  return (
    <>
      {currentCandidate?.html_url ? (
        <section className='CandidateCard'>
          <figure>
            <img src={`${currentCandidate.avatar_url}`} alt={`${currentCandidate.username}`} />
          </figure>
          <article className='details'>
            <h2>{currentCandidate.name}</h2>
            <p>
              <strong>Location:</strong> {currentCandidate.location}
            </p>
            <p>
              <strong>Email:</strong> {currentCandidate.email}
            </p>
            <p>
              <strong>Html Url:</strong> {currentCandidate.html_url}
            </p>
            <p>
              <strong>Company:</strong> {currentCandidate.company}
            </p>
          </article>
          <aside className='icons'> 
            <CgPlayListAdd
              style={{ fontSize: '30px', cursor: 'pointer' }}
              onClick={onSave} // Call the onSave function when "+" is clicked
            />
            <button onClick={onNext}>+</button> {/* Button for saving candidate */}
            <button onClick={onNext}>-</button> {/* Button for next candidate without saving */}
            {onCandidateList && (
              <ImCross
                style={{ fontSize: '20px', cursor: 'pointer' }}
                onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
                  removeFromStorage?.(
                    e,
                    onCandidateList,
                    currentCandidate.name
                  )
                }
              />
            )}
          </aside> 
        </section>
      ) : (
        <h1 style={{ margin: '16px 0' }}>Please search for a Candidate.</h1>
      )}
    </>
  );
};

export default CandidateCard;