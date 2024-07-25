"use client"

import React from 'react'
import { DATA } from "@/data"
import { cn } from '@/lib/utils'
import RequestDemo from './request-demo'
import { TypographyH3, TypographyP } from '../ui/typography'
import FeedbackTableDemo from './feedback-table-demo'

const Demo = () => {
  const [feedbacks, setFeedbacks] = React.useState(DATA.feedbacks)

  return (
    <section className={cn("my-8 space-y-8 flex flex-col justify-center items-center")}>
      <TypographyH3 className='text-center -mb-4'>Explore API Endpoint</TypographyH3>
      <TypographyP className='hidden md:flex text-center opacity-70'>Send feedback with required data and see the table get updated</TypographyP>

      <div className='w-full flex flex-col lg:flex-row gap-4 justify-between items-start'>
        <div className={cn('w-full lg:w-auto')}>
          <RequestDemo setFeedbacks={setFeedbacks} />
        </div>

        <div className='w-full'>
          <FeedbackTableDemo feedbacks={feedbacks} />
        </div>
      </div>
    </section>
  )
}

export default Demo