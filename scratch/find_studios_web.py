import paramiko

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('51.68.161.13', port=2222, username='fivem', password='owBzQOsxDuGo')

cmd = 'grep -ri -E "(suite|circle)" /etc/cloudflared/config.yml* 2>/dev/null'
stdin, stdout, stderr = ssh.exec_command(cmd)
print("Search results in cloudflared configs:")
print(stdout.read().decode())

ssh.close()
