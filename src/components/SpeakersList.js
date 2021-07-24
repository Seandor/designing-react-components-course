import Speaker from './Speaker';
import useSpeakersData, { RequestStatus } from '../hooks/useSpeakersData';
import ReactPlaceholder from 'react-placeholder';

function SpeakersList ({ showSessions }) {
  const {
    speakersData, requestStatus,
    error,
    onFavoriteToggle
  } = useSpeakersData();
  
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
                onFavoriteToggle={() => {
                  onFavoriteToggle(speaker.id);
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
