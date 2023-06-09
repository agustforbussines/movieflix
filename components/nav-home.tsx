'use client'

import ToggleTheme from './toggle-theme'
import { Button } from './ui/button'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Icons } from './icons'
import TooltipComponent from './tooltip'
import SidebarMobile from './sidebar-mobile'
import SearchComponent from './search'
import Link from 'next/link'

function NavHome() {
  const [isMobileActive, setIsMobileActive] = useState(false)
  const path = usePathname()
  useEffect(() => {
    setIsMobileActive(false)
  }, [path])
  return (
    <>
      <div className="container flex justify-between items-center my-5">
        <div className="flex gap-4 items-center">
          <div className="md:hidden mt-2">
            <TooltipComponent
              trigger={
                isMobileActive ? (
                  <Icons.panelClose
                    className=" w-5 h-5"
                    onClick={() => setIsMobileActive(false)}
                  />
                ) : (
                  <Icons.panelOpen
                    className=" w-5 h-5"
                    onClick={() => setIsMobileActive(true)}
                  />
                )
              }
            />
          </div>

          <Icons.movie className="w-6 h-6 hidden md:block" />
          <Link href={'/'} className="font-bold text-lg mr-4">
            MovieFlix
          </Link>
        </div>

        <div className="flex-grow md:max-w-[320px] mr-4 lg:mr-0">
          <SearchComponent />
        </div>

        <div className="space-x-4 flex items-center">
          <ToggleTheme />
          <Button disabled>Login</Button>
        </div>
      </div>

      {isMobileActive ? (
        <div className="md:hidden">
          <SidebarMobile />
        </div>
      ) : null}
    </>
  )
}

export default NavHome
