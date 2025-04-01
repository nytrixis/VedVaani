"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/app/components/ui/sidebar";
import {
  IconHome,
  IconUser,
  IconSettings,
  IconLogout,
  IconCrystalBall,
  IconYoga,
  IconMusic,
  IconAtom,
  IconCell,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/app/lib/utils";
import { useAuth } from "@/app/context/AuthContext";

export default function DashboardSidebar({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconHome className="h-5 w-5 shrink-0 text-mystic-indigo dark:text-himalayan-white" />
      ),
    },
    {
      label: "Profile",
      href: "/profile",
      icon: (
        <IconUser className="h-5 w-5 shrink-0 text-mystic-indigo dark:text-himalayan-white" />
      ),
    },
    {
      label: "Prashnavali",
      href: "/features/prashnavali",
      icon: (
        <IconCrystalBall className="h-5 w-5 shrink-0 text-mystic-indigo dark:text-himalayan-white" />
      ),
    },
    {
      label: "Spiritual Twin",
      href: "/features/spiritual-twin",
      icon: (
        <IconYoga className="h-5 w-5 shrink-0 text-mystic-indigo dark:text-himalayan-white" />
      ),
    },
    {
      label: "Sound Bath",
      href: "/features/sound-bath",
      icon: (
        <IconMusic className="h-5 w-5 shrink-0 text-mystic-indigo dark:text-himalayan-white" />
      ),
    },
    {
      label: "AnuShakti",
      href: "/features/anushakti",
      icon: (
        <IconAtom className="h-5 w-5 shrink-0 text-mystic-indigo dark:text-himalayan-white" />
      ),
    },
    {
      label: "Sacred Journal",
      href: "/features/journal",
      icon: (
        <IconCell className="h-5 w-5 shrink-0 text-mystic-indigo dark:text-himalayan-white" />
      ),
    },
    {
      label: "Settings",
      href: "/settings",
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-mystic-indigo dark:text-himalayan-white" />
      ),
    },
  ];

  const logoutLink = {
    label: isLoggingOut ? "Logging out..." : "Logout",
    href: "#",
    icon: (
      <IconLogout className="h-5 w-5 shrink-0 text-mystic-indigo dark:text-himalayan-white" />
    ),
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
              <div onClick={handleLogout} className="cursor-pointer">
                <SidebarLink link={logoutLink} />
              </div>
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: user?.full_name || user?.email?.split('@')[0] || 'Seeker',
                href: "/profile",
                icon: (
                  <div className="h-7 w-7 shrink-0 rounded-full bg-sacred-gold flex items-center justify-center text-mystic-indigo font-bold">
                    {user?.full_name ? user.full_name[0].toUpperCase() : user?.email ? user.email[0].toUpperCase() : 'S'}
                  </div>
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="/dashboard"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal"
    >
      <div className="h-8 w-8 shrink-0 rounded-full bg-sacred-gold flex items-center justify-center">
        <span className="text-mystic-indigo font-bold">V</span>
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold whitespace-pre text-mystic-indigo dark:text-himalayan-white font-samarkan text-xl"
      >
        VedVaani
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="/dashboard"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal"
    >
      <div className="h-8 w-8 shrink-0 rounded-full bg-sacred-gold flex items-center justify-center">
        <span className="text-mystic-indigo font-bold">V</span>
      </div>
    </Link>
  );
};
