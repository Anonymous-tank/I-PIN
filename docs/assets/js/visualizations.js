// I-PIN Visualizations JavaScript

class VisualizationController {
    constructor() {
        this.charts = new Map();
        this.data = this.generateSampleData();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeCharts();
    }

    setupEventListeners() {
        // t-SNE controls
        document.getElementById('perplexitySlider')?.addEventListener('input', (e) => {
            document.getElementById('perplexityValue').textContent = e.target.value;
            this.updateTSNEChart();
        });

        document.getElementById('learningRateSlider')?.addEventListener('input', (e) => {
            document.getElementById('learningRateValue').textContent = e.target.value;
            this.updateTSNEChart();
        });

        document.getElementById('userCountSelect')?.addEventListener('change', () => {
            this.updateTSNEChart();
        });

        document.getElementById('featureTypeSelect')?.addEventListener('change', () => {
            this.updateTSNEChart();
        });

        // LESR controls
        document.getElementById('bandsSlider')?.addEventListener('input', (e) => {
            document.getElementById('bandsValue').textContent = e.target.value;
            this.updateLESRChart();
        });

        document.getElementById('swtSlider')?.addEventListener('input', (e) => {
            document.getElementById('swtValue').textContent = e.target.value;
            this.updateLESRChart();
        });

        document.getElementById('lesrModeSelect')?.addEventListener('change', () => {
            this.updateLESRChart();
        });

        // Performance controls
        document.getElementById('thresholdRangeSelect')?.addEventListener('change', () => {
            this.updatePerformanceCharts();
        });

        document.getElementById('mnConfigSelect')?.addEventListener('change', () => {
            this.updatePerformanceCharts();
        });

        document.getElementById('scenarioSelect')?.addEventListener('change', () => {
            this.updatePerformanceCharts();
        });

        // Pipeline controls
        document.getElementById('pipelineStageSelect')?.addEventListener('change', () => {
            this.updatePipelineChart();
        });

        document.getElementById('displayTypeSelect')?.addEventListener('change', () => {
            this.updatePipelineChart();
        });
    }

    generateSampleData() {
        return {
            tsne: this.generateTSNEData(),
            lesr: this.generateLESRData(),
            performance: this.generatePerformanceData(),
            pipeline: this.generatePipelineData()
        };
    }

    generateTSNEData() {
        const data = {};
        const userColors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
        
        for (let users = 3; users <= 10; users++) {
            data[users] = [];
            for (let user = 0; user < users; user++) {
                const centerX = Math.cos(user * 2 * Math.PI / users) * 200 + 400;
                const centerY = Math.sin(user * 2 * Math.PI / users) * 200 + 300;
                
                for (let sample = 0; sample < 50; sample++) {
                    const angle = Math.random() * 2 * Math.PI;
                    const radius = Math.random() * 60 + 20;
                    
                    data[users].push({
                        x: centerX + Math.cos(angle) * radius,
                        y: centerY + Math.sin(angle) * radius,
                        user: user,
                        color: userColors[user % userColors.length]
                    });
                }
            }
        }
        
        return data;
    }

    generateLESRData() {
        const bands = 64;
        const data = {
            energy: [],
            ratio: [],
            snr: []
        };
        
        for (let i = 0; i < bands; i++) {
            // Energy distribution with some frequency characteristics
            const freq = i / bands;
            let energy = Math.exp(-Math.pow(freq - 0.3, 2) / 0.1) * 0.8;
            energy += Math.exp(-Math.pow(freq - 0.7, 2) / 0.05) * 0.6;
            energy += Math.random() * 0.2;
            
            data.energy.push(energy);
            data.ratio.push(Math.log(energy + 0.1) - Math.log(0.5));
            data.snr.push(Math.random() * 10 + 5); // 5-15 dB improvement
        }
        
        return data;
    }

    generatePerformanceData() {
        return {
            roc: this.generateROCData(),
            metrics: {
                auc: 0.998,
                f1: 0.999,
                eer: 0.001,
                threshold: 0.5
            }
        };
    }

