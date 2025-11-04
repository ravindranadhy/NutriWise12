// Onboarding Tour
const onboardingSteps = [
    {
        icon: '🎉',
        title: 'Welcome to NutriWise360!',
        text: 'You\'re about to experience personalized nutrition like never before. Let\'s take a quick tour of your dashboard.'
    },
    {
        icon: '📊',
        title: 'Track Your Progress',
        text: 'See your daily calories, macros, and water intake at a glance. Progress bars show how close you are to your goals.'
    },
    {
        icon: '📝',
        title: 'Log Food Easily',
        text: 'Use barcode scanning, voice input, or photo recognition to log meals in seconds. No more tedious manual entry!'
    },
    {
        icon: '🤖',
        title: 'AI-Powered Recommendations',
        text: 'Get personalized food suggestions based on your DNA, microbiome, preferences, and real-time health data.'
    },
    {
        icon: '✨',
        title: 'You\'re All Set!',
        text: 'Start exploring your dashboard. Click any card to dive deeper, or use the sidebar to navigate different sections.'
    }
];

let currentStep = 0;

const onboardingOverlay = document.getElementById('onboardingOverlay');
const onboardingIcon = document.getElementById('onboardingIcon');
const onboardingTitle = document.getElementById('onboardingTitle');
const onboardingText = document.getElementById('onboardingText');
const onboardingNext = document.getElementById('onboardingNext');
const skipOnboarding = document.getElementById('skipOnboarding');
const progressDots = document.querySelectorAll('.progress-dot');

function updateOnboarding() {
    const step = onboardingSteps[currentStep];
    onboardingIcon.textContent = step.icon;
    onboardingTitle.textContent = step.title;
    onboardingText.textContent = step.text;
    
    // Update progress dots
    progressDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentStep);
    });
    
    // Update button text
    if (currentStep === onboardingSteps.length - 1) {
        onboardingNext.textContent = 'Start Using Dashboard →';
    } else {
        onboardingNext.textContent = 'Next →';
    }
}

onboardingNext.addEventListener('click', () => {
    currentStep++;
    if (currentStep >= onboardingSteps.length) {
        closeOnboarding();
    } else {
        updateOnboarding();
    }
});

skipOnboarding.addEventListener('click', closeOnboarding);

function closeOnboarding() {
    if (!onboardingOverlay) return;
    onboardingOverlay.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
        onboardingOverlay.style.display = 'none';
        showWelcomeTooltips();
        // Save to localStorage so it doesn't show again
        localStorage.setItem('nutriwise_onboarding_complete', 'true');
    }, 300);
}

// Check if onboarding was already completed
if (onboardingOverlay) {
    const onboardingComplete = localStorage.getItem('nutriwise_onboarding_complete');
    if (onboardingComplete === 'true') {
        onboardingOverlay.style.display = 'none';
        console.log('✅ Onboarding skipped - already completed');
    } else {
        console.log('🎉 Showing onboarding tour');
    }
}

// Show helpful tooltips after onboarding
function showWelcomeTooltips() {
    // Highlight the Log Food button
    const logFoodBtn = document.getElementById('logFoodBtn');
    logFoodBtn.classList.add('pulse-highlight');
    
    setTimeout(() => {
        logFoodBtn.classList.remove('pulse-highlight');
    }, 3000);
}

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const leftSidebar = document.getElementById('leftSidebar');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    if (window.innerWidth <= 768) {
        if (leftSidebar.style.display === 'block') {
            leftSidebar.style.display = 'none';
        } else {
            leftSidebar.style.display = 'block';
            leftSidebar.style.position = 'fixed';
            leftSidebar.style.top = '88px';
            leftSidebar.style.left = '0';
            leftSidebar.style.zIndex = '999';
            leftSidebar.style.width = '240px';
        }
    }
});

// Search functionality - Open search modal on click
const searchBar = document.getElementById('searchBar');
searchBar.addEventListener('click', () => {
    openManualSearch();
});

searchBar.addEventListener('focus', () => {
    openManualSearch();
});

