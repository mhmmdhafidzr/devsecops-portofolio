/* ---------------------------------------------------------------------------
   All site copy, anonymized. Source of truth: the owner's internal CI/CD guide
   and real platform. NO employer name, NO repository names, NO repo contents.
   Generic industry tool names are allowed (they describe the stack, not the org).
   Any logs/metrics shown are illustrative, not a named client's production data.
--------------------------------------------------------------------------- */

export const owner = {
  name: "Muhammad Hafidz",
  role: "DevSecOps Engineer",
  tagline:
    "I build secure delivery platforms where a developer's whole job is git push — and everything after it is isolated, scanned, signed, and verifiable.",
  email: "mhmmdhafidzr@gmail.com",
  linkedin: "mhmmdhafidzr",
  linkedinUrl: "https://linkedin.com/in/mhmmdhafidzr",
  specCode: "DSX-01 / REV.5",
  location: "Built for bank-grade, air-gapped networks",
};

export const headlineStats = [
  { value: 5, label: "Security layers", suffix: "" },
  { value: 3, label: "Promotion environments", suffix: "" },
  { value: 0, label: "Inbound ports on deploy hosts", suffix: "" },
  { value: 100, label: "Builds without public internet", suffix: "%" },
];

/* The end-to-end pipeline, as ordered stages. */
export const pipeline = [
  {
    code: "P-00",
    key: "push",
    title: "git push",
    actor: "Developer",
    desc: "The developer finishes a feature and pushes. That is the entire manual step. No deploy scripts, no SSH, no registry login by hand.",
  },
  {
    code: "P-01",
    key: "isolate",
    title: "Isolated build",
    actor: "Sysbox + BuildKit",
    desc: "The pipeline runs inside a VM-grade isolated container. Root inside the build is an unprivileged user on the host. No privileged mode, no host escape.",
  },
  {
    code: "P-02",
    key: "quality",
    title: "Code quality",
    actor: "SonarQube",
    desc: "Static code quality and security-hotspot analysis. Advisory in development, a required gate before production.",
  },
  {
    code: "P-03",
    key: "sast",
    title: "SAST gate",
    actor: "Checkmarx",
    desc: "A blocking static application security test at the staging gate. If findings exceed the threshold, the merge request cannot merge. Scanned once, then promoted.",
  },
  {
    code: "P-04",
    key: "sign",
    title: "Image signing",
    actor: "Cosign",
    desc: "The built image is cryptographically signed. Signatures live in the registry as artifacts. Signing runs fully offline — no transparency-log upload, no internet.",
  },
  {
    code: "P-05",
    key: "scan",
    title: "Vulnerability scan",
    actor: "Trivy",
    desc: "The registry auto-scans every pushed image. A policy blocks pulls of images whose vulnerabilities exceed the environment's threshold.",
  },
  {
    code: "P-06",
    key: "admit",
    title: "Admission",
    actor: "Registry policy",
    desc: "Only a signed image that passed scanning is admissible. Unsigned or vulnerable images are refused at pull time, before they can run.",
  },
  {
    code: "P-07",
    key: "deploy",
    title: "GitOps deploy",
    actor: "Edge agent",
    desc: "A central manager updates the environment; an outbound-only edge agent on the deploy host pulls the new image. No inbound port is ever opened on the deploy server.",
  },
];

