pipeline {
    agent any
    tools { nodejs 'Node' }
    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Install deps') {
            steps {
                bat 'npm ci'
            }
        }
        stage('Install browsers') {
            steps {
                bat 'npx playwright install --with-deps'
            }
        }
        stage('Run tests') {
            steps {
                bat 'npx playwright test'
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**, test-results/**', allowEmptyArchive: true
            junit 'test-results/**/*.xml'
            publishHTML([allowMissing: false, reportDir: 'playwright-report', reportFiles: 'index.html', reportName: 'Playwright Report'])
        }
    }
}
