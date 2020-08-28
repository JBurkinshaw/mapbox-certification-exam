# Components Directory

This is a flat directory which contains all components.

## Structure

Each component should exist in a folder containing an "index", the component, a "styled.js" (the styling information for that component), and "Component.test.js" (the test for the component).

In the directory, there also exists an "index.js" which allows us to carry out destructured importing of all the components in a single command.

### Boilerplate is Awful!

Don't want to waste your time creating all the new files? Simply run `npm run plop` and follow the CLI. You'll be good to go right away!

## Testing

Try to go for Integration testing whenever possible. Unit tests are useful when there is some deterministic method that has a clear outcome. This is an area which we need to improve on.