/* The 5 security layers, each with the provenance claim it can prove. */
export const layers = [
  {
    code: "L-1",
    name: "Build isolation",
    tool: "Sysbox",
    claim: "Root in the build is not root on the host.",
    detail:
      "CI runs on a container runtime that gives each build VM-like isolation without privileged mode. The build cannot see the host filesystem, other containers (registry, cache), or load kernel modules. A compromised build stays in its box.",
    proves: "No privilege escalation from a malicious build.",
  },
  {
    code: "L-2",
    name: "Code quality",
    tool: "SonarQube",
    claim: "Smells and hotspots are caught before they ship.",
    detail:
      "Source is analyzed for bugs, code smells, and security hotspots. The quality gate is advisory in development and required before a production release, so quality debt cannot silently reach production.",
    proves: "A measurable quality bar on every production release.",
  },
  {
    code: "L-3",
    name: "SAST gate",
    tool: "Checkmarx",
    claim: "Vulnerable code cannot be merged to staging.",
    detail:
      "A static application security test runs as a blocking check on the merge request into staging. Findings are posted back onto the request. Exceed the threshold and the merge is physically blocked — not a warning, a gate. Promotion from staging to production carries the already-scanned code.",
    proves: "A hard stop on known-vulnerable code, once, at the right gate.",
  },
  {
    code: "L-4",
    name: "Supply-chain integrity",
    tool: "Cosign",
    claim: "Only images from the real pipeline can deploy.",
    detail:
      "Every image the pipeline builds is cryptographically signed. An image pushed by any other means has no signature. With enforcement on, the registry refuses to serve an unsigned image — so a tampered or side-loaded image simply cannot run. Signing is fully offline.",
    proves: "Provenance: the thing you deploy is the thing you built.",
  },
  {
    code: "L-5",
    name: "Vulnerability policy",
    tool: "Trivy",
    claim: "Known-vulnerable images are refused at pull time.",
    detail:
      "The registry scans every image on push. A per-environment policy blocks pulls when vulnerabilities exceed the threshold — stricter in production than development. The deploy fails closed rather than shipping a known-vulnerable container.",
    proves: "No known-critical image reaches a running environment.",
  },
];

/* Supply-chain attack scenarios the visitor can fire at the chain. */
export const attacks = [
  {
    id: "unsigned",
    name: "Side-load an unsigned image",
    story:
      "An attacker with registry access pushes a malicious image directly, skipping the pipeline.",
    stoppedBy: "L-4",
    stoppedTool: "Cosign",
    outcome:
      "The image has no valid signature. Admission policy refuses the pull. It never runs.",
  },
  {
    id: "vulnerable",
    name: "Ship a known-vulnerable base",
    story:
      "A dependency with a critical CVE slips into the image during a legitimate build.",
    stoppedBy: "L-5",
    stoppedTool: "Trivy",
    outcome:
      "The registry scan flags the critical CVE. The pull policy blocks it before deploy. Fails closed.",
  },
  {
    id: "sqli",
    name: "Introduce a vulnerable code path",
    story:
      "A merge request introduces an injection-prone code path on its way to staging.",
    stoppedBy: "L-3",
    stoppedTool: "Checkmarx",
    outcome:
      "The SAST gate finds it and posts the finding on the request. Over threshold, so the merge is blocked.",
  },
  {
    id: "escape",
    name: "Escape the build to the host",
    story:
      "Malicious build steps try to break out of the CI container to reach the host or other services.",
    stoppedBy: "L-1",
    stoppedTool: "Sysbox",
    outcome:
      "Root in the build maps to an unprivileged host user. There is no host filesystem and no privileged mode to escape through.",
  },
];

/* 3-environment promotion. */
export const environments = [
  {
    code: "ENV-D",
    name: "development",
    gate: "Review + approval",
    approver: "Officer and above",
    scan: "Quality scan (advisory)",
    note: "Feature branches merge here after review. Auto-deploys to the dev server.",
  },
  {
    code: "ENV-S",
    name: "staging",
    gate: "SAST gate (blocking)",
    approver: "Developer and above",
    scan: "Full security scan — the hard gate",
    note: "The security checkpoint. Nothing reaches here without passing SAST. A clean waiting room.",
  },
  {
    code: "ENV-P",
    name: "production",
    gate: "Promotion + approval",
    approver: "Maintainer (dual approval)",
    scan: "Required quality gate",
    note: "Promoted from staging with no new commits — the code equals what already cleared the gate.",
  },
];

/* Air-gapped / bank-grade capabilities. */
export const airgap = [
  {
    code: "AG-1",
    title: "No public internet needed to build",
    desc: "A dependency proxy caches packages for every ecosystem (npm, Go, Maven, PyPI). Builds resolve from the internal cache, not the public registry.",
  },
  {
    code: "AG-2",
    title: "Signing works fully offline",
    desc: "Image signing runs with transparency-log upload disabled and a local key pair. No call to any public service is required to sign or verify.",
  },
  {
    code: "AG-3",
    title: "Zero inbound ports on deploy hosts",
    desc: "Deploy servers run an edge agent that connects outbound-only to the central manager. Nothing listens for inbound connections — zero attack surface from the network.",
  },
  {
    code: "AG-4",
    title: "Internal TLS, no external CA",
    desc: "Self-signed internal certificates with IPs in the SAN. No dependency on external DNS or a public certificate authority.",
  },
  {
    code: "AG-5",
    title: "Develop remote, deploy on-prem",
    desc: "Teams develop on a public Git host for remote-work convenience; the on-prem host that reaches production pulls only the specific branches it should, via selective mirroring.",
  },
];

