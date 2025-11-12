// I-PIN Demo Interactive JavaScript

class IPinDemo {
    constructor() {
        this.audioContext = null;
        this.currentAudioBuffer = null;
        this.isProcessing = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initAudioContext();
        this.setupSliders();
        this.drawInitialCharts();
    }

    setupEventListeners() {
        // File upload
        const uploadArea = document.getElementById('uploadArea');
        const audioFile = document.getElementById('audioFile');

        uploadArea.addEventListener('click', () => audioFile.click());
        uploadArea.addEventListener('dragover', this.handleDragOver);
        uploadArea.addEventListener('drop', this.handleDrop.bind(this));
        audioFile.addEventListener('change', this.handleFileSelect.bind(this));

        // Navigation toggle for mobile
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }
    }

    setupSliders() {
        // LESR parameters
        const bandsSlider = document.getElementById('bandsSlider');
        const swtSlider = document.getElementById('swtSlider');
        const thresholdSlider = document.getElementById('thresholdSlider');
        const mSlider = document.getElementById('mSlider');

        bandsSlider?.addEventListener('input', (e) => {
            document.getElementById('bandsValue').textContent = e.target.value;
        });

        swtSlider?.addEventListener('input', (e) => {
            document.getElementById('swtValue').textContent = e.target.value;
        });

        thresholdSlider?.addEventListener('input', (e) => {
            document.getElementById('thresholdValue').textContent = e.target.value;
        });

        mSlider?.addEventListener('input', (e) => {
            document.getElementById('mValue').textContent = e.target.value;
        });
    }

    async initAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (error) {
            console.error('Audio context initialization failed:', error);
        }
    }

    handleDragOver(e) {
        e.preventDefault();
        e.currentTarget.classList.add('dragover');
    }

    handleDrop(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            this.processAudioFile(files[0]);
        }
    }

    handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            this.processAudioFile(file);
        }
    }

    async processAudioFile(file) {
        if (this.isProcessing) return;
        
        this.isProcessing = true;
        this.showProcessingStatus();
        
        try {
            // Step 1: Load and decode audio
            this.updateProgress(20, '正在加载音频文件...');
            const audioBuffer = await this.loadAudioFile(file);
            
            // Step 2: Display audio info
            this.updateProgress(40, '分析音频属性...');
            this.displayAudioInfo(file, audioBuffer);
            
            // Step 3: LESR preprocessing
            this.updateProgress(60, '执行 LESR 预处理...');
            await this.simulateLESRProcessing();
            
            // Step 4: Feature extraction
            this.updateProgress(80, '提取声学特征...');
            await this.simulateFeatureExtraction();
            
            // Step 5: Authentication
            this.updateProgress(100, '执行身份认证...');
            await this.simulateAuthentication();
            
            // Show results
            this.showResults();
            
        } catch (error) {
            console.error('Audio processing failed:', error);
            this.showError('音频处理失败: ' + error.message);
        } finally {
            this.isProcessing = false;
            this.hideProcessingStatus();
        }
    }

    async loadAudioFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const arrayBuffer = e.target.result;
                    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
                    this.currentAudioBuffer = audioBuffer;
                    
                    // Setup audio player
                    const audioPlayer = document.getElementById('audioPlayer');
                    audioPlayer.src = URL.createObjectURL(file);
                    
                    resolve(audioBuffer);
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = () => reject(new Error('文件读取失败'));
            reader.readAsArrayBuffer(file);
        });
    }

    displayAudioInfo(file, audioBuffer) {
        document.getElementById('sampleRate').textContent = audioBuffer.sampleRate + ' Hz';
        document.getElementById('duration').textContent = audioBuffer.duration.toFixed(2) + ' 秒';
        document.getElementById('channels').textContent = audioBuffer.numberOfChannels;
        document.getElementById('fileSize').textContent = this.formatFileSize(file.size);
        
        document.getElementById('audioPlayerSection').style.display = 'block';
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    async simulateLESRProcessing() {
        // Simulate LESR processing delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Update LESR results with simulated data
        document.getElementById('snrImprovement').textContent = '+' + (Math.random() * 5 + 5).toFixed(1) + ' dB';
        document.getElementById('noiseDetection').textContent = Math.random() > 0.3 ? '检测到噪声并已过滤' : '未检测到显著噪声';
        document.getElementById('replayDetection').textContent = Math.random() > 0.1 ? '正常音频' : '疑似重放攻击';
        document.getElementById('replayConfidence').textContent = (Math.random() * 10 + 90).toFixed(1) + '%';
        
        // Draw LESR chart
        this.drawLESRChart();
    }

    async simulateFeatureExtraction() {
        await new Promise(resolve => setTimeout(resolve, 800));
        this.drawFeatureChart();
    }

    async simulateAuthentication() {
        await new Promise(resolve => setTimeout(resolve, 600));
        
        // Generate random but realistic authentication results
        const similarityScore = Math.random() * 0.4 + 0.6; // 0.6-1.0
        const isAuthenticated = similarityScore > 0.5;
        const successCount = Math.floor(Math.random() * 2) + 3; // 3-4 out of 5
        
        document.getElementById('similarityScore').textContent = similarityScore.toFixed(3);
        document.getElementById('authResult').textContent = isAuthenticated ? '认证成功' : '认证失败';
        document.getElementById('authResult').className = 'metric ' + (isAuthenticated ? 'success' : 'error');
        
        document.getElementById('successCount').textContent = successCount + '/5';
        document.getElementById('sessionResult').textContent = successCount >= 3 ? '通过' : '拒绝';
        document.getElementById('sessionResult').className = 'metric ' + (successCount >= 3 ? 'success' : 'error');
        
        this.drawSpectrogramChart();
    }

    showProcessingStatus() {
        document.getElementById('processingStatus').style.display = 'block';
        document.getElementById('resultsContainer').style.display = 'none';
    }

    hideProcessingStatus() {
        document.getElementById('processingStatus').style.display = 'none';
    }

    updateProgress(percentage, step) {
        document.getElementById('progressFill').style.width = percentage + '%';
        document.getElementById('processingStep').textContent = step;
    }

    showResults() {
        document.getElementById('resultsContainer').style.display = 'block';
    }

    showError(message) {
        alert(message); // In a real implementation, use a better error display
    }

    drawInitialCharts() {
        // Draw placeholder charts
        this.drawPlaceholderChart('lesrChart', 'LESR 频谱分析');
        this.drawPlaceholderChart('featureChart', '特征空间分布');
        this.drawPlaceholderChart('spectrogramChart', '频谱图');
    }

    drawPlaceholderChart(canvasId, title) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(0, 0, width, height);
        
        ctx.fillStyle = '#64748b';
        ctx.font = '16px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(title + ' (等待音频上传)', width / 2, height / 2);
    }

    drawLESRChart() {
        const canvas = document.getElementById('lesrChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        // Clear canvas
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        
        // Draw LESR frequency bands
        const bands = 32;
        const bandWidth = width / bands;
        
        for (let i = 0; i < bands; i++) {
            const intensity = Math.random() * 0.8 + 0.2; // 0.2-1.0
            const barHeight = intensity * (height - 40);
            
            // Color gradient based on intensity
            const hue = intensity * 120; // Green to red
            ctx.fillStyle = `hsl(${hue}, 70%, 50%)`;
            
            ctx.fillRect(i * bandWidth + 2, height - barHeight - 20, bandWidth - 4, barHeight);
        }
        
        // Add labels
        ctx.fillStyle = '#1e293b';
        ctx.font = '12px Inter';
        ctx.textAlign = 'left';
        ctx.fillText('LESR 子带能量分布', 10, 15);
        ctx.textAlign = 'right';
        ctx.fillText('32 频段 @ SWT-8', width - 10, 15);
    }

    drawFeatureChart() {
        const canvas = document.getElementById('featureChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        
        // Draw feature space scatter plot
        ctx.fillStyle = '#2563eb';
        for (let i = 0; i < 100; i++) {
            const x = Math.random() * (width - 60) + 30;
            const y = Math.random() * (height - 60) + 30;
            const size = Math.random() * 4 + 2;
            
            ctx.beginPath();
            ctx.arc(x, y, size, 0, 2 * Math.PI);
            ctx.fill();
        }
        
        // Add current sample (highlighted)
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(width * 0.7, height * 0.3, 8, 0, 2 * Math.PI);
        ctx.fill();
        
        // Labels
        ctx.fillStyle = '#1e293b';
        ctx.font = '12px Inter';
        ctx.textAlign = 'left';
        ctx.fillText('PANNs + LESR 特征空间', 10, 15);
        ctx.fillStyle = '#ef4444';
        ctx.fillText('● 当前样本', width - 100, 15);
    }

    drawSpectrogramChart() {
        const canvas = document.getElementById('spectrogramChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, width, height);
        
        // Draw spectrogram-like visualization
        const timeSteps = 80;
        const freqBins = 60;
        const stepWidth = width / timeSteps;
        const binHeight = height / freqBins;
        
        for (let t = 0; t < timeSteps; t++) {
            for (let f = 0; f < freqBins; f++) {
                // Simulate spectrogram data with some patterns
                let intensity = Math.random() * 0.5;
                
                // Add some frequency-dependent patterns
                if (f < 10) intensity += Math.random() * 0.3; // Low freq energy
                if (f > 40 && f < 50) intensity += Math.random() * 0.4; // Mid freq peak
                
                intensity = Math.min(intensity, 1.0);
                
                // Color mapping (blue to yellow to red)
                const hue = (1 - intensity) * 240; // Blue to red
                const saturation = 100;
                const lightness = intensity * 50 + 10;
                
                ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
                ctx.fillRect(t * stepWidth, (freqBins - f - 1) * binHeight, stepWidth, binHeight);
            }
        }
        
        // Add labels
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px Inter';
        ctx.textAlign = 'left';
        ctx.fillText('频率 (Hz)', 10, 20);
        ctx.save();
        ctx.translate(15, height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('时间 (s)', 0, 0);
        ctx.restore();
    }
}

// Sample audio loading functions
function loadSampleAudio(sampleId) {
    const demo = new IPinDemo();
    
    // Simulate loading a sample file
    demo.showProcessingStatus();
    demo.updateProgress(20, '加载示例音频 ' + sampleId + '...');
    
    setTimeout(() => {
        demo.updateProgress(40, '分析音频属性...');
        
        // Show sample audio info
        document.getElementById('sampleRate').textContent = '16000 Hz';
        document.getElementById('duration').textContent = '0.1 秒';
        document.getElementById('channels').textContent = '1';
        document.getElementById('fileSize').textContent = '3.2 KB';
        document.getElementById('audioPlayerSection').style.display = 'block';
        
        setTimeout(() => demo.simulateLESRProcessing(), 500);
        setTimeout(() => demo.simulateFeatureExtraction(), 1500);
        setTimeout(() => demo.simulateAuthentication(), 2300);
        setTimeout(() => {
            demo.showResults();
            demo.hideProcessingStatus();
        }, 3000);
    }, 500);
}

function reprocessAudio() {
    const demo = new IPinDemo();
    if (demo.currentAudioBuffer) {
        // Reprocess with new parameters
        demo.showProcessingStatus();
        demo.updateProgress(50, '使用新参数重新处理...');
        
        setTimeout(() => demo.simulateLESRProcessing(), 500);
        setTimeout(() => demo.simulateFeatureExtraction(), 1000);
        setTimeout(() => demo.simulateAuthentication(), 1500);
        setTimeout(() => {
            demo.showResults();
            demo.hideProcessingStatus();
        }, 2000);
    } else {
        alert('请先上传音频文件');
    }
}

// Initialize demo when page loads
document.addEventListener('DOMContentLoaded', () => {
    new IPinDemo();
});

// Add styles for dynamic elements
const style = document.createElement('style');
style.textContent = `
    .metric.success { color: var(--success-color); font-weight: 600; }
    .metric.warning { color: var(--warning-color); font-weight: 600; }
    .metric.error { color: var(--error-color); font-weight: 600; }
    .nav-menu.active { display: flex; }
    
    @media (max-width: 768px) {
        .nav-menu {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            box-shadow: var(--shadow-lg);
            padding: 1rem 0;
        }
    }
`;
document.head.appendChild(style);
