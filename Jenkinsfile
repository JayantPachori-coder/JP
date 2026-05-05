pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Deploy Containers') {
            steps {
                bat '''
                echo Restarting containers (clean + fast)...

                docker compose down --remove-orphans || exit 0
                docker compose up -d || exit 1
                '''
            }
        }

        stage('Wait for Services') {
            steps {
                // Fast wait (~8 seconds)
                bat 'timeout /t 8 > nul'
            }
        }

        stage('Health Check') {
            steps {
                bat '''
                echo Checking Backend...
                curl -f http://localhost:5000 || exit 1

                echo Checking Frontend...
                curl http://localhost:3000 || exit 1
                '''
            }
        }

        stage('Verify Containers') {
            steps {
                bat 'docker ps'
            }
        }
    }

    post {
        success {
            echo '✅ Fast deployment successful (no rebuild, no port issues)!'
        }

        failure {
            echo '❌ Pipeline failed. Showing logs...'

            bat 'docker logs jp-frontend-1 || exit 0'
            bat 'docker logs jp-backend-1 || exit 0'
        }
    }
}