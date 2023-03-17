import { useEffect, useState } from 'react';

import { axiosInstance, IStream, StreamTypes } from '../api/api';

type useStreamsDataParams = {
  userId: number;
  setSelectedStream: (value: IStream) => void;
  type: StreamTypes;
};
export const useStreamsData = (params: useStreamsDataParams) => {
  const [streams, setStreams] = useState<IStream[]>([]);

  const updateStream = async (newStream: IStream) => {
    await axiosInstance.put(`streams/${newStream.id}`, newStream);
  };
  const getStreamsWithNeededTypeForThisUser = async (
    userId: number,
    type: StreamTypes
  ): Promise<any> => {
    const { data } = await axiosInstance.get<{ items: IStream[] }>(
      `streams?PageSize=100`
    );

    const filteredByIdStreams = data.items.filter(
      (stream: IStream) => stream.userId === userId
    );

    const filteredTypeStreams = filteredByIdStreams.filter(
      (stream: IStream) => stream.type === type
    );

    const startedStreams = filteredTypeStreams.filter(
      (stream: IStream) => stream.startedStreamSession
    );

    if (startedStreams.length > 0) params.setSelectedStream(startedStreams[0]);
    else
      filteredTypeStreams.length > 0 &&
        params.setSelectedStream(filteredTypeStreams[0]);

    return data.items.filter((stream) => stream.userId === userId);
  };

  useEffect(() => {
    getStreamsWithNeededTypeForThisUser(params.userId, params.type)
      .then((res) => setStreams(res))
      .catch((err) => console.log(err, 'errr'));
  }, []);

  return {
    streams,
    setStreams,
    getStreamsWithNeededTypeForThisUser,
    updateStream,
  };
};
