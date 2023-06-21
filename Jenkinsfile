def app

pipeline {
    agent any
    stages {
        stage('Clone repository') {
            steps {
                checkout scm
            }
        }
        stage('Install') {
            steps {
                echo "Install started..."
                    script {
                         sh "yarn install"
                    }
                echo "Install finished..."
            }
        }
        stage('Preparing') {
             steps {
              withCredentials([string(credentialsId: 'GITHUB_ACCESS_TOKEN_WRITE', variable: 'GITHUB_ACCESS_TOKEN_WRITE')]) {
                 echo "Preparing started..."
                     sh 'ls -ltr'
                     sh 'pwd'
                     sh "chmod +x preparing.sh"
                     sh "./preparing.sh $GITHUB_ACCESS_TOKEN_WRITE"
               }
             }
        }
        stage('Publish package') {
             steps {
                 echo "Publish started..."
                     script {
                        sh "npm publish"
                     }
                 echo "Publish finished..."
             }
       }
    }
}
