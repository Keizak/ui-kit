import org.eclipse.jgit.transport.URIish
def app
def repositoryPath = "github.com/it-incubator/ui-kit.git"
def url = "https://$repositoryPath"
def branch = "develop"
def credentialsId = 'github_abazunts'

pipeline {
agent any
 stages {
    stage('Clone repository') {
	/* Let's make sure we have the repository cloned to our workspace */

	//checkout scm
	steps {
	 git branch: branch, credentialsId: credentialsId, url: url
	}



	/*
	try {
	  sh "git checkout -b temp-branch"
	} catch(Exception ex) {
	  sh "git branch -D temp-branch"
	  sh "git checkout -b temp-branch"
	}
	*/

	//sh "git checkout $branch"

	//sh "git merge temp-branch"

	//sh "git branch -d temp-branch"
    }

    stage('Publish Npm Package'){
     steps {
        publishNpmPackage()
     }

    }

//     stage('Push to Git'){
//
// 	withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: credentialsId, usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD']]) {
// 		String encoded_gitPassword = java.net.URLEncoder.encode(env.GIT_PASSWORD, "UTF-8")
//   		String gitUserName = java.net.URLEncoder.encode(env.GIT_USERNAME, "UTF-8")
//
//   		sh("git push https://${gitUserName}:${encoded_gitPassword}@$repositoryPath")
// 	}
//     }
}
}

def publishNpmPackage(){
	sh "echo \"//it-incubator/:username=abazunts\" >> ~/.npmrc"

	sh "echo \"//it-incubator/:_password=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==\" > ~/.npmrc"

	sh "echo \"//it-incubator/:email=bazunc@gmail.com\" >> ~/.npmrc"

	sh "echo \"//it-incubator/:always-auth=true\" >> ~/.npmrc"

	sh "npm set registry https://npm.pkg.github.com"

	sh "npm version-tag patch"

	sh "npm publish"
}
