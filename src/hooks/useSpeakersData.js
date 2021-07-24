import { useState, useEffect } from 'react';
import { data } from '../../SpeakerData';

export const RequestStatus = {
  Loading: 'loading',
  Success: 'success',
  Failure: 'failure',
};

function useSpeakersData() {
  const [speakersData, setSpeakersData] = useState([]);
  const [requestStatus, setRequestStatus] = useState(RequestStatus.Loading);
  const [error, setError] = useState('');

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    async function delayFunc() {
      try {
        await delay(2000);
        setRequestStatus(RequestStatus.Success);
        setSpeakersData(data);
      } catch (err) {
        setRequestStatus(RequestStatus.Failure);
        setError(err);
      }
    }
    delayFunc();
  }, []);

  function onFavoriteToggle(id) {
    const speakerRecPrevious = speakersData.find(rec => rec.id === id);
    const speakerRecUpdated = {
      ...speakerRecPrevious,
      favorite: !speakerRecPrevious.favorite
    };

    const speakersDataNew = speakersData.map((rec) => rec.id === id ? speakerRecUpdated : rec);
    setSpeakersData(speakersDataNew);
  }

  return {
    speakersData, requestStatus,
    error,
    onFavoriteToggle,
  };
}

export default useSpeakersData;
