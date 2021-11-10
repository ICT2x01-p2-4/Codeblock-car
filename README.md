# Codeblock Car
## About
Insert description here

[TOCM]

------------
# Installation Guide
TODO

# Development Workflow

## Rules
1. Always commit to `dev` before commit to `master`
2. Do feature work only in `feature` branch
3. Commit regularly
4. When unit testing is done, commit changes and initiate pull request to `dev`
5. After reviewer approve, merge `feature` branch into `dev`
6. **DO NOT** delete feature branches after finished
7. Only bugfixes & documentation in `release` branches
8. Releases should be tagged in `master` branch 

## Naming conventions
- Features should be named `feature-<my_feature>`

## Version Control Semantics
- Version Control numbering should be `vX.Y.Z` where:
	- `X` = Major version
	- `Y` = Minor version
	- `Z` = Patch
- Release Control numbering is same as the version that it is based on `rX.Y`

## Configuration item tracking
- .gitignore should be updated
- Check files that are tracked by git and ensure files that should not be tracked are added to gitignore

## Change tracking
- Mention the file that was added/removed/updated
- Mention the changes

## Before Commits
- Test all cases that are relevant to new feature
- Ensure all test cases passed before commit to `dev`

# Testing

## User acceptance Test (UAT)
TODO

## Whitebox Testing
TODO

------------

# Changelog

## v0.2
- Added license
- Updated README
	- Added workflow information
	- Added headers to be filled in
- Added .gitignore for vscode IDE


## v0.0.1
- Initial creation of master branch
- Added readme
