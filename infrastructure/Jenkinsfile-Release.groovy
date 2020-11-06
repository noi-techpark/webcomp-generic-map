pipeline {
    agent {
        dockerfile {
            filename 'infrastructure/docker/Dockerfile'
            additionalBuildArgs '--build-arg JENKINS_USER_ID=`id -u jenkins` --build-arg JENKINS_GROUP_ID=`id -g jenkins`'
        }
    }

    options {
        ansiColor('xterm')
    }

    parameters {
        string(name: 'VERSION', defaultValue: '1.0.0', description: 'Version')
    }

    environment {
        GIT_REPOSITORY = "git@github.com:noi-techpark/webcomp-generic-map.git"
        GIT_BRANCH = "master"
    }

    stages {
        stage('Clean') {
            steps {
                sh '''
                  rm -rf dist node_modules
                  yarn cache clean
                '''
            }
        }
        stage('Dependencies') {
            steps {
                sh 'yarn install'
            }
        }
        stage('Build') {
            steps {
                sh 'yarn run build'
            }
        }
        stage('Git Tag') {
            steps {
                sshagent (credentials: ['jenkins_github_ssh_key']) {
                    sh """
                      git config --global user.email "info@opendatahub.bz.it"
                      git config --global user.name "Jenkins"
                      git remote set-url origin ${GIT_REPOSITORY}
                      git add -A
                      git commit --allow-empty -m "Version ${VERSION}"
                      git tag --delete v${VERSION} || true
                      git push origin :${VERSION} || true
                      git tag -a v${VERSION} -m "Version ${VERSION}"
                      mkdir -p ~/.ssh
                      ssh-keyscan -H github.com >> ~/.ssh/known_hosts
                      git push origin HEAD:${GIT_BRANCH}
                      git push origin ${VERSION}
                    """
                }
            }
        }
    }
}
