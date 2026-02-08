pipeline {
    agent any

    environment {
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
                bat 'docker build -t %IMAGE_NAME% .'
            }
        }

        stage('Deploy to Minikube') {
            steps {
                echo 'Deploying to Kubernetes...'
                
                
                bat 'minikube image load %IMAGE_NAME%'
                
               
                bat 'kubectl --kubeconfig=./kubeconfig apply -f kubernetes/deployment.yaml --validate=false'
                bat 'kubectl --kubeconfig=./kubeconfig apply -f kubernetes/service.yaml --validate=false'
                
                // Force a restart so the new image is actually used
                bat 'kubectl --kubeconfig=./kubeconfig rollout restart deployment/kleaven-blog-deployment'
            }
        }
    }
}