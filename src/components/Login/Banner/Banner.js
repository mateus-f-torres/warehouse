import React from 'react'
import banner from '../../../assets/images/banner.svg'

import useBannerStyles from './useBannerStyles'

function Banner() {
  const classes = useBannerStyles()
  return <img className={classes.banner} src={banner} alt="Warehouse Banner" />
}

export default Banner
