import React, { useState } from 'react'
import { Form, Segment } from 'semantic-ui-react'
import styles from './MessageInputField.module.css'

function MessageInputField({ sendMsg }) {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  return (
    <div className={styles.inputContainer}>
      <Segment className={styles.segment}>
        <Form
          reply
          onSubmit={e => {
            e.preventDefault()
            sendMsg(text)
            setText('')
          }}
        >
          <Form.Input
            className={styles.input}
            size='large'
            placeholder='Send New Message'
            value={text}
            onChange={e => setText(e.target.value)}
            action={{
              color: 'blue',
              icon: 'telegram plane',
              disabled: text === '',
              loading: loading,
              className: styles.button
            }}
          />
        </Form>
      </Segment>
    </div>
  )
}

export default MessageInputField