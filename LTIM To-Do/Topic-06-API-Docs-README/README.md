Add comprehensive JSDoc documentation with:
   - Description of what the function does
   - Parameter details
   - Return value description
   - Error/exception documentation
   - Usage examples"


“Create a README.md scaffold for this repository.
Include: Overview, Architecture, Prerequisites, Local Setup, Environment Variables, Run Commands, Test Commands, Lint/Format, Troubleshooting, Contributing, and Release process.
Use the repo’s existing scripts/config and don’t invent commands—if something is unclear, ask questions first.

“@workspace Generate a README scaffold that matches this repo exactly.
Infer commands from package.json/pom.xml/build.gradle/Makefile and deployment from docker-compose/k8s manifests if present.
Include a ‘Quickstart’ section with the exact commands.”

“Review README.md and list missing sections compared to what this repo actually contains (tests, CI, linting, env vars, run modes).
Then propose a patch: add only what you can prove from the repo files.”
