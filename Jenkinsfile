pipeline {
    agent any

    environment {
        //Docker Hub username.
       
        IMAGE_NAME = "kleaven-blog-app"
    }

    stages {
        stage('Install Dependencies') {
            steps {
                echo 'Installing NPM packages...'
                bat 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running Unit Tests...'
                bat 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker Image...'
                // builds the container  
                bat 'docker build -t %IMAGE_NAME% .'
            }
        }
    }
}