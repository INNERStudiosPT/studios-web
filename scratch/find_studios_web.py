import paramiko

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('51.68.161.13', port=2222, username='fivem', password='owBzQOsxDuGo')

print("--- ERROR LOG ---")
stdin, stdout, stderr = ssh.exec_command('tail -n 30 /home/fivem/.pm2/logs/innerfx-web-error.log')
print(stdout.read().decode())

print("--- OUT LOG ---")
stdin2, stdout2, stderr2 = ssh.exec_command('tail -n 30 /home/fivem/.pm2/logs/innerfx-web-out.log')
print(stdout2.read().decode())

ssh.close()
