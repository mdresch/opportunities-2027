---
name: "pandaos-machine-setup"
description: "Set up a new PandaOS remote machine on a cloud or server PandaOS cannot set up in one click (DigitalOcean, AWS, OVH, Scaleway, Vultr, Linode, Oracle, a home or office server, anything that runs a Linux VM): get a VM running, install PandaOS on it with the run command from machine_act, and connect it with the setup code. NEVER for Hetzner, Azure or Hostinger, which have their own 1-click button in Settings, Cloud, Add machine. Google Cloud only when its button is missing there."
---
You are setting up a **PandaOS remote machine**: a server the user rents or owns, running the PandaOS server image, that their desktop connects to so chats can run there. Your job ends when the machine shows **Online** in Remote Machines and the user knows what still bills.

**Scope.** This skill is for providers PandaOS has no 1-click setup for. If the user names Hetzner, Azure or Hostinger, stop and tell them in one line to use that provider's button in Settings, Cloud, Add machine, because it creates, installs and connects the VM by itself.

**Google Cloud.** Its 1-click button is not shown to every account yet. If the user names Google Cloud, ask once whether they see a Google Cloud button in Settings, Cloud, Add machine. If they do, send them there. If they do not, set it up here like any other provider: a Compute Engine VM, with the port opened by a firewall rule.

## The three PandaOS tools

PandaOS only does three things in this flow, and they are tools. If they are not loaded, find them with tool search (Claude sees them as `mcp__pandactions__machine_read`, `mcp__pandactions__machine_act`, `mcp__pandactions__machine_open`). If tool search finds none of them, check Experimental Features under Settings, Advanced. If it is already on, report that the tools are unavailable in this session and stop.

- `machine_read`: the machines already connected, with state, version and price. Call it once at the start so you do not create a second machine with an existing name.
- `machine_act` with `action: "run-command"`: mints the machine's encryption key, saves it in the user's keychain, and returns the command that installs PandaOS on the server plus a `draftId`. With `action: "connect"`: pairs the machine from the `pandaos1:` setup code the server printed.
- `machine_open`: shows the machine in the Remote Machines panel, on a tab.

Everything else (renting the VM, opening the port, installing Docker) happens at the provider, and you choose how with the user below.

## Stop points (read these first, they override every step)

- **No money without a card.** Before anything that creates a billed resource (a VM, a static IP, a volume), show what it is, where, and the provider's listed price, and wait for the user to confirm on a card. A "yes" earlier in the chat does not cover a later purchase.
- **Never enter payment details**, never accept terms of service, never click a billing or checkout confirmation. In the browser route, stop at that page and tell the user to click it themselves.
- **Never take a token in chat.** A provider API token goes through the Credentials Manager: `creds_create_var` with an empty value, then the `pandaos://credentials/<env file>` link from `pandaos_get_navigation_links` for the user to paste it there. If the user pastes a token into the chat anyway, tell them to revoke it at the provider and make a new one.
- **The run command carries the machine's encryption key.** Show it only to the user. Never write it to a file, a commit, a note or a log, and never put it in provider user-data. Cloud-init prepares Docker only; the key-bearing command runs through the server shell.
- **You do not run the run command yourself** unless the user gave you a shell on that server (they ran you on it, or said "you can ssh in" and the key works). Otherwise the user runs it.
- **End by saying what still bills**: the VM, any disk or IP left behind, and that Remove in PandaOS only forgets a machine added this way. The provider's console is where it is deleted.

## Step 1: Ask, with cards, never prose

Use `generative_ui`. Discover the component first with a query, then render it with real options.

**Card 1, provider** (`option_cards`, single choice). Options from `references/providers.md`: DigitalOcean, AWS (Lightsail or EC2), OVHcloud, Scaleway, Vultr, Akamai Linode, Oracle Cloud free tier, plus **My own server** (a box at home, at the office, or one they already rent) and **Another provider**. Skip the card if the user already named one.

**Card 2, route** (`option_cards`, single choice). Read the provider's section in `references/providers.md` first, so each option states its honest cost:

- **Drive it for me.** You create the VM through the provider's CLI or API. Needs the CLI installed and logged in, or an API token in the Credentials Manager. Fastest, and the user still confirms the purchase on a card. Offer it only when the provider has a CLI or API in the notes; check with `Bash` (`command -v doctl`, and the login check from the notes) before promising it.
- **Guide me.** You tell the user what to click and what to type, one step at a time, and read back what they paste. Works everywhere, takes 15 to 20 minutes.
- **Use the browser.** You operate the provider's console in PandaOS's built-in browser with the user's own login, narrating each step before you take it. Offer it only when browser tools are available (the `browser_*` tools exist). When they are not, omit this option and explain that Browser Tools can be enabled under Settings, General for a new session. Use `pandaos_get_navigation_links` for the exact link; option_cards has no disabled option state.

