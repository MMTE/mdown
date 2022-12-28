const privateKey = Buffer.from(process.env.GITHUB_PRIVATE_KEY, 'base64').toString()

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
