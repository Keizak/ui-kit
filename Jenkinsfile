def app

pipeline {
    agent any
    environment {
        GITHUB_ACCESS_TOKEN_WRITE = "${env.GITHUB_ACCESS_TOKEN_WRITE}"
    }
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
//         stage('Prepared version') {
//             steps {
//                 echo "Prepared started..."
//                     script {
//                          sh "npm version patch"
//                     }
//                 echo "Prepared finished..."
//             }
//         }
        stage('Preparing') {
             steps {
                 echo "Preparing started..."
                     sh 'ls -ltr'
                     sh 'pwd'
                     sh "chmod +x preparing.sh"
                     sh "./preparing.sh ${env.GITHUB_ACCESS_TOKEN_WRITE}"
                     sh "cat .npmrc"
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
