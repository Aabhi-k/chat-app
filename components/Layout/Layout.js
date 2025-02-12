import React, { createRef } from 'react'
import HeadTags from './HeadTags'
import Navbar from './Navbar'
import { Container, Visibility, Grid, Sticky, Ref} from 'semantic-ui-react'
import nprogress from 'nprogress'
import Router, { useRouter } from 'next/router'
import SideMenu from './SideMenu'
import MobileHeader from './MobileHeader'
import { createMedia } from '@artsy/fresnel'
import styles from './Layout.module.css'


const AppMedia = createMedia({ breakpoints: { zero: 0, mobile: 549, tablet: 850, computer: 1080 } })

const mediaStyles = AppMedia.createMediaStyle()
const { Media, MediaContextProvider } = AppMedia

function Layout({ children, user })
{
  const contextRef = createRef()

  Router.onRouteChangeStart = () => nprogress.start()
  Router.onRouteChangeComplete = () => nprogress.done()
  Router.onRouteChangeError = () => nprogress.done()

  return (
    <>
      <HeadTags />
      {user ? (
        <>
          <style>{mediaStyles}</style>

          <MediaContextProvider>
            <div className={styles.mainContainer}>
              <Media greaterThanOrEqual='computer'>
                <Ref innerRef={contextRef}>
                  <Grid className={styles.gridContainer}>
                    <>
                      <Grid.Column floated='left' width={2} className={styles.stickyColumn}>
                        <Sticky context={contextRef}>
                          <SideMenu user={user} pc />
                        </Sticky>
                      </Grid.Column>

                      <Grid.Column width={13} className={styles.contentColumn}>
                        <Visibility context={contextRef}>{children}</Visibility>
                      </Grid.Column>

                      <Grid.Column floated='left' width={1} className={styles.stickyColumn}>
                        <Sticky context={contextRef}>
                          <div></div>
                        </Sticky>
                      </Grid.Column>
                    </>
                  </Grid>
                </Ref>
              </Media>

              <Media between={['tablet', 'computer']}>
                <Ref innerRef={contextRef}>
                  <Grid className={styles.gridContainer}>
                    <>
                      <Grid.Column floated='left' width={2} className={styles.stickyColumn}>
                        <Sticky context={contextRef}>
                          <SideMenu user={user} pc={false} />
                        </Sticky>
                      </Grid.Column>

                      <Grid.Column width={13} className={styles.contentColumn}>
                        <Visibility context={contextRef}>{children}</Visibility>
                      </Grid.Column>
                    </>
                  </Grid>
                </Ref>
              </Media>

              <Media between={['mobile', 'tablet']}>
                <Ref innerRef={contextRef}>
                  <Grid className={styles.gridContainer}>
                    <>
                      <Grid.Column floated='left' width={2} className={styles.stickyColumn}>
                        <Sticky context={contextRef}>
                          <SideMenu user={user} pc={false} />
                        </Sticky>
                      </Grid.Column>

                      <Grid.Column width={14} className={styles.contentColumn}>
                        <Visibility context={contextRef}>{children}</Visibility>
                      </Grid.Column>
                    </>
                  </Grid>
                </Ref>
              </Media>

              <Media between={['zero', 'mobile']}>
                <MobileHeader user={user} />
                <Grid>
                  <Grid.Column className={styles.mobileContainer}>{children}</Grid.Column>
                </Grid>
              </Media>
            </div>
          </MediaContextProvider>
        </>
      ) : (
        <>
          <Navbar />
          <Container text className={styles.defaultContainer}>
            {children}
          </Container>
        </>
      )}
    </>
  )
}

export default Layout