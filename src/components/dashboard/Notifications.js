import React from 'react';
import moment from 'moment';

const Notifications = ({ notifications }) => {
    const notificationList = notifications && notifications.map(item => {
        return (
            <li key={item.id}>
                <span className="red-text">{item.user} </span>
                <span>{item.content}</span>
                <div className="grey-text note-date">
                    {moment(item.time.toDate()).fromNow()}
                </div>
            </li>
        )
    })

    return (
        <div className="section">
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title">Notifications</span>
                    <ul className="notifications">
                        {notificationList}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Notifications;

