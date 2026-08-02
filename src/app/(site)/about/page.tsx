import type { Metadata } from "next";
import FoundingProblem from "@/components/about/FoundingProblem";
import ScrollTimeline from "@/components/about/ScrollTimeline";
import ValuesAsBehaviors from "@/components/about/ValuesAsBehaviors";
import WorkshopEssay from "@/components/about/WorkshopEssay";
import TeamCredentials from "@/components/about/TeamCredentials";
import LineDraw from "@/components/about/LineDraw";

export const metadata: Metadata = {
  title: "About — Woodex Interior, Lahore",
  description:
    "Woodex Interior started in 2014 because a client cried at handover. Eleven years, 240+ projects, 98% on-time. Meet the team and see how we actually work.",
};

export default function AboutPage() {
  return (
    <main>
      <FoundingProblem />
      <ScrollTimeline />
      <ValuesAsBehaviors />
      <WorkshopEssay />
      <TeamCredentials />
      <LineDraw />
    </main>
  );
}
