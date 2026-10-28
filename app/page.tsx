import { RuleBar } from "@/components/RuleBar";
import { Hero } from "@/components/Hero";
import { Pipeline } from "@/components/Pipeline";
import { Layers } from "@/components/Layers";
import { IsolationDemo } from "@/components/IsolationDemo";
import { AttackSim } from "@/components/AttackSim";
import { DeveloperDX } from "@/components/DeveloperDX";
import { Promotion } from "@/components/Promotion";
import { AirgapIac } from "@/components/AirgapIac";
import { StackSheet } from "@/components/StackSheet";
import { Principles } from "@/components/Principles";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <RuleBar />
      <main>
        <Hero />
        <Pipeline />
        <Layers />
        <IsolationDemo />
        <AttackSim />
        <DeveloperDX />
        <Promotion />
        <AirgapIac />
        <StackSheet />
        <Principles />
        <Contact />
      </main>
    </>
  );
}
