pipeline {
    agent any
    tools{
        nodejs 'node18'
    }
    
    environment{
        SCANNER_HOME= tool 'sonar-scanner'
    }
    
    stages {
        stage('Git Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/viddhant1205/examms-ui.git'
            }
        }

         stage('Trivy FS Scan') {
            steps {
                sh "trivy fs ."
            }
        }
        
        stage('OWASP Scan') {
            steps {
                dependencyCheck additionalArguments: ' --scan ./ ', odcInstallation: 'DC'
                dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
            }
        }

        stage('Sonarqube') {
            steps {
                withSonarQubeEnv('sonar-server'){
                   sh ''' $SCANNER_HOME/bin/sonar-scanner -Dsonar.projectName=exam-ui-app \
                   -Dsonar.projectKey=exam-ui-app '''
               }
            }
        }

       stage('Build & Tag Docker Image') {
            steps {
                script{
                    withDockerRegistry(credentialsId: 'docker-cred', toolName: 'docker') {
                        sh "docker build -t exam-app ."
                        sh "docker tag  exam-app kubegourav/exam-ui-app:latest"
                    }
                }
            }
        }

       stage('Trrivy Image Scan') {
            steps {
                sh "trivy image kubegourav/exam-ui-app:latest"
            }
        }
        
       stage('Push Docker Image') {
            steps {
                script{
                    withDockerRegistry(credentialsId: 'docker-cred', toolName: 'docker') {
                        sh "docker push kubegourav/exam-ui-app:latest"
                    }
                }
            }
        }

        stage('Deploy Application') {
            steps {
                script{
                    withDockerRegistry(credentialsId: 'docker-cred', toolName: 'docker') {
                        sh "docker run -d -p 3000:80 kubegourav/event-management:latest"
                    }
                }
            }
        }

        
        }   
    }