    generateROCData() {
        const points = [];
        for (let i = 0; i <= 100; i++) {
            const fpr = i / 100;
            // Realistic ROC curve
            const tpr = 1 - Math.exp(-5 * fpr) + Math.random() * 0.02;
            points.push({ fpr: fpr, tpr: Math.min(1, tpr) });
        }
        return points;
    }

    generatePipelineData() {
        return {
            waveform: this.generateWaveformData(),
            spectrogram: this.generateSpectrogramData(),
            features: this.generateFeatureData()
        };
    }

    generateWaveformData() {
        const samples = 1000;
        const data = [];
        for (let i = 0; i < samples; i++) {
            const t = i / samples;
            const signal = Math.sin(2 * Math.PI * 10 * t) * Math.exp(-t * 2);
            const noise = (Math.random() - 0.5) * 0.1;
            data.push(signal + noise);
        }
        return data;
    }

    generateSpectrogramData() {
        const timeSteps = 100;
        const freqBins = 80;
        const data = [];
        
        for (let t = 0; t < timeSteps; t++) {
            const timeSlice = [];
            for (let f = 0; f < freqBins; f++) {
                let intensity = Math.random() * 0.3;
                
                // Add some frequency patterns
                if (f < 10) intensity += Math.random() * 0.4; // Low freq
                if (f > 30 && f < 50) intensity += Math.random() * 0.6; // Mid freq peak
                if (t > 20 && t < 60) intensity *= 1.5; // Time-based pattern
                
                timeSlice.push(Math.min(intensity, 1.0));
            }
            data.push(timeSlice);
        }
        
        return data;
    }

    generateFeatureData() {
        const features = [];
        for (let i = 0; i < 512; i++) {
            features.push(Math.random() * 2 - 1); // -1 to 1 range
        }
        return features;
    }

    initializeCharts() {
        this.drawTSNEChart();
        this.drawLESRChart();
        this.drawSNRChart();
        this.drawROCChart();
        this.drawPerformanceChart();
        this.drawPipelineChart();
    }

    updateTSNEChart() {
        this.drawTSNEChart();
    }

    updateLESRChart() {
        this.drawLESRChart();
        this.drawSNRChart();
    }

    updatePerformanceCharts() {
        this.drawROCChart();
        this.drawPerformanceChart();
    }

    updatePipelineChart() {
        this.drawPipelineChart();
    }

