import type React from 'react';
import type Candidate from '../interfaces/Candidate.interface';
import { ImCross } from 'react-icons/im';
import { CgPlayListAdd } from 'react-icons/cg';

type CandidateCardProps = {
  currentCandidate: Candidate;
  addToCandidateList?: (() => void) | null;
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
  addToCandidateList,
  onCandidateList,
  removeFromStorage,
}: CandidateCardProps) => {
  return (
    <>
      {currentCandidate?.Name ? (
        <section className='CandidateCard'>
          <figure>
            <img src={`${currentCandidate.Avatar}`} alt={`${currentCandidate.Username}`} />
          </figure>
          <article className='details'>
            <h2>{currentCandidate.Name}</h2>
            <p>
              <strong>Location:</strong> {currentCandidate.Location}
            </p>
            <p>
              <strong>Email:</strong> {currentCandidate.Email}
            </p>
            <p>
              <strong>Html Url:</strong> {currentCandidate.Html_Url}
            </p>
            <p>
              <strong>Company:</strong> {currentCandidate.Company}
            </p>
          </article>
          {onCandidateList ? (
            <aside className='icons'>
              <ImCross
                style={{ fontSize: '40px', cursor: 'pointer' }}
                onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
                  removeFromStorage?.(
                    e,
                    onCandidateList,
                    currentCandidate.Name
                  )
                }
              />
            </aside>
          ) : (
            <aside className='icons'>
              <CgPlayListAdd
                style={{ fontSize: '50px', cursor: 'pointer' }}
                onClick={() => addToCandidateList?.()}
              />
            </aside>
          )}
        </section>
      ) : (
        <h1 style={{ margin: '16px 0' }}>Please search for a Candidate.</h1>
      )}
    </>
  );
};

export default CandidateCard;
