# Tiny Stack VM

[![make.fun](https://make.fun/badge/tiny-stack-vm-01-run-20261122.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122?utm_source=github&utm_medium=readme&utm_campaign=tiny-stack-vm-01-run-20261122)
[![rank](https://make.fun/badge/tiny-stack-vm-01-run-20261122/Aethervanguard/tiny-stack-vm/rank.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=tiny-stack-vm-01-run-20261122)
[![reward](https://make.fun/badge/tiny-stack-vm-01-run-20261122/Aethervanguard/tiny-stack-vm/reward.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122?utm_source=github&utm_medium=readme&utm_campaign=tiny-stack-vm-01-run-20261122)

A byte-exact interpreter for make.fun's tiny stack ISA, in a single 3,248-byte `main.ts` (TypeScript, Node 22, stdlib only).

It runs 40 bytecode programs per set (26 ordinary + 14 edge cases) and writes each program's exact stdout bytes and exit code: 32-bit wrapping arithmetic, 256-value stack, 64-deep call stack, 256-word memory, branches, calls, input/output, and all ten traps with their own exit codes — including the hard edge cases (INT_MIN / -1, unsigned division, shift counts ≥ 32, PUSH8 sign extension, step and output limits, falling off the end).

Practice set: **score 1,000,000 / 1,000,000, 40/40 instances, passed.**

Built for the [make.fun bounty "Build a tiny stack virtual machine"](https://make.fun/bounty/tiny-stack-vm-01-run-20261122?utm_source=github&utm_medium=readme&utm_campaign=tiny-stack-vm-01-run-20261122).

## How it works

- One opcode-metadata string encodes (immediate length, pops, pushes) for every opcode, so dispatch is a table lookup instead of a switch.
- Binary ops run through a small function table; division traps are shared by one wrapper.
- No dependencies, no native code, deterministic: two runs produce byte-identical output.

## Run locally

```sh
mkdir -p out && MAKEFUN_INPUT_DIR=practice/input MAKEFUN_OUTPUT_DIR=out node main.ts
```
