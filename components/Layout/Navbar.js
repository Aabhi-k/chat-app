import React from 'react'
import { Menu, Container, Icon } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from './Navbar.module.css'

function Navbar() {
  const router = useRouter()
  const isActive = route => router.pathname === route

  return (
    <Menu fluid borderless className={styles.menu}>
      <Container text className={styles.container}>
        <Link href='/login'>
          <Menu.Item 
            header 
            className={`${styles.menuItem} ${isActive('/login') ? styles.active : ''}`}
          >
            <Icon size='large' name='sign in' className={styles.icon} />
            Login
          </Menu.Item>
        </Link>

        <Link href='/signup'>
          <Menu.Item 
            header 
            className={`${styles.menuItem} ${isActive('/signup') ? styles.active : ''}`}
          >
            <Icon size='large' name='signup' className={styles.icon} />
            Signup
          </Menu.Item>
        </Link>
      </Container>
    </Menu>
  )
}

export default Navbar