// Barcode Scanner
document.getElementById('barcodeBtn').addEventListener('click', () => {
    // Create scanner modal if it doesn't exist
    let scannerModal = document.getElementById('barcodeScanner');
    
    if (!scannerModal) {
        // Create modal elements
        scannerModal = document.createElement('div');
        scannerModal.id = 'barcodeScanner';
        scannerModal.className = 'scanner-modal';
        
        // Create modal content
        scannerModal.innerHTML = `
            <div class="scanner-content">
                <div class="scanner-header">
                    <h3>Scan Barcode</h3>
                    <button id="closeScannerBtn">×</button>
                </div>
                <div id="scannerViewport"></div>
                <div class="scanner-footer">
                    <div id="scannerStatus">Initializing camera...</div>
                    <div id="scanResult"></div>
                </div>
            </div>
        `;
        
        // Add modal to body
        document.body.appendChild(scannerModal);
        
        // Add event listener to close button
        document.getElementById('closeScannerBtn').addEventListener('click', () => {
            stopScanner();
            scannerModal.style.display = 'none';
        });
        
        // Add styles for scanner modal
        const style = document.createElement('style');
        style.textContent = `
            .scanner-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.8);
                z-index: 10000;
                align-items: center;
                justify-content: center;
            }
            
            .scanner-content {
                background-color: white;
                border-radius: 16px;
                width: 90%;
                max-width: 500px;
                overflow: hidden;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
            }
            
            .scanner-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 16px;
                background-color: #16a34a;
                color: white;
            }
            
            .scanner-header h3 {
                margin: 0;
                font-size: 18px;
            }
            
            #closeScannerBtn {
                background: none;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
            }
            
            #scannerViewport {
                position: relative;
                height: 300px;
                overflow: hidden;
                background-color: #000;
            }
            
            #scannerViewport canvas, #scannerViewport video {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            
            .scanner-footer {
                padding: 16px;
                text-align: center;
            }
            
            #scannerStatus {
                margin-bottom: 8px;
                font-weight: 500;
            }
            
            #scanResult {
                font-weight: bold;
                color: #16a34a;
            }
            
            .drawingBuffer {
                position: absolute;
                top: 0;
                left: 0;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Show scanner modal
    scannerModal.style.display = 'flex';
    
    // Load QuaggaJS if not already loaded
    if (typeof Quagga === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/quagga@0.12.1/dist/quagga.min.js';
        script.onload = initScanner;
        document.head.appendChild(script);
    } else {
        initScanner();
    }
});

// Initialize barcode scanner
function initScanner() {
    const scannerStatus = document.getElementById('scannerStatus');
    scannerStatus.textContent = 'Accessing camera...';
    
    Quagga.init({
        inputStream: {
            name: 'Live',
            type: 'LiveStream',
            target: document.getElementById('scannerViewport'),
            constraints: {
                width: 480,
                height: 320,
                facingMode: 'environment' // Use back camera on mobile
            },
        },
        decoder: {
            readers: [
                'ean_reader',
                'ean_8_reader',
                'upc_reader',
                'upc_e_reader'
            ],
            debug: {
                showCanvas: true,
                showPatches: true,
                showFoundPatches: true,
                showSkeleton: true,
                showLabels: true,
                showPatchLabels: true,
                showRemainingPatchLabels: true,
                boxFromPatches: {
                    showTransformed: true,
                    showTransformedBox: true,
                    showBB: true
                }
            }
        },
    }, function(err) {
        if (err) {
            console.error('Scanner initialization error:', err);
            scannerStatus.textContent = 'Camera access denied or not available';
            return;
        }
        
        scannerStatus.textContent = 'Camera ready. Point at a barcode.';
        
        Quagga.start();
        
        // Barcode detected event
        Quagga.onDetected(function(result) {
            const code = result.codeResult.code;
            const scanResult = document.getElementById('scanResult');
            
            // Play success sound
            const beep = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU');
            beep.play();
            
            // Show result
            scanResult.textContent = `Barcode detected: ${code}`;
            scannerStatus.textContent = 'Searching product database...';
            
            // Simulate API call to food database
            setTimeout(() => {
                // Stop scanner after successful scan
                stopScanner();
                
                // Show product information
                const productInfo = getFoodInfoByBarcode(code);
                showProductInfo(productInfo);
            }, 1500);
        });
    });
}

// Stop barcode scanner
function stopScanner() {
    if (typeof Quagga !== 'undefined') {
        Quagga.stop();
    }
}

// Get food information by barcode (simulated database)
function getFoodInfoByBarcode(barcode) {
    // Simulate database lookup
    const products = {
        '8901063152177': {
            name: 'Amul Butter',
            brand: 'Amul',
            calories: 722,
            protein: 0.5,
            carbs: 0.4,
            fats: 80,
            servingSize: '100g',
            image: '🧈'
        },
        '8901725133566': {
            name: 'Parle-G Original Glucose Biscuits',
            brand: 'Parle',
            calories: 455,
            protein: 6.1,
            carbs: 75.2,
            fats: 14.1,
            servingSize: '100g',
            image: '🍪'
        },
        '8901030615085': {
            name: 'Maggi 2-Minute Noodles',
            brand: 'Nestle',
            calories: 432,
            protein: 8.5,
            carbs: 62.3,
            fats: 16.4,
            servingSize: '100g',
            image: '🍜'
        },
        '8901058851732': {
            name: 'Aashirvaad Whole Wheat Atta',
            brand: 'ITC',
            calories: 340,
            protein: 12.1,
            carbs: 71.2,
            fats: 1.7,
            servingSize: '100g',
            image: '🌾'
        },
        '8901571000128': {
            name: 'Saffola Gold Oil',
            brand: 'Saffola',
            calories: 900,
            protein: 0,
            carbs: 0,
            fats: 100,
            servingSize: '100ml',
            image: '🫒'
        }
    };
    
    // Return product info or default
    return products[barcode] || {
        name: 'Product ' + barcode,
        brand: 'Unknown Brand',
        calories: 100,
        protein: 5,
        carbs: 15,
        fats: 2,
        servingSize: '100g',
        image: '🥫'
    };
}

// Show product information
function showProductInfo(product) {
    const scannerModal = document.getElementById('barcodeScanner');
    scannerModal.style.display = 'none';
    
    // Create product modal
    let productModal = document.getElementById('productModal');
    
    if (!productModal) {
        productModal = document.createElement('div');
        productModal.id = 'productModal';
        productModal.className = 'product-modal';
        
        // Add styles for product modal
        const style = document.createElement('style');
        style.textContent = `
            .product-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.8);
                z-index: 10000;
                align-items: center;
                justify-content: center;
            }
            
            .product-content {
                background-color: white;
                border-radius: 16px;
                width: 90%;
                max-width: 500px;
                overflow: hidden;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
                animation: slideUp 0.3s ease;
            }
            
            @keyframes slideUp {
                from { transform: translateY(50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            .product-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 16px;
                background-color: #16a34a;
                color: white;
            }
            
            .product-header h3 {
                margin: 0;
                font-size: 18px;
            }
            
            #closeProductBtn {
                background: none;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
            }
            
            .product-details {
                padding: 24px;
            }
            
            .product-image {
                font-size: 64px;
                text-align: center;
                margin-bottom: 16px;
            }
            
            .product-name {
                font-size: 24px;
                font-weight: 700;
                margin-bottom: 4px;
            }
            
            .product-brand {
                color: #64748b;
                margin-bottom: 16px;
            }
            
            .nutrition-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 16px;
                margin-bottom: 24px;
            }
            
            .nutrition-item {
                background-color: #f8fafc;
                border-radius: 8px;
                padding: 12px;
                text-align: center;
            }
            
            .nutrition-value {
                font-size: 20px;
                font-weight: 700;
                color: #16a34a;
                margin-bottom: 4px;
            }
            
            .nutrition-label {
                font-size: 14px;
                color: #64748b;
            }
            
            .product-actions {
                display: flex;
                gap: 12px;
            }
            
            .product-btn {
                flex: 1;
                padding: 12px;
                border-radius: 8px;
                border: none;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .product-btn.primary {
                background-color: #16a34a;
                color: white;
            }
            
            .product-btn.secondary {
                background-color: #e2e8f0;
                color: #0f172a;
            }
            
            .product-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(productModal);
    }
    
    // Update product modal content
    productModal.innerHTML = `
        <div class="product-content">
            <div class="product-header">
                <h3>Product Information</h3>
                <button id="closeProductBtn">×</button>
            </div>
            <div class="product-details">
                <div class="product-image">${product.image}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-brand">${product.brand} • ${product.servingSize}</div>
                
                <div class="nutrition-grid">
                    <div class="nutrition-item">
                        <div class="nutrition-value">${product.calories}</div>
                        <div class="nutrition-label">Calories (kcal)</div>
                    </div>
                    <div class="nutrition-item">
                        <div class="nutrition-value">${product.protein}g</div>
                        <div class="nutrition-label">Protein</div>
                    </div>
                    <div class="nutrition-item">
                        <div class="nutrition-value">${product.carbs}g</div>
                        <div class="nutrition-label">Carbs</div>
                    </div>
                    <div class="nutrition-item">
                        <div class="nutrition-value">${product.fats}g</div>
                        <div class="nutrition-label">Fats</div>
                    </div>
                </div>
                
                <div class="product-actions">
                    <button class="product-btn primary" id="addToLogBtn">Add to Today's Log</button>
                    <button class="product-btn secondary" id="saveProductBtn">Save for Later</button>
                </div>
            </div>
        </div>
    `;
    
    // Show product modal
    productModal.style.display = 'flex';
    
    // Add event listeners
    document.getElementById('closeProductBtn').addEventListener('click', () => {
        productModal.style.display = 'none';
    });
    
    document.getElementById('addToLogBtn').addEventListener('click', () => {
        // Simulate adding to log
        showToast(`${product.name} added to today's log!`);
        productModal.style.display = 'none';
    });
    
    document.getElementById('saveProductBtn').addEventListener('click', () => {
        // Simulate saving product
        showToast(`${product.name} saved to favorites!`);
        productModal.style.display = 'none';
    });
}

