module.exports = {
    ci: {
      collect: {
        url: ['http://dev2.indisystem.co.kr:7903/ko/html/index.do'],
        numberOfRuns: 1,
      },
      upload: {
        target: 'filesystem',
        outputDir: './reports/lighthouse',
        reportFilenamePattern: '%%DATETIME%%-report.%%EXTENSION%%'
      },
    },
  };
