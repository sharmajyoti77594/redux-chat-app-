import React from 'react';


const UserList = (props) => {
    const { item, onClick, receiver_id } = props

    const strFormat = (str) => {
        return str.replace (str.charAt (0), str.charAt (0).toUpperCase ());
    }

    const chatClass = id => {
        return id === receiver_id ? 'chat_list active_chat' : 'chat_list';
    };

    return (
        <div
          className={chatClass (item.id)}
          key={item.id}
          onClick={(e) => {onClick(e, item.id)}}
        >
          <div className="chat_people">
            <div className="chat_img">
              <div className="profile">
                {item.first_name.charAt (0).toUpperCase ()}
              </div>
            </div>
            <div className="chat_ib">
              <h5>
                {strFormat (item.first_name)}
                {' '}
                {strFormat (item.last_name)}
              </h5>
            </div>
          </div>
        </div>
      );
}

export default UserList;