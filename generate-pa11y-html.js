const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const reportDir = path.join(process.cwd(), 'reports');
fs.mkdirSync(reportDir, { recursive: true });

const htmlPath = path.join(reportDir, 'pa11y-report.html');
const jsonPath = path.join(reportDir, 'pa11y-raw.json');

console.log('🚀 pa11y-ci 웹 접근성 검사를 시작합니다...');

let stdout = '';
try {
  // maxBuffer를 충분히 크게 주어 대용량 JSON이 잘리지 않도록 실행
  stdout = execSync('npx pa11y-ci --json', {
    encoding: 'utf8',
    maxBuffer: 50 * 1024 * 1024,
    stdio: ['pipe', 'pipe', 'ignore'], // stderr는 무시하고 순수 stdout만 캡처
  });
} catch (error) {
  // pa11y-ci는 접근성 위반(오류)이 있으면 프로세스 종료 코드 2를 던지므로 error.stdout에서 출력을 가져옵니다.
  stdout = error.stdout ? error.stdout.toString() : '';
}

if (!stdout) {
  console.error('❌ pa11y-ci 실행 결과를 가져오지 못했습니다.');
  process.exit(1);
}

// 순수 JSON 시작/끝 위치 추출
const firstBrace = stdout.indexOf('{');
const lastBrace = stdout.lastIndexOf('}');

if (firstBrace === -1 || lastBrace === -1) {
  console.error('❌ 유효한 JSON을 찾지 못했습니다.');
  console.log(stdout.slice(0, 500));
  process.exit(1);
}

const cleanJson = stdout.substring(firstBrace, lastBrace + 1);

// 백업용 JSON 저장
fs.writeFileSync(jsonPath, cleanJson, 'utf8');

let data;
try {
  data = JSON.parse(cleanJson);
} catch (e) {
  console.error('❌ JSON 파싱 실패:', e.message);
  // 디버깅용으로 오류 위치 근처 200자 출력
  const pos = parseInt(e.message.match(/position (\d+)/)?.[1] || 0);
  console.error('오류 발생 부근 텍스트:\n', cleanJson.substring(Math.max(0, pos - 100), pos + 100));
  process.exit(1);
}

// HTML 리포트 생성 로직
let totalErrors = 0;
let totalWarnings = 0;
let totalNotices = 0;
let tableRows = '';
let detailSections = '';

const results = data.results || {};
const urls = Object.keys(results);

