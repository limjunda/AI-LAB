# Merge the node file for Docker
## 1. Save Docker images to tar files
docker save -o node20-slim.tar node:20-slim
docker save -o nginx-alpine.tar nginx:alpine
docker save -o ai-solution.tar ai-solution

## 2. Split the tar files into smaller parts (90 MB each)
split -b 90M node20-slim.tar node20-slim.part_
split -b 90M nginx-alpine.tar nginx-alpine.part_
split -b 90M ai-solution.tar ai-solution.part_

## 3. (Optional) Recombine the split parts into a single tar file
cat node20-slim.part_* > node20-slim.tar
cat nginx-alpine.part_* > nginx-alpine.tar
cat ai-solution.part_* > ai-solution.tar

## 4. Load the Docker images from the tar files
docker load -i node20-slim.tar
docker load -i nginx-alpine.tar
docker load -i ai-solution.tar



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `par serOptions`property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
