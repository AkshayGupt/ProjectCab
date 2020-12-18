# Contributing

The following is a set of guidelines for contributing to ProjectCab and its packages, which is hosted in the [ProjectCab](https://www.github.com/AkshayGupt/ProjectCab) on Github. These are mostly guidelines, not rules. Use your best judgement, and feel free to propose changes to this document in a pull request.

#### Table of Contents

[I don't want to read this whole thing. I just have a question!!!](#i-dont-want-to-read-this-whole-thing-i-just-have-a-question)

[How Can I Contribute](#how-can-i-contribute)

* [Suggesting Enhancements](#suggesting-enhancements)
* [Pull Requests](#pull-requests)

[Styleguides](#styleguides)

* [Git Commit Messages](#git-commit-messages)
* [JavaScript Styleguide](#javascript-styleguide)
* [React Styleguide](#react-styleguide)
* [Documentation Styleguide](#documentation-styleguide)
* [Folder Structure](#folder-structure)

[Additional Notes](#additional-notes)

* [Issue and Pull Request Labels](#issue-and-pull-request-labels)
* [Project Todo List](#project-todo-list)

## I don't want to read this whole thing, I just have a question!!!

> **Note:** Please don't file an issue to ask a question. It will only make the issues page cluttered.

We have a Whatsapp Group, feel free to ask questions there.

## How Can I Contribute?

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for ProjectCab, including completely new features and minor improvements to existing functionalities. Following these guidelines helps everyone understand your suggestion :pencil: and find related suggestions.

Before creating an enhancement suggestion, please check the issues as you might find out that you don't need to create one.

#### How do I Submit A (Good) Enhancement Suggestion?

Enhancement suggestions are tracked as [Github issues](https://www.github.com/AkshayGupt/ProjectCab/issues). Create an issue and provide the following information:

* **Use clear and descriptive title** for the issue to identify the suggestion.
* **Keep the title short** as much as possible.
* **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
* **Describe the current behaviour** and **explain which behaviour you expected to see** and why.
* **Explain why this enhancement would be useful**.
* **Consider adding screenshots/GIF** to further explain your point.

### Pull Requests

Please follow these steps to have your contribution considered by the reviewers/maintainers:

1. Every Pull Request must affect a **single** feature. A Pull Request with multiple features will not be merged.
2. Follow the [styleguides](#styleguides).
3. All Pull Requests are to made to the `[develop]` branch.
4. After you submit your pull request, verify that all checks are passing.

While the prerequisites above must be satisfied prior to having your pull request reviewwd, the reviewer(s) may ask you to complete additional design work, tests, or other changes before your pull request can be ultimately accepted.

## Styleguides

### Git Commit Messages

* Use present tense ("Add Feature" not "Added feature")
* Use the imperative mood ("Set color to..." not "Sets color to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line
* Consider stating with the commit messages with an applicable emoji (Refer [here](https://gitmoji.dev/))

### JavaScript Styleguide

All Javascript code is linted with [Prettier](https://prettier.io/).

* Inline `export` with expressions whenever possible

```js
  // Use this:
  export default class ClassName {

  }

  // Instead of:
  class ClassName {

  }
  export default ClassName
```

* Use `const` or `let`. Avoid `var`.
* In order to extract attributes from an object:

```js
    const sampleObj = {
        name: 'Xi',
        color: 'red'
    }

    // bad
    let name = sampleObj.name
    let color = sampleObj.color

    //good
    let {name, color} = sampleObj
```

* Use ES6 function/declaration whenever possible

```js
    const foo = (param1, param2) => {
        console.log(param1, param2);
    }
```

* Use ES6 `map()` to iterate over array whenever possible

### React Styleguide

* Class Names in `src` should follow `PascalCase` ("ProfilePage.js" instead of "profile_page.js")

* Styles must have the same name as the class name (ProfilePage.css)

* Tests should have the same name the class name in **__ tests __** folder

* File Name in `backend` will follow `snake_case` ("firebase_auth.js" instead of "FirebaseAuth.js")

* Data Model file name will all follow snake_case ("user.js" instead of "User.js")

* `Relative` import should be used for internal components/packages

* `Absolute` import should be used for external plugins/packages

### Documentation Styleguide

* Use [Markdown](https://daringfireball.net/projects/markdown/)

### Folder Structure

Two Main segregations: `backend` and `src`.

**`backend`** contains the backend and has the following folders:

* `api` : holds file for api calls
* `models` : holds files for data models
* `controller` : holds file for controllers
* `database` : holds file for firebase functions

**`src`** contains the frontend and has the following folders:

* `components` : holds files for all pages/screens. Further contains:

  * `components` : widgets/components for a particular screen

  * `styles`: contains CSS for this page

  * _FILE_ `<ComponentName>.js` : holds the source code for the page. This calls the widgets in `components` folder

* `common`: holds widget/component used by more than one screen/page

* `utils`: holds classes/functions which have no particular designation, like, globals , constants, env, etc.

* `redux`: holds files for redux reducers

## Additional Notes

### Issue and Pull Request Labels

This section lists the labels we use to help use track and manage issues and pull requests.

#### Types of Issue and Issue State

| Label Name | Description |
| --- | --- |
| `enhancement` | Feature Requests |
| `bug` | Confirmed bugs or reports that are most likely bugs |
| `question` | Questions more than a bug or feature requests |
| `feedback` | General feedback more than bug or feature request |
| `help-wanted` | Assignee needs help from Senpai |
| `more-information-needed` | More info needs to be collected |
| `duplicate` | Issue already exists |
| `wontfix` | Issues that won't be worked on or it is a duplicate |
| `invalid` | Issue makes no sense |
| `backend` | Issues regarding a backend feature |
| `api` | Issues regarding an api function |
| `ui/ux` | Issues regarding UI/UX |
| `documentation` | Issues regarding documentation |
| `security` | Issues regarding security |

#### Pull Request Labels

| Label Name | Description |
| --- | --- |
| `work-in-progress` | PR that needs some work |
| `needs-review` | PR that needs review |
| `under-review` | PR that are being reviewed |
| `requires-changes` | PR that have confirmed changes |
| `needs-testing` | PR that needs manual testing |

### Project Todo List

* All Todos will be converted to a Github Issue.
* Assignees will need to manually move from to-do - doing - done.
