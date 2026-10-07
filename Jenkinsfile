pipeline {
    agent any

    tools {
        // Name must match a NodeJS installation configured in
        // Manage Jenkins -> Tools -> NodeJS installations
        nodejs 'NodeJS_18'
    }

    environment {
        IMAGE_NAME = 'pixelarena-gaming-website'
        IMAGE_TAG  = "${env.BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies...'
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running Jest test suite...'
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying container locally on port 3001...'
                sh """
                    docker stop ${IMAGE_NAME} || true
                    docker rm ${IMAGE_NAME} || true
                    docker run -d --name ${IMAGE_NAME} -p 3001:3001 ${IMAGE_NAME}:${IMAGE_TAG}
                """
            }
        }
    }

    post {
        success {
            echo 'Pipeline finished successfully! App is running on http://localhost:3001'
        }
        failure {
            echo 'Pipeline failed. Check the console output above for errors.'
        }
        always {
            echo 'Cleaning workspace...'
            cleanWs()
        }
    }
}
