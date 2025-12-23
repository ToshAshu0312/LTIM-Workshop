# Azure DevOps MCP Server - Sample Prompts

This file contains a library of sample prompts you can use with GitHub Copilot to interact with the Azure DevOps MCP Server. These prompts cover common actions for Work Items, Pull Requests, Repositories, and more.

---

## 1. Work Item Management

### Creating Work Items
- "Create a new **User Story** in the **'ContosoApp'** project titled **'Implement user authentication'** with the description **'As a user, I want to log in with my email and password.'**"
- "Create a **Bug** in the **'ContosoApp'** project titled **'API returns 500 error on checkout'**. Assign it to **'John Doe'** and add the tags **'api, critical'**."
- "Create a **Task** under parent work item **#12345** titled **'Design database schema for user profiles'**."

### Updating Work Items
- "Update work item **#54321** to change its state to **'Active'**."
- "Add a comment to work item **#98765**: **'I've reproduced the issue. The root cause seems to be a null pointer exception in the PaymentService.'**"
- "Assign work item **#11223** to me and set its priority to **1**."
- "Change the type of work item **#44556** from **'Bug'** to **'User Story'**."

### Linking Work Items
- "Link work item **#23456** to work item **#23458** as a **'Related'** link."
- "Set work item **#78901** as the **'Parent'** of work item **#78902**."
- "Link the last commit on the **'main'** branch of the **'ContosoApp'** repository to work item **#33445**."

### Querying Work Items
- "Get all **Bugs** in the **'ContosoApp'** project assigned to me with the state **'Active'**."
- "Show me all **User Stories** in the current iteration for the **'ContosoApp'** team."
- "Find all work items with the tag **'security'** that were created in the last 7 days."

---

## 2. Pull Request Management

### Creating Pull Requests
- "Create a pull request from the **'feature/new-login'** branch to the **'main'** branch in the **'ContosoApp'** repository."
- "Create a pull request titled **'Fix for bug #12345'** and set the description to **'This PR fixes the null pointer exception on checkout.'** Add **'Jane Doe'** as a reviewer."
- "Create a draft pull request for my current branch."

### Managing Pull Requests
- "Get all active pull requests assigned to me in the **'ContosoApp'** repository."
- "Add a comment to pull request **#789**: **'Looks good, but can you add a unit test for the new service?'**"
- "Approve pull request **#567** with a vote of **'Approved'**."
- "Abandon pull request **#999**."
- "Complete pull request **#123** and delete the source branch."

---

## 3. Repository and Branch Management

### Repositories
- "List all repositories in the **'ContosoApp'** project."
- "Get the details for the **'ContosoApp-API'** repository."

### Branches
- "List all branches in the **'ContosoApp'** repository."
- "Create a new branch named **'hotfix/login-bug'** from the **'main'** branch."
- "Get the stats for the **'feature/new-design'** branch to see how far ahead or behind it is from **'main'**."

---

## 4. Pipeline (Builds and Releases) Management

### Builds
- "Queue a new build for the **'ContosoApp-CI'** pipeline on the **'main'** branch."
- "Get the status of the latest build for the **'ContosoApp-CI'** pipeline."
- "List the last 5 builds for the **'ContosoApp'** project."
- "Get the logs for build **#20231222.1**."

### Releases
- "Create a new release for the **'ContosoApp-CD'** release pipeline for the latest build artifact."
- "Get the status of the latest release to the **'Production'** stage."
- "List all releases for the **'ContosoApp-CD'** pipeline."

---

## 5. Wiki Management

- "Create or update a wiki page at path **'/Home/Getting-Started'** in the **'ContosoApp.wiki'** with the content from this file: **'docs/getting-started.md'**."
- "Get the content of the wiki page at **'/APIs/Authentication'**."
- "List all pages in the **'ContosoApp.wiki'**."

---

## Tips for Effective Prompts

- **Be Specific:** Provide clear identifiers like project names, repository names, work item IDs, and branch names.
- **Use Natural Language:** Phrase your request as if you were talking to a team member.
- **Combine Actions:** You can sometimes combine actions, e.g., "Create a bug and assign it to me."
- **Reference Context:** Copilot can often infer context like the current project or repository, but being explicit is always better.
