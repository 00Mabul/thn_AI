const video = document.getElementById('video');
const partNumberInput = document.getElementById('partNumber');
const result = document.getElementById('result');

// Request access to the camera
navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        video.srcObject = stream;
    })
    .catch((err) => {
        console.error("Error accessing camera: ", err);
    });

function scanFrame() {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas;
}

function processFrame() {
    const canvas = scanFrame();
    Tesseract.recognize(canvas, 'eng', { logger: (m) => console.log(m) })
        .then(({ data: { text } }) => {
            const cleanedText = text.replace(/\s/g, '').toUpperCase(); // Remove whitespace and uppercase
            const partNumber = partNumberInput.value.replace(/\s/g, '').toUpperCase();
            if (cleanedText.includes(partNumber) && partNumber) {
                result.textContent = "Part Number Found!";
                result.className = "match";
            } else {
                result.textContent = "Searching...";
                result.className = "";
            }
        })
        .catch((err) => {
            console.error("Error processing frame: ", err);
        });
}

// Continuously scan the video feed
setInterval(processFrame, 1000);
