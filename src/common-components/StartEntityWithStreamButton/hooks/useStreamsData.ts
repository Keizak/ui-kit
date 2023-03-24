import { useEffect, useState } from 'react';

import { axiosInstance, IStream } from '../api/api';

type useStreamsDataParams = {
  userId: number;
  setSelectedStream: (value: IStream) => void;
};
export const useStreamsData = (params: useStreamsDataParams) => {
  const [streams, setStreams] = useState<IStream[]>([]);

  const updateStream = async (link: string, currentStream: IStream) => {
    await axiosInstance.put(`streams/${currentStream.id}`, {
      ...currentStream,
      link,
    });
  };
  const getStreamsForThisUser = async (userId: number): Promise<any> => {
    const { data } = await axiosInstance.get<{ items: IStream[] }>(`streams/`);
    const startedStreams = data.items.filter(
      (stream: IStream) => stream.startedStreamSession
    );

    if (startedStreams) params.setSelectedStream(startedStreams[0]);

    return data.items.filter((stream) => stream.userId === userId);
  };

  useEffect(() => {
    getStreamsForThisUser(params.userId)
      .then((res) => setStreams(res))
      .catch((err) => console.log(err, 'errr'));
  }, []);

  return { streams, setStreams, getStreamsForThisUser, updateStream };
};
