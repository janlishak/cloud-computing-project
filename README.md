# cloud-computing-project
6130COMP Assignment, Jan Lishak, 2022

## Enviroment Setup

### Install docker  

Install docker using the convenience script
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

Test the installation
```bash
sudo docker run hello-world
```

Install Docker Compose
```bash
sudo apt install docker-compose
```

### Install git and github cli (optional)
add github cli repository and install the utility
```bash
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update
sudo apt install gh
```

Follow the wizard to authenticate with github (optional)
```bash
gh auth login
```

