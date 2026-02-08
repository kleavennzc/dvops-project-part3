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
        stage('Deploy to Minikube') {
            steps {
                echo 'Deploying to Kubernetes...'
                // Apply the configurations
                bat 'kubectl apply -f kubernetes/deployment.yaml'
                bat 'kubectl apply -f kubernetes/service.yaml'
                
                // Force a restart so it will pick up the new image
                bat 'kubectl rollout restart deployment/kleaven-blog-deployment'
            }
        }
    }
}