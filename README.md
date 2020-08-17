# jfront-oauth

JFront OAuth packages

Библиотека включает в себя реализацию взаимодействия с jepria-oauth.

### Installing from github

Using master.

```
npm i https://github.com/Jepria/jfront-oauth.git
```

Using branch/tag.

```
npm i https://github.com/Jepria/jfront-oauth.git#branch

```

### Использование компонентов из локальной сборки в прикладном проекте(устарело):

- `jfront-oauth>npm run build` — _ts_ и _js_ файлы из папки _src_ компилируются
  и попадают в папку _dist_
- `jfront-oauth>npm link` — создаётся
  [npm-link](https://docs.npmjs.com/cli/link.html) для работы с _jfront-oauth_
  как с npm-модулем в другом проекте
- `another-app>npm link jfront-oauth` — _jfront-oauth_ подтягивается в этот
  проект как npm-модуль (команда `npm install` аннулирует созданный прежде _npm
  link_ в этом проекте, поэтому `npm link front-oauth` нужно повторно выполнять
  всякий раз после `npm install`)

### Добавление нового функционала:

- Написать _ts_, _js_ код в подходящем файле (например,
  _src/feature/feature.js_)
- `jfront-oauth>npm run build` — _ts_ и _js_ файлы из папки _src_ компилируются
  и попадают в папку _dist_
- Добавить экспорт в файл _./src/index.ts_ из добавленных исходных файлов:
  ```
  export * from './feature/feature.js';
  ```

```

```