urls.forEach((url, idx) => {
  const issues = results[url] || [];
  const errors = issues.filter(i => i.type === 'error').length;
  const warnings = issues.filter(i => i.type === 'warning').length;
  const notices = issues.filter(i => i.type === 'notice').length;

  totalErrors += errors;
  totalWarnings += warnings;
  totalNotices += notices;

  const statusBadge = errors === 0 
    ? '<span style="color:#0cce6b; font-weight:bold;">통과 (Pass)</span>' 
    : `<span style="color:#ff4e42; font-weight:bold;">오류 ${errors}건</span>`;

  tableRows += `
    <tr>
      <td style="padding:10px; border:1px solid #ddd; text-align:left;">
        <a href="#page-${idx}" style="color:#1a73e8; text-decoration:none;">${escapeHtml(url)}</a>
      </td>
      <td style="padding:10px; border:1px solid #ddd; text-align:center;">${statusBadge}</td>
      <td style="padding:10px; border:1px solid #ddd; text-align:center; color:#ff4e42; font-weight:bold;">${errors}</td>
      <td style="padding:10px; border:1px solid #ddd; text-align:center; color:#ffa400;">${warnings}</td>
      <td style="padding:10px; border:1px solid #ddd; text-align:center; color:#5f6368;">${notices}</td>
    </tr>
  `;

  let issueItems = '';
  if (issues.length === 0) {
    issueItems = '<p style="color:#0cce6b;">발견된 접근성 결함이 없습니다.</p>';
  } else {
    issues.forEach(issue => {
      // issue.type이 없거나 null일 경우 'error'를 기본값으로 처리
      const issueType = (issue.type || 'error').toLowerCase();
      const tagColor = issueType === 'error' ? '#ff4e42' : issueType === 'warning' ? '#ffa400' : '#5f6368';
      const typeLabel = issueType.toUpperCase();
    
      issueItems += `
        <div style="margin-bottom:12px; padding:12px; background:#f8f9fa; border-left:4px solid ${tagColor}; border-radius:4px;">
          <div style="font-weight:bold; font-size:14px; margin-bottom:4px;">
            <span style="background:${tagColor}; color:#fff; padding:2px 6px; border-radius:3px; font-size:12px;">${typeLabel}</span>
            ${escapeHtml(issue.message || '알 수 없는 오류가 발생했습니다.')}
          </div>
          <div style="font-size:12px; color:#555; margin-bottom:4px;"><strong>표준 규칙:</strong> ${escapeHtml(issue.code || '-')}</div>
          <div style="font-size:12px; color:#333; background:#fff; padding:6px; border:1px solid #eee; word-break:break-all;"><strong>대상 셀렉터:</strong> <code>${escapeHtml(issue.selector || '-')}</code></div>
          ${issue.context ? `<pre style="font-size:11px; background:#202124; color:#fff; padding:8px; border-radius:4px; overflow-x:auto;">${escapeHtml(issue.context)}</pre>` : ''}
        </div>
      `;
    });
  }

  detailSections += `
    <div id="page-${idx}" style="margin-top:32px; padding:20px; background:#fff; border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
      <h3 style="margin-top:0; font-size:16px; word-break:break-all; border-bottom:1px solid #eee; padding-bottom:8px;">${escapeHtml(url)}</h3>
      ${issueItems}
    </div>
  `;
});

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const htmlTemplate = `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>웹 접근성(Pa11y) 전체 점검 종합 보고서</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 24px; background: #f9f9fb; color: #202124; }
    .summary-box { display: flex; gap: 16px; margin-bottom: 24px; }
    .card { flex: 1; background: #fff; padding: 16px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); text-align: center; }
    .card h4 { margin: 0 0 8px; font-size: 14px; color: #5f6368; }
    .card .num { font-size: 24px; font-weight: bold; }
    table { width: 100%; border-collapse: collapse; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden; }
    th { background: #202124; color: #fff; padding: 10px; border: 1px solid #3c4043; font-size: 13px; }
    td { font-size: 13px; }
  </style>
</head>
<body>
  <h2>웹 접근성(WCAG 2.1 AA) 종합 점검 보고서</h2>
  
  <div class="summary-box">
    <div class="card"><h4>점검 페이지 수</h4><div class="num">${urls.length}개</div></div>
    <div class="card"><h4>오류 (Errors)</h4><div class="num" style="color:#ff4e42;">${totalErrors}</div></div>
    <div class="card"><h4>경고 (Warnings)</h4><div class="num" style="color:#ffa400;">${totalWarnings}</div></div>
    <div class="card"><h4>수동 확인 (Notices)</h4><div class="num" style="color:#5f6368;">${totalNotices}</div></div>
  </div>

  <h3>페이지별 요약</h3>
  <table>
    <thead>
      <tr>
        <th>점검 URL</th>
        <th width="120">결과 상태</th>
        <th width="80">오류</th>
        <th width="80">경고</th>
        <th width="80">알림</th>
      </tr>
    </thead>
    <tbody>
      ${tableRows}
    </tbody>
  </table>

  <h3>상세 결함 내역</h3>
  ${detailSections}
</body>
</html>
`;

fs.writeFileSync(htmlPath, htmlTemplate, 'utf8');
console.log(`✅ 접근성 점검 완료! 종합 HTML 보고서가 생성되었습니다: ${htmlPath}`);