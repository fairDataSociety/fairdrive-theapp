# Contributing to Fairdrive

We appreciate your interest in contributing to Fairdrive! Your contributions help make Fairdrive a great tool for everyone.

## How to Contribute

If you've found a bug or have a feature request, first check the [Issues](https://github.com/fairDataSociety/fairdrive-theapp/issues) to see if someone else has already created a ticket. If not, feel free to [create a new one](https://github.com/fairDataSociety/fairdrive-theapp/issues/new)!

If you're ready to contribute code, here's how you can do it:

1. [Fork Fairdrive](https://help.github.com/articles/fork-a-repo) and create a branch with a descriptive name. For example, if you're working on a ticket #325, you might name your branch `325-add-japanese-localisation`.
2. Make your changes in your branch. If you need help, don't hesitate to ask!
3. Once you've made your changes, switch back to your master branch and make sure it's up to date with Fairdrive's master branch:

```sh
git remote add upstream git@github.com:fairDataSociety/fairdrive-theapp.git
git checkout master
git pull upstream master
```

4. Update your feature branch from your local copy of master and push it:
```sh
git checkout 325-add-japanese-localisation
git rebase master
git push --set-upstream origin 325-add-japanese-localisation
```

5. Finally, go to GitHub and create a Pull Request.

## Code Style
We use ESLint and Prettier to enforce a consistent code style. You can find the configuration files for these tools in the root of the repo. We recommend installing plugins for your editor that utilize these.

## Keeping Your Pull Request Updated
If a maintainer asks you to "rebase" your PR, they're asking you to update your branch with the latest changes from master. Here's how you can do it:

```sh
git checkout 325-add-japanese-localisation
git pull --rebase upstream master
git push --force-with-lease 325-add-japanese-localisation
```


## Merging a PR
A PR can only be merged into master by a maintainer if it meets the following criteria:

- It passes all CI checks.
- It has been approved by at least two maintainers (or one, if the PR was opened by a maintainer).
- It has no requested changes.
- It is up to date with the current master.

Thank you for your contribution! :tada: