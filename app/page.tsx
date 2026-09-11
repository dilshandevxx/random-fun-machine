"use client";

import { useState } from "react";
import { Sparkles, Dice5, RotateCw } from "lucide-react";

type Kind = "joke" | "fact" | "challenge" | "fate" | "nonsense";
type Result = { kind: Kind; emoji: string; title: string; text: string };

const results: Result[] = [
  { kind: "joke", emoji: "😂", title: "Certified Dad Joke", text: "Why did the developer go broke? Because they used up all their cache." },
  { kind: "joke", emoji: "🥔", title: "Important Potato News", text: "A potato walked into a restaurant. The waiter said, “We don't serve food here.”" },
  { kind: "fact", emoji: "🧠", title: "Tiny Brain Explosion", text: "Octopuses have three hearts. Somewhere, an octopus is doing cardio and still complaining." },
  { kind: "fact", emoji: "🌌", title: "Cosmic Weirdness", text: "A day on Venus is longer than a Venusian year. Space clearly has terrible calendar design." },
  { kind: "challenge", emoji: "🎯", title: "Your Mission", text: "Stand up, stretch for ten seconds, then return like nothing happened. Nobody needs to know." },
  { kind: "challenge", emoji: "🕵️", title: "Secret Agent Mode", text: "Look around and find the most suspiciously ordinary object in the room." },
  { kind: "fate", emoji: "🔮", title: "The Machine Has Spoken", text: "Today you will discover something useful by accidentally clicking the wrong thing." },
  { kind: "fate", emoji: "✨", title: "Mysterious Prophecy", text: "Your next great idea will arrive when you are absolutely supposed to be doing something else." },
  { kind: "nonsense", emoji: "🐸", title: "Absolutely Meaningful", text: "The frog knows. The frog has always known. You are not ready." },
  { kind: "nonsense", emoji: "🦆", title: "Duck Protocol", text: "A duck somewhere has judged your life choices. Fortunately, it is keeping the report confidential." }
];

const filters: { label: string; value: Kind | "all"; emoji: string }[] = [
  { label: "Everything", value: "all", emoji: "✨" }, { label: "Jokes", value: "joke", emoji: "😂" },
  { label: "Facts", value: "fact", emoji: "🧠" }, { label: "Challenges", value: "challenge", emoji: "🎯" },
  { label: "Fate", value: "fate", emoji: "🔮" }, { label: "Nonsense", value: "nonsense", emoji: "🐸" }
];

export default function Home() {
  const [filter, setFilter] = useState<Kind | "all">("all");
  const [result, setResult] = useState<Result | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [count, setCount] = useState(0);

  function generate() {
    setSpinning(true);
    const pool = filter === "all" ? results : results.filter((item) => item.kind === filter);
    setTimeout(() => {
      setResult(pool[Math.floor(Math.random() * pool.length)]);
      setCount((n) => n + 1);
      setSpinning(false);
    }, 350);
  }

  return (
    <main className="min-h-screen overflow-hidden px-5 py-8 sm:px-8">
      <div className="orb orb-one" /><div className="orb orb-two" />
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-4xl flex-col items-center justify-center">
        <div className="mb-7 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur"><Sparkles size={15} />Zero productivity. Maximum vibes.</div>
        <h1 className="text-center text-5xl font-black tracking-tight sm:text-7xl">Random <span className="gradient-text">Fun</span> Machine</h1>
        <p className="mt-4 max-w-xl text-center text-base leading-7 text-white/55 sm:text-lg">Press the button and let questionable artificial intelligence improve your day.</p>
        <div className="mt-9 flex max-w-full gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.035] p-2 backdrop-blur">
          {filters.map((item) => <button key={item.value} onClick={() => setFilter(item.value)} className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold transition ${filter === item.value ? "bg-white text-black shadow-lg" : "text-white/55 hover:bg-white/10 hover:text-white"}`}>{item.emoji} {item.label}</button>)}
        </div>
        <div className={`result-card mt-7 w-full max-w-2xl ${spinning ? "spinning" : ""}`}>
          {result ? <div className="relative p-8 text-center sm:p-12"><div className="text-7xl">{result.emoji}</div><div className="mt-5 text-xs font-bold uppercase tracking-[0.25em] text-white/35">{result.kind}</div><h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">{result.title}</h2><p className="mx-auto mt-4 max-w-lg text-lg leading-8 text-white/65">{result.text}</p><div className="mt-7 text-xs text-white/30">Revealed #{count}</div></div> : <div className="p-10 text-center sm:p-16"><div className="text-7xl">🎲</div><h2 className="mt-5 text-2xl font-bold">The machine is waiting...</h2><p className="mt-2 text-white/45">Your destiny is one click away.</p></div>}
        </div>
        <button onClick={generate} disabled={spinning} className="fun-button mt-7">{spinning ? <RotateCw className="animate-spin" size={22} /> : <Dice5 size={22} />}{spinning ? "Calculating nonsense..." : result ? "Give me another!" : "Make my day"}</button>
        <p className="mt-5 text-xs text-white/25">Made with Next.js · Powered by absolutely nothing serious.</p>
      </section>
    </main>
  );
}