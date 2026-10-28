# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (React), frontend-only, static export. No backend. Chosen with the user: all
interactive demos are client-side logic, so a backend adds deploy complexity with no
portfolio value. Deployable as static output to any host (Vercel, Netlify, static server).

## Users

Primary: technical recruiters and hiring managers evaluating the owner for DevSecOps /
platform-engineering roles or contract work. They skim fast, need proof of real depth,
and are not all deep infra specialists — the page must make advanced security concepts
legible without dumbing them down.

Secondary: engineering peers and leads who will judge the actual architecture and want
to see that the claims hold up technically.

## Product Purpose

An interactive personal portfolio that sells the owner's DevSecOps skill by walking the
visitor through a real, end-to-end CI/CD + DevSecOps platform the owner designed and
operates: the architecture, the security model, the developer experience, and the
air-gapped / high-security operating constraints — explained through interactive
demonstrations rather than prose. Success = a recruiter leaves convinced this person
can design and run secure delivery infrastructure, and reaches out.

## Positioning

Not a generic "I know Docker and GitLab CI" portfolio. The differentiator is a coherent,
defense-in-depth delivery platform built for a bank-grade / air-gapped environment:
VM-grade build isolation, a 5-layer supply-chain security chain, a 3-environment
promotion flow with hard security gates and approvals, GitOps deploy with zero inbound
ports, and Infrastructure-as-Code onboarding. The selling move is letting the visitor
*try* the security properties (not read about them): e.g. click to see that root inside
the isolated build container is an unprivileged user on the host, or simulate a
supply-chain attack and watch the chain reject it.

## Operating Context

The real platform (which this portfolio explains in anonymized form — NO employer name,
NO repo names, NO repo contents may appear) is built around these factual building blocks:

- Build isolation: GitLab Runner on Sysbox runtime (VM-like, unprivileged, no
  `privileged: true`; root in container maps to an unprivileged UID on host) + BuildKit.
- 5 security layers: (1) Sysbox isolation, (2) SonarQube code quality/security,
  (3) Checkmarx SAST as a blocking merge-request gate, (4) Cosign image signing for
  supply-chain integrity, (5) Trivy vulnerability auto-scan in the registry with
  pull-blocking policy.
- 3-environment promotion: development -> staging -> production. SAST gate runs once at
  the staging gate; promotion staging->production carries the already-scanned code.
  Branch protection + tiered merge-request approvals enforce the flow.
- GitOps deploy: a central deployment manager (Portainer) + edge agents on deploy
  servers that connect outbound-only (zero inbound ports open on deploy servers). Unique
  per-build image tags guarantee the new image is always pulled.
- Air-gapped readiness: dependency proxy/cache (Nexus) for npm/Go/Maven/PyPI so builds
  need no public internet; Cosign signing with transparency-log upload disabled (fully
  offline); self-signed internal TLS; outbound-only agents. Suited to banking / high-
  security networks with no internet egress.
- Dual-source-control topology: develop on a public Git host (remote-work friendly),
  deploy from an on-prem host, synced via selective per-branch pull mirroring.
- IaC onboarding: Terraform provisions registry projects, tokens, CI/CD variables,
  branch protections, approval rules, and secret-store policies as one apply per app
  package, with remote managed state.
- Observability: centralized logs/metrics (Grafana + Loki) with outbound log shippers.
- Developer experience: the developer's whole job is `git push`; everything after
  (build, scan, sign, deploy, rollback) is automated.

## Capabilities and Constraints

- Deliverable is a single interactive marketing/portfolio site (Persuade + Experience).
- Hard content constraint (owner, non-negotiable): never name the employer/bank, never
  name any repository, never expose any repo contents. All technical facts are presented
  generically/anonymized. Tool/product names that are generic industry tech (Sysbox,
  Cosign, Trivy, Checkmarx, SonarQube, Terraform, GitLab, Portainer, Nexus, Grafana,
  Loki, Docker, BuildKit) are allowed as they describe the stack, not the employer.
- Interactive demos must run client-side (no backend): Sysbox UID-mapping demo,
  supply-chain attack simulation against the 5 layers, git-push -> pipeline flow
  animation, 3-env + approval flow, Terraform/IaC onboarding flow.
- Must read well to a non-specialist recruiter AND hold up to a specialist's scrutiny.

## Brand Commitments

- Owner name displayed in the hero: "Muhammad Hafidz" (PLACEHOLDER — confirm/replace
  with the exact full name the owner wants shown).
- Role label: "DevSecOps Engineer".
- Content language: English.
- Contact (real, use as given): email mhmmdhafidzr@gmail.com; LinkedIn
  linkedin.com/in/mhmmdhafidzr.
- Visual direction the owner pinned: Swiss editorial / brutalist-tech (confirmed against
  a reference image: oversized tegas typography as composition, strict grid with rule
  lines, disciplined palette with a single bold accent, micro-labels / spec-sheet feel,
  generous whitespace). Dark-mode rendering of that world approved as the starting point,
  light-mode is an acceptable fallback if preferred.

## Evidence on Hand

- Source of truth for all technical claims: the owner's internal implementation guide
  (`JUKNIS_CICD_v5.md`) and the real working repos in this workspace — these are REAL and
  verified, but must NOT be quoted, named, or exposed; only anonymized architecture
  concepts may be surfaced.
- No real testimonials, client names, logos, metrics-with-attribution, or case studies
  are available to display. Any illustrative pipeline logs, diagrams, or numbers shown on
  the site must be clearly illustrative/synthetic, never presented as a named client's
  real production data.

## Product Principles

1. Show, don't tell: every major security property is demonstrated interactively, not
   just described.
2. Legible to recruiters, credible to engineers: two reading depths on the same page.
3. Anonymized by default: the architecture sells itself; the employer and repos never
   appear.
4. Air-gapped / bank-grade security is the headline differentiator, carried throughout.
5. Boring-but-correct over flashy-but-wrong: technical accuracy is part of the craft.

## Accessibility & Inclusion

Keyboard-operable interactive demos, respect for reduced-motion, and color contrast that
survives the single-accent dark palette. No product-specific assistive requirement
established beyond standard WCAG-aware practice.
