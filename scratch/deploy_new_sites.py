import os
import sys
import paramiko
import time

def create_remote_dir_for_path(sftp, remote_path):
    dirs = os.path.dirname(remote_path).split('/')
    current = ""
    for d in dirs:
        if not d:
            current += "/"
            continue
        current = os.path.join(current, d).replace("\\", "/")
        try:
            sftp.mkdir(current)
            print(f"Created remote directory: {current}")
        except IOError:
            pass

def upload_file(sftp, local_path, remote_path):
    print(f"Uploading: {local_path} -> {remote_path}")
    create_remote_dir_for_path(sftp, remote_path)
    sftp.put(local_path, remote_path)

def upload_dir_recursively(sftp, local_dir, remote_dir):
    print(f"Uploading directory: {local_dir} -> {remote_dir}")
    for root, dirs, files in os.walk(local_dir):
        if 'node_modules' in root or '.next' in root or '.git' in root or 'scratch' in root:
            continue
        for f in files:
            local_file = os.path.join(root, f)
            rel_path = os.path.relpath(local_file, local_dir).replace("\\", "/")
            remote_file = os.path.join(remote_dir, rel_path).replace("\\", "/")
            upload_file(sftp, local_file, remote_file)

def main():
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    print("Connecting to VPS...")
    ssh.connect('51.68.161.13', port=2222, username='fivem', password='owBzQOsxDuGo')
    sftp = ssh.open_sftp()

    # Define base paths
    local_base_studios = r"C:\Users\Afonso Queiroz\Documents\GitHub\studios-web"
    remote_base_studios = "/home/fivem/apps/studios-web"
    remote_base_portal = "/home/fivem/apps/portal"

    # Create studios-web directory
    try:
        sftp.mkdir(remote_base_studios)
        print(f"Created directory {remote_base_studios}")
    except IOError:
        pass

    # 1. Upload studios-web files recursively
    upload_dir_recursively(sftp, local_base_studios, remote_base_studios)

    sftp.close()

    # 2. Execute Remote Commands
    def run_cmd(cmd, run_sudo=False):
        print(f"\nRunning command: {cmd}")
        stdin, stdout, stderr = ssh.exec_command(cmd)
        if run_sudo:
            stdin.write('owBzQOsxDuGo\n')
            stdin.flush()
        sys.stdout.buffer.write(stdout.read())
        sys.stderr.buffer.write(stderr.read())

    print("\n=== BUILDING & STARTING STUDIOS-WEB ===")
    run_cmd(f"cd {remote_base_studios} && npm install")
    run_cmd(f"cd {remote_base_studios} && npm run build")
    
    # Delete old process if exists, start new PM2 process
    run_cmd(f"pm2 delete studios-web || true")
    run_cmd(f"cd {remote_base_studios} && PORT=3102 pm2 start npm --name \"studios-web\" -- run start")

    print("\n=== BUILDING & STARTING INNERCIRCLE-WEB (circle) ===")
    run_cmd(f"cd {remote_base_portal} && npm install")
    run_cmd(f"cd {remote_base_portal} && npm run build:circle")
    
    # Delete old process if exists, start new PM2 process
    run_cmd(f"pm2 delete circle-web || true")
    run_cmd(f"cd {remote_base_portal} && PORT=3104 pm2 start npm --name \"circle-web\" -- run start:circle")

    # 3. Update Cloudflare Config
    print("\n=== UPDATING CLOUDFLARE CONFIG ===")
    # Read config
    stdin, stdout, stderr = ssh.exec_command('cat /etc/cloudflared/config.yml')
    config_content = stdout.read().decode('utf-8')
    
    new_entries = """  - hostname: circle.innerstudios.pt
    service: http://localhost:3104
  - hostname: innerstudios.pt
    service: http://localhost:3102
  - hostname: www.innerstudios.pt
    service: http://localhost:3102
  - hostname: suite.innerstudios.pt
    service: http://127.0.0.1:3103
"""
    
    if "circle.innerstudios.pt" not in config_content:
        # Backup current config
        run_cmd(f"sudo -S cp /etc/cloudflared/config.yml /etc/cloudflared/config.yml.bak.{int(time.time())}", run_sudo=True)
        
        # Modify
        target = "  # --- Catch-all (404) ---"
        if target in config_content:
            parts = config_content.split(target)
            updated_content = parts[0] + new_entries + target + parts[1]
        else:
            updated_content = config_content.replace("- service: http_status:404", new_entries + "- service: http_status:404")
        
        # Write back using sudo tee
        stdin_w, stdout_w, stderr_w = ssh.exec_command("sudo -S tee /etc/cloudflared/config.yml > /dev/null")
        stdin_w.write('owBzQOsxDuGo\n')
        stdin_w.write(updated_content)
        stdin_w.close()
        stdout_w.read() # Wait for tee
        print("Updated /etc/cloudflared/config.yml")
    else:
        print("/etc/cloudflared/config.yml already contains circle.innerstudios.pt ingress")

    # 4. Restart Cloudflare Tunnel service
    print("\n=== RESTARTING CLOUDFLARE SERVICE ===")
    run_cmd("sudo -S systemctl restart cloudflared", run_sudo=True)

    # 5. Route DNS via cloudflared route command (to ensure CNAME records exist on Cloudflare)
    print("\n=== ROUTING DNS ON CLOUDFLARE ===")
    tunnel_id = "345255e0-14f0-4fe2-883e-ff4b942e488f"
    run_cmd(f"sudo -S cloudflared tunnel route dns {tunnel_id} circle.innerstudios.pt", run_sudo=True)
    run_cmd(f"sudo -S cloudflared tunnel route dns {tunnel_id} innerstudios.pt", run_sudo=True)
    run_cmd(f"sudo -S cloudflared tunnel route dns {tunnel_id} www.innerstudios.pt", run_sudo=True)
    run_cmd(f"sudo -S cloudflared tunnel route dns {tunnel_id} suite.innerstudios.pt", run_sudo=True)

    ssh.close()
    print("\nDeployment and configurations completed successfully!")

if __name__ == '__main__':
    main()
