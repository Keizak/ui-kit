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
                    git url: "git@github.com:it-incubator/ui-kit.git",
                        credentialsId: 'github_ssh',
                        branch: 'develop'
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
