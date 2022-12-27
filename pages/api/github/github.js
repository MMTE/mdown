const privateKey = "-----BEGIN RSA PRIVATE KEY-----\n" +
    "MIIEpQIBAAKCAQEA8RJ+CW8CkqACrOMHIgvQygs93xXCDn7s5XFDJzHXbA5pwhVx\n" +
    "OtsQgbbR5ueXboPQyDYJvu3ZWqsKiOlLkdPhtfe4g4GQt71FoOPgzUfVtC/9OPq0\n" +
    "8mMpHo9U0s2BERb/ZuQvedsTn/EwBAHBDh6r7Vg3dEqH2rS7yY5rYSg0lxnmUMiu\n" +
    "7kL4kxyoBTcg8rEP5jUR5bQsByORpd/JL9P4O1b6rVdq4pbwhqBlXUPNanXfQVlx\n" +
    "K6EpnvJ/EK4fGdYikmljaPtxa1RVn8hqn/eYGab7EesJ4UlFaQOlwxjlPZntLlJi\n" +
    "OGWsdc5/Ri5qV40XXu5vw+MENf/W7fnY9IsQ8wIDAQABAoIBAQDSXWW4i7N+Cb1r\n" +
    "6ozd69udg+PQ2SbHCYFl0slb2YV3mLg3EgkF6AXme4d9bFjbqpE1NNqaTund0eXW\n" +
    "hWZZccDDztCniRelDrhE5rXTzLyyiTH6V+Qwo9FNBpxpe8UGCcCDo9m+Byt/5bMV\n" +
    "vAYgcSlsaw+xHhyhABfikbIoTTJfKxwXM1SsdzwbC4XqIlVw5LkZtB/0VQ0rD2IT\n" +
    "UXV7O89DkJyJSWVIkjmZxvHfFbWl5OczpFvYBkkkLLtF8oHDDpQ3H12226cTi14l\n" +
    "Ss+0sHQt71biKks1EQ3GfToJIiXwFIlMQVh760gxaQjhToO131KE6npqEC5QUXc3\n" +
    "em5Q8aTBAoGBAPq+U9LNnuboR1aYUHQ/fmCz9+kHOQJWfnaKmKwPBRGuMu8EtmtL\n" +
    "chWmQOLOHJS/8zrwqsUp/4wntQT1/2LRFBT+egU+VbbFw1sY+WepFuylbnrTgd/k\n" +
    "/rI0tCcr86coUNAB7uQTtJC2RPv9Mgjs9NjtWWNyHkPm5DriR2jDVqNTAoGBAPYg\n" +
    "QxL20YUJM50Bl5C7A1VLivuusPHC9bhyx59sdli02M5WUB3UGwdPHc1+ZmSvIu1n\n" +
    "NHkuBeYY+PbBTbYM8WqcpwVvRxXNj5MNT49YlmJ8tu2mHCVotnF0VhTVje5xWEYW\n" +
    "pyVBKstAL/0BZKz+cxaSSoqsAoPCWnbtgWDD0MfhAoGBAIuzszxGN/xq+iQzJNA/\n" +
    "+Aek/cEltwuoaTleqwViMO7S4anuNDy/gkaxpIE5WQ8/iyMRp/PGHI1YKjEjZjEG\n" +
    "UGwKBK4bNuJoeRmuZnbs7MrYuR9R7JB0I7viRWV1xYEiozPhf9ovaHEgPHsxbMkw\n" +
    "TJL4Ws9fa6FlaU+tdx/VhdXlAoGBANr2WLXGXx+7z+8eO3jG53A6hKrj/wcWKwSt\n" +
    "GGr8U00Xlsn6f8wJpwIZoKnwiaeJJ8mMx2IHT7gk/1iHIFuVqDDwrKZpGRSMi+6H\n" +
    "KQCeDywPR66k2OVvAuBsXyip1FsM+ztfa9P45dlsgUTUuHwu4rRx8V7tKE+P2Gt1\n" +
    "YGR10IgBAoGAFXjOZq4wNd9a6jIAhbzPY0uHWXjORqEMqq6Mb68MEDiaRHyk2c1h\n" +
    "hu9xQRWs/qveR8IsCgULcITqaa+0aSnonSxaji8q3Vv3WLISlMGch/IIM3DZJppA\n" +
    "txswqS54SrZwi6VSTnrm+MqTu+0egSIdSCT0B3+VGEul3enSOPi9YPc=\n" +
    "-----END RSA PRIVATE KEY-----\n"

const {createAppAuth} = require("@octokit/auth-app");
const {Octokit} = require("octokit");

const appId = "275544"

export class Github {

    installationId = null;
    octokit = null
    authData = null

    constructor(installationId = null) {
        if (installationId !== null) {

            this.installationId = installationId

            this.octokit = new Octokit({
                authStrategy: createAppAuth,
                auth: {
                    appId: appId,
                    privateKey: privateKey,
                    installationId: installationId,
                },
            });
        }
    }

    // authenticate
    async authenticate() {
        return this.authData = await this.octokit.rest.apps.getAuthenticated();
    }

    // get repos
    async getRepos() {
        return await this.octokit.request('GET /installation/repositories{?per_page,page}')
    }

    // get single file
    async getContent(owner = null, repo, path = '/') {
        return await this.octokit.request('GET /repos/{owner}/{repo}/contents/{path}{?ref}', {
            owner: owner,
            repo: repo,
            path: path
        })
    }

    // commit file
    async commit(owner = null, repo, path = '/', file, sha = null, message = null, name = ' ', email = ' ') {

        return await this.octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
            owner: owner,
            repo: repo,
            path: path,
            message: message,
            committer: {
                name: name,
                email: email
            },
            content: file,
            sha: sha
        })
    }

}