// Food Camera - Photo Recognition
function openFoodCamera() {
    // Create camera modal if it doesn't exist
    let cameraModal = document.getElementById('foodCamera');
    
    if (!cameraModal) {
        // Create modal elements
        cameraModal = document.createElement('div');
        cameraModal.id = 'foodCamera';
        cameraModal.className = 'camera-modal';
        
        // Create modal content
        cameraModal.innerHTML = `
            <div class="camera-content">
                <div class="camera-header">
                    <h3>Take Photo of Your Meal</h3>
                    <button id="closeCameraBtn">×</button>
                </div>
                <div id="cameraViewport">
                    <video id="cameraVideo" autoplay playsinline></video>
                    <canvas id="cameraCanvas" style="display: none;"></canvas>
                    <div id="cameraOverlay">
                        <div class="camera-guide"></div>
                    </div>
                </div>
                <div class="camera-footer">
                    <div id="cameraStatus">Initializing camera...</div>
                    <button id="captureBtn" class="capture-btn" disabled>
                        <div class="capture-btn-inner"></div>
                    </button>
                    <div id="cameraTip">Center your meal in the frame</div>
                </div>
            </div>
        `;
        
        // Add modal to body
        document.body.appendChild(cameraModal);
        
        // Add event listener to close button
        document.getElementById('closeCameraBtn').addEventListener('click', () => {
            stopCamera();
            cameraModal.style.display = 'none';
        });
        
        // Add styles for camera modal
        const style = document.createElement('style');
        style.textContent = `
            .camera-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.9);
                z-index: 10000;
                align-items: center;
                justify-content: center;
            }
            
            .camera-content {
                background-color: #000;
                border-radius: 16px;
                width: 90%;
                max-width: 500px;
                overflow: hidden;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
            }
            
            .camera-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 16px;
                background-color: #16a34a;
                color: white;
            }
            
            .camera-header h3 {
                margin: 0;
                font-size: 18px;
            }
            
            #closeCameraBtn {
                background: none;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
            }
            
            #cameraViewport {
                position: relative;
                height: 400px;
                overflow: hidden;
                background-color: #000;
            }
            
            #cameraVideo {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            
            #cameraOverlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                pointer-events: none;
            }
            
            .camera-guide {
                width: 80%;
                height: 80%;
                border: 2px dashed rgba(255, 255, 255, 0.5);
                border-radius: 8px;
            }
            
            .camera-footer {
                padding: 16px;
                text-align: center;
                background-color: #000;
                color: white;
            }
            
            #cameraStatus {
                margin-bottom: 16px;
                font-weight: 500;
                color: #e2e8f0;
            }
            
            .capture-btn {
                width: 70px;
                height: 70px;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.2);
                border: none;
                padding: 5px;
                margin: 0 auto 16px;
                display: block;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .capture-btn:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
            
            .capture-btn-inner {
                width: 100%;
                height: 100%;
                background-color: white;
                border-radius: 50%;
                transition: all 0.2s;
            }
            
            .capture-btn:active .capture-btn-inner {
                width: 90%;
                height: 90%;
                margin: 5%;
            }
            
            #cameraTip {
                font-size: 14px;
                color: #94a3b8;
            }
            
            .photo-preview {
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: none;
            }
            
            .analyzing-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: white;
                display: none;
            }
            
            .analyzing-spinner {
                width: 50px;
                height: 50px;
                border: 5px solid rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                border-top-color: #16a34a;
                animation: spin 1s ease-in-out infinite;
                margin-bottom: 16px;
            }
            
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
            
            .action-buttons {
                display: flex;
                justify-content: space-between;
                padding: 16px;
                background-color: #000;
                display: none;
            }
            
            .action-btn {
                padding: 12px 24px;
                border-radius: 8px;
                border: none;
                font-weight: 600;
                cursor: pointer;
            }
            
            .action-btn.primary {
                background-color: #16a34a;
                color: white;
                flex: 2;
                margin-right: 8px;
            }
            
            .action-btn.secondary {
                background-color: #334155;
                color: white;
                flex: 1;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Show camera modal
    cameraModal.style.display = 'flex';
    
    // Initialize camera
    initCamera();
}

// Initialize camera
function initCamera() {
    const cameraStatus = document.getElementById('cameraStatus');
    const cameraVideo = document.getElementById('cameraVideo');
    const captureBtn = document.getElementById('captureBtn');
    
    cameraStatus.textContent = 'Accessing camera...';
    
    // Check if browser supports getUserMedia
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        cameraStatus.textContent = 'Camera not supported in this browser';
        return;
    }
    
    // Get access to camera
    navigator.mediaDevices.getUserMedia({ 
        video: { 
            facingMode: 'environment', // Use back camera on mobile
            width: { ideal: 1280 },
            height: { ideal: 720 }
        } 
    })
    .then(stream => {
        cameraVideo.srcObject = stream;
        cameraStatus.textContent = 'Camera ready';
        captureBtn.disabled = false;
        
        // Add event listener to capture button
        captureBtn.addEventListener('click', capturePhoto);
    })
    .catch(err => {
        console.error('Camera access error:', err);
        cameraStatus.textContent = 'Camera access denied or not available';
    });
}

// Stop camera
function stopCamera() {
    const cameraVideo = document.getElementById('cameraVideo');
    
    if (cameraVideo && cameraVideo.srcObject) {
        const tracks = cameraVideo.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        cameraVideo.srcObject = null;
    }
}

// Capture photo
function capturePhoto() {
    const cameraVideo = document.getElementById('cameraVideo');
    const cameraCanvas = document.getElementById('cameraCanvas');
    const cameraViewport = document.getElementById('cameraViewport');
    const cameraStatus = document.getElementById('cameraStatus');
    const captureBtn = document.getElementById('captureBtn');
    
    // Create context and capture frame
    const context = cameraCanvas.getContext('2d');
    cameraCanvas.width = cameraVideo.videoWidth;
    cameraCanvas.height = cameraVideo.videoHeight;
    context.drawImage(cameraVideo, 0, 0, cameraCanvas.width, cameraCanvas.height);
    
    // Create preview image
    const photoPreview = document.createElement('img');
    photoPreview.className = 'photo-preview';
    photoPreview.src = cameraCanvas.toDataURL('image/jpeg');
    photoPreview.style.display = 'block';
    
    // Create analyzing overlay
    const analyzingOverlay = document.createElement('div');
    analyzingOverlay.className = 'analyzing-overlay';
    analyzingOverlay.innerHTML = `
        <div class="analyzing-spinner"></div>
        <div>Analyzing your meal...</div>
    `;
    analyzingOverlay.style.display = 'flex';
    
    // Create action buttons
    const actionButtons = document.createElement('div');
    actionButtons.className = 'action-buttons';
    actionButtons.innerHTML = `
        <button id="retakeBtn" class="action-btn secondary">Retake</button>
        <button id="confirmBtn" class="action-btn primary">Use This Photo</button>
    `;
    
    // Add elements to viewport
    cameraViewport.innerHTML = '';
    cameraViewport.appendChild(photoPreview);
    cameraViewport.appendChild(analyzingOverlay);
    cameraViewport.insertAdjacentElement('afterend', actionButtons);
    
    // Hide capture button and update status
    captureBtn.style.display = 'none';
    cameraStatus.textContent = 'Processing image...';
    
    // Simulate AI analysis (would be a real API call in production)
    setTimeout(() => {
        analyzingOverlay.style.display = 'none';
        actionButtons.style.display = 'flex';
        cameraStatus.textContent = 'Photo captured!';
        
        // Add event listeners to buttons
        document.getElementById('retakeBtn').addEventListener('click', () => {
            // Reset camera view
            cameraViewport.innerHTML = `
                <video id="cameraVideo" autoplay playsinline></video>
                <canvas id="cameraCanvas" style="display: none;"></canvas>
                <div id="cameraOverlay">
                    <div class="camera-guide"></div>
                </div>
            `;
            
            // Remove action buttons
            actionButtons.remove();
            
            // Show capture button
            captureBtn.style.display = 'block';
            
            // Restart camera
            initCamera();
        });
        
        document.getElementById('confirmBtn').addEventListener('click', () => {
            // Stop camera
            stopCamera();
            
            // Close camera modal
            document.getElementById('foodCamera').style.display = 'none';
            
            // Show food recognition results
            showFoodRecognitionResults(photoPreview.src);
        });
    }, 2000);
}

// Show food recognition results
function showFoodRecognitionResults(photoSrc) {
    // Create results modal
    let resultsModal = document.getElementById('foodResultsModal');
    
    if (!resultsModal) {
        resultsModal = document.createElement('div');
        resultsModal.id = 'foodResultsModal';
        resultsModal.className = 'results-modal';
        
        // Add styles for results modal
        const style = document.createElement('style');
        style.textContent = `
            .results-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.8);
                z-index: 10000;
                align-items: center;
                justify-content: center;
            }
            
            .results-content {
                background-color: white;
                border-radius: 16px;
                width: 90%;
                max-width: 500px;
                overflow: hidden;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
                animation: slideUp 0.3s ease;
            }
            
            .results-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 16px;
                background-color: #16a34a;
                color: white;
            }
            
            .results-header h3 {
                margin: 0;
                font-size: 18px;
            }
            
            #closeResultsBtn {
                background: none;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
            }
            
            .results-body {
                padding: 24px;
            }
            
            .results-photo {
                width: 100%;
                height: 200px;
                object-fit: cover;
                border-radius: 8px;
                margin-bottom: 16px;
            }
            
            .results-title {
                font-size: 20px;
                font-weight: 700;
                margin-bottom: 16px;
                color: #0f172a;
            }
            
            .food-item {
                display: flex;
                align-items: center;
                padding: 12px;
                border-radius: 8px;
                background-color: #f8fafc;
                margin-bottom: 8px;
            }
            
            .food-item-checkbox {
                margin-right: 12px;
                width: 20px;
                height: 20px;
                accent-color: #16a34a;
            }
            
            .food-item-details {
                flex: 1;
            }
            
            .food-item-name {
                font-weight: 600;
                margin-bottom: 4px;
            }
            
            .food-item-calories {
                font-size: 14px;
                color: #64748b;
            }
            
            .food-item-portion {
                width: 100px;
                padding: 8px;
                border: 1px solid #e2e8f0;
                border-radius: 4px;
                font-size: 14px;
            }
            
            .results-summary {
                display: flex;
                justify-content: space-between;
                padding: 16px;
                background-color: #f1f5f9;
                border-radius: 8px;
                margin: 16px 0;
            }
            
            .summary-item {
                text-align: center;
            }
            
            .summary-value {
                font-size: 18px;
                font-weight: 700;
                color: #16a34a;
            }
            
            .summary-label {
                font-size: 12px;
                color: #64748b;
            }
            
            .results-actions {
                display: flex;
                gap: 12px;
            }
            
            .results-btn {
                flex: 1;
                padding: 12px;
                border-radius: 8px;
                border: none;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .results-btn.primary {
                background-color: #16a34a;
                color: white;
            }
            
            .results-btn.secondary {
                background-color: #e2e8f0;
                color: #0f172a;
            }
            
            .results-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(resultsModal);
    }
    
    // Generate random meal data (in a real app, this would come from AI recognition)
    const recognizedFoods = [
        { name: 'Rice', calories: 130, portion: '1 cup', checked: true },
        { name: 'Dal Tadka', calories: 180, portion: '1 bowl', checked: true },
        { name: 'Paneer Tikka', calories: 250, portion: '4 pieces', checked: true },
        { name: 'Mixed Vegetable Curry', calories: 120, portion: '1/2 cup', checked: true },
        { name: 'Roti', calories: 80, portion: '1 piece', checked: true }
    ];
    
    // Calculate total calories
    const totalCalories = recognizedFoods.reduce((sum, food) => sum + food.calories, 0);
    
    // Update results modal content
    resultsModal.innerHTML = `
        <div class="results-content">
            <div class="results-header">
                <h3>Food Recognition Results</h3>
                <button id="closeResultsBtn">×</button>
            </div>
            <div class="results-body">
                <img src="${photoSrc}" class="results-photo" alt="Your meal">
                <div class="results-title">We identified these items in your meal:</div>
                
                <div class="food-items-list">
                    ${recognizedFoods.map(food => `
                        <div class="food-item">
                            <input type="checkbox" class="food-item-checkbox" ${food.checked ? 'checked' : ''}>
                            <div class="food-item-details">
                                <div class="food-item-name">${food.name}</div>
                                <div class="food-item-calories">${food.calories} kcal</div>
                            </div>
                            <select class="food-item-portion">
                                <option>${food.portion}</option>
                                <option>1/2 ${food.portion}</option>
                                <option>2 ${food.portion}</option>
                            </select>
                        </div>
                    `).join('')}
                </div>
                
                <div class="results-summary">
                    <div class="summary-item">
                        <div class="summary-value">${totalCalories}</div>
                        <div class="summary-label">Calories</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-value">${Math.round(totalCalories * 0.15 / 4)}g</div>
                        <div class="summary-label">Protein</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-value">${Math.round(totalCalories * 0.55 / 4)}g</div>
                        <div class="summary-label">Carbs</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-value">${Math.round(totalCalories * 0.3 / 9)}g</div>
                        <div class="summary-label">Fat</div>
                    </div>
                </div>
                
                <div class="results-actions">
                    <button class="results-btn primary" id="addMealBtn">Add to Today's Log</button>
                    <button class="results-btn secondary" id="editMealBtn">Edit Items</button>
                </div>
            </div>
        </div>
    `;
    
    // Show results modal
    resultsModal.style.display = 'flex';
    
    // Add event listeners
    document.getElementById('closeResultsBtn').addEventListener('click', () => {
        resultsModal.style.display = 'none';
    });
    
    document.getElementById('addMealBtn').addEventListener('click', () => {
        // Simulate adding to log
        showToast('Meal added to today\'s log!');
        resultsModal.style.display = 'none';
    });
    
    document.getElementById('editMealBtn').addEventListener('click', () => {
        // Simulate edit mode
        showToast('Edit mode enabled. Adjust items as needed.');
    });
}

