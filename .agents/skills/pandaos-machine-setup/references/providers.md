# Provider notes

What every provider has to give you: a Linux VM (Ubuntu 24.04 preferred, 22.04 works), a public IPv4, inbound TCP 22 and 8443 open, 4 vCPU and 8 GB RAM or more. The PandaOS image is multi-arch, so x86 and Arm both work.

Console labels and prices change. Read the provider's own page for the price before the purchase card, and say "listed price" rather than a number you remember. Before executing a command, verify its flags with the installed CLI help and resolve image and size IDs from the provider catalog. The examples below are starting points, not guaranteed current IDs. If creation times out, list resources first to avoid creating a duplicate. Any user-data file below contains only the Docker bootstrap from manual-install.md, never the PandaOS run command.

**The address trap.** The run command guesses the server's address from its first network interface. On providers marked **private first interface** below, that is a private address (10.x, 172.16 to 172.31, 192.168.x), so the setup code carries an address this computer cannot reach. Pass `address: "<public ip>:8443"` to `machine_act connect` there.

## DigitalOcean

- Console: https://cloud.digitalocean.com/droplets/new
- CLI: `doctl`. Login check: `doctl account get`. Login: `doctl auth init` (the user pastes a token in their own terminal).
- API: https://api.digitalocean.com/v2, bearer token.
- Image slug: `ubuntu-24-04-x64`. Size with 4 vCPU and 8 GB: `s-4vcpu-8gb`. Regions: `doctl compute region list`.
- SSH keys: `doctl compute ssh-key list`, pass `--ssh-keys <id>`.
- Create: `doctl compute droplet create <name> --image ubuntu-24-04-x64 --size s-4vcpu-8gb --region <slug> --ssh-keys <id> --user-data-file <file> --wait`
- Port: use the [current firewall command reference](https://docs.digitalocean.com/reference/doctl/reference/compute/firewall/create/) to verify rule syntax before applying `doctl compute firewall create --name pandaos-<name> --droplet-ids <id> --inbound-rules "protocol:tcp,ports:22,address:0.0.0.0/0 protocol:tcp,ports:8443,address:0.0.0.0/0" --outbound-rules "protocol:tcp,ports:all,address:0.0.0.0/0 protocol:udp,ports:all,address:0.0.0.0/0"`. Droplets have no firewall by default, so this is optional but recommended.
- Login: `root`. The public IP is on the first interface.
- Guided path: Create, Droplets, region, Ubuntu 24.04 (LTS) x64, Basic, Regular, the 8 GB plan, SSH key, Create Droplet. Copy the ipv4 address from the droplet list.
- Bills: the droplet, hourly, even when powered off. Delete it (Destroy) to stop billing. Backups and reserved IPs bill separately.

## AWS Lightsail

- Console: https://lightsail.aws.amazon.com/ls/webapp/create/instance
- CLI: `aws`. Login check: `aws sts get-caller-identity`. Login: `aws configure` or `aws sso login`.
- API: regional Lightsail endpoint `https://lightsail.<region>.amazonaws.com`, AWS SigV4 signing. Prefer the AWS CLI.
- Blueprint: `ubuntu_24_04`. Bundle with 8 GB: list with `aws lightsail get-bundles` and pick one with 8 GB `ramSizeInGb`.
- Create: `aws lightsail create-instances --instance-names <name> --availability-zone <region>a --blueprint-id ubuntu_24_04 --bundle-id <bundle> --user-data file://<file>`
- Port: `aws lightsail open-instance-public-ports --instance-name <name> --port-info fromPort=8443,toPort=8443,protocol=tcp`. Port 22 is open by default.
- IP: `aws lightsail get-instance --instance-name <name> --query instance.publicIpAddress`. The public IP changes on stop and start unless the user attaches a static IP (free while attached).
- Login: `ubuntu`, then `sudo -i`. **Private first interface.**
- Guided path: Create instance, region, Linux/Unix, OS Only, Ubuntu 24.04 LTS, the 8 GB plan, Create. Then the instance, Networking, IPv4 Firewall, Add rule, Custom, TCP, 8443.
- Bills: a flat monthly plan, prorated hourly, while the instance exists. Delete it to stop billing.

## AWS EC2

- Console: https://console.aws.amazon.com/ec2/home#LaunchInstances
- CLI: `aws`, same login check as Lightsail.
- API: regional EC2 endpoint `https://ec2.<region>.amazonaws.com`, AWS SigV4 signing. Prefer the AWS CLI.
- Image: the Canonical Ubuntu 24.04 AMI for the region, via SSM: `aws ssm get-parameters --names /aws/service/canonical/ubuntu/server/24.04/stable/current/amd64/hvm/ebs-gp3/ami-id --query 'Parameters[0].Value' --output text`
- Example instance types (query their actual CPU, RAM and price before selection): `t3.xlarge` or `m7i.xlarge`; Arm: `t4g.xlarge` (use the `arm64` AMI path then).
- Port: a security group with inbound TCP 22 and 8443: `aws ec2 create-security-group`, then `aws ec2 authorize-security-group-ingress --group-id <sg> --protocol tcp --port 8443 --cidr 0.0.0.0/0` (and the same for 22).
- Create: `aws ec2 run-instances --image-id <ami> --instance-type t3.xlarge --key-name <key> --security-group-ids <sg> --associate-public-ip-address --user-data file://<file> --block-device-mappings 'DeviceName=/dev/sda1,Ebs={VolumeSize=40}'`
- Login: `ubuntu`, then `sudo -i`. **Private first interface.**
- Bills: the instance hourly while running, the EBS disk while it exists (also when stopped), a public IPv4 address hourly. Terminate the instance and check the volume is gone.

## OVHcloud Public Cloud

- Console: https://www.ovh.com/manager/#/public-cloud
- CLI: the OpenStack client (`openstack`) after sourcing the project's `openrc.sh`. Login check: `openstack server list`. Most users take Guide me here.
- API: OpenStack Compute endpoint from the authenticated service catalog (`openstack endpoint list`), varies by project and region.
- Image: `Ubuntu 24.04`. Flavor with 8 GB: `b3-8` or `d2-8`.
- Port: instances on the public network take all inbound traffic by default; with a security group, add TCP 22 and 8443.
- Login: `ubuntu`, then `sudo -i`. The public IP is on the first interface.
- Guided path: Public Cloud project, Instances, Create an instance, a General Purpose or Discovery model with 8 GB, region, Ubuntu 24.04, SSH key, public network, Create.
- Bills: hourly instances bill while they exist, also when shut off ("shelve" stops compute billing). Delete the instance to stop billing.

## Scaleway

- Console: https://console.scaleway.com/instance/servers/create
- CLI: `scw`. Login check: `scw info` (shows the configured profile) or `scw instance server list`. Login: `scw init`.
- API: `https://api.scaleway.com/instance/v1/zones/<zone>`, using the configured project credentials.
- Image: `ubuntu_noble`. Type with 8 GB: `DEV1-L`, `PLAY2-MICRO` or `POP2-2C-8G`.
- Create: `scw instance server create type=POP2-2C-8G image=ubuntu_noble name=<name> zone=<zone> ip=new cloud-init=@<file>`
- Port: instances take inbound traffic unless a security group blocks it; the default group allows it.
- Login: `root`. Check `hostname -I` against the console's public IP: on older instance types the public IP is NATed, so treat it as **private first interface** unless they match.
- Bills: the instance hourly while it exists, the flexible IP while reserved, the block volume while it exists. Delete all three.

## Vultr

- Console: https://my.vultr.com/deploy/
- CLI: `vultr-cli`. Login check: `vultr-cli account`. It reads `VULTR_API_KEY` from the environment, so a token goes in the Credentials Manager and the user exports it in their terminal.
- API: https://api.vultr.com/v2, bearer token.
- OS: `vultr-cli os list`, pick Ubuntu 24.04 x64. Plan with 4 vCPU and 8 GB: `vc2-4c-8gb`.
- Create: `vultr-cli instance create --region <id> --plan vc2-4c-8gb --os <id> --label <name> --ssh-keys <id> --userdata "$(cat <file>)"`
- Port: open by default; with a Vultr firewall group, add TCP 22 and 8443.
- Login: `root`. The public IP is on the first interface.
- Bills: hourly up to a monthly cap, while the instance exists, also when stopped. Destroy it to stop billing.

## Akamai (Linode)

- Console: https://cloud.linode.com/linodes/create
- CLI: `linode-cli`. Login check: `linode-cli profile view`. Login: `linode-cli configure`.
- API: `https://api.linode.com/v4`, bearer token.
- Image: `linode/ubuntu24.04`. Type: check `linode-cli linodes types` for one with 8 GB (the 8 GB shared plan is `g6-standard-4` at the time of writing).
- Create: `linode-cli linodes create --label <name> --region <id> --type <type> --image linode/ubuntu24.04 --root_pass "$(openssl rand -base64 24)" --authorized_keys "<public key>"`. A root password is required but never needed afterwards, because login uses the SSH key.
- Port: open by default; with a Cloud Firewall, add TCP 22 and 8443.
- Login: `root`. The public IP is on the first interface.
- Bills: hourly up to a monthly cap while the Linode exists, also when powered off. Delete it to stop billing.

## Oracle Cloud free tier

- Console: https://cloud.oracle.com/compute/instances/create
- Check the [current Always Free limits](https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm) and the account's remaining allowance before choosing `VM.Standard.A1.Flex`. As checked on 2026-10-07, Oracle lists 2 OCPUs and 12 GB for Always Free tenancies; do not promise the older 4 OCPU / 24 GB allowance. Capacity is often unavailable in popular regions; say so up front and offer another provider if creation keeps failing with "Out of capacity".
- CLI: `oci`. Verify the configured profile with a read-only `oci iam region list`; authentication uses the user's OCI config or session. Most users take Guide me or the browser here.
- API: `https://iaas.<region>.oraclecloud.com/20160918`, signed OCI requests; prefer the OCI CLI.
- Image: Canonical Ubuntu 24.04 (aarch64 for A1).
- Port: TWO places. The subnet's security list (Networking, Virtual Cloud Networks, the VCN, Security Lists, Add Ingress Rule, TCP 8443 from the desktop's reachable source range) AND the VM's own iptables, which Oracle's Ubuntu image ships closed: inspect `sudo iptables -L INPUT -n --line-numbers` and add an allow rule for TCP 8443 before the applicable reject rule, then persist it with the distribution's firewall tooling. Never assume a fixed rule number.
- Login: `ubuntu`, then `sudo -i`. **Private first interface.**
- Bills: nothing on Always Free shapes, as long as the account stays on Always Free resources. A pay-as-you-go account bills anything beyond them.

## My own server

- Anything running Linux with Docker works: a home server, a NAS that runs Docker containers, a VM the user already rents.
- Ask: how they log in (`ssh user@host`), whether they have root or sudo, and which distribution (`cat /etc/os-release`).
- **Reachability is the hard part.** The desktop must reach TCP 8443 on it. On the same network, the LAN address works. From outside, the user needs a port forward on their router (external 8443 to the server's 8443) and their public IP, or a VPN like Tailscale on both ends (then the Tailscale address works). Behind either, pass `address` to `machine_act connect`.
- A shared server: the run command installs a host AppArmor rule on Ubuntu 23.10+ that lets bwrap create user namespaces for any local user. Mention it, and suggest a dedicated VM or container host if other people use that machine.
- Bills: nothing from PandaOS. Electricity, and the PandaOS Cloud or API usage the chats spend, as on the desktop.

## Another provider

Ask for the provider's name, check whether it has a CLI on this computer (`command -v <name>`), and otherwise guide. The checklist at the top of this file is what to get from it. Ask the user to read you the console's labels if you do not know them, rather than guessing.
