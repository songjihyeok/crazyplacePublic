import { Row, Col } from "antd"
import { useEffect } from "react"
import styled from "styled-components"
import { useRouter } from 'next/router'
import BottomNavigation from "../layout/MobileLayout"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push("/list")
  }, [])


  return (
    <>
      <BottomNavigation />
    </>
  )
}
