import { useEffect, useState } from 'react';

import { streamsAPI } from '../api';
import {
  IStream,
  StreamTypes,
  useStreamsDataParams,
  UseStreamsDataReturnType,
} from '../types';

export const useStreamsData = (
  params: useStreamsDataParams
): UseStreamsDataReturnType => {
  const [streams, setStreams] = useState<IStream[]>([]);
  const [selectedStream, setSelectedStream] = useState<IStream | null>(null);
  const [loading, setLoading] = useState(false);

  const updateStream = async (newStream: IStream) => {
    return await streamsAPI.updateStream(newStream);
  };
  const getStreamsWithNeededTypeForThisUser = async (
    userId: number,
    type: StreamTypes | StreamTypes[]
  ): Promise<any> => {
    const { items } = await streamsAPI.getStreams();

    const filteredByIdStreams = items.filter(
      (stream: IStream) => stream.userId === userId
    );

    const filteredTypeStreams = filteredByIdStreams.filter(
      (stream: IStream) => {
        if (Array.isArray(type)) return type.includes(stream.type);
        else return stream.type === type;
      }
    );

    const startedStreams = filteredTypeStreams.filter(
      (stream: IStream) => stream.startedStreamSession
    );

    if (startedStreams.length > 0) setSelectedStream(startedStreams[0]);
    else
      filteredTypeStreams.length > 0 &&
        setSelectedStream(filteredTypeStreams[0]);

    return items.filter((stream) => stream.userId === userId);
  };

  const getStreamsContainerFunctions = async () => {
    setLoading(true);

    return await getStreamsWithNeededTypeForThisUser(params.userId, params.type)
      .then((res) => setStreams(res))
      .catch((err) => console.error(err, 'errr'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getStreamsContainerFunctions().finally();
  }, []);

  return {
    streams: {
      set: setStreams,
      state: streams,
    },
    selectedStream: {
      set: setSelectedStream,
      state: selectedStream,
    },
    streamsApi: {
      getStreams: getStreamsContainerFunctions,
      updateStream,
    },
    loading: {
      set: setLoading,
      state: loading,
    },
  };
};
