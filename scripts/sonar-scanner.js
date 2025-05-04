import dotenv from 'dotenv';
import process from 'node:process';
import { scan } from 'sonarqube-scanner';

dotenv.config();
const sonarToken = process.env.SONAR_TOKEN;

await scan(
  {
    login: sonarToken,
    options: {
      'sonar.exclusions':
        'node_modules/**,.extras/**,.scannerwork/*,.vscode/*,coverage/**,dist/*,log/*',
      'sonar.javascript.environments': 'node',
      'sonar.javascript.file.suffixes': '.js,.jsx',
      'sonar.javascript.lcov.reportPaths': './coverage/lcov.info',
      'sonar.lang.patterns.js': '**/*.js,**/*.jsx',
      'sonar.lang.patterns.ts': '**/*.ts,**/*.tsx',
      'sonar.projectDescription': 'A template for Next.js projects',
      'sonar.projectKey': 'nextjs-template',
      'sonar.projectName': 'nextjs-template',
      'sonar.projectVersion': '2024.04.0',
      'sonar.scm.disabled': 'true',
      'sonar.sources': 'src',
      'sonar.tests': 'tests',
      'sonar.token': sonarToken,
      'sonar.typescript.file.suffixes': '.ts,.tsx',
    },
    serverUrl: 'http://localhost:9000',
    token: sonarToken,
  },
  () => {
    throw new Error('SonarQube scan failed');
  },
);
