import Speaker from './Speaker';
import useRequestData, { RequestStatus } from '../hooks/useRequestData';
import ReactPlaceholder from 'react-placeholder';
import { data } from '../../SpeakerData';

function SpeakersList ({ showSessions }) {
  const {
    requestData: speakersData,
    requestStatus,
    error,
    updateRecord
  } = useRequestData(data);
  
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
          {speakersData.map(function (speaker) {
            return (
              <Speaker
                key={speaker.id}
                speaker={speaker}
                showSessions={showSessions}
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
