const fs = require('fs');
const path = require('path');

// Lighthouse 결과 보고서가 모여 있는 폴더
const reportsDir = path.join(process.cwd(), 'reports', 'lighthouse');

if (!fs.existsSync(reportsDir)) {
  console.error('❌ 보고서 폴더를 찾을 수 없습니다: ' + reportsDir);
  process.exit(1);
}

// 폴더 내 모든 개별 .html 파일 탐색 (summary.html 제외)
const htmlFiles = fs.readdirSync(reportsDir).filter(file => file.endsWith('.html') && file !== 'summary.html');

if (htmlFiles.length === 0) {
  console.log('⚠️ 주입할 개별 HTML 보고서 파일이 없습니다.');
  process.exit(0);
}

// 각 HTML 페이지 하단에 실행될 브라우저 주입용 스크립트 & 스타일
const injectionScript = `
<style>
  .lh-audit__id-badge {
    display: inline-block !important;
    background-color: #e8f0fe !important;
    color: #1a73e8 !important;
    border: 1px solid #d2e3fc !important;
    font-family: monospace !important;
    font-size: 11px !important;
    padding: 1px 6px !important;
    border-radius: 4px !important;
    margin-left: 8px !important;
    font-weight: 600 !important;
    letter-spacing: 0 !important;
    vertical-align: middle !important;
    user-select: all !important;
  }
  .lh-audit--fail .lh-audit__id-badge {
    background-color: #fce8e6 !important;
    color: #c5221f !important;
    border-color: #fad2cf !important;
  }
</style>
<script>
  window.addEventListener('DOMContentLoaded', () => {
    // Lighthouse DOM 요소 렌더링 완료 대기
    setTimeout(() => {
      const audits = document.querySelectorAll('.lh-audit');
      audits.forEach(audit => {
        // 요소의 id 또는 클래스에서 audit id 추출
        const auditId = audit.id || audit.getAttribute('data-audit-id');
        if (!auditId) return;

        const titleEl = audit.querySelector('.lh-audit__title');
        if (titleEl && !titleEl.querySelector('.lh-audit__id-badge')) {
          const badge = document.createElement('span');
          badge.className = 'lh-audit__id-badge';
          badge.textContent = auditId;
          badge.title = 'skipAudits에 사용할 ID (클릭하여 복사 가능)';
          titleEl.appendChild(badge);
        }
      });
    }, 500);
  });
</script>
`;

// 파일별로 코드 주입
htmlFiles.forEach(file => {
  const filePath = path.join(reportsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // 중복 주입 방지
  if (!content.includes('lh-audit__id-badge')) {
    content = content.replace('</body>', `${injectionScript}</body>`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Audit ID 주입 완료: ${file}`);
  }
});

console.log('🎉 모든 개별 보고서에 Audit ID 배지가 적용되었습니다.');