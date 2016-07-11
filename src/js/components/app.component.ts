import {app} from "../ngmodule";

let template = `
    <div id="layout" class="content pure-g">
    
        <div id="nav" class="pure-u" ng-class="{active: $ctrl.menuOpen}">
            <a class="nav-menu-button" ng-click="$ctrl.toggleMenu()">Menu</a>
    
            <div class="nav-inner">
    
                <div class="pure-menu">
                    <ul class="pure-menu-list">
                        <li class="pure-menu-heading">Folders</li>
                        <li class="pure-menu-item" ng-repeat="folder in $ctrl.folders" ui-sref-active="pure-menu-selected pure-menu-active" ng-click="$ctrl.closeMenu()">
                            <a ui-sref=".folder({ folderId: folder._id })" class="pure-menu-link">{{folder._id}} <span class="email-count"></span></a>
                        </li>
                        <li class="pure-menu-heading">Other</li>
                        <li class="pure-menu-item">
                            <a ng-click="$ctrl.logout()" class="pure-menu-link">Log Out</a>
                        </li>
                        <li class="pure-menu-item" ng-click="$ctrl.reset()">
                            <a class="pure-menu-link">Reset All Data</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    
        <ui-view name="messages" class="pure-u-1"></ui-view>
    
        <ui-view id="main" name="message" class="pure-u-1"></ui-view>
    
    </div>
`;

class AppController {
  private menuOpen;

  constructor(private AuthService, private $state) { }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  logout() {
    this.AuthService.logout();
    this.$state.go('login');
  }

  reset() {
    sessionStorage.clear();
    document.location.reload();
  }
}

app.component('app', {
  controller: AppController,
  bindings: { folders: '<' },
  template: template
});
