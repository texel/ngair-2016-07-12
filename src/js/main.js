var app = angular.module('ngair', ['ui.router', 'ui.router.visualizer']);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/m/');
  
  $stateProvider.state({
    name: 'app',
    url: '/m/',
    redirectTo: 'app.folder',
    data: { requiresAuth: true },
    resolve: {
      folders: function(Folders) {
        return Folders.all();
      }
    },
    component: 'app'
  });
  
  $stateProvider.state({
    name: 'app.folder',
    url: ':folderId',
    params: {
      folderId: 'inbox'
    },
    resolve: {
      folder: function($stateParams, Folders) {
        return Folders.get($stateParams.folderId);
      },
      messages: function(folder, Messages) {
        return Messages.byFolder(folder);
      }
    },
    views: {
      "messages@app": "folder"
    }
  });
  
  $stateProvider.state({
    name: 'app.folder.message',
    url: '/:messageId',
    resolve: {
      message: function(messages, $stateParams) {
        return messages.find(function(message) {
          return message._id === $stateParams.messageId;
        })
      }
    },
    views: {
      "message@app": "message"
    }
  });

  $stateProvider.state({
    name: 'login',
    url: '/login',
    component: 'login'
  });

});



app.run(function($transitions, $state, AuthService) {
  function stateRequiresAuth(state) {
    return state.data && state.data.requiresAuth;
  }

  function redirectUnauthenticatedToLogin() {
    if (!AuthService.user) {
      return $state.target('login');
    }
  }

  $transitions.onStart({ to: stateRequiresAuth }, redirectUnauthenticatedToLogin);
});

app.run(function($trace) {
  $trace.enable("TRANSITION");
});