/* Secrets management — concise, honest about Vault being a complementary piece. */
export const secrets = [
  {
    code: "SEC-1",
    title: "Credentials live in a vault, not in Git",
    desc: "Database passwords, API keys, and tokens sit in a centralized secret store with access policies — never pasted into a repo or a plain .env file.",
  },
  {
    code: "SEC-2",
    title: "Repos commit a path, not a password",
    desc: "What a repository holds is the address and path to the secret, which is safe to commit. The real value is fetched at runtime by the service that is allowed to read it.",
  },
  {
    code: "SEC-3",
    title: "Per-app, policy-scoped access",
    desc: "Each application authenticates with its own role and reads only its own path, over internal TLS. One leaked credential can't unlock everything — and it works fully inside an air-gapped network.",
  },
];

/* IaC onboarding. */
export const iac = [
  {
    step: "01",
    title: "Describe the app package",
    desc: "A new application is one package definition: its repositories, image names, and which environments it needs.",
  },
  {
    step: "02",
    title: "One apply provisions everything",
    desc: "Terraform creates registry projects and robot accounts, CI/CD variables scoped per environment, branch protections, merge-approval rules, and secret-store policies — all from code.",
  },
  {
    step: "03",
    title: "State is managed and shared",
    desc: "State lives in remote managed storage, encrypted and access-controlled, so onboarding is reproducible and auditable instead of a laptop ritual.",
  },
  {
    step: "04",
    title: "Add a repo by adding a line",
    desc: "Growing an app is one more entry in the package and another apply. Shared resources are untouched; only the new repository's resources are created.",
  },
];

/* Principles over tools — the selling move: the concept is fixed, the tools swap.
   `mine` = what I run today (self-managed / air-gapped).
   `cloud` = the equivalent managed service that keeps the same property.
   Cloud mapping is an honestly-labeled direction, not a claim of prior deployment. */
export const principles = [
  {
    code: "PR-1",
    principle: "VM-grade build isolation",
    mine: "Sysbox",
    cloud: "Ephemeral managed runners (CodeBuild / Cloud Build)",
  },
  {
    code: "PR-2",
    principle: "Static application security gate",
    mine: "Checkmarx",
    cloud: "GitHub Advanced Security / Snyk",
  },
  {
    code: "PR-3",
    principle: "Cryptographic image provenance",
    mine: "Cosign",
    cloud: "Cosign keyless (OIDC) + cloud KMS",
  },
  {
    code: "PR-4",
    principle: "Vulnerability admission policy",
    mine: "Trivy",
    cloud: "Registry-native scan (ECR / Artifact Registry)",
  },
  {
    code: "PR-5",
    principle: "Source control & pipelines",
    mine: "GitLab CI",
    cloud: "GitHub Actions / cloud-native CI",
  },
  {
    code: "PR-6",
    principle: "GitOps, zero-inbound deploy",
    mine: "Portainer + edge agents",
    cloud: "Argo CD / Flux (pull-based)",
  },
  {
    code: "PR-7",
    principle: "Infrastructure & onboarding as code",
    mine: "Terraform",
    cloud: "Terraform / OpenTofu (unchanged)",
  },
  {
    code: "PR-8",
    principle: "Centralized secrets",
    mine: "Vault",
    cloud: "Cloud secret manager (AWS / GCP / Azure)",
  },
];

export const stack = [
  { group: "Isolation & build", items: ["Sysbox", "BuildKit", "Docker"] },
  { group: "Security", items: ["Checkmarx (SAST)", "SonarQube", "Cosign", "Trivy"] },
  { group: "Registry & deploy", items: ["Harbor", "Portainer", "Edge agents"] },
  { group: "Supply chain", items: ["Nexus (cache/proxy)", "Signed artifacts"] },
  { group: "IaC & secrets", items: ["Terraform", "Vault", "Managed state"] },
  { group: "Observability", items: ["Grafana", "Loki", "Promtail"] },
  { group: "Source & flow", items: ["GitLab", "Pull mirroring", "3-env promotion"] },
  { group: "Runtime", items: ["Docker Swarm", "Rolling update", "Auto-rollback"] },
];
