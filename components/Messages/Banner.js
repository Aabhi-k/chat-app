import React from 'react'
import { Segment, Grid, Image } from 'semantic-ui-react'
import styles from './Banner.module.css'

function Banner({ bannerData }) {
  const { name, profilePicUrl } = bannerData

  return (
    <Segment className={styles.banner}>
      <Grid className={styles.grid}>
        <Grid.Column floated='left' width={14}>
          <h4 className={styles.header}>
            <Image 
              avatar 
              src={profilePicUrl} 
              className={styles.profileImage}
            />
            <span className={styles.name}>{name}</span>
          </h4>
        </Grid.Column>
      </Grid>
    </Segment>
  )
}

export default Banner