# Installing PandaOS on the server

The guided path, one command per message. Each step says what the user runs, what they should see, and what to do when they see something else. Wait for the pasted output before the next step.

## 1. Log in

```bash
ssh root@<ip>
```

On providers that log in as `ubuntu` (AWS, Oracle, OVH): `ssh ubuntu@<ip>`, then `sudo -i`.

- Expect: a prompt ending in `#` (root).
- First connection asks "Are you sure you want to continue connecting": the user types `yes`.
- `Permission denied (publickey)`: the VM was created without their SSH key, or with another user name. Check the provider notes for the login user; otherwise the key has to be added in the provider console.
- `Connection timed out`: port 22 is closed in the provider firewall, or the IP is wrong.

## 2. Install Docker

```bash
curl -fsSL https://get.docker.com | sh
```

- Expect: a minute of package output ending with the Docker version and a note about rootless mode. That note needs no action.
- Skip this step when `docker --version` already prints a version (some provider images ship Docker).

## 3. Check Docker

```bash
docker run --rm hello-world
```

- Expect: `Hello from Docker!`
- `permission denied ... docker.sock`: they are not root. Run `sudo -i` and repeat.

## 4. Open the port on the VM itself (only when a firewall runs there)

```bash
ufw status
```

- `Status: inactive` or `command not found`: nothing to do.
- `Status: active`: run `ufw allow 8443/tcp`.
- Oracle images use iptables instead; the line is in `providers.md`.

## 5. Run the PandaOS command

Paste the command `machine_act run-command` returned, as one block, unchanged.

- Expect, over one to two minutes: the image pulling, then a banner saying `Paste this into PandaOS` and a code starting with `pandaos1:`. That code is what `machine_act connect` takes.
- `could not install the AppArmor rule bubblewrap needs on this host`: they are not root and have no sudo. Log in as root and repeat.
- `docker: Error response from daemon: Conflict. The container name "/pandaos" is already in use`: inspect the existing container and ask whether it is the machine the user already uses. Do not remove it automatically. If it is PandaOS, obtain a fresh setup code from that container first. Preserve its volume and encryption key; use update-command for a connected machine.
- `manifest unknown` or `pull access denied`: check registry access and image availability. Preserve the original draftId and encryption key when retrying. Mint a replacement only after confirming that the original command never initialized a data volume; otherwise use update-command for a connected machine or diagnose the original command.
- It stops with no code: `docker logs pandaos --tail 50` shows why.

## 6. A fresh setup code

The code is single use and expires after ten minutes. To print a new one:

```bash
docker exec pandaos pandaos-setup-code
```

## Cloud-init (Drive it for me, providers that take user-data)

Use user-data only to install Docker. Never include the PandaOS run command or encryption key: providers and cloud-init can retain user-data. A local file containing this Docker-only bootstrap has no PandaOS secret.

For a provider accepting cloud-config:

```yaml
#cloud-config
runcmd:
  - [sh, -c, "curl -fsSL https://get.docker.com | sh"]
```

For a provider accepting a shell launch script (such as Lightsail):

```sh
#!/bin/sh
set -eu
curl -fsSL https://get.docker.com | sh
```

After the VM reports running, log in, wait for cloud-init to finish, and verify Docker with step 3. Then paste the original PandaOS run command through the server shell (step 5). User-data never installs PandaOS itself. [AWS launch-script format](https://docs.aws.amazon.com/lightsail/latest/userguide/lightsail-how-to-configure-server-additional-data-shell-script.html).

On a provider whose first interface is private (see `providers.md`), the setup code carries the private address: pass the public one as `address` to `machine_act connect`.

## Updating later

`machine_act update-command` with the machine's id returns the command that pulls the current image and recreates the container with the same volumes and key, so nothing needs connecting again. A machine that can update itself takes `machine_act update` instead, which needs no shell.
