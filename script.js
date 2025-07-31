// JARVIS HUD Interface JavaScript
class JarvisHUD {
    constructor() {
        this.initializeComponents();
        this.startAnimations();
        this.setupTerminal();
        this.updateSystemStats();
        this.startTimeDisplay();
    }

    initializeComponents() {
        this.terminal = document.getElementById('terminal');
        this.timeDisplay = document.getElementById('timeDisplay');
        this.centerStatus = document.querySelector('.center-status');
        this.threatFill = document.querySelector('.threat-fill');
        this.threatLabel = document.querySelector('.threat-label');
        
        // System stats elements
        this.statBars = document.querySelectorAll('.stat-fill');
        this.statValues = document.querySelectorAll('.stat-value');
        
        // Network nodes
        this.networkNodes = document.querySelectorAll('.node');
        
        this.isInitialized = false;
        this.commandIndex = 0;
        this.terminalLines = [];
    }

    startTimeDisplay() {
        const updateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', { 
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            this.timeDisplay.textContent = timeString;
        };
        
        updateTime();
        setInterval(updateTime, 1000);
    }

    startAnimations() {
        // Initialize system after delay
        setTimeout(() => {
            this.initializeSystem();
        }, 2000);

        // Randomly update threat level
        setInterval(() => {
            this.updateThreatLevel();
        }, 8000);

        // Update system stats periodically
        setInterval(() => {
            this.updateSystemStats();
        }, 3000);

        // Animate network nodes
        setInterval(() => {
            this.animateNetworkNodes();
        }, 5000);

        // Random glitch effect
        setInterval(() => {
            this.triggerGlitch();
        }, 15000);
    }

    initializeSystem() {
        this.centerStatus.textContent = 'ONLINE';
        this.centerStatus.style.color = '#00ff00';
        this.isInitialized = true;
        
        // Start terminal commands
        this.startTerminalSequence();
    }

    setupTerminal() {
        this.terminalCommands = [
            { 
                command: 'system-scan --deep', 
                output: [
                    'Scanning system components...',
                    'CPU: Intel i9-12900K [OK]',
                    'RAM: 32GB DDR5 [OK]',
                    'GPU: RTX 4090 [OK]',
                    'Network: Quantum Encrypted [OK]',
                    'All systems operational.'
                ]
            },
            {
                command: 'security-check --level=maximum',
                output: [
                    'Initiating security protocols...',
                    'Firewall: ACTIVE',
                    'Intrusion Detection: ACTIVE',
                    'Quantum Encryption: ENABLED',
                    'Threat Level: MINIMAL',
                    'Security status: MAXIMUM'
                ]
            },
            {
                command: 'network-analysis --scan-range=global',
                output: [
                    'Analyzing global network...',
                    'Nodes detected: 4,127',
                    'Active connections: 2,891',
                    'Suspicious activity: 0',
                    'Network integrity: 98.7%',
                    'Analysis complete.'
                ]
            },
            {
                command: 'ai-diagnostics --full',
                output: [
                    'Running AI diagnostics...',
                    'Neural network: OPTIMAL',
                    'Learning algorithms: ACTIVE',
                    'Decision matrix: STABLE',
                    'Response time: 0.003ms',
                    'AI systems: FULLY OPERATIONAL'
                ]
            },
            {
                command: 'protocol-status --all',
                output: [
                    'Checking protocol status...',
                    'DEFENSE MATRIX: ACTIVE',
                    'THREAT DETECTION: ACTIVE',
                    'STEALTH MODE: STANDBY',
                    'AUTO REPAIR: ACTIVE',
                    'All protocols ready.'
                ]
            }
        ];
    }

    startTerminalSequence() {
        if (!this.isInitialized) return;
        
        setTimeout(() => {
            this.executeNextCommand();
        }, 1000);
    }

    executeNextCommand() {
        if (this.commandIndex >= this.terminalCommands.length) {
            this.commandIndex = 0;
            setTimeout(() => this.executeNextCommand(), 10000);
            return;
        }

        const command = this.terminalCommands[this.commandIndex];
        this.typeCommand(command.command, () => {
            setTimeout(() => {
                this.displayOutput(command.output, () => {
                    this.commandIndex++;
                    setTimeout(() => this.executeNextCommand(), 3000);
                });
            }, 500);
        });
    }

    typeCommand(command, callback) {
        const terminalLine = document.createElement('div');
        terminalLine.className = 'terminal-line';
        
        const prompt = document.createElement('span');
        prompt.className = 'prompt';
        prompt.textContent = 'jarvis@system:~$ ';
        
        const commandSpan = document.createElement('span');
        terminalLine.appendChild(prompt);
        terminalLine.appendChild(commandSpan);
        
        this.terminal.appendChild(terminalLine);
        
        let i = 0;
        const typeInterval = setInterval(() => {
            commandSpan.textContent += command[i];
            i++;
            
            if (i >= command.length) {
                clearInterval(typeInterval);
                callback();
            }
        }, 50);
        
        this.scrollTerminal();
    }

    displayOutput(output, callback) {
        let lineIndex = 0;
        
        const displayNextLine = () => {
            if (lineIndex >= output.length) {
                callback();
                return;
            }
            
            const outputLine = document.createElement('div');
            outputLine.className = 'terminal-line';
            outputLine.style.color = '#00ff00';
            outputLine.style.marginLeft = '20px';
            
            this.terminal.appendChild(outputLine);
            
            let charIndex = 0;
            const typeInterval = setInterval(() => {
                outputLine.textContent += output[lineIndex][charIndex];
                charIndex++;
                
                if (charIndex >= output[lineIndex].length) {
                    clearInterval(typeInterval);
                    lineIndex++;
                    setTimeout(displayNextLine, 200);
                }
            }, 30);
            
            this.scrollTerminal();
        };
        
        displayNextLine();
    }

    scrollTerminal() {
        this.terminal.scrollTop = this.terminal.scrollHeight;
        
        // Limit terminal lines
        const lines = this.terminal.querySelectorAll('.terminal-line');
        if (lines.length > 20) {
            lines[0].remove();
        }
    }

    updateSystemStats() {
        this.statBars.forEach((bar, index) => {
            const currentWidth = parseInt(bar.style.width) || 0;
            const variation = (Math.random() - 0.5) * 20;
            let newWidth = currentWidth + variation;
            
            // Keep within bounds
            newWidth = Math.max(10, Math.min(95, newWidth));
            
            bar.style.width = newWidth + '%';
            this.statValues[index].textContent = Math.round(newWidth) + '%';
            
            // Change color based on value
            if (newWidth > 80) {
                bar.style.background = 'linear-gradient(90deg, #ff0000, #ff6600)';
            } else if (newWidth > 60) {
                bar.style.background = 'linear-gradient(90deg, #ffff00, #ff6600)';
            } else {
                bar.style.background = 'linear-gradient(90deg, #00ff00, #ffff00)';
            }
        });
    }

    updateThreatLevel() {
        const levels = [
            { width: 15, label: 'MINIMAL', color: '#00ff00' },
            { width: 35, label: 'LOW', color: '#66ff00' },
            { width: 55, label: 'MODERATE', color: '#ffff00' },
            { width: 75, label: 'HIGH', color: '#ff6600' },
            { width: 95, label: 'CRITICAL', color: '#ff0000' }
        ];
        
        const randomLevel = levels[Math.floor(Math.random() * levels.length)];
        
        this.threatFill.style.width = randomLevel.width + '%';
        this.threatFill.style.background = `linear-gradient(90deg, ${randomLevel.color}, #ffff00)`;
        this.threatLabel.textContent = randomLevel.label;
        this.threatLabel.style.color = randomLevel.color;
        
        // Update security level in status bar
        const securityLevel = document.querySelector('.security-level');
        if (randomLevel.width > 70) {
            securityLevel.textContent = 'CRITICAL';
            securityLevel.style.color = '#ff0000';
        } else if (randomLevel.width > 40) {
            securityLevel.textContent = 'HIGH';
            securityLevel.style.color = '#ff6600';
        } else {
            securityLevel.textContent = 'MAXIMUM';
            securityLevel.style.color = '#ff6600';
        }
    }

    animateNetworkNodes() {
        this.networkNodes.forEach(node => {
            const newTop = Math.random() * 80 + 10;
            const newLeft = Math.random() * 80 + 10;
            
            node.style.top = newTop + '%';
            node.style.left = newLeft + '%';
            
            // Random color change
            const colors = ['#00ff00', '#00ffff', '#ffff00', '#ff6600'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            node.style.background = randomColor;
            node.style.boxShadow = `0 0 20px ${randomColor}`;
        });
    }

    triggerGlitch() {
        const glitchOverlay = document.querySelector('.glitch-overlay');
        glitchOverlay.style.opacity = '0.3';
        
        setTimeout(() => {
            glitchOverlay.style.opacity = '0';
        }, 200);
        
        // Temporary text distortion
        const centerLogo = document.querySelector('.center-logo');
        const originalText = centerLogo.textContent;
        
        centerLogo.textContent = 'J.Ä.R.V.I.S';
        setTimeout(() => {
            centerLogo.textContent = 'J∆RV¡S';
            setTimeout(() => {
                centerLogo.textContent = originalText;
            }, 100);
        }, 100);
    }

    // Add mouse interaction effects
    addInteractivity() {
        // Hover effects for panels
        const panels = document.querySelectorAll('.left-panel, .right-panel, .terminal-panel');
        panels.forEach(panel => {
            panel.addEventListener('mouseenter', () => {
                panel.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.3)';
                panel.style.borderColor = '#ffffff';
            });
            
            panel.addEventListener('mouseleave', () => {
                panel.style.boxShadow = 'none';
                panel.style.borderColor = '#00ffff';
            });
        });

        // Click effect for central HUD
        const centralHud = document.querySelector('.hud-circle');
        centralHud.addEventListener('click', () => {
            this.triggerGlitch();
            this.executeSpecialCommand();
        });
    }

    executeSpecialCommand() {
        const specialCommands = [
            'emergency-protocol --activate',
            'stealth-mode --engage',
            'system-overclock --turbo',
            'quantum-decrypt --target=unknown',
            'neural-boost --level=maximum'
        ];
        
        const randomCommand = specialCommands[Math.floor(Math.random() * specialCommands.length)];
        
        this.typeCommand(randomCommand, () => {
            const responses = [
                ['Protocol activated successfully.', 'System ready for enhanced operations.'],
                ['Stealth mode engaged.', 'Invisible to detection systems.'],
                ['Overclock initiated.', 'Performance increased by 340%.'],
                ['Decryption in progress...', 'Access granted to secure channels.'],
                ['Neural boost active.', 'Cognitive enhancement: MAXIMUM']
            ];
            
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            
            setTimeout(() => {
                this.displayOutput(randomResponse, () => {});
            }, 500);
        });
    }
}

// Matrix rain effect for background
class MatrixRain {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.opacity = '0.1';
        
        document.body.appendChild(this.canvas);
        
        this.resizeCanvas();
        this.initializeRain();
        this.animate();
        
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    initializeRain() {
        this.columns = Math.floor(this.canvas.width / 20);
        this.drops = Array(this.columns).fill(1);
        this.chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    }
    
    animate() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#00ffff';
        this.ctx.font = '15px monospace';
        
        for (let i = 0; i < this.drops.length; i++) {
            const char = this.chars[Math.floor(Math.random() * this.chars.length)];
            this.ctx.fillText(char, i * 20, this.drops[i] * 20);
            
            if (this.drops[i] * 20 > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const jarvis = new JarvisHUD();
    const matrix = new MatrixRain();
    
    // Add interactivity after a short delay
    setTimeout(() => {
        jarvis.addInteractivity();
    }, 3000);
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            jarvis.executeSpecialCommand();
        }
        if (e.key === 'g' && e.ctrlKey) {
            jarvis.triggerGlitch();
        }
    });
});

// Add some global utility functions
window.JarvisUtils = {
    playSound: (frequency, duration) => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    },
    
    generateRandomHex: () => {
        return Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    }
};