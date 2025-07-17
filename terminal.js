class PortfolioTerminal {
    constructor(elementId) {
        this.terminal = document.getElementById(elementId);
        this.prompt = 'visitor@samuel-portfolio:~$ ';
        this.commands = {
            'help': this.showHelp.bind(this),
            'about': this.showAbout.bind(this),
            'skills': this.showSkills.bind(this),
            'projects': this.showProjects.bind(this),
            'contact': this.showContact.bind(this),
            'clear': this.clearTerminal.bind(this),
            'theme': this.toggleTheme.bind(this),
            'ls': this.listItems.bind(this),
            'cat': this.catFile.bind(this),
            'whoami': this.whoami.bind(this),
            'date': this.showDate.bind(this),
            'exit': this.closeTerminal.bind(this)
        };
        
        this.history = [];
        this.historyIndex = -1;
        this.files = {
            'about.txt': 'I\'m a versatile DevOps Engineer with experience designing, automating, and managing scalable cloud infrastructure and CI/CD pipelines.',
            'skills.txt': 'AWS, GCP, Terraform, Docker, Kubernetes, CI/CD, GitOps, Monitoring',
            'contact.txt': 'Email: samuelnnanna71@gmail.com\nLinkedIn: https://www.linkedin.com/in/samuel-nnanna\nGitHub: https://github.com/IfeanyiSam',
            'projects.txt': '1. ENGIS - GitOps workflow with ArgoCD and Helm\n2. AutomatedPros - Multi-region AWS infrastructure\n3. Bioconductor - GKE Autopilot clusters'
        };
        
        this.isVisible = false;
        this.initTerminal();
    }
    
    initTerminal() {
        // Create terminal HTML structure
        this.terminal.innerHTML = `
            <div class="terminal-header">
                <div class="terminal-controls">
                    <span class="terminal-control close"></span>
                    <span class="terminal-control minimize"></span>
                    <span class="terminal-control maximize"></span>
                </div>
                <div class="terminal-title">samuel@portfolio ~ bash</div>
            </div>
            <div class="terminal-body">
                <div class="terminal-output">
                    <p>Welcome to Samuel Nnanna's Portfolio Terminal!</p>
                    <p>Type <span class="command">help</span> to see available commands.</p>
                </div>
                <div class="terminal-input-line">
                    <span class="terminal-prompt">${this.prompt}</span>
                    <input type="text" class="terminal-input" autofocus spellcheck="false">
                </div>
            </div>
        `;
        
        // Get elements
        this.terminalBody = this.terminal.querySelector('.terminal-body');
        this.outputElement = this.terminal.querySelector('.terminal-output');
        this.inputElement = this.terminal.querySelector('.terminal-input');
        this.closeButton = this.terminal.querySelector('.terminal-control.close');
        
        // Add event listeners
        this.inputElement.addEventListener('keydown', this.handleInput.bind(this));
        this.closeButton.addEventListener('click', this.closeTerminal.bind(this));
        
        // Hide terminal initially
        this.terminal.style.display = 'none';
        
        // Add terminal toggle button
        const toggleButton = document.createElement('div');
        toggleButton.className = 'terminal-toggle';
        toggleButton.innerHTML = '<i class="fas fa-terminal"></i>';
        toggleButton.title = 'Open Terminal';
        document.body.appendChild(toggleButton);
        
        toggleButton.addEventListener('click', () => {
            this.toggleTerminal();
        });
    }
    
    toggleTerminal() {
        if (this.isVisible) {
            this.terminal.style.display = 'none';
            this.isVisible = false;
        } else {
            this.terminal.style.display = 'flex';
            this.isVisible = true;
            this.inputElement.focus();
            
            // Scroll to bottom
            this.terminalBody.scrollTop = this.terminalBody.scrollHeight;
        }
    }
    
    closeTerminal() {
        this.terminal.style.display = 'none';
        this.isVisible = false;
    }
    
    handleInput(e) {
        if (e.key === 'Enter') {
            const command = this.inputElement.value.trim();
            
            if (command) {
                // Add command to history
                this.history.push(command);
                this.historyIndex = this.history.length;
                
                // Display command
                this.writeOutput(`<span class="terminal-prompt">${this.prompt}</span>${command}`);
                
                // Process command
                this.processCommand(command);
            } else {
                // Just show a new prompt if empty
                this.writeOutput(`<span class="terminal-prompt">${this.prompt}</span>`);
            }
            
            // Clear input
            this.inputElement.value = '';
            
            // Scroll to bottom
            setTimeout(() => {
                this.terminalBody.scrollTop = this.terminalBody.scrollHeight;
            }, 10);
        } 
        else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (this.historyIndex > 0) {
                this.historyIndex--;
                this.inputElement.value = this.history[this.historyIndex];
            }
        } 
        else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (this.historyIndex < this.history.length - 1) {
                this.historyIndex++;
                this.inputElement.value = this.history[this.historyIndex];
            } else if (this.historyIndex === this.history.length - 1) {
                this.historyIndex = this.history.length;
                this.inputElement.value = '';
            }
        }
        else if (e.key === 'Tab') {
            e.preventDefault();
            this.autocomplete();
        }
    }
    
    autocomplete() {
        const input = this.inputElement.value.trim();
        const args = input.split(' ');
        const cmd = args[0];
        
        // Command autocompletion
        if (args.length === 1) {
            const matches = Object.keys(this.commands).filter(c => c.startsWith(cmd));
            if (matches.length === 1) {
                this.inputElement.value = matches[0] + ' ';
            } else if (matches.length > 1) {
                this.writeOutput(`<span class="terminal-prompt">${this.prompt}</span>${input}`);
                this.writeOutput(matches.join('  '));
            }
        }
        // File autocompletion for cat command
        else if (args.length === 2 && args[0] === 'cat') {
            const filePrefix = args[1];
            const matches = Object.keys(this.files).filter(f => f.startsWith(filePrefix));
            if (matches.length === 1) {
                this.inputElement.value = `cat ${matches[0]}`;
            } else if (matches.length > 1) {
                this.writeOutput(`<span class="terminal-prompt">${this.prompt}</span>${input}`);
                this.writeOutput(matches.join('  '));
            }
        }
    }
    
    processCommand(commandStr) {
        const args = commandStr.split(' ');
        const command = args[0].toLowerCase();
        const commandArgs = args.slice(1);
        
        if (this.commands[command]) {
            this.commands[command](commandArgs);
        } else {
            this.writeOutput(`Command not found: ${command}. Type <span class="command">help</span> for available commands.`);
        }
    }
    
    writeOutput(text) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = text;
        this.outputElement.appendChild(line);
    }
    
    clearTerminal() {
        this.outputElement.innerHTML = '';
    }
    
    showHelp() {
        this.writeOutput(`
            <div class="help-content">
                <p><span class="command">help</span> - Show this help message</p>
                <p><span class="command">about</span> - About Samuel Nnanna</p>
                <p><span class="command">skills</span> - List my technical skills</p>
                <p><span class="command">projects</span> - View my projects</p>
                <p><span class="command">contact</span> - Get my contact information</p>
                <p><span class="command">ls</span> - List available files</p>
                <p><span class="command">cat [filename]</span> - View file contents</p>
                <p><span class="command">whoami</span> - Who you are</p>
                <p><span class="command">date</span> - Display current date and time</p>
                <p><span class="command">theme</span> - Toggle dark/light theme</p>
                <p><span class="command">clear</span> - Clear the terminal</p>
                <p><span class="command">exit</span> - Close the terminal</p>
            </div>
        `);
    }
    
    showAbout() {
        this.writeOutput(`
            <div class="about-content">
                <p>I'm a versatile and results-driven DevOps Engineer with over 2 years of hands-on experience designing,
                automating, and managing scalable cloud infrastructure and CI/CD pipelines.</p>
                <p>I'm passionate about building secure and efficient systems that help teams deploy faster and scale with confidence.</p>
            </div>
        `);
    }
    
    showSkills() {
        this.writeOutput(`
            <div class="skills-content">
                <p><span class="skill-category">Cloud:</span> AWS, GCP</p>
                <p><span class="skill-category">Infrastructure as Code:</span> Terraform, CloudFormation</p>
                <p><span class="skill-category">Containerization:</span> Docker, Kubernetes, ECS, EKS, GKE</p>
                <p><span class="skill-category">CI/CD:</span> GitHub Actions, Jenkins, GitLab CI</p>
                <p><span class="skill-category">Monitoring:</span> Prometheus, Grafana, EFK</p>
                <p><span class="skill-category">Other:</span> Linux, Bash, Python, GitOps, ArgoCD</p>
            </div>
        `);
    }
    
    showProjects() {
        this.writeOutput(`
            <div class="projects-content">
                <p><span class="project-title">ENGIS (AWS)</span> - DevOps Engineer (Contract)</p>
                <ul>
                    <li>Deployed GitOps workflow using ArgoCD and Helm for Golang microservices</li>
                    <li>Provisioned EKS clusters with Terraform</li>
                    <li>Implemented Jenkins CI/CD and centralized logging with EFK</li>
                </ul>
                
                <p><span class="project-title">AutomatedPros (Multi-Cloud)</span> - DevOps Engineer (Contract)</p>
                <ul>
                    <li>Built scalable multi-region AWS infrastructure with Terraform</li>
                    <li>Implemented GitHub Actions CI/CD for Node.js and Angular apps</li>
                    <li>Enabled real-time monitoring with Prometheus and Grafana</li>
                </ul>
                
                <p><span class="project-title">Nextflow Telemetry (Open Source)</span> - Contributor</p>
                <ul>
                    <li>Optimized Docker container build process reducing image size</li>
                    <li>Created comprehensive Docker Compose configuration with service profiles</li>
                    <li>Implemented health check endpoints for infrastructure monitoring</li>
                </ul>
            </div>
        `);
    }
    
    showContact() {
        this.writeOutput(`
            <div class="contact-content">
                <p><span class="contact-method">Email:</span> <a href="mailto:samuelnnanna71@gmail.com">samuelnnanna71@gmail.com</a></p>
                <p><span class="contact-method">LinkedIn:</span> <a href="https://www.linkedin.com/in/samuel-nnanna" target="_blank">linkedin.com/in/samuel-nnanna</a></p>
                <p><span class="contact-method">GitHub:</span> <a href="https://github.com/IfeanyiSam" target="_blank">github.com/IfeanyiSam</a></p>
                <p><span class="contact-method">Schedule a Call:</span> <a href="https://calendly.com/samuelnnanna71/let-s-talk-devops" target="_blank">calendly.com/samuelnnanna71</a></p>
            </div>
        `);
    }
    
    listItems() {
        const filesList = Object.keys(this.files).join('  ');
        this.writeOutput(`<div class="ls-output">${filesList}</div>`);
    }
    
    catFile(args) {
        if (!args || args.length === 0) {
            this.writeOutput('Usage: cat [filename]');
            return;
        }
        
        const filename = args[0];
        if (this.files[filename]) {
            this.writeOutput(`<div class="file-content">${this.files[filename]}</div>`);
        } else {
            this.writeOutput(`File not found: ${filename}`);
        }
    }
    
    whoami() {
        this.writeOutput('visitor - Welcome to my portfolio!');
    }
    
    showDate() {
        const now = new Date();
        this.writeOutput(now.toString());
    }
    
    toggleTheme() {
        const htmlElement = document.documentElement;
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        localStorage.setItem('theme_manually_set', 'true');
        
        const themeIcon = document.getElementById('theme-toggle').querySelector('i');
        if (newTheme === 'dark') {
            themeIcon.className = 'fas fa-sun';
            this.writeOutput('Theme switched to dark mode');
        } else {
            themeIcon.className = 'fas fa-moon';
            this.writeOutput('Theme switched to light mode');
        }
    }
}

// Initialize terminal when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create terminal container if it doesn't exist
    let terminalContainer = document.getElementById('portfolio-terminal');
    if (!terminalContainer) {
        terminalContainer = document.createElement('div');
        terminalContainer.id = 'portfolio-terminal';
        terminalContainer.className = 'portfolio-terminal';
        document.body.appendChild(terminalContainer);
    }
    
    // Initialize terminal
    window.portfolioTerminal = new PortfolioTerminal('portfolio-terminal');
});