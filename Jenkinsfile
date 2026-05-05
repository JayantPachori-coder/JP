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
                echo Stopping old containers...
                docker compose down || exit 0

                echo Rebuilding and starting containers...
                docker compose up --build -d
                '''
            }
        }

        stage('Wait for Services') {
            steps {
                // Wait ~10 seconds for services to boot
                bat 'timeout /t 10 > nul'
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
            echo '✅ MERN App is running successfully!'
        }

        failure {
            echo '❌ Pipeline failed. Showing logs...'

            bat 'docker logs client-1 || exit 0'
            bat 'docker logs server-1 || exit 0'
        }
    }
}