// Voice Search
document.getElementById('voiceBtn').addEventListener('click', startVoiceRecognition);

// Voice Recognition Function
function startVoiceRecognition() {
    // Create voice modal if it doesn't exist
    let voiceModal = document.getElementById('voiceRecognition');
    
    if (!voiceModal) {
        // Create modal elements
        voiceModal = document.createElement('div');
        voiceModal.id = 'voiceRecognition';
        voiceModal.className = 'voice-modal';
        
        // Create modal content
        voiceModal.innerHTML = `
            <div class="voice-content">
                <div class="voice-header">
                    <h3>Voice Food Logging</h3>
                    <button id="closeVoiceBtn">×</button>
                </div>
                <div class="voice-body">
                    <div class="voice-animation">
                        <div class="voice-wave"></div>
                        <div class="voice-wave"></div>
                        <div class="voice-wave"></div>
                        <div class="voice-wave"></div>
                        <div class="voice-wave"></div>
                    </div>
                    <div id="voiceStatus">Click the microphone to start speaking</div>
                    <div id="voiceText" class="voice-text"></div>
                    <button id="startVoiceBtn" class="voice-btn">
                        <div class="mic-icon">🎤</div>
                    </button>
                    <div id="voiceTip" class="voice-tip">Try saying: "I had masala dosa with sambar for breakfast"</div>
                </div>
            </div>
        `;
        
        // Add modal to body
        document.body.appendChild(voiceModal);
        
        // Add event listener to close button
        document.getElementById('closeVoiceBtn').addEventListener('click', () => {
            stopVoiceRecognition();
            voiceModal.style.display = 'none';
        });
        
        // Add styles for voice modal
        const style = document.createElement('style');
        style.textContent = `
            .voice-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.8);
                z-index: 10000;
                align-items: center;
                justify-content: center;
            }
            
            .voice-content {
                background-color: white;
                border-radius: 16px;
                width: 90%;
                max-width: 500px;
                overflow: hidden;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
                animation: slideUp 0.3s ease;
            }
            
            .voice-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 16px;
                background-color: #16a34a;
                color: white;
            }
            
            .voice-header h3 {
                margin: 0;
                font-size: 18px;
            }
            
            #closeVoiceBtn {
                background: none;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
            }
            
            .voice-body {
                padding: 32px 24px;
                text-align: center;
            }
            
            .voice-animation {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 60px;
                margin-bottom: 24px;
            }
            
            .voice-wave {
                width: 5px;
                height: 40px;
                margin: 0 3px;
                border-radius: 3px;
                background-color: #16a34a;
                animation: wave 1s infinite ease-in-out;
                transform-origin: bottom;
                opacity: 0.2;
            }
            
            .voice-wave:nth-child(2) {
                animation-delay: 0.1s;
            }
            
            .voice-wave:nth-child(3) {
                animation-delay: 0.2s;
            }
            
            .voice-wave:nth-child(4) {
                animation-delay: 0.3s;
            }
            
            .voice-wave:nth-child(5) {
                animation-delay: 0.4s;
            }
            
            .listening .voice-wave {
                opacity: 1;
            }
            
            @keyframes wave {
                0%, 100% {
                    transform: scaleY(0.2);
                }
                50% {
                    transform: scaleY(1);
                }
            }
            
            #voiceStatus {
                font-size: 16px;
                font-weight: 600;
                margin-bottom: 16px;
                color: #0f172a;
            }
            
            .voice-text {
                min-height: 60px;
                margin-bottom: 24px;
                font-size: 18px;
                color: #64748b;
                font-style: italic;
            }
            
            .voice-btn {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                background-color: #16a34a;
                border: none;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 16px;
                cursor: pointer;
                transition: all 0.2s;
                box-shadow: 0 4px 12px rgba(22, 163, 74, 0.3);
            }
            
            .voice-btn:hover {
                transform: scale(1.05);
                box-shadow: 0 6px 16px rgba(22, 163, 74, 0.4);
            }
            
            .voice-btn:active {
                transform: scale(0.95);
            }
            
            .mic-icon {
                font-size: 32px;
                color: white;
            }
            
            .voice-tip {
                font-size: 14px;
                color: #94a3b8;
            }
            
            .voice-results {
                margin-top: 24px;
                padding-top: 24px;
                border-top: 1px solid #e2e8f0;
                display: none;
            }
            
            .voice-results-title {
                font-size: 18px;
                font-weight: 700;
                margin-bottom: 16px;
                color: #0f172a;
                text-align: left;
            }
            
            .voice-food-item {
                display: flex;
                align-items: center;
                padding: 12px;
                border-radius: 8px;
                background-color: #f8fafc;
                margin-bottom: 8px;
                text-align: left;
            }
            
            .voice-food-icon {
                font-size: 24px;
                margin-right: 12px;
            }
            
            .voice-food-details {
                flex: 1;
            }
            
            .voice-food-name {
                font-weight: 600;
                margin-bottom: 4px;
            }
            
            .voice-food-calories {
                font-size: 14px;
                color: #64748b;
            }
            
            .voice-actions {
                display: flex;
                gap: 12px;
                margin-top: 24px;
            }
            
            .voice-action-btn {
                flex: 1;
                padding: 12px;
                border-radius: 8px;
                border: none;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .voice-action-btn.primary {
                background-color: #16a34a;
                color: white;
            }
            
            .voice-action-btn.secondary {
                background-color: #e2e8f0;
    }
    
    .voice-modal-content {
        background-color: #fff;
        padding: 24px;
        border-radius: 16px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
        animation: slideUp 0.3s ease;
    }
    
    .voice-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        background-color: #16a34a;
        color: white;
    }
    
    .voice-header h3 {
        margin: 0;
        font-size: 18px;
    }
    
    #closeVoiceBtn {
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
    }
    
    .voice-body {
        padding: 32px 24px;
        text-align: center;
    }
    
    .voice-animation {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60px;
        margin-bottom: 24px;
    }
    
    .voice-wave {
        width: 5px;
        height: 40px;
        margin: 0 3px;
        border-radius: 3px;
        background-color: #16a34a;
        animation: wave 1s infinite ease-in-out;
        transform-origin: bottom;
        opacity: 0.2;
    }
    
    .voice-wave:nth-child(2) {
        animation-delay: 0.1s;
    }
    
    .voice-wave:nth-child(3) {
        animation-delay: 0.2s;
    }
    
    .voice-wave:nth-child(4) {
        animation-delay: 0.3s;
    }
    
    .voice-wave:nth-child(5) {
        animation-delay: 0.4s;
    }
    
    .listening .voice-wave {
        opacity: 1;
    }
    
    @keyframes wave {
        0%, 100% {
            transform: scaleY(0.2);
        }
        50% {
            transform: scaleY(1);
        }
    }
    
    #voiceStatus {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 16px;
        color: #0f172a;
    }
    
    .voice-text {
        min-height: 60px;
        margin-bottom: 24px;
        font-size: 18px;
        color: #64748b;
        font-style: italic;
    }
    
    .voice-btn {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background-color: #16a34a;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 16px;
        cursor: pointer;
        transition: all 0.2s;
        box-shadow: 0 4px 12px rgba(22, 163, 74, 0.3);
    }
    
    .voice-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 16px rgba(22, 163, 74, 0.4);
    }
    
    .voice-btn:active {
        transform: scale(0.95);
    }
    
    .mic-icon {
        font-size: 32px;
        color: white;
    }
    
    .voice-tip {
        font-size: 14px;
        color: #94a3b8;
    }
    
    .voice-results {
        margin-top: 24px;
        padding-top: 24px;
        border-top: 1px solid #e2e8f0;
        display: none;
    }
    
    .voice-results-title {
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 16px;
        color: #0f172a;
        text-align: left;
    }
    
    .voice-food-item {
        display: flex;
        align-items: center;
        padding: 12px;
        border-radius: 8px;
        background-color: #f8fafc;
        margin-bottom: 8px;
        text-align: left;
    }
    
    .voice-food-icon {
        font-size: 24px;
        margin-right: 12px;
    }
    
    .voice-food-details {
        flex: 1;
    }
    
    .voice-food-name {
        font-weight: 600;
        margin-bottom: 4px;
    }
    
    .voice-food-calories {
        font-size: 14px;
        color: #64748b;
    }
    
    .voice-actions {
        display: flex;
        gap: 12px;
        margin-top: 24px;
    }
    
    .voice-action-btn {
        flex: 1;
        padding: 12px;
        border-radius: 8px;
        border: none;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
    }
    
    .voice-action-btn.primary {
        background-color: #16a34a;
        color: white;
    }
    
    .voice-action-btn.secondary {
        background-color: #e2e8f0;
        color: #0f172a;
    }
`;
document.head.appendChild(style);
        
// Add event listener to start button
document.getElementById('startVoiceBtn').addEventListener('click', toggleVoiceRecognition);
}

// Show voice modal
voiceModal.style.display = 'flex';
}

