import SpeakersToolbar from './SpeakersToolbar';
import SpeakersList from './SpeakersList';
import SpeakerFilterContextProvider from '../context/SpeakerFilterContext';

function Speakers () {
  return (
    <SpeakerFilterContextProvider startingShowSessions={true}>
      <SpeakersToolbar />
      <SpeakersList />
    </SpeakerFilterContextProvider>
  );
}

export default Speakers;
