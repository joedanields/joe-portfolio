"use client";

import { FormEvent, useState } from "react";

export function ContactTerminal() {
  const [terminalMode, setTerminalMode] = useState(true);
  const [output, setOutput] = useState("$ ready");
  const [command, setCommand] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cmd = command.trim().toLowerCase();

    if (!cmd) return;

    if (cmd.includes("contact") || cmd.includes("hire")) {
      setOutput("$ opening secure channel... → hello@joedanields.com");
    } else {
      setOutput(`$ unknown command: ${cmd}`);
    }

    setCommand("");
  };

  return (
    <section className="rounded-2xl border border-glass-stroke bg-glass-pane p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl text-white">Contact Terminal</h2>
        <button
          type="button"
          className="text-xs uppercase tracking-[0.2em] text-cyber-cyan"
          onClick={() => setTerminalMode((value) => !value)}
        >
          {terminalMode ? "Switch to form" : "Switch to terminal"}
        </button>
      </div>
      {terminalMode ? (
        <form onSubmit={onSubmit} className="space-y-3">
          <p className="font-mono text-sm text-cyber-mint">{output}</p>
          <label className="flex items-center gap-2 rounded-lg border border-glass-stroke px-3 py-2 font-mono text-sm text-white/80">
            <span className="text-cyber-cyan">$</span>
            <input
              value={command}
              onChange={(event) => setCommand(event.target.value)}
              className="w-full bg-transparent outline-none"
              placeholder="type: contact --priority high"
            />
          </label>
        </form>
      ) : (
        <form className="grid gap-3 md:grid-cols-2">
          <input className="rounded-lg border border-glass-stroke bg-transparent px-3 py-2" placeholder="Name" />
          <input className="rounded-lg border border-glass-stroke bg-transparent px-3 py-2" placeholder="Email" />
          <textarea
            className="rounded-lg border border-glass-stroke bg-transparent px-3 py-2 md:col-span-2"
            rows={4}
            placeholder="Message"
          />
          <button
            type="button"
            className="md:col-span-2 rounded-lg border border-cyber-cyan/40 bg-[#071924] px-4 py-2 text-cyber-cyan"
          >
            Transmit
          </button>
        </form>
      )}
    </section>
  );
}
