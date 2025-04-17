import React from 'react'
import ViewTicket from '../../../components/dashboard/tickets/ViewTicket'

const page = ({ params: { slug } }) => {
  return (
    <div>
        <ViewTicket ticket_num={slug} />
    </div>
  )
}

export default page