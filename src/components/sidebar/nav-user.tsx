"use client"

import {
  ChevronsUpDown,
  LogOut,
  Building,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import { useTheme } from "next-themes"
import type { UserResource, OrganizationResource } from "@clerk/types"
import {
  SignOutButton,
  useClerk,
  useOrganizationList,
} from "@clerk/nextjs"
import { SimpleThemeButton } from "@/components/themes/simple-theme-button"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"

export function NavUser({ user }: { user: UserResource }) {
  const { isMobile } = useSidebar()
  const { theme, setTheme } = useTheme()
  const { openUserProfile } = useClerk()
  const [activeOrganization, setActiveOrganization] = useState<OrganizationResource | null>(null)
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    }
  });

  useEffect(() => {
    const savedOrgId = (Cookies.get('activeOrganizationId') as string | undefined) || ''
    if (savedOrgId && userMemberships?.data) {
      const savedOrg = userMemberships.data.find(
        membership => membership.organization.id === savedOrgId
      )
      if (savedOrg) {
        setActiveOrganization(savedOrg.organization)
      }
    }
  }, [userMemberships?.data])

  const handleOrganizationChange = (organization: OrganizationResource) => {
    setActiveOrganization(organization)
    Cookies.set('activeOrganizationId', organization.id, { expires: 365 })
    toast.success(`Changed Organization`, {
      description: `You are now viewing ${organization.name}`
    })
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.imageUrl} alt={user.fullName ?? ""} />
                <AvatarFallback className="rounded-lg">
                  {user.firstName?.charAt(0)}
                  {user.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.fullName}</span>
                <span className="truncate text-xs">{user.primaryEmailAddress?.emailAddress}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div
                className="flex items-center gap-2 px-1 py-1.5 text-left text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground"
                onClick={() => openUserProfile()}
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.imageUrl} alt={user.fullName ?? ""} />
                  <AvatarFallback className="rounded-lg">
                    {user.firstName?.charAt(0)}
                    {user.lastName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.fullName}</span>
                  <span className="truncate text-xs">{user.primaryEmailAddress?.emailAddress}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                <SimpleThemeButton />
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                {activeOrganization ? (
                  <Avatar className="h-4 w-4 rounded-sm">
                    <AvatarImage src={activeOrganization.imageUrl} alt={activeOrganization.name} />
                    <AvatarFallback className="rounded-sm">
                      {activeOrganization.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <Building className="h-4 w-4" />
                )}
                <span>{activeOrganization?.name ?? "Organizations"}</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {userMemberships?.data?.map((membership) => (
                    <DropdownMenuItem
                      key={membership.organization.id}
                      className={activeOrganization?.id === membership.organization.id ? "bg-accent" : ""}
                      onClick={() => handleOrganizationChange(membership.organization)}
                    >
                      <Avatar className="h-4 w-4 rounded-sm">
                        <AvatarImage src={membership.organization.imageUrl} alt={membership.organization.name} />
                        <AvatarFallback className="rounded-full">
                          {membership.organization.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {membership.organization.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <SignOutButton>
                <div className="flex w-full items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </div>
              </SignOutButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu >
  )
}
