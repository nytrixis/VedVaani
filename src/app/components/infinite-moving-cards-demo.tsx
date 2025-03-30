"use client";

import React from "react";
import { InfiniteMovingCards } from "@/app/components/ui/infinite-moving-cards";

export default function InfiniteMovingCardsDemo() {
  return (
    <div className="rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden py-10">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "VedVaani's Prashnavali has transformed my understanding of ancient wisdom. It's like having a spiritual guide available 24/7.",
    name: "Arjun M.",
    title: "Spiritual Seeker",
  },
  {
    quote:
      "The Mystic Sound Bath feature has helped me find peace during my most anxious moments. The mantras feel personally crafted for my needs.",
    name: "Priya S.",
    title: "Yoga Practitioner",
  },
  {
    quote:
      "AnuShakti meditation has given me experiences I never thought possible. Each session is unique and profoundly moving.",
    name: "Rahul K.",
    title: "Meditation Teacher",
  },
  {
    quote:
      "The Sacred Journal has become an essential part of my spiritual practice. The AI insights have helped me discover patterns in my journey I never noticed before.",
    name: "Maya D.",
    title: "Mindfulness Coach",
  },
  {
    quote:
      "I appreciate how VedVaani respects my privacy. Knowing my spiritual journey is protected with encryption gives me the freedom to explore deeply.",
    name: "Vikram S.",
    title: "Tech Professional & Meditator",
  },
];