// Speech recognition instance
let recognition = null;
let isListening = false;

// Toggle voice recognition
function toggleVoiceRecognition() {
    if (isListening) {
        stopVoiceRecognition();
    } else {
        startListening();
    }
}

// Start listening
function startListening() {
    const voiceStatus = document.getElementById('voiceStatus');
    const voiceText = document.getElementById('voiceText');
    const voiceAnimation = document.querySelector('.voice-animation');
    const startVoiceBtn = document.getElementById('startVoiceBtn');
    
    // Check if browser supports speech recognition
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        voiceStatus.textContent = 'Voice recognition not supported in this browser';
        return;
    }
    
    // Create speech recognition instance
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    
    // Configure recognition
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = true;
    
    // Start recognition
    recognition.start();
    isListening = true;
    
    // Update UI
    voiceStatus.textContent = 'Listening...';
    voiceAnimation.classList.add('listening');
    startVoiceBtn.style.backgroundColor = '#ef4444'; // Red color when active
    
    // Handle results
    recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('');
        
        voiceText.textContent = transcript;
    };
    
    // Handle end of speech
    recognition.onend = () => {
        if (isListening) {
            const transcript = voiceText.textContent;
            
            if (transcript) {
                voiceStatus.textContent = 'Processing your meal...';
                
                // Simulate processing (would be a real API call in production)
                setTimeout(() => {
                    processVoiceInput(transcript);
                }, 1500);
            } else {
                voiceStatus.textContent = 'We didn\'t catch that. Please try again.';
                voiceAnimation.classList.remove('listening');
                startVoiceBtn.style.backgroundColor = '#16a34a';
                isListening = false;
            }
        }
    };
    
    // Handle errors
    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        voiceStatus.textContent = `Error: ${event.error}. Please try again.`;
        voiceAnimation.classList.remove('listening');
        startVoiceBtn.style.backgroundColor = '#16a34a';
        isListening = false;
    };
}

// Stop voice recognition
function stopVoiceRecognition() {
    if (recognition) {
        recognition.stop();
    }
    
    isListening = false;
    
    const voiceAnimation = document.querySelector('.voice-animation');
    const startVoiceBtn = document.getElementById('startVoiceBtn');
    
    if (voiceAnimation) {
        voiceAnimation.classList.remove('listening');
    }
    
    if (startVoiceBtn) {
        startVoiceBtn.style.backgroundColor = '#16a34a';
    }
}

