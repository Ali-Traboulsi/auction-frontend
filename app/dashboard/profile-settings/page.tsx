import React, { Suspense } from 'react'
import ProfileSetting from '../../components/dashboard/profile-setting/ProfileSetting'
import { ProfileSettingSkeleton } from '../../components/skeleton/skeleton'

const page = () => {
  return (
    <Suspense fallback={<ProfileSettingSkeleton/>}><ProfileSetting /></Suspense>
  )
}

export default page