import { createContext, useContext } from 'react';

import useSpeakerFilter from '../hooks/useSpeakerFilter';

export const SpeakerFilterContext = createContext();

export const useSpeakerFilterContext = () => useContext(SpeakerFilterContext);

function SpeakerFilterContextProvider({
  children,
  startingShowSessions = false,
  startingEventYear = '2019',
}) {
  const speakerFilterContextValue = useSpeakerFilter({ startingShowSessions, startingEventYear });
  return (
    <SpeakerFilterContext.Provider value={speakerFilterContextValue} >
      {children}
    </SpeakerFilterContext.Provider>
  );
}

export default SpeakerFilterContextProvider;
