pipeline {
    agent any
    tools { nodejs 'Node' }
    stages {
        stage('Checkout') { steps { checkout scm } }
        stage('Install deps') { steps { bat 'npm ci' } }
        stage('Install browsers') { 
            steps { bat 'npx playwright install --with-deps chromium' } 
        }
        stage('Run tests') { 
            steps { bat 'npx playwright test --project=functional' } 
        }
    }
    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**, test-results/**', allowEmptyArchive: true
            // Tylko JUnit (działa)
            script {
                if (fileExists('test-results/**/*.xml')) {
                    junit 'test-results/**/*.xml'
                }
            }
            // publishHTML usunięte - wymaga pluginu
            echo '✅ Testy zakończone. Sprawdź playwright-report w Artifacts.'
        }
    }
}