For **My own server**, replace card 2 with one question: can the user SSH into it as root or a sudo user, and does it run Ubuntu 22.04 or 24.04 (or another Linux with Docker)? Then go to Step 3.

**Form, the machine** (`short_form`): a name (default: the name the user gave, or "<Provider> machine"), the region or "closest to me", the desired size (default 4 vCPU and 8 GB), and an optional domain the user already points at the server. Explain under the domain field that it cannot be added later and that an IP address works without one.

## Step 2: Get a VM

Every route ends with the same three facts: the VM's **public IPv4**, that **TCP 8443 and 22 are open** inbound, and that it runs **Ubuntu 24.04** (22.04 works). The size is 4 vCPU and 8 GB RAM or more; 2 vCPU and 4 GB works for light use, and say so if the user picks it to save money.

**Drive it for me.**
1. Check the CLI and its login with the commands in `references/providers.md`. If it is not logged in, give the user the provider's own login command to run in their terminal, or set up the token through the Credentials Manager as in the stop points. Do not install a CLI for them. If it is missing, use the documented REST API with a credential supplied through the Credentials Manager, or offer Guide me. Load credentials into the command environment without printing them.
2. Show a confirmation card (`option_cards` with Create and Cancel, or the plain question tool) naming provider, region, size, image, and the listed monthly price. Wait for Create.
3. Create the VM with Ubuntu 24.04, a public IPv4 and the user's SSH key if the provider takes one (list theirs, never upload a new one without asking). Where the provider takes user-data, use the Docker-only bootstrap from `references/manual-install.md`. Do not put the PandaOS run command or its key in user-data.
4. Open TCP 22 and 8443 with the provider's firewall (the exact command is in the notes).
5. Read back the public IP from the provider's answer.

**Guide me.** One instruction per message, each ending with what the user should see or paste back. Use the click path in `references/providers.md`. Ask for the IP at the end, and check it looks like an IPv4 address before moving on.

**Use the browser.** `browser_navigate` to the console URL in the notes. If the page asks for a login, the user logs in themselves; wait. Before each click or form entry, say in one line what you are about to do. Stop at any payment, billing, checkout, terms or identity verification page and hand it to the user. After the VM is created, read the IP off the page with `browser_snapshot`.

## Step 3: Mint the command

Call `machine_act` with `action: "run-command"`, `name` from the form, and `hostname` only if the user gave a domain. Keep the `draftId` it returns: Step 5 needs it.

Tell the user, in one sentence, that the command contains this machine's encryption key, that PandaOS already saved a copy in their keychain, and that it should not be pasted anywhere but the server's shell.

## Step 4: Install PandaOS on the server

Follow `references/manual-install.md`. The rule for the guided path is **one command per message**: give the command, say what it should print, wait for the user to paste the output, read it, and only then give the next one. If the output is not what the notes expect, diagnose from it before moving on. Do not batch three commands to save time.

1. SSH in (`ssh root@<ip>`, or `ssh ubuntu@<ip>` then `sudo -i`, per the provider notes).
2. Install Docker, check it with `docker run --rm hello-world`.
3. Paste the run command from Step 3 as one block. It ends by printing a code starting with `pandaos1:`.

When cloud-init installed Docker, verify Docker first and skip its installation. Still run the PandaOS command through the server shell. Keep its original draftId and key for retries; never mint a new key for a volume that may already contain data.

## Step 5: Connect

Ask for the `pandaos1:` code (it is single use and lasts ten minutes; `docker exec pandaos pandaos-setup-code` prints a fresh one). Call `machine_act` with `action: "connect"`, `setupCode`, the `draftId` from Step 3, and `name`. Pass `address` (`"<public ip>:8443"`) when the server sits behind NAT or a port forward, and on every provider `references/providers.md` marks as **private first interface** (AWS, Oracle, some Scaleway types): there the code carries a private address this computer cannot reach.

If it fails, the answer says why in a sentence. The usual causes and fixes:
- Unreachable: port 8443 is not open in the provider firewall or in `ufw` on the VM.
- Expired or used code: print a fresh one.
- Wrong address: pass `address` with the IP and port the user reaches it at.

On success, call `machine_read` with the new id to check its state, then call `machine_open` with the new id and `tab: "connections"`, and tell the user that this tab is where they bring their model accounts over: API keys and PandaOS Cloud in one click, Claude and Codex subscriptions sign in on the machine once.

## Step 6: Close

Say, in three short lines: the state machine_read actually reported (say Online only if it is online) and where to pick it (the pill above the composer); what bills and where to stop it (the provider's console, by deleting the VM and any IP or volume); and that Remove in PandaOS forgets the machine here but does not delete the VM for a provider PandaOS did not create it on.


## Reference Files
This skill includes reference documents. Read them when you need supporting context:
- `.claude/skills/pandaos-machine-setup/references/manual-install.md`
- `.claude/skills/pandaos-machine-setup/references/providers.md`
