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
                 body: " Good news! The pipeline for DevOps Bloggers has completed successfully.\n\nYour app is now live on Minikube.\n\nBuild Number: ${env.BUILD_NUMBER}\nProject: ${env.JOB_NAME}", 
                 cc: '', 
                 from: '', 
                 replyTo: '', 
                 subject: "SUCCESS: DevOps Blog Build #${env.BUILD_NUMBER}", 
                 to: "${USER_EMAIL}"
        }
        failure {
            mail bcc: '', 
                 body: " Alert! The pipeline for DevOps Bloggers has FAILED.\n\nPlease check the Jenkins Console Output to debug the error.\n\nBuild Number: ${env.BUILD_NUMBER}\nProject: ${env.JOB_NAME}", 
                 cc: '', 
                 from: '', 
                 replyTo: '', 
                 subject: "FAILURE: DevOps Blog Build #${env.BUILD_NUMBER}", 
                 to: "${USER_EMAIL}"
        }
    }
}