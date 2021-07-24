import { useState, useEffect } from 'react';

export const RequestStatus = {
  Loading: 'loading',
  Success: 'success',
  Failure: 'failure',
};

function useRequestData(initialData) {
  const [requestData, setRequestData] = useState(initialData);
  const [requestStatus, setRequestStatus] = useState(RequestStatus.Loading);
  const [error, setError] = useState('');

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    async function delayFunc() {
      try {
        await delay(2000);
        setRequestStatus(RequestStatus.Success);
        // setRequestData();
      } catch (err) {
        setRequestStatus(RequestStatus.Failure);
        setError(err);
      }
    }
    delayFunc();
  }, []);

  function updateRecord(recordUpdated, doneCallback) {
    const originalData = [...requestData];
    const newRecords = requestData.map(function (rec) {
      return rec.id === recordUpdated.id ? recordUpdated : rec;
    });

    async function delayFunction() {
      try {
        // optimistic UI
        setRequestData(newRecords);
        await delay(1000);
      } catch (error) {
        setRequestData(originalData);
        console.log('error thrown inside delayFunction', error);
      }

      if (doneCallback) {
        doneCallback();
      }
    }

    delayFunction();
  }

  return {
    requestData,
    requestStatus,
    error,
    updateRecord,
  };
}

export default useRequestData;
