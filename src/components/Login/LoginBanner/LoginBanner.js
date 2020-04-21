import React from 'react'
import banner from '../../../assets/images/banner.svg'

import useLoginBannerStyles from './useLoginBannerStyles'

function LoginBanner() {
  const classes = useLoginBannerStyles()
  return <img className={classes.banner} src={banner} alt="Warehouse Banner" />
}

export default LoginBanner
