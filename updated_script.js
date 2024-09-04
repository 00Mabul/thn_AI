// script.js

// 부품 번호 예시 데이터
const partNumbers = [
    'P91100-P9470',
    'P91850-DU010',
    'P91234-P5678'
];

async function checkPartNumbers() {
    const part1 = document.getElementById('part1').value;
    const part2 = document.getElementById('part2').value;
    const resultDiv = document.getElementById('result');

    // 예시 데이터에서 일치하는 부품 번호 찾기
    const matches = partNumbers.filter(partNumber =>
        partNumber.includes(part1) && partNumber.includes(part2)
    );

    if (matches.length > 0) {
        resultDiv.textContent = '확인: 일치하는 부품 번호가 있습니다.';
    } else {
        resultDiv.textContent = '일치하는 부품 번호가 없습니다.';
    }
}
