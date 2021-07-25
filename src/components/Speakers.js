import SpeakersToolbar from './SpeakersToolbar';
import SpeakersList from './SpeakersList';
import { useState } from 'react';
import { useThemeContext } from '../context/ThemeContext';

function Speakers () {
  const { theme, setTheme } = useThemeContext();
  const [showSessions, setShowSessions] = useState(true);

  return (
    <>
      <SpeakersToolbar
        theme={theme}
        setTheme={setTheme}
        showSessions={showSessions}
        setShowSessions={setShowSessions}
      />

      <SpeakersList showSessions={showSessions} />
    </>
  );
}

export default Speakers;