// Process voice input
function processVoiceInput(transcript) {
    const voiceBody = document.querySelector('.voice-body');
    const voiceStatus = document.getElementById('voiceStatus');
    
    // Create results section if it doesn't exist
    let voiceResults = document.querySelector('.voice-results');
    
    if (!voiceResults) {
        voiceResults = document.createElement('div');
        voiceResults.className = 'voice-results';
        voiceBody.appendChild(voiceResults);
    }
    
    // Parse the transcript (in a real app, this would use NLP)
    const foods = parseVoiceTranscript(transcript);
    
    // Calculate total calories
    const totalCalories = foods.reduce((sum, food) => sum + food.calories, 0);
    
    // Update results content
    voiceResults.innerHTML = `
        <div class="voice-results-title">We identified these items:</div>
        
        ${foods.map(food => `
            <div class="voice-food-item">
                <div class="voice-food-icon">${food.icon}</div>
                <div class="voice-food-details">
                    <div class="voice-food-name">${food.name}</div>
                    <div class="voice-food-calories">${food.calories} kcal • ${food.portion}</div>
                </div>
            </div>
        `).join('')}
        
        <div class="voice-results-title" style="margin-top: 16px;">Meal Summary:</div>
        <div class="voice-food-item" style="background-color: #f0fdf4;">
            <div class="voice-food-icon">🔥</div>
            <div class="voice-food-details">
                <div class="voice-food-name">Total Calories</div>
                <div class="voice-food-calories">${totalCalories} kcal</div>
            </div>
        </div>
        
        <div class="voice-actions">
            <button class="voice-action-btn primary" id="addVoiceMealBtn">Add to Today's Log</button>
            <button class="voice-action-btn secondary" id="tryAgainBtn">Try Again</button>
        </div>
    `;
    
    // Show results
    voiceResults.style.display = 'block';
    voiceStatus.textContent = 'We identified your meal!';
    
    // Add event listeners
    document.getElementById('addVoiceMealBtn').addEventListener('click', () => {
        // Simulate adding to log
        showToast('Meal added to today\'s log!');
        document.getElementById('voiceRecognition').style.display = 'none';
    });
    
    document.getElementById('tryAgainBtn').addEventListener('click', () => {
        // Reset and try again
        voiceResults.style.display = 'none';
        document.getElementById('voiceText').textContent = '';
        voiceStatus.textContent = 'Click the microphone to start speaking';
    });
}

// Parse voice transcript to identify food items
function parseVoiceTranscript(transcript) {
    // This is a simplified version - in a real app, you'd use NLP
    const lowerTranscript = transcript.toLowerCase();
    
    // Define some food patterns to look for
    const foodPatterns = [
        { 
            pattern: /dosa|masala dosa|plain dosa/,
            name: 'Masala Dosa',
            calories: 250,
            portion: '1 dosa',
            icon: '🥞'
        },
        { 
            pattern: /sambar|sambhar|sambaar/,
            name: 'Sambar',
            calories: 150,
            portion: '1 bowl',
            icon: '🍲'
        },
        { 
            pattern: /chutney|coconut chutney/,
            name: 'Coconut Chutney',
            calories: 120,
            portion: '2 tbsp',
            icon: '🥥'
        },
        { 
            pattern: /idli|idly/,
            name: 'Idli',
            calories: 80,
            portion: '2 pieces',
            icon: '🍙'
        },
        { 
            pattern: /rice|white rice|steamed rice/,
            name: 'Steamed Rice',
            calories: 130,
            portion: '1 cup',
            icon: '🍚'
        },
        { 
            pattern: /roti|chapati|phulka/,
            name: 'Roti',
            calories: 80,
            portion: '1 piece',
            icon: '🫓'
        },
        { 
            pattern: /dal|daal|lentils/,
            name: 'Dal',
            calories: 150,
            portion: '1 bowl',
            icon: '🍲'
        },
        { 
            pattern: /paneer|cottage cheese/,
            name: 'Paneer Dish',
            calories: 300,
            portion: '1 serving',
            icon: '🧀'
        },
        { 
            pattern: /chicken|chicken curry/,
            name: 'Chicken Curry',
            calories: 350,
            portion: '1 serving',
            icon: '🍗'
        },
        { 
            pattern: /paratha|aloo paratha/,
            name: 'Aloo Paratha',
            calories: 250,
            portion: '1 piece',
            icon: '🫓'
        },
        { 
            pattern: /curd|yogurt|dahi/,
            name: 'Curd/Yogurt',
            calories: 100,
            portion: '1 bowl',
            icon: '🥛'
        },
        { 
            pattern: /tea|chai/,
            name: 'Chai',
            calories: 80,
            portion: '1 cup',
            icon: '☕'
        },
        { 
            pattern: /coffee/,
            name: 'Coffee',
            calories: 50,
            portion: '1 cup',
            icon: '☕'
        },
        { 
            pattern: /egg|eggs|omelette|omelet/,
            name: 'Eggs',
            calories: 140,
            portion: '2 eggs',
            icon: '🥚'
        },
        { 
            pattern: /bread|toast/,
            name: 'Bread/Toast',
            calories: 80,
            portion: '2 slices',
            icon: '🍞'
        }
    ];
    
    // Identify meal type
    let mealType = 'meal';
    if (lowerTranscript.includes('breakfast')) mealType = 'breakfast';
    else if (lowerTranscript.includes('lunch')) mealType = 'lunch';
    else if (lowerTranscript.includes('dinner')) mealType = 'dinner';
    else if (lowerTranscript.includes('snack')) mealType = 'snack';
    
    // Find matching foods
    const foundFoods = foodPatterns.filter(food => 
        food.pattern.test(lowerTranscript)
    );
    
    // If no specific foods found, return a generic meal
    if (foundFoods.length === 0) {
        return [{
            name: `${mealType.charAt(0).toUpperCase() + mealType.slice(1)}`,
            calories: 350,
            portion: '1 serving',
            icon: mealType === 'breakfast' ? '🌅' : 
                  mealType === 'lunch' ? '☀️' : 
                  mealType === 'dinner' ? '🌙' : '🍽️'
        }];
    }
    
    return foundFoods;
}

// Filters
const filterBtn = document.getElementById('filterBtn');
if (filterBtn) {
    filterBtn.addEventListener('click', () => {
        alert('⚙️ Advanced Filters\n\nFilter your food search by:\n\n• Meal type (Breakfast, Lunch, Dinner, Snacks)\n• Dietary preferences (Veg, Non-veg, Vegan)\n• Calorie range\n• Macro targets\n• Allergens to avoid\n• Regional cuisine\n• Preparation time');
    });
}

// Quick action buttons removed from UI

