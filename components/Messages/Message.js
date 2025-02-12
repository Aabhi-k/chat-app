import React, { useState } from 'react'
import { Icon, Popup } from 'semantic-ui-react'
import calculateTime from '../../utils/calculateTime'
import styles from './Message.module.css'

function Message({ message, user, deleteMsg, bannerProfilePic, divRef }) {
  const [deleteIcon, showDeleteIcon] = useState(false)
  const ifYouSender = message.sender === user._id

  return (
    <div className={styles.bubbleWrapper} ref={divRef}>
      <div
        className={`${styles.inlineContainer} ${ifYouSender ? styles.own : ''}`}
        onClick={() => ifYouSender && showDeleteIcon(!deleteIcon)}
      >
        <img
          className={styles.inlineIcon}
          src={ifYouSender ? user.profilePicUrl : bannerProfilePic}
        />

        <div className={ifYouSender ? styles.ownBubble : styles.otherBubble}>
          {message.msg}
        </div>

        {deleteIcon && (
          <Popup
            trigger={
              <Icon
                name='trash'
                color='red'
                className={styles.deleteIcon}
                onClick={() => deleteMsg(message._id)}
              />
            }
            content='This will only delete the message from your inbox!'
            position='top right'
          />
        )}
      </div>

      <span className={ifYouSender ? styles.timestampOwn : styles.timestamp}>
        {calculateTime(message.date)}
      </span>
    </div>
  )
}

export default Message