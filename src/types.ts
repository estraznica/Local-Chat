export interface IMessage {
  id: number;
  value: string | IMessageObj;
  userName: string;
}
export interface IMessageObj {
  src?: string;
  value?: string;
  replyValue?: string;
}
