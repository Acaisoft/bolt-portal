#!groovy

properties(
        [[$class  : 'BuildDiscarderProperty',
          strategy: [$class: 'LogRotator', artifactDaysToKeepStr: '15', artifactNumToKeepStr: '15', daysToKeepStr: '15', numToKeepStr: '15']]])

def DEV_BRANCH = "master"
def PROD_BRANCH = "prod"
def FIREBASE_CI_TOKEN = "jenkins-firebase-token"

node('docker') {

    def version = ''

    try {

        stage('Clear workspace') {
            deleteDir()
        }

        stage('Checkout') {
            retry(3) {
                checkout scm
            }

            version = sh returnStdout: true, script: 'git describe --long --dirty --abbrev=10 --tags --always'
            version = env.BRANCH_NAME + "-" + version.replaceAll("\\s+", "")
            echo "Version: ${version}"
        }

        stage('Build') {
            docker.image('node:8.12').inside() {
                sh "yarn"
                sh "REACT_APP_STAGE=stage REACT_APP_VERSION=${version} yarn build"
            }
        }

        stage('Test') {
            docker.image('node:8.12').inside() {
                sh "CI=true yarn test"
            }
        }


        stage('Deploy') {
            echo "Skipping deployment."
            return;

            if (env.BRANCH_NAME == DEV_BRANCH) {
                echo "Deploy to dev"
                withCredentials([string(credentialsId: FIREBASE_CI_TOKEN, variable: 'TOKEN')]) {
                    docker.image('node:9.10-alpine').inside("-u root") {
                        sh "npm install -g firebase-tools"
                        sh "firebase deploy --non-interactive --token ${TOKEN}"
                    }
                }
                return;
            }

            if (env.BRANCH_NAME == PROD_BRANCH) {
                echo "Deploy to prod"

                // "TODO"
                echo "TODO"

                return;
            }
            echo "Skipping. Runs only for ${DEV_BRANCH} and ${PROD_BRANCH} branches"
        }
    }
    catch (ex) {
        currentBuild.result = "FAILED"
        errorMessage = ex.getMessage()
        throw ex
    }
    finally {
        stage('Clean up') {
            cleanWs()
        }
    }
}
