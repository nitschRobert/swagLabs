pipeline {
    agent any
    tools { nodejs 'Node' }  // Nazwa z konfiguracji
    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Install deps') {
            steps { sh 'npm ci' }
        }
        stage('Install browsers') {
            steps { sh 'npx playwright install --with-deps chromium' }
        }
        stage('Run tests') {
            steps { sh 'npx playwright test --project=functional' }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**, test-results/**', allowEmptyArchive: true
            junit 'test-results/*.xml'
            publishHTML([allowMissing: false, alwaysLinkToLastBuild: true, keepAll: true, reportDir: 'playwright-report', reportFiles: 'index.html', reportName: 'Playwright Report'])
        }
    }
}
