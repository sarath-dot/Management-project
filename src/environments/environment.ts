// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  signupUrl: 'http://localhost:8080/api/users/signup',
  loginUrl: 'http://localhost:8080/api/users/login',
  getProjectUrl: 'http://localhost:8080/api/project/getProject',
  addProjectUrl: 'http://localhost:8080/api/project/add',
  updateProjectUrl: 'http://localhost:8080/api/project/update',
  deleteProjectUrl: 'http://localhost:8080/api/project/delete'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.



