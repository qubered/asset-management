"use client"

import {
  ChevronsUpDown,
  LogOut,
  Building,
  Plus,
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
  useOrganization,
  useOrganizationList,
} from "@clerk/nextjs"
import { SimpleThemeButton } from "@/components/themes/simple-theme-button"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"

export function NavUser({ user }: { user: UserResource }) {
  const { isMobile } = useSidebar()
  const { theme, setTheme } = useTheme()
  const { openUserProfile, openCreateOrganization, setActive, openOrganizationProfile } = useClerk()
  const { organization } = useOrganization()
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    }
  });

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
              <DropdownMenuSubTrigger onClick={() => openOrganizationProfile()}>
                {organization ? (
                  <Avatar className="h-4 w-4 rounded-sm">
                    <AvatarImage src={organization.imageUrl} alt={organization.name} />
                    <AvatarFallback className="rounded-sm">
                      {organization.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <Building className="h-4 w-4" />
                )}
                <span>{organization?.name ?? "Organizations"}</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {userMemberships?.data?.map((membership) => (
                    <DropdownMenuItem
                      key={membership.organization.id}
                      className={organization?.id === membership.organization.id ? "bg-accent" : ""}
                      onClick={async () => {
                        await setActive({ organization: membership.organization.id })
                        toast.success(`Changed Organization`, {
                          description: `You are now in ${membership.organization.name}`
                        })
                      }}
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
                  <DropdownMenuItem onClick={() => openCreateOrganization()}>
                    <Plus className="h-4 w-4" />
                    Create New Organization
                  </DropdownMenuItem>

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
