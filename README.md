# I-PIN: Propagation-Enhanced Acoustic Biometrics

[![Demo](https://img.shields.io/badge/🚀_Live_Demo-Try_Now-brightgreen.svg)](https://Anonymous-tank.github.io/I-PIN)
[![Conference](https://img.shields.io/badge/MobiCom-2026-blue.svg)](https://www.sigmobile.org/mobicom/2026/)
[![Paper](https://img.shields.io/badge/📄_Paper-PDF-red.svg)](https://Anonymous-tank.github.io/I-PIN/paper.pdf)
[![Status](https://img.shields.io/badge/Status-Code_Restructuring-orange.svg)](https://github.com/Anonymous-tank/I-PIN)

> **⚠️ Code Restructuring in Progress**: This repository is currently undergoing major code restructuring and optimization. The codebase is being reorganized for better maintainability and production readiness. Please refer to the [Interactive Research Demo](https://Anonymous-tank.github.io/I-PIN) for complete research details and technical analysis.

---

**ACM MobiCom 2026 Submission #691**

## 🎯 Project Overview

**I-PIN** is the first PIN authentication system that exploits structure-borne propagation acoustics to achieve robust resistance against visual eavesdropping, replay attacks, and environmental noise. This repository contains the implementation and demonstration materials for our revolutionary approach to mobile authentication.

### Key Features
- 🔬 **Novel Biometric Approach**: Structure-borne acoustic propagation for mobile authentication
- 🛡️ **Comprehensive Security**: Resistant to shoulder-surfing, replay attacks, and acoustic eavesdropping  
- 📊 **Outstanding Performance**: 99.4% ASR with 0.9% FPR across 27 participants and 10 scenarios

**[📊 View Full Research Details & Interactive Demo](https://Anonymous-tank.github.io/I-PIN)**

> **🔬 Research Focus**: For comprehensive research details, experimental results, interactive LocAF data visualization, and technical analysis, please visit our **[Interactive Research Demo](https://Anonymous-tank.github.io/I-PIN)**. This page contains the complete academic presentation including LocAF signal demonstrations, LESR analysis, system architecture, and experimental results.

---

## 🚀 Quick Start

> **📝 Note**: The codebase is currently being restructured. Installation and usage instructions will be updated once the restructuring is complete.

### Prerequisites
- Python 3.8+
- PyTorch 1.9+
- NumPy, SciPy, Librosa
- Android Studio (for mobile app)

### Installation

```bash
# Clone the repository
git clone https://github.com/Anonymous-tank/I-PIN.git
cd I-PIN

# Install dependencies
pip install -r requirements.txt

# Download pre-trained models
python scripts/download_models.py
```

> **⚠️ Current Status**: Code restructuring in progress. Some components may not be fully functional until the restructuring is complete.

## 📊 Performance Benchmarks

| Component | Metric | Value | Comparison |
|-----------|---------|-------|------------|
| **LESR Denoiser** | SNR Improvement | 59.6 dB | vs. 33.3 dB (best baseline) |
| **Feature Extraction** | Correlation | 99.99% | vs. 99.98% (baseline) |
| **Authentication** | Multi-LocAF ASR | 99.4% | vs. 92.6% (single-LocAF) |
| **Security** | Replay Detection | 100% | vs. 0% (traditional PIN) |

---

## 🔬 Research Details

For comprehensive research details, experimental results, and interactive visualizations, please visit:

**[📊 Full Research Demo & Paper Details](https://Anonymous-tank.github.io/I-PIN)**

The demo includes:
- Interactive LocAF signal visualization
- LESR analysis demonstrations  
- System architecture diagrams
- Experimental results and comparisons
- Security analysis and attack resistance

---

## 📄 Citation

```bibtex
@article{ipin2026,
  title={Propagation-Enhanced Acoustic Biometrics: Noise-Resistant Mobile PIN Authentication against Shoulder-Surfing and Spoofing},
  author={[Authors to be announced]},
  journal={Proceedings of ACM MobiCom},
  year={2026},
  publisher={ACM}
}
```

---

## 📞 Contact & Support

| Resource | Link | Description |
|----------|------|-------------|
| **📄 Paper** | **[PDF Download](https://Anonymous-tank.github.io/I-PIN/paper.pdf)** | **MobiCom 2026 submission** |
| **🔬 Research Demo** | **[Interactive Demo](https://Anonymous-tank.github.io/I-PIN)** | **Full research visualization** |
| **💻 GitHub** | **[@Anonymous-tank](https://github.com/Anonymous-tank)** | **Source code repository** |
| **📧 Issues** | **[Report Bug](https://github.com/Anonymous-tank/I-PIN/issues)** | **Bug reports and feature requests** |

### 📧 **Contact Information**

- **Primary Contact**: [Contact via GitHub](https://github.com/Anonymous-tank)
- **Research Questions**: Please use GitHub Issues for technical discussions
- **Collaboration**: Open to research collaborations and industry partnerships