    drawTSNEChart() {
        const canvas = document.getElementById('tsneChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Clear canvas
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);

        // Get current settings
        const userCount = parseInt(document.getElementById('userCountSelect').value);
        const data = this.data.tsne[userCount];

        // Draw data points
        data.forEach(point => {
            ctx.fillStyle = point.color;
            ctx.beginPath();
            ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
            ctx.fill();
        });

        // Draw cluster boundaries (ellipses)
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.lineWidth = 2;
        for (let user = 0; user < userCount; user++) {
            const userPoints = data.filter(p => p.user === user);
            if (userPoints.length === 0) continue;

            const centerX = userPoints.reduce((sum, p) => sum + p.x, 0) / userPoints.length;
            const centerY = userPoints.reduce((sum, p) => sum + p.y, 0) / userPoints.length;

            ctx.beginPath();
            ctx.ellipse(centerX, centerY, 80, 60, 0, 0, 2 * Math.PI);
            ctx.stroke();
        }

        // Add axes labels
        ctx.fillStyle = '#1e293b';
        ctx.font = '14px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('t-SNE 维度 1', width / 2, height - 10);
        ctx.save();
        ctx.translate(15, height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('t-SNE 维度 2', 0, 0);
        ctx.restore();
    }

    drawLESRChart() {
        const canvas = document.getElementById('lesrChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);

        const bands = parseInt(document.getElementById('bandsSlider').value);
        const mode = document.getElementById('lesrModeSelect').value;
        const data = this.data.lesr[mode];

        const barWidth = (width - 60) / bands;
        const maxHeight = height - 80;

        for (let i = 0; i < bands; i++) {
            const value = data[i];
            const normalizedValue = mode === 'ratio' ? 
                (value + 2) / 4 : // Normalize ratio data
                value; // Energy and SNR are already normalized

            const barHeight = normalizedValue * maxHeight;
            
            // Color gradient
            let hue;
            if (mode === 'snr') {
                hue = normalizedValue * 120; // Green for high SNR
            } else {
                hue = 240 - normalizedValue * 120; // Blue to red
            }
            
            ctx.fillStyle = `hsl(${hue}, 70%, 50%)`;
            ctx.fillRect(30 + i * barWidth, height - barHeight - 40, barWidth - 2, barHeight);
        }

        // Labels
        ctx.fillStyle = '#1e293b';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        const title = mode === 'energy' ? 'LESR 能量分布' : 
                     mode === 'ratio' ? 'LESR 比率分析' : 'SNR 提升效果';
        ctx.fillText(title, width / 2, 20);
        ctx.fillText('频带索引', width / 2, height - 10);
    }

    drawSNRChart() {
        const canvas = document.getElementById('snrChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);

        const snrData = this.data.lesr.snr;
        const maxSNR = Math.max(...snrData);
        const barWidth = (width - 60) / snrData.length;

        // Draw bars
        snrData.forEach((snr, i) => {
            const barHeight = (snr / maxSNR) * (height - 80);
            const hue = (snr / maxSNR) * 120; // Green for high SNR
            
            ctx.fillStyle = `hsl(${hue}, 70%, 50%)`;
            ctx.fillRect(30 + i * barWidth, height - barHeight - 40, barWidth - 2, barHeight);
        });

        // Average line
        const avgSNR = snrData.reduce((a, b) => a + b, 0) / snrData.length;
        const avgY = height - (avgSNR / maxSNR) * (height - 80) - 40;
        
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(30, avgY);
        ctx.lineTo(width - 30, avgY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Labels
        ctx.fillStyle = '#1e293b';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('SNR 提升效果 (dB)', width / 2, 20);
        ctx.fillText(`平均: ${avgSNR.toFixed(1)} dB`, width / 2, height - 10);
    }

    drawROCChart() {
        const canvas = document.getElementById('rocChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);

        const rocData = this.data.performance.roc;
        const margin = 50;
        const chartWidth = width - 2 * margin;
        const chartHeight = height - 2 * margin;

        // Draw axes
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(margin, margin);
        ctx.lineTo(margin, height - margin);
        ctx.lineTo(width - margin, height - margin);
        ctx.stroke();

        // Draw diagonal line (random classifier)
        ctx.strokeStyle = '#d1d5db';
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(margin, height - margin);
        ctx.lineTo(width - margin, margin);
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw ROC curve
        ctx.strokeStyle = '#2563eb';
        ctx.lineWidth = 3;
        ctx.beginPath();
        rocData.forEach((point, i) => {
            const x = margin + point.fpr * chartWidth;
            const y = height - margin - point.tpr * chartHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();

        // Labels
        ctx.fillStyle = '#1e293b';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('假正率 (FPR)', width / 2, height - 10);
        ctx.save();
        ctx.translate(15, height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('真正率 (TPR)', 0, 0);
        ctx.restore();

        // AUC text
        ctx.textAlign = 'left';
        ctx.fillText(`AUC = ${this.data.performance.metrics.auc}`, margin + 10, margin + 20);
    }

    drawPerformanceChart() {
        const canvas = document.getElementById('performanceChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);

        // Performance metrics
        const metrics = [
            { name: 'F1 Score', value: 0.999, color: '#10b981' },
            { name: 'Precision', value: 0.995, color: '#3b82f6' },
            { name: 'Recall', value: 0.993, color: '#8b5cf6' },
            { name: 'Accuracy', value: 0.992, color: '#f59e0b' }
        ];

        const barHeight = 40;
        const barSpacing = 60;
        const margin = 100;

        metrics.forEach((metric, i) => {
            const y = margin + i * barSpacing;
            const barWidth = metric.value * (width - 2 * margin);

            // Draw bar
            ctx.fillStyle = metric.color;
            ctx.fillRect(margin, y, barWidth, barHeight);

            // Draw value text
            ctx.fillStyle = '#ffffff';
            ctx.font = '14px Inter';
            ctx.textAlign = 'center';
            ctx.fillText(metric.value.toFixed(3), margin + barWidth / 2, y + 25);

            // Draw metric name
            ctx.fillStyle = '#1e293b';
            ctx.textAlign = 'left';
            ctx.fillText(metric.name, 10, y + 25);
        });

        // Title
        ctx.fillStyle = '#1e293b';
        ctx.font = '16px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('性能指标对比', width / 2, 30);
    }

    drawPipelineChart() {
        const canvas = document.getElementById('pipelineChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);

        const stage = document.getElementById('pipelineStageSelect').value;
        const displayType = document.getElementById('displayTypeSelect').value;

        // Update title and description
        const titles = {
            raw: '原始音频波形',
            preprocessed: '预处理后音频',
            lesr: 'LESR 特征处理',
            features: '最终特征向量'
        };

        document.getElementById('pipelineTitle').textContent = titles[stage] || '音频处理流水线';

        if (displayType === 'waveform') {
            this.drawWaveform(ctx, width, height);
        } else if (displayType === 'spectrogram') {
            this.drawSpectrogram(ctx, width, height);
        } else {
            this.drawFeatures(ctx, width, height);
        }
    }

    drawWaveform(ctx, width, height) {
        const data = this.data.pipeline.waveform;
        const margin = 50;
        const chartWidth = width - 2 * margin;
        const chartHeight = height - 2 * margin;

        // Draw waveform
        ctx.strokeStyle = '#2563eb';
        ctx.lineWidth = 2;
        ctx.beginPath();

        data.forEach((value, i) => {
            const x = margin + (i / data.length) * chartWidth;
            const y = margin + chartHeight / 2 + value * chartHeight / 4;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });

        ctx.stroke();

        // Center line
        ctx.strokeStyle = '#d1d5db';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(margin, margin + chartHeight / 2);
        ctx.lineTo(width - margin, margin + chartHeight / 2);
        ctx.stroke();
    }

    drawSpectrogram(ctx, width, height) {
        const data = this.data.pipeline.spectrogram;
        const margin = 50;
        const chartWidth = width - 2 * margin;
        const chartHeight = height - 2 * margin;

        const timeSteps = data.length;
        const freqBins = data[0].length;
        const stepWidth = chartWidth / timeSteps;
        const binHeight = chartHeight / freqBins;

        // Draw spectrogram
        data.forEach((timeSlice, t) => {
            timeSlice.forEach((intensity, f) => {
                const x = margin + t * stepWidth;
                const y = margin + (freqBins - f - 1) * binHeight;
                
                // Color mapping
                const hue = (1 - intensity) * 240; // Blue to red
                const saturation = 100;
                const lightness = intensity * 50 + 10;
                
                ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
                ctx.fillRect(x, y, stepWidth, binHeight);
            });
        });
    }

    drawFeatures(ctx, width, height) {
        const data = this.data.pipeline.features;
        const margin = 50;
        const chartWidth = width - 2 * margin;
        const chartHeight = height - 2 * margin;

        const cols = 32;
        const rows = 16;
        const cellWidth = chartWidth / cols;
        const cellHeight = chartHeight / rows;

        // Draw feature map
        for (let i = 0; i < data.length && i < cols * rows; i++) {
            const row = Math.floor(i / cols);
            const col = i % cols;
            const x = margin + col * cellWidth;
            const y = margin + row * cellHeight;
            
            const value = (data[i] + 1) / 2; // Normalize to 0-1
            const intensity = Math.max(0, Math.min(1, value));
            
            // Color mapping
            const hue = intensity * 240; // Blue to red
            ctx.fillStyle = `hsl(${hue}, 70%, ${50 + intensity * 30}%)`;
            ctx.fillRect(x, y, cellWidth - 1, cellHeight - 1);
        }

        // Add grid
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= cols; i++) {
            ctx.beginPath();
            ctx.moveTo(margin + i * cellWidth, margin);
            ctx.lineTo(margin + i * cellWidth, margin + chartHeight);
            ctx.stroke();
        }
        for (let i = 0; i <= rows; i++) {
            ctx.beginPath();
            ctx.moveTo(margin, margin + i * cellHeight);
            ctx.lineTo(margin + chartWidth, margin + i * cellHeight);
            ctx.stroke();
        }
    }
}

// Initialize visualizations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new VisualizationController();
});
