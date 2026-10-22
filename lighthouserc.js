module.exports = {
    ci: {
      collect: {
        url: [
          "http://dev2.indisystem.co.kr:7903/",
          "http://dev2.indisystem.co.kr:7903/ko/html/satellite/viewer/index.do",
          "http://dev2.indisystem.co.kr:7903/ko/html/satellite/gis/index.do",
          "http://dev2.indisystem.co.kr:7903/ko/html/satellite/gis/geo_orb.do",
          "http://dev2.indisystem.co.kr:7903/ko/html/datasvc/index.do",
          "http://dev2.indisystem.co.kr:7903/ko/html/svc/openapi/explain.do",
          "http://dev2.indisystem.co.kr:7903/ko/html/svc/openapi/insert.do",
          "http://dev2.indisystem.co.kr:7903/ko/html/svc/openapi/createURL.do",
          "http://dev2.indisystem.co.kr:7903/ko/html/svc/openapi/status.do",
          "http://dev2.indisystem.co.kr:7903/ko/html/svc/pandora/index.do",
          "http://dev2.indisystem.co.kr:7903/ko/html/satellite/program/introduce.do",
          "http://dev2.indisystem.co.kr:7903/ko/html/cntnts/1/satellite/introduction.do",
          "http://dev2.indisystem.co.kr:7903/ko/html/cntnts/21/satellite/payload.do",
          "http://dev2.indisystem.co.kr:7903/ko/html/cntnts/24/outputs/overview.do",
          "http://dev2.indisystem.co.kr:7903/ko/html/satellite/operation.do",
          "http://dev2.indisystem.co.kr:7903/ko/html/board/research/research.do",
          "http://dev2.indisystem.co.kr:7903/ko/html/board/bbs/24/list.do",
          "http://dev2.indisystem.co.kr:7903/ko/html/board/bbs/24/list.do",
          "http://dev2.indisystem.co.kr:7903/ko/html/board/gallery/22/list.do?bbsCtgryInnb=32",
          "http://dev2.indisystem.co.kr:7903/ko/html/board/bbs/28/list.do",
          "http://dev2.indisystem.co.kr:7903/ko/html/qustnr/list.do",
          "http://dev2.indisystem.co.kr:7903/ko/html/board/qna/29/list.do",
          "http://dev2.indisystem.co.kr:7903/ko/html/cntnts/19/introduction/greeting.do",
          "http://dev2.indisystem.co.kr:7903/ko/html/introduction/hist.do",
          "http://dev2.indisystem.co.kr:7903/ko/html/cntnts/8/introduction/vision.do",
          "http://dev2.indisystem.co.kr:7903/ko/html/introduction/orgnzt.do",
          "http://dev2.indisystem.co.kr:7903/ko/html/cntnts/89/introduction/identity.do",
          "http://dev2.indisystem.co.kr:7903/ko/html/cntnts/106/introduction/business.do",
          "http://dev2.indisystem.co.kr:7903/ko/html/cntnts/95/introduction/business.do",
          "http://dev2.indisystem.co.kr:7903/ko/html/cntnts/104/introduction/business.do",
          "http://dev2.indisystem.co.kr:7903/ko/html/cntnts/105/introduction/business.do",
          "http://dev2.indisystem.co.kr:7903/ko/html/introduction/location.do"
        ],
        numberOfRuns: 1,

        settings: {
          preset: 'desktop', // 모바일 에뮬레이션 해제
          emulatedUserAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          chromeFlags: '--no-sandbox --headless=new --disable-gpu',
          locale: 'ko', // ← 한국어 보고서 출력 설정
          maxWaitForLoad: 10000,       // 최대 10초까지 로딩 대기
          pauseAfterLoadMs: 5000,      // 페이지 로드 완료 후 5초간 추가 대기
        },
      },
      upload: {
        target: 'filesystem',
        outputDir: './reports/lighthouse',
      },
    },
  };
