import React from 'react'
import { List, Icon } from 'semantic-ui-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { logoutUser } from '../../utils/authUser'
import styles from './SideMenu.module.css'


function SideMenu({ user: { email, unreadMessage, username }, pc = true })
{
  const router = useRouter()

  const isActive = route => router.pathname === route


  return (
    <>
      <List 
        className={styles.sideMenuList}
        size='big'
        verticalAlign='middle'
        selection
      >
        <Link href='/messages'>
          <List.Item 
            className={`${styles.menuItem} ${isActive('/messages') ? styles.active : ''}`}
          >
            <Icon
              className={`${styles.icon} ${unreadMessage ? styles.unreadIcon : ''}`}
              name={unreadMessage ? 'hand point right' : 'mail outline'}
              size='large'
            />
            <List.Content>
              {pc && <List.Header className={styles.menuHeader} content='Messages' />}
            </List.Content>
          </List.Item>
        </Link>
        <br />

        <Link href={`/${username}`}>
          <List.Item 
            className={`${styles.menuItem} ${router.query.username === username ? styles.active : ''}`}
          >
            <Icon
              className={styles.icon}
              name='user'
              size='large'
            />
            <List.Content>
              {pc && <List.Header className={styles.menuHeader} content='Account' />}
            </List.Content>
          </List.Item>
        </Link>
        <br />

        <List.Item 
          onClick={() => logoutUser(email)}
          className={styles.menuItem}
        >
          <Icon 
            className={styles.icon}
            name='log out' 
            size='large'
          />
          <List.Content>
            {pc && <List.Header className={styles.menuHeader} content='Logout' />}
          </List.Content>
        </List.Item>
      </List>
    </>
  )
}

export default SideMenu