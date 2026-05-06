pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Clean Old Containers') {
            steps {
                bat '''
                echo Stopping and removing old containers...
                docker compose down --volumes --remove-orphans || exit 0
                '''
            }
        }

        stage('Build Images (FULL REBUILD)') {
            steps {
                bat '''
                echo Building fresh Docker images (NO CACHE)...

                docker compose build --no-cache || exit 1
                '''
            }
        }

        stage('Start Containers') {
            steps {
                bat '''
                echo Starting fresh containers...

                docker compose up -d --force-recreate || exit 1
                '''
            }
        }

        stage('Wait for Startup') {
            steps {
                bat '''
                echo Waiting for services to initialize...
                timeout /t 20 /nobreak
                '''
            }
        }

        stage('Health Check') {
            steps {
                bat '''
                echo Checking Backend...
                powershell -Command "try { Invoke-WebRequest http://localhost:5000 -UseBasicParsing } catch { exit 1 }"

                echo Checking Frontend...
                powershell -Command "try { Invoke-WebRequest http://localhost:3000 -UseBasicParsing } catch { exit 1 }"
                '''
            }
        }

        stage('Show Running Containers') {
            steps {
                bat 'docker ps'
            }
        }
    }

    post {
        success {
            echo '✅ FULL REBUILD DEPLOYMENT SUCCESS (READY FOR DEMO)'
        }

        failure {
            echo '❌ Build Failed - Showing Logs'

            bat 'docker logs jp-backend-1 || exit 0'
            bat 'docker logs jp-frontend-1 || exit 0'
        }
    }
}