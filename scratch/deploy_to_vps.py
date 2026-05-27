import os
import sys
import paramiko

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
    local_base_hrm = r"C:\Users\Afonso Queiroz\Documents\GitHub\hrm"
    local_base_ingestion = r"C:\Users\Afonso Queiroz\Documents\GitHub\ingestion-api"
    local_base_studios = r"C:\Users\Afonso Queiroz\Documents\GitHub\studios-web"

    remote_base_hrm = "/home/fivem/apps/hrm"
    remote_base_ingestion = "/home/fivem/apps/ingestion-api"
    remote_base_studios = "/home/fivem/apps/innerfx-web"

    # Remove stray root-level directories from VPS (from previous incorrect upload)
    print("\n--- Cleaning up incorrect root-level directories on VPS ---")
    def run_cmd_ssh(cmd):
        stdin, stdout, stderr = ssh.exec_command(cmd)
        stdout.read() # Wait for command to finish
        stderr.read()

    run_cmd_ssh(f"rm -rf {remote_base_studios}/app")
    run_cmd_ssh(f"rm -rf {remote_base_studios}/lib")

    # 1. Upload studios-web files (putting them inside src/)
    studios_files = [
        ("app/api/careers/applications/route.ts", "src/app/api/careers/applications/route.ts"),
        ("app/api/careers/jobs/route.ts", "src/app/api/careers/jobs/route.ts"),
        ("app/careers/page.tsx", "src/app/careers/page.tsx"),
        ("app/careers/apply/[role]/page.tsx", "src/app/careers/apply/[role]/page.tsx"),
        ("app/careers/globals.css", "src/app/careers/globals.css"),
        ("app/legal/page.tsx", "src/app/legal/page.tsx"),
        ("lib/careers.ts", "src/lib/careers.ts"),
        ("lib/gallery.ts", "src/lib/gallery.ts"),
        ("lib/news.ts", "src/lib/news.ts"),
        ("lib/partners.ts", "src/lib/partners.ts"),
        ("components/SiteNavbar.tsx", "src/components/SiteNavbar.tsx"),
        ("components/ContactNavLink.tsx", "src/components/ContactNavLink.tsx"),
        ("components/ThemeToggle.tsx", "src/components/ThemeToggle.tsx"),
    ]
    print("\n--- Deploying studios-web files ---")
    for local_rel, remote_rel in studios_files:
        upload_file(sftp, os.path.join(local_base_studios, local_rel), f"{remote_base_studios}/{remote_rel}")

    # 2. Upload ingestion-api files
    ingestion_files = [
        "app/core/celery_app.py",
        "app/core/config.py",
        "app/db/models.py",
        "app/modules/sync/service.py",
        "app/modules/sync/tasks.py",
        "docker-compose.yml",
        "migrations/versions/007_ext_lic_compat.py",
        "migrations/versions/008_add_hrm_sync_fields.py",
    ]
    print("\n--- Deploying ingestion-api files ---")
    for f in ingestion_files:
        upload_file(sftp, os.path.join(local_base_ingestion, f), f"{remote_base_ingestion}/{f}")

    # Delete old migration file on VPS
    old_migration = f"{remote_base_ingestion}/migrations/versions/007_external_license_legacy_compat.py"
    try:
        sftp.remove(old_migration)
        print(f"Removed old migration: {old_migration}")
    except IOError:
        print(f"Old migration file not found or already removed: {old_migration}")

    # 3. Upload hrm files
    hrm_files = [
        "src/client/src/core/components/layout/Layout.vue",
        "src/client/src/core/pages/About.vue",
        "src/client/src/core/pages/Notifications.vue",
        "src/client/src/core/pages/index.ts",
        "src/client/src/orangehrmPimPlugin/pages/employee/SaveEmployee.vue",
        "src/client/src/orangehrmRecruitmentPlugin/index.ts",
        "src/client/src/orangehrmRecruitmentPlugin/pages/HireAction.vue",
        "src/client/src/orangehrmRecruitmentPlugin/pages/InnerStudiosRecruitmentTemplates.vue",
        "src/client/src/orangehrmRecruitmentPlugin/pages/OfferJobAction.vue",
        "src/lib/config/Config.php",
        "src/plugins/orangehrmAdminPlugin/Dao/UserDao.php",
        "src/plugins/orangehrmAdminPlugin/config/supported_languages.yml",
        "src/plugins/orangehrmAuthenticationPlugin/Controller/LoginController.php",
        "src/plugins/orangehrmAuthenticationPlugin/Controller/LogoutController.php",
        "src/plugins/orangehrmAuthenticationPlugin/Controller/ValidateController.php",
        "src/plugins/orangehrmAuthenticationPlugin/Service/InnerStudiosSsoService.php",
        "src/plugins/orangehrmCorePlugin/Controller/InnerStudiosNotificationsApiController.php",
        "src/plugins/orangehrmCorePlugin/Controller/InnerStudiosNotificationsController.php",
        "src/plugins/orangehrmCorePlugin/Helper/VueControllerHelper.php",
        "src/plugins/orangehrmCorePlugin/config/routes.yaml",
        "src/plugins/orangehrmCorePlugin/templates/copyright.html.twig",
        "src/plugins/orangehrmCorporateBrandingPlugin/Controller/File/ImageController.php",
        "src/plugins/orangehrmPimPlugin/Api/EmployeeAPI.php",
        "src/plugins/orangehrmPimPlugin/Controller/File/EmployeePictureController.php",
        "src/plugins/orangehrmRecruitmentPlugin/Api/AbstractCandidateActionAPI.php",
        "src/plugins/orangehrmRecruitmentPlugin/Api/CandidateHiringAPI.php",
        "src/plugins/orangehrmRecruitmentPlugin/Api/CandidateJobOfferingAPI.php",
        "src/plugins/orangehrmRecruitmentPlugin/Controller/InnerStudiosHireTemplateController.php",
        "src/plugins/orangehrmRecruitmentPlugin/Controller/InnerStudiosRecruitmentTemplatesApiController.php",
        "src/plugins/orangehrmRecruitmentPlugin/Controller/InnerStudiosRecruitmentTemplatesController.php",
        "src/plugins/orangehrmRecruitmentPlugin/config/routes.yaml",
        "web/images/innerstudios-logo.png",
        "web/images/innerstudios-navbar-logo.png",
        "web/images/logo.png",
        "web/images/ohrm_branding.png",
        "web/images/ohrm_logo.png",
        "web/images/orangehrm-logo.png",
    ]
    print("\n--- Deploying hrm source files ---")
    for f in hrm_files:
        upload_file(sftp, os.path.join(local_base_hrm, f), f"{remote_base_hrm}/{f}")

    # Upload compiled Vue assets (web/dist directory)
    print("\n--- Deploying hrm compiled Vue dist directory ---")
    upload_dir_recursively(sftp, os.path.join(local_base_hrm, "web", "dist"), f"{remote_base_hrm}/web/dist")

    sftp.close()

    # 4. Execute Remote Commands
    def run_cmd(cmd):
        print(f"\nRunning command: {cmd}")
        stdin, stdout, stderr = ssh.exec_command(cmd)
        sys.stdout.buffer.write(stdout.read())
        sys.stderr.buffer.write(stderr.read())

    print("\n=== RUNNING DEPLOY COMMANDS ON VPS ===")

    # A. Rebuild & restart ingestion-api containers
    run_cmd(f"cd {remote_base_ingestion} && docker compose up -d --build api worker beat")
    # Run migrations
    run_cmd("docker exec ingestion-api alembic upgrade head")

    # B. Rebuild & restart hrm container
    run_cmd(f"cd {remote_base_hrm} && docker compose build hrm-web && docker compose up -d hrm-web")

    # C. Rebuild Next.js innerfx-web and restart PM2
    run_cmd(f"cd {remote_base_studios} && npm run build")
    run_cmd("pm2 restart innerfx-web")

    ssh.close()
    print("\nDeployment Completed Successfully!")

if __name__ == '__main__':
    main()
