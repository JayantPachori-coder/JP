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
                echo Restarting containers (no rebuild)...

                docker compose stop || exit 0
                docker compose up -d || exit 1
                '''
            }
        }

        stage('Wait for Services') {
            steps {
                // ~8–10 sec wait (fast demo)
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
            echo '✅ Fast deployment successful (no rebuild)!'
        }

        failure {
            echo '❌ Pipeline failed. Showing logs...'
            bat 'docker logs frontend-1 || exit 0'
            bat 'docker logs backend-1 || exit 0'
        }
    }
}