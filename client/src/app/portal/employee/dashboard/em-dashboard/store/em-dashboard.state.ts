import { Messaging } from "../../../../../model/em-messaging.model";

export interface EmMessagingState {
    messages: Messaging[];
  }
  
  export const initialEmMessagingState: EmMessagingState = {
    messages: [],
  };

