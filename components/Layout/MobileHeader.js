import React from 'react'
import { Menu, Container, Icon, Dropdown } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { logoutUser } from '../../utils/authUser'
import styles from './MobileHeader.module.css'

function MobileHeader({ user: { email, unreadMessage, username } }) {
  const router = useRouter()
  const isActive = route => router.pathname === route

  return (
    <>
      <Menu fluid borderless className={styles.mobileMenu}>
        <Container text className={styles.menuContainer}>
          <Link href='/messages'>
            <Menu.Item 
              header 
              className={`${styles.menuItem} ${isActive('/messages') || unreadMessage ? styles.active : ''}`}
            >
              <Icon 
                name={unreadMessage ? 'hand point right' : 'mail outline'} 
                size='large'
                className={`${styles.icon} ${unreadMessage ? styles.unreadIcon : ''}`}
              />
            </Menu.Item>
          </Link>

          <Dropdown item icon='bars' direction='left' className={styles.menuItem}>
            <Dropdown.Menu className={styles.dropdownMenu}>
              <Link href={`/${username}`}>
                <Dropdown.Item 
                  className={`${styles.dropdownItem} ${isActive(`/${username}`) ? styles.active : ''}`}
                >
                  <Icon name='user' size='large' className={styles.icon} />
                  Account
                </Dropdown.Item>
              </Link>

              <Dropdown.Item 
                onClick={() => logoutUser(email)}
                className={styles.dropdownItem}
              >
                <Icon name='sign out alternate' size='large' className={styles.icon} />
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Menu>
    </>
  )
}

export default MobileHeader