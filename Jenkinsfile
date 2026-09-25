pipeline {
    agent none

    stages {
        stage('Node Build and Test') {
            agent {
                docker {
                    image 'node:16'
                }
            }

            stages {
                stage('Install Dependencies') {
                    steps {
                        sh 'npm ci'
                    }
                }

                stage('Unit Tests') {
                    steps {
                        sh 'npm test'
                    }
                }

                stage('Security Scan') {
                    steps {
                        sh 'npm audit --audit-level=high --json > npm-audit.json'
                    }
		post {
			always {
				archiveArtifacts artifacts: 'npm-audit.json'
}
}
}
}
}
        stage('Build Docker Image') {
            agent any
	
	
            steps {
                sh 'docker build -t 21988776/isec6000-express-app:latest .'
            }
        }

        stage('Push Docker Image') {
            agent any

            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub',
                        usernameVariable: 'DOCKERHUB_USERNAME',
                        passwordVariable: 'DOCKERHUB_TOKEN'
                    )
                ]) {
         sh 'echo "$DOCKERHUB_TOKEN" | docker login -u "$DOCKERHUB_USERNAME" --password-stdin'
                    sh 'docker push 21988776/isec6000-express-app:latest'
                }
            }
        }
    }
}
