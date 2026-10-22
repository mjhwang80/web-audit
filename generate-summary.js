const fs = require('fs');
const path = require('path');

// 1. manifest.json이 위치할 수 있는 후보 경로 목록
const possiblePaths = [
  path.join(process.cwd(), '.lighthouseci', 'manifest.json'),
  path.join(process.cwd(), 'reports', 'lighthouse', 'manifest.json'),
  path.join(process.cwd(), 'reports', 'manifest.json')
];

// 2. 존재하는 첫 번째 manifest.json 선택
const manifestPath = possiblePaths.find(p => fs.existsSync(p));

if (!manifestPath) {
  console.error('❌ Lighthouse 결과 매니페스트(manifest.json)를 찾을 수 없습니다.');
  console.error('탐색한 경로:\n' + possiblePaths.map(p => ` - ${p}`).join('\n'));
  process.exit(1);
}

console.log(`📄 매니페스트 파일 발견: ${manifestPath}`);
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

// 3. HTML 생성 로직
let rows = '';
manifest.forEach(entry => {
  const summary = entry.summary;
  const toScore = val => (val != null ? Math.round(val * 100) : '-');
  const color = score => {
    if (typeof score !== 'number') return '#666';
    return score >= 90 ? '#0cce6b' : score >= 50 ? '#ffa400' : '#ff4e42';
  };

  const perf = toScore(summary.performance);
  const a11y = toScore(summary.accessibility);
  const bp = toScore(summary['best-practices']);
  const seo = toScore(summary.seo);

  const reportFileName = path.basename(entry.htmlPath);

  rows += `
    <tr>
      <td style="padding:10px; border:1px solid #ddd; text-align:left;">
        <a href="./${reportFileName}" target="_blank" style="color:#1a73e8; text-decoration:none; font-weight:500;">
          ${entry.url}
        </a>
      </td>
      <td style="padding:10px; border:1px solid #ddd; font-weight:bold; color:${color(perf)}">${perf}</td>
      <td style="padding:10px; border:1px solid #ddd; font-weight:bold; color:${color(a11y)}">${a11y}</td>
      <td style="padding:10px; border:1px solid #ddd; font-weight:bold; color:${color(bp)}">${bp}</td>
      <td style="padding:10px; border:1px solid #ddd; font-weight:bold; color:${color(seo)}">${seo}</td>
    </tr>
  `;
});

const htmlContent = `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>Lighthouse 종합 품질 요약 보고서</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 24px; background: #f9f9fb; }
    h1 { color: #202124; font-size: 22px; }
    table { width: 100%; border-collapse: collapse; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden; }
    th { background: #202124; color: #fff; padding: 12px 10px; border: 1px solid #3c4043; font-weight: 500; font-size: 14px; }
    td { text-align: center; font-size: 14px; }
  </style>
</head>
<body>
  <h1>웹사이트 품질 점검 종합 요약</h1>
  <table>
    <thead>
      <tr>
        <th>점검 대상 URL (클릭 시 개별 상세 보고서 이동)</th>
        <th>성능</th>
        <th>접근성</th>
        <th>웹 표준</th>
        <th>SEO</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>
</body>
</html>
`;

// 4. manifest가 위치한 폴더와 동일한 곳에 summary.html 저장
const outputDir = path.dirname(manifestPath);
fs.writeFileSync(path.join(outputDir, 'summary.html'), htmlContent, 'utf8');

console.log(`✅ 종합 요약 보고서가 생성되었습니다: ${path.join(outputDir, 'summary.html')}`);