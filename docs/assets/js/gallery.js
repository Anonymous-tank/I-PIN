// I-PIN Gallery JavaScript

class GalleryController {
    constructor() {
        this.currentScenario = 'clean';
        this.scenarioData = this.generateScenarioData();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updatePerformanceGrid();
        this.drawAllCharts();
    }

    setupEventListeners() {
        // Scenario tabs
        document.querySelectorAll('.scenario-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                // Update active tab
                document.querySelectorAll('.scenario-tab').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                
                // Update scenario
                this.currentScenario = e.target.dataset.scenario;
                document.getElementById('currentScenario').textContent = e.target.textContent;
                
                // Update content
                this.updatePerformanceGrid();
            });
        });
    }

    generateScenarioData() {
        return {
            clean: {
                name: '干净环境',
                results: [
                    { title: 'F1 分数', value: '0.999', description: '精确率和召回率的调和平均' },
                    { title: '1-EER', value: '0.999', description: '等错误率补值' },
                    { title: 'ASR', value: '95.2%', description: '攻击成功率' },
                    { title: 'FPR', value: '2.1%', description: '误报率' },
                    { title: '处理时间', value: '23ms', description: '单次认证耗时' },
                    { title: '内存使用', value: '12MB', description: '模型内存占用' }
                ]
            },
            noisy: {
                name: '噪声环境',
                results: [
                    { title: 'F1 分数', value: '0.967', description: '噪声环境下的整体性能' },
                    { title: '1-EER', value: '0.971', description: '噪声干扰下的等错误率' },
                    { title: 'ASR', value: '88.7%', description: '噪声下的成功率' },
                    { title: 'FPR', value: '8.9%', description: '噪声导致的误报增加' },
                    { title: 'SNR提升', value: '+6.8dB', description: 'LESR降噪效果' },
                    { title: '鲁棒性', value: '91.2%', description: '性能保持率' }
                ]
            },
            attack: {
                name: '攻击场景',
                results: [
                    { title: '重放检测', value: '99.2%', description: '重放攻击检测率' },
                    { title: '偷窥防护', value: '100%', description: '完全避免视觉泄露' },
                    { title: '随机攻击', value: '12.5%', description: 'M=3,N=5下的成功率' },
                    { title: '模拟攻击', value: '3.7%', description: '高级模拟攻击成功率' },
                    { title: '攻击检测', value: '96.8%', description: '异常行为检测率' },
                    { title: '防护级别', value: 'High', description: '整体安全等级' }
                ]
            },
            'cross-device': {
                name: '跨设备',
                results: [
                    { title: '设备适应性', value: '89.3%', description: '跨设备性能保持' },
                    { title: '迁移学习', value: '92.1%', description: '少样本适应效果' },
                    { title: '硬件兼容', value: '95.6%', description: '不同麦克风兼容性' },
                    { title: '校准时间', value: '3.2s', description: '新设备校准时间' },
                    { title: '泛化能力', value: '87.9%', description: '未见设备性能' },
                    { title: '一致性', value: '94.1%', description: '跨设备一致性' }
                ]
            },
            temporal: {
                name: '时序分析',
                results: [
                    { title: '短期稳定', value: '98.7%', description: '1小时内性能稳定性' },
                    { title: '长期稳定', value: '94.2%', description: '1个月性能保持' },
                    { title: '学习效应', value: '+2.3%', description: '用户适应带来的提升' },
                    { title: '模板更新', value: '7天', description: '推荐更新周期' },
                    { title: '退化率', value: '0.12%/天', description: '性能自然退化率' },
                    { title: '恢复能力', value: '96.8%', description: '重新训练后恢复' }
                ]
            }
        };
    }

    updatePerformanceGrid() {
        const grid = document.getElementById('performanceGrid');
        const data = this.scenarioData[this.currentScenario];
        
        grid.innerHTML = data.results.map(result => `
            <div class="result-card">
                <div class="result-image">
                    <canvas width="300" height="180" class="result-chart" data-type="${result.title}"></canvas>
                </div>
                <h3>${result.title}</h3>
                <div class="metric-value" style="font-size: 2rem; margin: 1rem 0;">${result.value}</div>
                <p>${result.description}</p>
            </div>
        `).join('');
        
        // Draw charts for each result card
        setTimeout(() => {
            document.querySelectorAll('.result-chart').forEach(canvas => {
                this.drawResultChart(canvas, canvas.dataset.type);
            });
        }, 100);
    }

    drawResultChart(canvas, type) {
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        // Clear canvas
        ctx.fillStyle = '#667eea';
        ctx.fillRect(0, 0, width, height);
        
        // Create gradient
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        
        switch (type) {
            case 'F1 分数':
            case '1-EER':
                this.drawLineChart(ctx, width, height);
                break;
            case 'ASR':
            case 'FPR':
                this.drawBarChart(ctx, width, height);
                break;
            case '处理时间':
            case '内存使用':
                this.drawGaugeChart(ctx, width, height);
                break;
            case 'SNR提升':
                this.drawWaveChart(ctx, width, height);
                break;
            case '重放检测':
            case '偷窥防护':
                this.drawShieldChart(ctx, width, height);
                break;
            case '设备适应性':
            case '硬件兼容':
                this.drawDeviceChart(ctx, width, height);
                break;
            case '短期稳定':
            case '长期稳定':
                this.drawStabilityChart(ctx, width, height);
                break;
            default:
                this.drawDefaultChart(ctx, width, height);
        }
    }

    drawLineChart(ctx, width, height) {
        const points = 20;
        const margin = 30;
        const chartWidth = width - 2 * margin;
        const chartHeight = height - 2 * margin;
        
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        
        for (let i = 0; i < points; i++) {
            const x = margin + (i / (points - 1)) * chartWidth;
            const y = margin + chartHeight * (0.2 + 0.6 * Math.sin(i * 0.3) * Math.exp(-i * 0.1));
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
        
        // Add dots
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        for (let i = 0; i < points; i += 3) {
            const x = margin + (i / (points - 1)) * chartWidth;
            const y = margin + chartHeight * (0.2 + 0.6 * Math.sin(i * 0.3) * Math.exp(-i * 0.1));
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    drawBarChart(ctx, width, height) {
        const bars = 8;
        const margin = 30;
        const barWidth = (width - 2 * margin) / bars;
        
        for (let i = 0; i < bars; i++) {
            const barHeight = (Math.random() * 0.7 + 0.3) * (height - 60);
            const x = margin + i * barWidth + barWidth * 0.1;
            const y = height - 30 - barHeight;
            
            ctx.fillStyle = `rgba(255, 255, 255, ${0.6 + Math.random() * 0.3})`;
            ctx.fillRect(x, y, barWidth * 0.8, barHeight);
        }
    }

    drawGaugeChart(ctx, width, height) {
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 3;
        
        // Background arc
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0.75 * Math.PI, 0.25 * Math.PI);
        ctx.stroke();
        
        // Progress arc
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0.75 * Math.PI, 0.75 * Math.PI + 1.5 * Math.PI * 0.8);
        ctx.stroke();
        
        // Center dot
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.beginPath();
        ctx.arc(centerX, centerY, 6, 0, 2 * Math.PI);
        ctx.fill();
    }

    drawWaveChart(ctx, width, height) {
        const waves = 3;
        const margin = 20;
        
        for (let w = 0; w < waves; w++) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.4 + w * 0.2})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            for (let x = margin; x < width - margin; x += 2) {
                const y = height / 2 + Math.sin((x - margin) * 0.02 + w * Math.PI / 3) * (20 - w * 5);
                if (x === margin) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
        }
    }

    drawShieldChart(ctx, width, height) {
        const centerX = width / 2;
        const centerY = height / 2;
        const size = Math.min(width, height) / 3;
        
        // Shield shape
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - size);
        ctx.lineTo(centerX + size * 0.7, centerY - size * 0.3);
        ctx.lineTo(centerX + size * 0.7, centerY + size * 0.3);
        ctx.lineTo(centerX, centerY + size);
        ctx.lineTo(centerX - size * 0.7, centerY + size * 0.3);
        ctx.lineTo(centerX - size * 0.7, centerY - size * 0.3);
        ctx.closePath();
        ctx.fill();
        
        // Check mark
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(centerX - size * 0.3, centerY);
        ctx.lineTo(centerX - size * 0.1, centerY + size * 0.2);
        ctx.lineTo(centerX + size * 0.3, centerY - size * 0.2);
        ctx.stroke();
    }

    drawDeviceChart(ctx, width, height) {
        const devices = 4;
        const deviceSize = 30;
        const spacing = (width - devices * deviceSize) / (devices + 1);
        
        for (let i = 0; i < devices; i++) {
            const x = spacing + i * (deviceSize + spacing);
            const y = height / 2 - deviceSize / 2;
            
            // Device rectangle
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fillRect(x, y, deviceSize, deviceSize);
            
            // Connection lines
            if (i > 0) {
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(x - spacing, height / 2);
                ctx.lineTo(x, height / 2);
                ctx.stroke();
            }
        }
    }

    drawStabilityChart(ctx, width, height) {
        const points = 30;
        const margin = 20;
        const chartWidth = width - 2 * margin;
        const chartHeight = height - 2 * margin;
        
        // Trend line
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        for (let i = 0; i < points; i++) {
            const x = margin + (i / (points - 1)) * chartWidth;
            const trend = 0.3 + 0.4 * Math.exp(-i * 0.05); // Exponential decay
            const noise = (Math.random() - 0.5) * 0.1;
            const y = margin + chartHeight * (trend + noise);
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
    }

    drawDefaultChart(ctx, width, height) {
        // Default: scattered points
        const points = 20;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        
        for (let i = 0; i < points; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = Math.random() * 4 + 2;
            
            ctx.beginPath();
            ctx.arc(x, y, size, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    drawAllCharts() {
        // Draw ablation chart
        this.drawAblationChart();
        
        // Draw parameter analysis charts
        this.drawThresholdChart();
        this.drawMNChart();
        this.drawBandsChart();
        this.drawSNRChart();
    }

    drawAblationChart() {
        const canvas = document.getElementById('ablationChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        
        const methods = [
            { name: '完整模型', f1: 0.999, color: '#10b981' },
            { name: '无LESR预处理', f1: 0.847, color: '#ef4444' },
            { name: '仅PANNs特征', f1: 0.923, color: '#3b82f6' },
            { name: '无M-of-N聚合', f1: 0.912, color: '#f59e0b' }
        ];
        
        const barHeight = 40;
        const barSpacing = 80;
        const margin = 150;
        
        methods.forEach((method, i) => {
            const y = 60 + i * barSpacing;
            const barWidth = method.f1 * (width - 2 * margin);
            
            // Draw bar
            ctx.fillStyle = method.color;
            ctx.fillRect(margin, y, barWidth, barHeight);
            
            // Draw value
            ctx.fillStyle = '#ffffff';
            ctx.font = '14px Inter';
            ctx.textAlign = 'center';
            ctx.fillText(method.f1.toFixed(3), margin + barWidth / 2, y + 25);
            
            // Draw method name
            ctx.fillStyle = '#1e293b';
            ctx.textAlign = 'left';
            ctx.fillText(method.name, 10, y + 25);
        });
        
        // Title
        ctx.fillStyle = '#1e293b';
        ctx.font = '18px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('消融实验结果 - F1 分数对比', width / 2, 30);
    }

    drawThresholdChart() {
        const canvas = document.getElementById('thresholdChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        
        // Generate threshold sensitivity data
        const thresholds = [];
        for (let t = 0; t <= 1; t += 0.1) {
            const f1 = 1 - Math.abs(t - 0.5) * 2; // Peak at 0.5
            thresholds.push({ x: t, y: f1 });
        }
        
        // Draw curve
        ctx.strokeStyle = '#2563eb';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        thresholds.forEach((point, i) => {
            const x = 20 + point.x * (width - 40);
            const y = 20 + (1 - point.y) * (height - 40);
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();
        
        // Highlight optimal point
        const optimalX = 20 + 0.5 * (width - 40);
        const optimalY = 20 + (1 - 1) * (height - 40);
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(optimalX, optimalY, 5, 0, 2 * Math.PI);
        ctx.fill();
    }

    drawMNChart() {
        const canvas = document.getElementById('mnChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        
        // M-of-N configurations
        const configs = [
            { m: 2, n: 5, usability: 0.9, security: 0.7 },
            { m: 3, n: 5, usability: 0.8, security: 0.85 },
            { m: 4, n: 7, usability: 0.7, security: 0.9 },
            { m: 5, n: 10, usability: 0.6, security: 0.95 }
        ];
        
        // Draw scatter plot
        configs.forEach((config, i) => {
            const x = 20 + config.usability * (width - 40);
            const y = 20 + (1 - config.security) * (height - 40);
            
            ctx.fillStyle = i === 1 ? '#ef4444' : '#3b82f6'; // Highlight (3,5)
            ctx.beginPath();
            ctx.arc(x, y, i === 1 ? 8 : 5, 0, 2 * Math.PI);
            ctx.fill();
        });
    }

    drawBandsChart() {
        const canvas = document.getElementById('bandsChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        
        // Performance vs bands
        const bandsData = [16, 24, 32, 40, 48, 64];
        const performance = [0.91, 0.95, 0.999, 0.992, 0.987, 0.983];
        
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        bandsData.forEach((bands, i) => {
            const x = 20 + (i / (bandsData.length - 1)) * (width - 40);
            const y = 20 + (1 - performance[i]) * (height - 40);
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();
        
        // Highlight optimal (32 bands)
        const optimalX = 20 + (2 / (bandsData.length - 1)) * (width - 40);
        const optimalY = 20 + (1 - 0.999) * (height - 40);
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(optimalX, optimalY, 6, 0, 2 * Math.PI);
        ctx.fill();
    }

    drawSNRChart() {
        const canvas = document.getElementById('snrChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        
        // SNR improvement over frequency bands
        const bands = 16;
        const maxSNR = 12;
        
        for (let i = 0; i < bands; i++) {
            const snr = 3 + Math.sin(i * 0.5) * 4 + Math.random() * 2;
            const barWidth = (width - 40) / bands;
            const barHeight = (snr / maxSNR) * (height - 40);
            
            const hue = (snr / maxSNR) * 120; // Green for high SNR
            ctx.fillStyle = `hsl(${hue}, 70%, 50%)`;
            ctx.fillRect(20 + i * barWidth, height - 20 - barHeight, barWidth - 2, barHeight);
        }
    }
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GalleryController();
});
