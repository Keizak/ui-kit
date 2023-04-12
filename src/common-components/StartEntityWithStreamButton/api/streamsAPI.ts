import { AxiosResponse } from 'axios';

import { BaseAPI } from '../../../helpers';
import { IActionResult, IStream, IUpdateStreamModel } from '../types';

import { axiosInstance } from './axiosInstance';

class StreamAPI extends BaseAPI<IUpdateStreamModel, IStream> {
  stop(streamId: number): Promise<{ resultCode: number }> {
    return this.anyPut(`${streamId}/stop`);
  }

  start(streamId: number): Promise<{ resultCode: number }> {
    return this.anyPut(`${streamId}/start`);
  }

  createMeeting(streamId: number): Promise<AxiosResponse<IActionResult<null>>> {
    return this.anyPost(`${streamId}/zoom-meeting`);
  }

  getStreams(userId: number): Promise<{ items: IStream[] }> {
    return this.anyGet(`/${userId}`);
  }

  updateStream(
    newStream: IStream
  ): Promise<AxiosResponse<{ items: IStream[] }>> {
    return this.anyPut(`${newStream.id}`, newStream);
  }
}

export const streamsAPI = new StreamAPI(axiosInstance, `streams`);
