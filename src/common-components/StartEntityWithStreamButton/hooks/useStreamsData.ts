import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

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
  // Используем dispatch из react-redux для создания события с типом ошибки
  const dispatch = useDispatch();

  // Используем useState для инициализации состояний streams, selectedStream и loading
  const [streams, setStreams] = useState<IStream[]>([]);
  const [selectedStream, setSelectedStream] = useState<IStream | null>(null);
  const [loading, setLoading] = useState(false);

  // Создаем функцию updateStream, которая отправляет запрос на обновление данных о стриме
  const updateStream = async (newStream: IStream) => {
    return await streamsAPI.updateStream(newStream);
  };

  // Создаем функцию stopStream, которая отправляет запрос на остановку стрима по его id
  const stopStream = async (streamId: number) => {
    return await streamsAPI.stop(streamId);
  };

  // Создаем функцию getStreamsWithNeededTypeForThisUser, которая получает список стримов нужного типа для пользователя с заданным id
  const getStreamsWithNeededTypeForThisUser = async (
    userId: number,
    type: StreamTypes | StreamTypes[]
  ): Promise<IStream[]> => {
    // Получаем список всех стримов с сервера
    const { items } = await streamsAPI.getStreams();

    // Фильтруем стримы по id пользователя
    const filteredByIdStreams = items.filter(
      (stream: IStream) => stream.userId === userId
    );

    // Фильтруем стримы по типу (может быть как одиночным значением, так и массивом значений)
    const filteredTypeStreams = filteredByIdStreams.filter(
      (stream: IStream) => {
        if (Array.isArray(type)) return type.includes(stream.type);
        else return stream.type === type;
      }
    );

    // Получаем список запущенных стримов нужного типа
    const startedStreams = filteredTypeStreams.filter(
      (stream: IStream) => stream.startedStreamSession
    );

    // Если есть запущенный стрим, то выбираем его, иначе выбираем первый подходящий стрим
    if (startedStreams.length > 0) {
      setSelectedStream(startedStreams[0]);
    } else if (filteredTypeStreams.length > 0) {
      setSelectedStream(filteredTypeStreams[0]);
    } else {
      setSelectedStream(null);
    }

    // Возвращаем отфильтрованный список стримов
    return filteredByIdStreams;
  };

  // Создаем функцию getStreamsContainerFunctions,
  // которая получает список стримов нужного типа для текущего пользователя и устанавливает его в состояние streams
  const getStreamsContainerFunctions = async () => {
    setLoading(true);
    try {
      const res = await getStreamsWithNeededTypeForThisUser(
        params.userId,
        params.type
      );

      setStreams(res);
    } catch (err) {
      dispatch(
        dispatch({
          type: 'SHOW_ERROR',
          payload: 'Не могу получить стримы',
        })
      );
    } finally {
      setLoading(false);
    }
  };

  debugger;
  // Используем useEffect для получения списка стримов нужного типа при первом рендере компонента, использующего этот хук
  useEffect(() => {
    getStreamsContainerFunctions().finally();
  }, []);

  useEffect(() => {
    console.log(loading, 'loading');
  }, [loading]);

  // Возвращаем объект с состояниями и функциями для работы со списком стримов
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
      stopStream,
    },
    loading: {
      set: setLoading,
      state: loading,
    },
  };
};
