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

          ,"http://dev2.indisystem.co.kr:7903/en/html/index.do"
          ,"http://dev2.indisystem.co.kr:7903/en/html/satellite/viewer/index.do"
          ,"http://dev2.indisystem.co.kr:7903/en/html/satellite/gis/index.do"
          ,"http://dev2.indisystem.co.kr:7903/en/html/datasvc/index.do"
          ,"http://dev2.indisystem.co.kr:7903/en/html/svc/openapi/explain.do"
          ,"http://dev2.indisystem.co.kr:7903/en/html/svc/openapi/insert.do"
          ,"http://dev2.indisystem.co.kr:7903/en/html/svc/openapi/createURL.do"
          ,"http://dev2.indisystem.co.kr:7903/en/html/satellite/program/introduce.do"
          ,"http://dev2.indisystem.co.kr:7903/en/html/satellite/program/introduce.do"
          ,"http://dev2.indisystem.co.kr:7903/en/html/cmmn/cntnts/25/satellite/introduction.do"
          ,"http://dev2.indisystem.co.kr:7903/en/html/cntnts/59/outputs/overview.do"
          ,"http://dev2.indisystem.co.kr:7903/en/html/satellite/operation.do"
          ,"http://dev2.indisystem.co.kr:7903/en/html/board/bbs/24/list.do"
          ,"http://dev2.indisystem.co.kr:7903/en/html/board/bbs/23/list.do"
          ,"http://dev2.indisystem.co.kr:7903/en/html/board/gallery/22/list.do"
          ,"http://dev2.indisystem.co.kr:7903/en/html/board/bbs/28/list.do"
          ,"http://dev2.indisystem.co.kr:7903/en/html/mtg/workshop.do"
          ,"http://dev2.indisystem.co.kr:7903/en/html/cmmn/cntnts/16/introduction/greeting.do"
          ,"http://dev2.indisystem.co.kr:7903/en/html/introduction/hist.do"
          ,"http://dev2.indisystem.co.kr:7903/en/html/cmmn/cntnts/17/introduction/vision.do"
          ,"http://dev2.indisystem.co.kr:7903/en/html/introduction/orgnzt.do"
          ,"http://dev2.indisystem.co.kr:7903/en/html/cmmn/cntnts/18/introduction/business.do"
          ,"http://dev2.indisystem.co.kr:7903/en/html/cmmn/cntnts/19/introduction/business.do"
          ,"http://dev2.indisystem.co.kr:7903/en/html/cmmn/cntnts/20/introduction/business.do"
          ,"http://dev2.indisystem.co.kr:7903/en/html/cmmn/cntnts/21/introduction/business.do"
          ,"http://dev2.indisystem.co.kr:7903/en/html/introduction/location.do"
        ],
        numberOfRuns: 1,

        settings: {
          preset: 'desktop', // 모바일 에뮬레이션 해제
          emulatedUserAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          chromeFlags: '--no-sandbox --headless=new --disable-gpu',
          locale: 'ko', // ← 한국어 보고서 출력 설정
          maxWaitForLoad: 10000,       // 최대 10초까지 로딩 대기
          pauseAfterLoadMs: 5000,      // 페이지 로드 완료 후 5초간 추가 대기
          skipAudits: [ //검사 제외 ID
            'is-on-https',             // HTTPS 사용 검사 제외 (내부 개발망/HTTP 환경일 때 필수)
            'redirects-http',          // HTTP -> HTTPS 리다이렉트 검사 제외
            'uses-http2',              // HTTP/2 사용 검사 제외           
            'valid-source-maps'        // 소스맵 검사 제외
            ,'layout-shifts' //대규모 레이아웃 변경 피하기
            ,'uses-text-compression' //텍스트 압축 사용
            ,'unused-css-rules' //사용하지 않는 CSS 줄이기
            ,'unused-javascript' //사용하지 않는 자바스크립트 줄이기
            ,'modern-image-formats' //차세대 형식을 사용해 이미지 제공하기
            ,'uses-long-cache-ttl' //효율적인 캐시 정책을 사용하여 정적인 애셋 제공하기
            ,'dom-size' //과도한 DOM 크기 지양하기
            ,'mainthread-work-breakdown' //기본 스레드 작업 최소화하기
            ,'unminified-javascript' //자바스크립트 줄이기
            ,'uses-optimized-images' //효율적으로 이미지 인코딩하기
            ,'redirects' //여러 차례의 페이지 리디렉션 피하기
            ,'largest-contentful-paint-element' //콘텐츠가 포함된 최대 페인트 요소
            ,'render-blocking-resources' //렌더링 차단 리소스 제거하기
          ],
        },
      },
      upload: {
        target: 'filesystem',
        outputDir: './reports/lighthouse',
      },
    },
  };
