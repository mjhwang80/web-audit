# 웹접근성  테스트

## 디렉터리 구조
``` Plaintext
web-audit/
├── .github/
│   └── workflows/
│       └── audit.yml          # ← 질문하신 YAML 파일이 들어가는 위치
├── .pa11yci                   # Pa11y 접근성 검사 대상 및 규칙 설정
├── lighthouserc.js            # Lighthouse CI 점검 URL 및 리포트 저장 설정
├── package.json               # 프로젝트 정보 및 실행 스크립트 정의
└── .gitignore                 # 생성된 리포트와 node_modules 제외 설
```

## 초기 셋팅
### 디렉터리 생성
``` Bash
mkdir web-audit && cd web-audit
```
### npm 초기화
``` Bash
npm init -y
npm install -g @lhci/cli pa11y-ci html-validate
```
### lighthouserc.js 생성
``` JavaScript
module.exports = {
  ci: {
    collect: {
      url: ['https://example.com/'], // 실제 점검할 사이트 URL
      numberOfRuns: 1,
    },
    upload: {
      target: 'filesystem',
      outputDir: './reports/lighthouse',
      reportFilenamePattern: '%%DATETIME%%-report.%%EXTENSION%%',
    },
  },
};
```

### .pa11yci 생성
``` JSON
{
  "defaults": {
    "standard": "WCAG2AA",
    "runners": ["axe", "htmlcs"]
  },
  "urls": [
    "https://example.com/"
  ]
}
```

### GitHub Actions 워크플로 파일 생성
.github/workflows 디렉터리를 만들고 질문하신 YAML 내용을 저장   
``` bash
mkdir -p .github/workflows
```

.github/workflows/audit.yml 파일 생성:  
``` YAML
name: Web Standards Audit

on: [push, pull_request]

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install Dependencies
        run: |
          npm install -g @lhci/cli pa11y-ci pa11y-reporter-html

      - name: Run Audits
        run: |
          mkdir -p reports/lighthouse
          lhci autorun || true
          pa11y-ci --reporter pa11y-reporter-html > reports/pa11y-report.html || true

      - name: Upload Audit Reports
        uses: actions/upload-artifact@v4
        with:
          name: audit-reports
          path: reports/

```
### .gitignore 생성
``` Plaintext
node_modules/
reports/
.lighthouseci/
```

### Git 커밋 및 GitHub 푸시
``` Bash
git init
git add .
git commit -m "feat: add web standards audit workflow"
git branch -M main
git remote add origin https://github.com/사용자명/저장소명.git
git push -u origin main
```
