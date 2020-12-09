
Typically you will add typescript as a devDependency to your package.json.
But this won't work on Heroku since those dependencies are not downloaded
(due to `NODE_ENV` being set to `production`).

In order to go around this issue you just simply need to add typescript
as a regular dependency and build the project after each push.

Find the live sample here => https://ncdc-help.netlify.app and login if u can 
