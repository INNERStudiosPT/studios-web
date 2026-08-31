import React from "react";
import LandingHero from "../../components/LandingHero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "stratacoms | The New Standard of Digital Craft",
  description: "stratacoms is a leading creative production house designing and engineering modern web solutions for ambitious brands worldwide.",
};

export default function Home() {
  return <LandingHero />;
}
