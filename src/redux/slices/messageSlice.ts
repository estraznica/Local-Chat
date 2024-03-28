import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getUserName } from '../../utils/getUserName';
import { getRoom } from '../../utils/getRoom';

export interface IMessage {
  id: number;
  value: string;
  userName: string;
}
export interface IMessages {
  valueRoom: string;
  id: number;
  value: string;
  userName: string;
}

type MessageSliceState = {
  valueRoom: string;
  userName: string;
  messages: IMessages[];
};

const initialState: MessageSliceState = {
  userName: getUserName(),
  valueRoom: getRoom(),
  messages: [],
};

export const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages(state, action: PayloadAction<any>) {
      state.messages.push(action.payload);
    },
  },
});

export const { setMessages } = messageSlice.actions;

export default messageSlice.reducer;
