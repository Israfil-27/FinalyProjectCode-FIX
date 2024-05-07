import { Alert } from "antd";
import { MessageProps } from "../types/type";

const Message = ({ type, message, children }: MessageProps) => {
  return (
    <div>
      <Alert message={message} type={type} style={{fontSize:"1.3rem"}}/>
      {children}
    </div>
  );
};

export default Message;