function navigateToSection(section) {
    console.log('Navigating to section:', section);
    
    // Update active nav link
    const allNavLinks = document.querySelectorAll('.nav-link');
    allNavLinks.forEach(l => l.classList.remove('active'));
    const activeLink = document.querySelector(`[data-section="${section}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Update main content based on section
    const mainContent = document.getElementById('mainContent');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const welcomeSubtext = document.getElementById('welcomeSubtext');
    
    if (!mainContent || !welcomeMessage || !welcomeSubtext) {
        console.error('Required elements not found!');
        return;
    }
    
    const sectionContent = {
        'dashboard': {
            title: 'Welcome to your dashboard, Ravi! 👋',
            subtext: 'Your personalized nutrition journey starts here. Track, learn, and achieve your health goals.',
            html: getDashboardHTML()
        },
        'food-logging': {
            title: 'Log Your Meals 📝',
            subtext: 'Track what you eat using barcode scan, photo recognition, or voice input - in just 10 seconds!',
            html: getFoodLoggingHTML()
        },
        'health-metrics': {
            title: 'Health Metrics 💪',
            subtext: 'Track your progress with detailed analytics synced from your wearables and health apps.',
            html: getHealthMetricsHTML()
        },
        'progress-analytics': {
            title: 'Progress Analytics 📈',
            subtext: 'Track weekly calories, weight goals, and get personalized health insights based on your data.',
            html: getProgressAnalyticsHTML()
        },
        'wearables': {
            title: 'Connected Devices ⌚',
            subtext: 'Sync data from Fitbit, Apple Watch, Google Fit, and more for real-time insights.',
            html: getWearablesHTML()
        },
        'microbiome': {
            title: 'Microbiome Analysis 🦠',
            subtext: 'Optimize your gut health with personalized probiotic and prebiotic recommendations.',
            html: getMicrobiomeHTML()
        },
        'settings': {
            title: 'Settings ⚙️',
            subtext: 'Manage your account, preferences, privacy, and subscription settings.',
            html: getSettingsHTML()
        }
    };
    
    const content = sectionContent[section] || sectionContent['dashboard'];
    welcomeMessage.textContent = content.title;
    welcomeSubtext.textContent = content.subtext;
    mainContent.innerHTML = content.html;
    
    // Re-attach event listeners
    attachDynamicEventListeners();
    
    // Initialize Progress Analytics if that section is loaded
    if (section === 'progress-analytics') {
        setTimeout(() => {
            if (typeof initProgressAnalytics === 'function') {
                initProgressAnalytics();
            }
        }, 100);
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    console.log('Navigated to:', section);
}

// Attach event listeners to dynamically loaded content
function attachDynamicEventListeners() {
    // Re-attach log item listeners
    const logItems = document.querySelectorAll('.log-item');
    logItems.forEach(item => {
        item.addEventListener('click', () => {
            const mealType = item.querySelector('h4')?.textContent || 'Meal';
            const details = item.querySelector('p')?.textContent || '';
            const calories = item.querySelector('.log-calories-value')?.textContent || '0';
            alert(`${mealType}\n\n${details}\n\nCalories: ${calories} kcal\n\n📊 Nutritional Breakdown:\n• Protein: 25g\n• Carbs: 45g\n• Fat: 12g\n• Fiber: 8g\n\n✏️ Edit  |  🗑️ Delete  |  📋 View Details`);
        });
    });
    
    // Re-attach food card listeners
    const foodCards = document.querySelectorAll('.food-card');
    foodCards.forEach(card => {
        card.addEventListener('click', () => {
            const foodName = card.querySelector('.food-name')?.textContent || 'Food Item';
            const calories = card.querySelector('.food-calories')?.textContent || '0 kcal';
            alert(`${foodName}\n\n${calories}\n\n✨ Why recommended:\n• Matches your protein goals\n• High in nutrients you need\n• Fits your taste preferences\n• Based on microbiome analysis\n\n📝 Add to Today's Log\n💾 Save to Favorites\n📖 View Full Recipe`);
        });
    });
    
    // Sign Out button
    const signOutBtn = document.getElementById('signOutBtn');
    if (signOutBtn) {
        signOutBtn.addEventListener('click', async () => {
            const confirmSignOut = confirm('🚪 Sign Out\n\nAre you sure you want to sign out?');
            if (confirmSignOut) {
                try {
                    const response = await fetch('/api/logout', { method: 'POST' });
                    if (response.ok) {
                        alert('✅ Signed out successfully!');
                        window.location.href = 'login.html';
                    } else {
                        alert('❌ Error signing out. Please try again.');
                    }
                } catch (error) {
                    console.error('Sign out error:', error);
                    alert('❌ Network error. Please try again.');
                }
            }
        });
    }
}

// Log Items Click
const logItems = document.querySelectorAll('.log-item');
logItems.forEach(item => {
    item.addEventListener('click', () => {
        const mealType = item.querySelector('h4').textContent;
        const details = item.querySelector('p').textContent;
        const calories = item.querySelector('.log-calories-value').textContent;
        
        alert(`${mealType}\n\n${details}\n\nCalories: ${calories} kcal\n\n📊 Nutritional Breakdown:\n• Protein: 25g\n• Carbs: 45g\n• Fat: 12g\n• Fiber: 8g\n\n✏️ Edit  |  🗑️ Delete  |  📋 View Details`);
    });
});

// Food Cards Click
const foodCards = document.querySelectorAll('.food-card');
foodCards.forEach(card => {
    card.addEventListener('click', () => {
        const foodName = card.querySelector('.food-name').textContent;
        const calories = card.querySelector('.food-calories').textContent;
        
        alert(`${foodName}\n\n${calories}\n\n✨ Why recommended:\n• Matches your protein goals\n• High in nutrients you need\n• Fits your taste preferences\n• Based on microbiome analysis\n\n📝 Add to Today's Log\n💾 Save to Favorites\n📖 View Full Recipe`);
    });
});

// Location Selector
document.getElementById('locationSelector').addEventListener('click', () => {
    const newLocation = prompt('Enter your location:', 'Mumbai, India');
    if (newLocation) {
        document.querySelector('.location-text').textContent = newLocation;
        alert(`📍 Location updated to: ${newLocation}\n\nThis helps us:\n• Find nearby restaurants\n• Show local ingredient availability\n• Adjust meal recommendations\n• Calculate delivery options`);
    }
});

// Profile Button
document.getElementById('profileBtn').addEventListener('click', () => {
    const action = confirm('👤 Profile Menu\n\nWould you like to logout?\n\nClick OK to logout or Cancel to stay.');
    if (action) {
        handleLogout();
    }
});

// Logout function
async function handleLogout() {
    try {
        const response = await fetch('/api/logout', { method: 'POST' });
        if (response.ok) {
            showToast('✓ Logged out successfully!');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 500);
        }
    } catch (error) {
        console.error('Logout error:', error);
        window.location.href = 'login.html';
    }
}

// Notifications
document.getElementById('notificationBtn').addEventListener('click', () => {
    alert('🔔 Notifications (5)\n\n💧 Drink water reminder - 2 glasses left\n🍽️ Log dinner reminder - Before 9 PM\n📊 Weekly progress report is ready!\n🥗 New recipe: Quinoa Buddha Bowl\n✓ Fitbit sync successful - 2 min ago\n\n🔕 Manage Notifications');
});

// Saved Meals
document.getElementById('savedBtn').addEventListener('click', () => {
    alert('💾 Saved Meals (3)\n\n🍛 Paneer Tikka Masala - 450 kcal\n🍲 Moong Dal Khichdi - 280 kcal\n🥗 Quinoa Salad Bowl - 320 kcal\n\n➕ Add to Today\'s Log\n✏️ Edit Meal\n🗑️ Remove from Saved');
});

// Load user data and update profile
async function loadUserProfile() {
    try {
        const response = await fetch('/api/dashboard');
        const data = await response.json();
        
        if (response.ok && data.success && data.user) {
            // Calculate initials
            const initials = data.user.name
                .split(' ')
                .map(word => word[0])
                .join('')
                .toUpperCase()
                .substring(0, 2);
            
            // Update profile name
            const profileNameElement = document.querySelector('.profile-name');
            if (profileNameElement && data.user.name) {
                profileNameElement.textContent = data.user.name;
            }
            
            // Update profile avatar with initials
            const profileAvatarElement = document.querySelector('.profile-avatar');
            if (profileAvatarElement) {
                profileAvatarElement.textContent = initials;
            }
            
            // Update welcome message
            const welcomeMessage = document.getElementById('welcomeMessage');
            if (welcomeMessage && data.user.name) {
                const firstName = data.user.name.split(' ')[0];
                welcomeMessage.textContent = `Welcome back, ${firstName}! 👋`;
            }
            
            // Update location display
            const locationText = document.querySelector('.location-text');
            if (locationText && data.user.location) {
                locationText.textContent = data.user.location;
            }
            
            // Update profile hover card
            const profileCardAvatar = document.getElementById('profileCardAvatar');
            if (profileCardAvatar) {
                profileCardAvatar.textContent = initials;
            }
            
            const profileCardName = document.getElementById('profileCardName');
            if (profileCardName && data.user.name) {
                profileCardName.textContent = data.user.name;
            }
            
            const profileCardEmail = document.getElementById('profileCardEmail');
            if (profileCardEmail && data.user.email) {
                profileCardEmail.textContent = data.user.email;
            }
            
            // Update profile stats from preferences
            if (data.preferences) {
                const profileCardAge = document.getElementById('profileCardAge');
                if (profileCardAge && data.preferences.age) {
                    profileCardAge.textContent = `${data.preferences.age} years`;
                }
                
                const profileCardHeight = document.getElementById('profileCardHeight');
                if (profileCardHeight && data.preferences.height) {
                    profileCardHeight.textContent = `${data.preferences.height} cm`;
                }
                
                const profileCardWeight = document.getElementById('profileCardWeight');
                if (profileCardWeight && data.preferences.currentWeight) {
                    profileCardWeight.textContent = `${data.preferences.currentWeight} kg`;
                }
                
                const profileCardGoal = document.getElementById('profileCardGoal');
                if (profileCardGoal && data.preferences.primaryGoal) {
                    const goalMap = {
                        'lose_weight': 'Lose Weight',
                        'gain_weight': 'Gain Weight',
                        'build_muscle': 'Build Muscle',
                        'lose_fat': 'Lose Fat',
                        'maintain_weight': 'Maintain Weight',
                        'improve_health': 'Improve Health'
                    };
                    profileCardGoal.textContent = goalMap[data.preferences.primaryGoal] || data.preferences.primaryGoal;
                }
            }
            
            console.log('✅ User profile loaded:', data.user.name);
        }
    } catch (error) {
        console.error('❌ Error loading user profile:', error);
    }
}

