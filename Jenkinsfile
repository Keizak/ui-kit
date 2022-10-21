def app

pipeline {
    agent any
    environment {
        TYPE = 'patch'
    }

    stages {
        stage('Clone repository') {
            steps {
                checkout scm
            }
        }
       stage('Change version') {
             steps {
                 script {
                    sh "npm version ${env.TYPE}"
                    sh "git commit -am 'change version'"
                    sh "git push"
                 }
             }
        }
        stage('Publish package') {
             steps {
                 echo "Preparing started..."
                     sh 'npm publish'
             }

        }
    }
}
