import React from 'react';
import moment from 'moment';
import Header from './Header';
import { Alert, AlertTitle } from '@material-ui/lab';

const ChatPanel = (props) => {
    const chatData = props.messages || [];
    const user = props.userInfo;
    const userList = props.userList;
    const receiver_id = props.receiver_id
    const notifications = props.notifications;

    const timeFor = (time) => {
        const datef = new Date(time).toString();
        const dateArray = datef.split(' ');
        const hours = moment(new Date(time)).format('h:mm a');
    
        return {
          date: dateArray[1],
          month: dateArray[2],
          hours
        }
    }

    const receiverInfo = userList.filter(item => item.id === receiver_id);

    return (
        <div>
          <div className="header">
            <Header
              user={
                {first_name: user.first_name,
                last_name: user.last_name
              }}
              receiverInfo={receiverInfo}
            />
          </div>
          <div className="mesgs">
            {notifications.message === 'Message not sent' &&
              <div class="alert">
                  <Alert severity={notifications.type}>
                      <AlertTitle>{notifications.type}</AlertTitle>
                          {/* This is an error alert — <strong>check it out!</strong> */}
                      {notifications.message}
                  </Alert>
              </div>
            }
            <div className="msg_history">
              {chatData.length > 0 &&
                chatData.map ((item, index) => {
                  return item.sender_id === user.id
                    ? <div className="outgoing_msg" key={index}>
                        <div className="sent_msg word-wrap">
                          <p>{item.body}</p>
                          <span className="time_date">
                           {timeFor(item.created_at).date} {timeFor(item.created_at).month} | {timeFor(item.created_at).hours}
                          </span>
                        </div>
                      </div>
                    : <div className="incoming_msg" key={index}>
                        <div className="incoming_msg_img">
                          {' '}
                          <img src="https://ptetutorials.com/images/user-profile.png" alt="profile" />
                          {' '}
                        </div>
                        <div className="received_msg">
                          <div className="received_withd_msg word-wrap">
                            <p>{item.body}</p>
                            <span className="time_date">
                              {timeFor(item.created_at).date} {timeFor(item.created_at).month} | {timeFor(item.created_at).hours}
                            </span>
                          </div>
                        </div>
                      </div>;
                })}
            </div>
            <div className="type_msg">
              <div className="input_msg_write">
                <input
                  type="text"
                  className="write_msg"
                  placeholder="Type a message"
                  value={props.messageToSend}
                  onChange={(e) => {props.onChange(e)}}
                  onKeyPress={(e) => {props.onKeyPress(e)}}
                />
                <button
                  className="msg_send_btn"
                  type="button"
                  onClick={(e) => {props.buttonClick()}}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      );
}

export default ChatPanel; 