// Load dashboard summary data
async function loadDashboardSummary() {
    try {
        const response = await fetch('/api/dashboard');
        const data = await response.json();
        
        if (response.ok && data.success) {
            // Get user's targets from preferences
            const targetCalories = data.preferences?.targetCalories || 2000;
            const targetProtein = data.preferences?.targetProtein || 120;
            const targetCarbs = data.preferences?.targetCarbs || 250;
            const targetFats = data.preferences?.targetFats || 65;
            
            // Get today's consumption from logs
            const consumedCalories = data.todayLog?.totalCalories || 0;
            const consumedProtein = data.todayLog?.totalProtein || 0;
            const consumedCarbs = data.todayLog?.totalCarbs || 0;
            const consumedWater = data.todayLog?.water || 0;
            
            // Update Calories
            const caloriesConsumed = document.getElementById('caloriesConsumed');
            if (caloriesConsumed) {
                caloriesConsumed.textContent = consumedCalories.toLocaleString();
            }
            
            const caloriesLabel = document.getElementById('caloriesLabel');
            if (caloriesLabel) {
                caloriesLabel.textContent = `of ${targetCalories.toLocaleString()} kcal`;
            }
            
            const caloriesProgress = document.getElementById('caloriesProgress');
            if (caloriesProgress) {
                const percentage = Math.min((consumedCalories / targetCalories) * 100, 100);
                caloriesProgress.style.width = `${percentage}%`;
            }
            
            // Update Protein
            const proteinConsumed = document.getElementById('proteinConsumed');
            if (proteinConsumed) {
                proteinConsumed.textContent = `${Math.round(consumedProtein)}g`;
            }
            
            const proteinLabel = document.getElementById('proteinLabel');
            if (proteinLabel) {
                proteinLabel.textContent = `of ${targetProtein}g protein`;
            }
            
            const proteinProgress = document.getElementById('proteinProgress');
            if (proteinProgress) {
                const percentage = Math.min((consumedProtein / targetProtein) * 100, 100);
                proteinProgress.style.width = `${percentage}%`;
            }
            
            // Update Carbs
            const carbsConsumed = document.getElementById('carbsConsumed');
            if (carbsConsumed) {
                carbsConsumed.textContent = `${Math.round(consumedCarbs)}g`;
            }
            
            const carbsLabel = document.getElementById('carbsLabel');
            if (carbsLabel) {
                carbsLabel.textContent = `of ${targetCarbs}g carbs`;
            }
            
            const carbsProgress = document.getElementById('carbsProgress');
            if (carbsProgress) {
                const percentage = Math.min((consumedCarbs / targetCarbs) * 100, 100);
                carbsProgress.style.width = `${percentage}%`;
            }
            
            // Update Water (default target: 8 glasses)
            const waterConsumed = document.getElementById('waterConsumed');
            if (waterConsumed) {
                waterConsumed.textContent = consumedWater;
            }
            
            const waterProgress = document.getElementById('waterProgress');
            if (waterProgress) {
                const percentage = Math.min((consumedWater / 8) * 100, 100);
                waterProgress.style.width = `${percentage}%`;
            }
            
            console.log('✅ Dashboard summary loaded');
            console.log('Targets:', { targetCalories, targetProtein, targetCarbs });
            console.log('Consumed:', { consumedCalories, consumedProtein, consumedCarbs, consumedWater });
        }
    } catch (error) {
        console.error('❌ Error loading dashboard summary:', error);
    }
}

// Load user profile on page load
window.addEventListener('load', () => {
    // Load user data
    loadUserProfile();
    
    // Load dashboard summary
    loadDashboardSummary();
    
    // Animate progress bars
    const progressBars = document.querySelectorAll('.summary-progress-bar');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
});

// Update greeting based on time
function updateGreeting() {
    const hour = new Date().getHours();
    const heroTitle = document.getElementById('welcomeMessage');
    let greeting = 'Welcome to your dashboard';
    if (hour < 12) greeting = 'Good morning';
    else if (hour < 18) greeting = 'Good afternoon';
    else greeting = 'Good evening';
    
    if (heroTitle.textContent.includes('Welcome to your dashboard')) {
        heroTitle.textContent = `${greeting}, Ravi! 👋`;
    }
}

updateGreeting();

// Simulate real-time data updates
setInterval(() => {
    const waterValue = document.querySelectorAll('.summary-value')[3];
    if (waterValue && Math.random() > 0.98) {
        let current = parseInt(waterValue.textContent);
        if (current < 8) {
            waterValue.textContent = current + 1;
            const progressBar = document.querySelectorAll('.summary-progress-bar')[3];
            progressBar.style.width = ((current + 1) / 8 * 100) + '%';
            
            // Show notification
            showToast('💧 Great! You drank a glass of water. ' + (8 - current - 1) + ' more to go!');
        }
    }
}, 10000);

// Toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: #16a34a;
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Card action links
const cardActions = document.querySelectorAll('.card-action');
cardActions.forEach(action => {
    action.addEventListener('click', (e) => {
        e.preventDefault();
        const cardTitle = action.parentElement.querySelector('.card-title').textContent;
        console.log('View more:', cardTitle);
    });
});

// Reminder items - checkboxes handle the interaction now

// Device items
const deviceItems = document.querySelectorAll('.device-item');
deviceItems.forEach(item => {
    item.addEventListener('click', () => {
        const deviceName = item.querySelector('.device-name').textContent;
        alert(`${deviceName}\n\nStatus: Connected ✓\nLast sync: 2 minutes ago\nBattery: 85%\n\nOptions:\n• 🔄 Sync Now\n• 📊 View Sync History\n• ⚙️ Device Settings\n• 🔌 Disconnect Device`);
    });
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

console.log('🌿 NutriWise360 App loaded successfully!');
console.log('Welcome to your personalized nutrition dashboard!');

// Profile Button
document.getElementById('profileBtn').addEventListener('click', () => {
    const action = confirm('👤 Profile Menu\n\nWould you like to logout?\n\nClick OK to logout or Cancel to stay.');
    if (action) {
        handleLogout();
    }
});

// Logout function
async function handleLogout() {
    try {
        const response = await fetch('/api/logout', { method: 'POST' });
        if (response.ok) {
            showToast('✓ Logged out successfully!');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 500);
        }
    } catch (error) {
        console.error('Logout error:', error);
        window.location.href = 'login.html';
    }
}

// Initialize Navigation System
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    console.log('Setting up navigation with', navLinks.length, 'links');
    
    if (navLinks.length === 0) {
        console.error('ERROR: No navigation links found!');
        return;
    }
    
    navLinks.forEach((link) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.dataset.section;
            console.log('Clicked:', section);
            navigateToSection(section);
        });
    });
    
    console.log('✅ Navigation ready!');
}

// Initialize when ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupNavigation);
} else {
    setupNavigation();
}

// Test function
window.testNav = (section) => navigateToSection(section || 'food-logging');
