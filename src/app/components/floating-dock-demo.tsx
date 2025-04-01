"use client";

import React from "react";
import { FloatingDock } from "@/app/components/ui/floating-dock";
import { useAuth } from "@/app/context/AuthContext";
import {
  IconHome,
  IconQuestionMark,
  IconUser,
  IconNotebook,
  IconMusic,
  IconAtom,
  IconInfoCircle
} from "@tabler/icons-react";


export default function FloatingDockDemo() {
  const { user } = useAuth();
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-himalayan-white" />
      ),
      href: user ? "/dashboard" : "/",
    },
    {
      title: "Prashnavali",
      icon: (
        <IconQuestionMark className="h-full w-full text-himalayan-white" />
      ),
      href: "/features/prashnavali",
    },
    {
      title: "AI Guru",
      icon: (
        <IconUser className="h-full w-full text-himalayan-white" />
      ),
      href: "/ai-guru",
    },
    {
      title: "Journaling",
      icon: (
        <IconNotebook className="h-full w-full text-himalayan-white" />
      ),
      href: "/journal",
    },
    {
      title: "Mystic Bath",
      icon: (
        <IconMusic className="h-full w-full text-himalayan-white" />
      ),
      href: "/mystic-bath",
    },
    {
      title: "AnuShakti",
      icon: (
        <IconAtom className="h-full w-full text-himalayan-white" />
      ),
      href: "/anushakti",
    },
    {
      title: "About",
      icon: (
        <IconInfoCircle className="h-full w-full text-himalayan-white" />
      ),
      href: "/about",
    },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <FloatingDock 
        items={links} 
        desktopClassName="bg-himalayan-white"
        mobileClassName="translate-y-0"
      />
    </div>
  );
}
