// script.js

async function openCamera() {
    const constraints = { video: { facingMode: "environment" } };
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        const video = document.createElement('video');
        video.srcObject = stream;
        video.autoplay = true;
        video.style.display = 'none';
        document.body.appendChild(video);

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        document.body.appendChild(canvas);

        video.addEventListener('canplay', function() {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            video.srcObject.getTracks().forEach(track => track.stop()); // 카메라 끄기

            // Tesseract.js를 사용하여 이미지에서 텍스트 추출
            Tesseract.recognize(
                canvas.toDataURL('image/png'),
                'eng',
                { logger: info => console.log(info) } // 진행 상황을 콘솔에 로그
            ).then(({ data: { text } }) => {
                checkPartNumbers(text);
            }).catch(err => {
                console.error(err);
                document.getElementById('result').textContent = 'OCR 처리 중 오류 발생';
            });
        });
    } catch (error) {
        console.error(error);
        document.getElementById('result').textContent = '카메라 접근 오류';
    }
}

// 부품 번호 예시 데이터
const partNumbers = [
    'P91100-P9470',
    'P91850-DU010',
    'P91234-P5678'
];

function checkPartNumbers(text) {
    const part1 = document.getElementById('part1').value;
    const part2 = document.getElementById('part2').value;
    const resultDiv = document.getElementById('result');

    // 텍스트와 입력된 부품 번호 비교
    const matches = partNumbers.filter(partNumber =>
        partNumber.includes(part1) && partNumber.includes(part2)
    );

    if (matches.length > 0 && text.includes(part1) && text.includes(part2)) {
        resultDiv.textContent = '확인: 일치하는 부품 번호가 있습니다.';
    } else {
        resultDiv.textContent = '일치하는 부품 번호가 없습니다.';
    }
}


