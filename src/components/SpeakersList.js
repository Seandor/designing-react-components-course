import ReactPlaceholder from 'react-placeholder';

import Speaker from './Speaker';
import useRequestData, { RequestStatus } from '../hooks/useRequestData';
import { data } from '../../SpeakerData';
import { useSpeakerFilterContext } from '../context/SpeakerFilterContext';

function SpeakersList () {
  const {
    requestData: speakersData,
    requestStatus,
    error,
    updateRecord
  } = useRequestData(data);

  const { searchQuery, eventYear } = useSpeakerFilterContext();
  
  if (requestStatus === RequestStatus.Failure) {
    return (
      <div className="text-danger">
        ERROR: <b>loading Speaker Data Failed {error}</b>
      </div>
    );
  }

  return (
    <div className="container speakers-list">
      <ReactPlaceholder
        type="media"
        rows={15}
        className="speakerslist-placeholder"
        ready={requestStatus === RequestStatus.Success}
      >
        <div className="row">
          {speakersData
            .filter(speaker => {
              return (
                speaker.first.toLowerCase().includes(searchQuery) ||
                speaker.last.toLowerCase().includes(searchQuery)
              );
            })
            .filter(speaker => {
              return speaker.sessions.find(session => {
                return session.eventYear === eventYear;
              });
            })
            .map(function (speaker) {
              return (
                <Speaker
                  key={speaker.id}
                  speaker={speaker}
                  onFavoriteToggle={(doneCallback) => {
                    updateRecord({
                      ...speaker,
                      favorite: !speaker.favorite,
                    }, doneCallback);
                  }}
                />
              );
            })}
        </div>
      </ReactPlaceholder>
    </div>
  );
}

export default SpeakersList;
