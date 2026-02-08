pipeline {
    agent any

    environment {
        IMAGE_NAME = "kleaven-blog-app"
        
        USER_EMAIL = "ngzhicaikleaven@gmail.com"
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
                
                // Load image into Minikube
                bat 'minikube image load %IMAGE_NAME%'
                
                // Deploy using credentials
                bat 'kubectl --kubeconfig=./kubeconfig apply -f kubernetes/deployment.yaml --validate=false'
                bat 'kubectl --kubeconfig=./kubeconfig apply -f kubernetes/service.yaml --validate=false'
                
                // Restart deployment
                bat 'kubectl --kubeconfig=./kubeconfig rollout restart deployment/kleaven-blog-deployment'
            }
        }
    }

    // SDL FEATURE 1: Email Notifications
    post {
        always {
            echo 'Pipeline finished. Sending status email...'
        }
        success {
            mail bcc: '', 
                 body: " The pipeline for DevOps Bloggers has completed successfully.\nProject: ${env.JOB_NAME}", 
                 cc: '', 
                 from: '', 
                 replyTo: '', 
                 subject: "SUCCESS: DevOps Blog Build #${env.BUILD_NUMBER}", 
                 to: "${USER_EMAIL}"
        }
        failure {
            mail bcc: '', 
                 body: " The pipeline for DevOps Bloggers has FAILED.\nProject: ${env.JOB_NAME}", 
                 cc: '', 
                 from: '', 
                 replyTo: '', 
                 subject: "FAILURE: DevOps Blog Build #${env.BUILD_NUMBER}", 
                 to: "${USER_EMAIL}"
        }
    }
}