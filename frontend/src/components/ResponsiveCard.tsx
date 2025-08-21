import type { ReactNode } from 'react'
import { Card, CardContent } from '@mui/material'

interface ResponsiveCardProps {
  children: ReactNode
}

export function ResponsiveCard({ children }: ResponsiveCardProps) {
  return (
    <Card sx={{ border: 'none', boxShadow: 'none' }}>
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>{children}</CardContent>
    </Card>
  )
}

export default ResponsiveCard
