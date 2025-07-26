'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">thanhkun267 documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-611b3c9e5a76286dd7a42bda7545e99ae0fa17914fa2ef9818381499962dc0e8ccc0352a9ea491dd3649bba14c46b1204d50bfd81db1480518c5fbd2def038c2"' : 'data-bs-target="#xs-controllers-links-module-AppModule-611b3c9e5a76286dd7a42bda7545e99ae0fa17914fa2ef9818381499962dc0e8ccc0352a9ea491dd3649bba14c46b1204d50bfd81db1480518c5fbd2def038c2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-611b3c9e5a76286dd7a42bda7545e99ae0fa17914fa2ef9818381499962dc0e8ccc0352a9ea491dd3649bba14c46b1204d50bfd81db1480518c5fbd2def038c2"' :
                                            'id="xs-controllers-links-module-AppModule-611b3c9e5a76286dd7a42bda7545e99ae0fa17914fa2ef9818381499962dc0e8ccc0352a9ea491dd3649bba14c46b1204d50bfd81db1480518c5fbd2def038c2"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-611b3c9e5a76286dd7a42bda7545e99ae0fa17914fa2ef9818381499962dc0e8ccc0352a9ea491dd3649bba14c46b1204d50bfd81db1480518c5fbd2def038c2"' : 'data-bs-target="#xs-injectables-links-module-AppModule-611b3c9e5a76286dd7a42bda7545e99ae0fa17914fa2ef9818381499962dc0e8ccc0352a9ea491dd3649bba14c46b1204d50bfd81db1480518c5fbd2def038c2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-611b3c9e5a76286dd7a42bda7545e99ae0fa17914fa2ef9818381499962dc0e8ccc0352a9ea491dd3649bba14c46b1204d50bfd81db1480518c5fbd2def038c2"' :
                                        'id="xs-injectables-links-module-AppModule-611b3c9e5a76286dd7a42bda7545e99ae0fa17914fa2ef9818381499962dc0e8ccc0352a9ea491dd3649bba14c46b1204d50bfd81db1480518c5fbd2def038c2"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-7136d43276df397f8fb78e97ade6dd28be9d802e5b0b0988dc4560c770bf9aad73f5a30c8d96c1ac3e242d82dfcf7217f3ab4569658ff9c2901b47e18f052e3a"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-7136d43276df397f8fb78e97ade6dd28be9d802e5b0b0988dc4560c770bf9aad73f5a30c8d96c1ac3e242d82dfcf7217f3ab4569658ff9c2901b47e18f052e3a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-7136d43276df397f8fb78e97ade6dd28be9d802e5b0b0988dc4560c770bf9aad73f5a30c8d96c1ac3e242d82dfcf7217f3ab4569658ff9c2901b47e18f052e3a"' :
                                        'id="xs-injectables-links-module-AuthModule-7136d43276df397f8fb78e97ade6dd28be9d802e5b0b0988dc4560c770bf9aad73f5a30c8d96c1ac3e242d82dfcf7217f3ab4569658ff9c2901b47e18f052e3a"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CompaniesModule.html" data-type="entity-link" >CompaniesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CompaniesModule-cc5b16f42dec0c5a2a0cf4a47e0b3fc39a5b0649a9c9e6433ed93d052ef3039923d4b3997f1c257823e0d41e6137d116a45efea024826137f87cf68a72e72d48"' : 'data-bs-target="#xs-controllers-links-module-CompaniesModule-cc5b16f42dec0c5a2a0cf4a47e0b3fc39a5b0649a9c9e6433ed93d052ef3039923d4b3997f1c257823e0d41e6137d116a45efea024826137f87cf68a72e72d48"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CompaniesModule-cc5b16f42dec0c5a2a0cf4a47e0b3fc39a5b0649a9c9e6433ed93d052ef3039923d4b3997f1c257823e0d41e6137d116a45efea024826137f87cf68a72e72d48"' :
                                            'id="xs-controllers-links-module-CompaniesModule-cc5b16f42dec0c5a2a0cf4a47e0b3fc39a5b0649a9c9e6433ed93d052ef3039923d4b3997f1c257823e0d41e6137d116a45efea024826137f87cf68a72e72d48"' }>
                                            <li class="link">
                                                <a href="controllers/CompaniesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompaniesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CompaniesModule-cc5b16f42dec0c5a2a0cf4a47e0b3fc39a5b0649a9c9e6433ed93d052ef3039923d4b3997f1c257823e0d41e6137d116a45efea024826137f87cf68a72e72d48"' : 'data-bs-target="#xs-injectables-links-module-CompaniesModule-cc5b16f42dec0c5a2a0cf4a47e0b3fc39a5b0649a9c9e6433ed93d052ef3039923d4b3997f1c257823e0d41e6137d116a45efea024826137f87cf68a72e72d48"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CompaniesModule-cc5b16f42dec0c5a2a0cf4a47e0b3fc39a5b0649a9c9e6433ed93d052ef3039923d4b3997f1c257823e0d41e6137d116a45efea024826137f87cf68a72e72d48"' :
                                        'id="xs-injectables-links-module-CompaniesModule-cc5b16f42dec0c5a2a0cf4a47e0b3fc39a5b0649a9c9e6433ed93d052ef3039923d4b3997f1c257823e0d41e6137d116a45efea024826137f87cf68a72e72d48"' }>
                                        <li class="link">
                                            <a href="injectables/CompaniesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompaniesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabasesModule.html" data-type="entity-link" >DatabasesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-DatabasesModule-0891e40d0f3c48611f789ea92c1bc438b5819b6e85bf9a7324d6c35b24c5b8137632df1c6d56bd587560d2c98fabb94266eb11b9ea6e12eb4a32b02433d848fc"' : 'data-bs-target="#xs-controllers-links-module-DatabasesModule-0891e40d0f3c48611f789ea92c1bc438b5819b6e85bf9a7324d6c35b24c5b8137632df1c6d56bd587560d2c98fabb94266eb11b9ea6e12eb4a32b02433d848fc"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DatabasesModule-0891e40d0f3c48611f789ea92c1bc438b5819b6e85bf9a7324d6c35b24c5b8137632df1c6d56bd587560d2c98fabb94266eb11b9ea6e12eb4a32b02433d848fc"' :
                                            'id="xs-controllers-links-module-DatabasesModule-0891e40d0f3c48611f789ea92c1bc438b5819b6e85bf9a7324d6c35b24c5b8137632df1c6d56bd587560d2c98fabb94266eb11b9ea6e12eb4a32b02433d848fc"' }>
                                            <li class="link">
                                                <a href="controllers/DatabasesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabasesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DatabasesModule-0891e40d0f3c48611f789ea92c1bc438b5819b6e85bf9a7324d6c35b24c5b8137632df1c6d56bd587560d2c98fabb94266eb11b9ea6e12eb4a32b02433d848fc"' : 'data-bs-target="#xs-injectables-links-module-DatabasesModule-0891e40d0f3c48611f789ea92c1bc438b5819b6e85bf9a7324d6c35b24c5b8137632df1c6d56bd587560d2c98fabb94266eb11b9ea6e12eb4a32b02433d848fc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DatabasesModule-0891e40d0f3c48611f789ea92c1bc438b5819b6e85bf9a7324d6c35b24c5b8137632df1c6d56bd587560d2c98fabb94266eb11b9ea6e12eb4a32b02433d848fc"' :
                                        'id="xs-injectables-links-module-DatabasesModule-0891e40d0f3c48611f789ea92c1bc438b5819b6e85bf9a7324d6c35b24c5b8137632df1c6d56bd587560d2c98fabb94266eb11b9ea6e12eb4a32b02433d848fc"' }>
                                        <li class="link">
                                            <a href="injectables/DatabasesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabasesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FilesModule.html" data-type="entity-link" >FilesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-FilesModule-3120a1f91916b5b44c4ae1d215222110696b57925d0b0b03ed52f14873689cda3901abe09f569a8caaab8d391a988e3658ea7fc3f823b7773cdfb3e87d3d1c9b"' : 'data-bs-target="#xs-controllers-links-module-FilesModule-3120a1f91916b5b44c4ae1d215222110696b57925d0b0b03ed52f14873689cda3901abe09f569a8caaab8d391a988e3658ea7fc3f823b7773cdfb3e87d3d1c9b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FilesModule-3120a1f91916b5b44c4ae1d215222110696b57925d0b0b03ed52f14873689cda3901abe09f569a8caaab8d391a988e3658ea7fc3f823b7773cdfb3e87d3d1c9b"' :
                                            'id="xs-controllers-links-module-FilesModule-3120a1f91916b5b44c4ae1d215222110696b57925d0b0b03ed52f14873689cda3901abe09f569a8caaab8d391a988e3658ea7fc3f823b7773cdfb3e87d3d1c9b"' }>
                                            <li class="link">
                                                <a href="controllers/FilesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-FilesModule-3120a1f91916b5b44c4ae1d215222110696b57925d0b0b03ed52f14873689cda3901abe09f569a8caaab8d391a988e3658ea7fc3f823b7773cdfb3e87d3d1c9b"' : 'data-bs-target="#xs-injectables-links-module-FilesModule-3120a1f91916b5b44c4ae1d215222110696b57925d0b0b03ed52f14873689cda3901abe09f569a8caaab8d391a988e3658ea7fc3f823b7773cdfb3e87d3d1c9b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FilesModule-3120a1f91916b5b44c4ae1d215222110696b57925d0b0b03ed52f14873689cda3901abe09f569a8caaab8d391a988e3658ea7fc3f823b7773cdfb3e87d3d1c9b"' :
                                        'id="xs-injectables-links-module-FilesModule-3120a1f91916b5b44c4ae1d215222110696b57925d0b0b03ed52f14873689cda3901abe09f569a8caaab8d391a988e3658ea7fc3f823b7773cdfb3e87d3d1c9b"' }>
                                        <li class="link">
                                            <a href="injectables/FilesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HealthModule.html" data-type="entity-link" >HealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-HealthModule-9250ae0b70ed72216c75f47c714947e3246b2b383d67e9cfbe88ac0bdf6787517d2fff60ef0acd8d642f071496557bb6175a1803a72dc44e7a7a3b2b5e251dc0"' : 'data-bs-target="#xs-controllers-links-module-HealthModule-9250ae0b70ed72216c75f47c714947e3246b2b383d67e9cfbe88ac0bdf6787517d2fff60ef0acd8d642f071496557bb6175a1803a72dc44e7a7a3b2b5e251dc0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HealthModule-9250ae0b70ed72216c75f47c714947e3246b2b383d67e9cfbe88ac0bdf6787517d2fff60ef0acd8d642f071496557bb6175a1803a72dc44e7a7a3b2b5e251dc0"' :
                                            'id="xs-controllers-links-module-HealthModule-9250ae0b70ed72216c75f47c714947e3246b2b383d67e9cfbe88ac0bdf6787517d2fff60ef0acd8d642f071496557bb6175a1803a72dc44e7a7a3b2b5e251dc0"' }>
                                            <li class="link">
                                                <a href="controllers/HealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/JobsModule.html" data-type="entity-link" >JobsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-JobsModule-9029aa1c884997e6d751727260db64ab85046ebd1e5897421e0af18b64fe49b4bfc06dfa978336d41330b7ca7900c23c73e7f9f156d12edb7381913d84fcf485"' : 'data-bs-target="#xs-controllers-links-module-JobsModule-9029aa1c884997e6d751727260db64ab85046ebd1e5897421e0af18b64fe49b4bfc06dfa978336d41330b7ca7900c23c73e7f9f156d12edb7381913d84fcf485"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-JobsModule-9029aa1c884997e6d751727260db64ab85046ebd1e5897421e0af18b64fe49b4bfc06dfa978336d41330b7ca7900c23c73e7f9f156d12edb7381913d84fcf485"' :
                                            'id="xs-controllers-links-module-JobsModule-9029aa1c884997e6d751727260db64ab85046ebd1e5897421e0af18b64fe49b4bfc06dfa978336d41330b7ca7900c23c73e7f9f156d12edb7381913d84fcf485"' }>
                                            <li class="link">
                                                <a href="controllers/JobsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JobsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-JobsModule-9029aa1c884997e6d751727260db64ab85046ebd1e5897421e0af18b64fe49b4bfc06dfa978336d41330b7ca7900c23c73e7f9f156d12edb7381913d84fcf485"' : 'data-bs-target="#xs-injectables-links-module-JobsModule-9029aa1c884997e6d751727260db64ab85046ebd1e5897421e0af18b64fe49b4bfc06dfa978336d41330b7ca7900c23c73e7f9f156d12edb7381913d84fcf485"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-JobsModule-9029aa1c884997e6d751727260db64ab85046ebd1e5897421e0af18b64fe49b4bfc06dfa978336d41330b7ca7900c23c73e7f9f156d12edb7381913d84fcf485"' :
                                        'id="xs-injectables-links-module-JobsModule-9029aa1c884997e6d751727260db64ab85046ebd1e5897421e0af18b64fe49b4bfc06dfa978336d41330b7ca7900c23c73e7f9f156d12edb7381913d84fcf485"' }>
                                        <li class="link">
                                            <a href="injectables/JobsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JobsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MailModule.html" data-type="entity-link" >MailModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MailModule-f68bb30fa9bf1507698d56723be8efd770f33145272884442f094f53c03d5fc5b2aa00025d116ad7fbac932e244eb8cabe6c98fcb6054a274af3ba5b4ff199dc"' : 'data-bs-target="#xs-controllers-links-module-MailModule-f68bb30fa9bf1507698d56723be8efd770f33145272884442f094f53c03d5fc5b2aa00025d116ad7fbac932e244eb8cabe6c98fcb6054a274af3ba5b4ff199dc"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MailModule-f68bb30fa9bf1507698d56723be8efd770f33145272884442f094f53c03d5fc5b2aa00025d116ad7fbac932e244eb8cabe6c98fcb6054a274af3ba5b4ff199dc"' :
                                            'id="xs-controllers-links-module-MailModule-f68bb30fa9bf1507698d56723be8efd770f33145272884442f094f53c03d5fc5b2aa00025d116ad7fbac932e244eb8cabe6c98fcb6054a274af3ba5b4ff199dc"' }>
                                            <li class="link">
                                                <a href="controllers/MailController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MailModule-f68bb30fa9bf1507698d56723be8efd770f33145272884442f094f53c03d5fc5b2aa00025d116ad7fbac932e244eb8cabe6c98fcb6054a274af3ba5b4ff199dc"' : 'data-bs-target="#xs-injectables-links-module-MailModule-f68bb30fa9bf1507698d56723be8efd770f33145272884442f094f53c03d5fc5b2aa00025d116ad7fbac932e244eb8cabe6c98fcb6054a274af3ba5b4ff199dc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailModule-f68bb30fa9bf1507698d56723be8efd770f33145272884442f094f53c03d5fc5b2aa00025d116ad7fbac932e244eb8cabe6c98fcb6054a274af3ba5b4ff199dc"' :
                                        'id="xs-injectables-links-module-MailModule-f68bb30fa9bf1507698d56723be8efd770f33145272884442f094f53c03d5fc5b2aa00025d116ad7fbac932e244eb8cabe6c98fcb6054a274af3ba5b4ff199dc"' }>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PermissionsModule.html" data-type="entity-link" >PermissionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PermissionsModule-28fe1d06ad2084fc5c2de577b103b8b2c3b90ceb42f969a1258a8d7af52b40e293f6d6a30543996fae4ed7f03bd519e5f8740a4f0cf6cc8ea949438cd39488c9"' : 'data-bs-target="#xs-controllers-links-module-PermissionsModule-28fe1d06ad2084fc5c2de577b103b8b2c3b90ceb42f969a1258a8d7af52b40e293f6d6a30543996fae4ed7f03bd519e5f8740a4f0cf6cc8ea949438cd39488c9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PermissionsModule-28fe1d06ad2084fc5c2de577b103b8b2c3b90ceb42f969a1258a8d7af52b40e293f6d6a30543996fae4ed7f03bd519e5f8740a4f0cf6cc8ea949438cd39488c9"' :
                                            'id="xs-controllers-links-module-PermissionsModule-28fe1d06ad2084fc5c2de577b103b8b2c3b90ceb42f969a1258a8d7af52b40e293f6d6a30543996fae4ed7f03bd519e5f8740a4f0cf6cc8ea949438cd39488c9"' }>
                                            <li class="link">
                                                <a href="controllers/PermissionsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissionsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PermissionsModule-28fe1d06ad2084fc5c2de577b103b8b2c3b90ceb42f969a1258a8d7af52b40e293f6d6a30543996fae4ed7f03bd519e5f8740a4f0cf6cc8ea949438cd39488c9"' : 'data-bs-target="#xs-injectables-links-module-PermissionsModule-28fe1d06ad2084fc5c2de577b103b8b2c3b90ceb42f969a1258a8d7af52b40e293f6d6a30543996fae4ed7f03bd519e5f8740a4f0cf6cc8ea949438cd39488c9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PermissionsModule-28fe1d06ad2084fc5c2de577b103b8b2c3b90ceb42f969a1258a8d7af52b40e293f6d6a30543996fae4ed7f03bd519e5f8740a4f0cf6cc8ea949438cd39488c9"' :
                                        'id="xs-injectables-links-module-PermissionsModule-28fe1d06ad2084fc5c2de577b103b8b2c3b90ceb42f969a1258a8d7af52b40e293f6d6a30543996fae4ed7f03bd519e5f8740a4f0cf6cc8ea949438cd39488c9"' }>
                                        <li class="link">
                                            <a href="injectables/PermissionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissionsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ResumesModule.html" data-type="entity-link" >ResumesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ResumesModule-578939409f667b127f5691126a1f4bab649967f519335c98bf2dfc2c33aae6fc2ae2f96f1781710d390a689ed5545dcdaaf43e650be503214f3e7152f6ceff8a"' : 'data-bs-target="#xs-controllers-links-module-ResumesModule-578939409f667b127f5691126a1f4bab649967f519335c98bf2dfc2c33aae6fc2ae2f96f1781710d390a689ed5545dcdaaf43e650be503214f3e7152f6ceff8a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ResumesModule-578939409f667b127f5691126a1f4bab649967f519335c98bf2dfc2c33aae6fc2ae2f96f1781710d390a689ed5545dcdaaf43e650be503214f3e7152f6ceff8a"' :
                                            'id="xs-controllers-links-module-ResumesModule-578939409f667b127f5691126a1f4bab649967f519335c98bf2dfc2c33aae6fc2ae2f96f1781710d390a689ed5545dcdaaf43e650be503214f3e7152f6ceff8a"' }>
                                            <li class="link">
                                                <a href="controllers/ResumesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResumesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ResumesModule-578939409f667b127f5691126a1f4bab649967f519335c98bf2dfc2c33aae6fc2ae2f96f1781710d390a689ed5545dcdaaf43e650be503214f3e7152f6ceff8a"' : 'data-bs-target="#xs-injectables-links-module-ResumesModule-578939409f667b127f5691126a1f4bab649967f519335c98bf2dfc2c33aae6fc2ae2f96f1781710d390a689ed5545dcdaaf43e650be503214f3e7152f6ceff8a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ResumesModule-578939409f667b127f5691126a1f4bab649967f519335c98bf2dfc2c33aae6fc2ae2f96f1781710d390a689ed5545dcdaaf43e650be503214f3e7152f6ceff8a"' :
                                        'id="xs-injectables-links-module-ResumesModule-578939409f667b127f5691126a1f4bab649967f519335c98bf2dfc2c33aae6fc2ae2f96f1781710d390a689ed5545dcdaaf43e650be503214f3e7152f6ceff8a"' }>
                                        <li class="link">
                                            <a href="injectables/ResumesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResumesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RolesModule.html" data-type="entity-link" >RolesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RolesModule-43eaff62ef8e5d5a452a0242b62ca4fad4992a5c757f61b08db010e5dec59b1444ffb672ca565a61a87bb622663930e8efafdab1123ac82a13c316928a50f8fe"' : 'data-bs-target="#xs-controllers-links-module-RolesModule-43eaff62ef8e5d5a452a0242b62ca4fad4992a5c757f61b08db010e5dec59b1444ffb672ca565a61a87bb622663930e8efafdab1123ac82a13c316928a50f8fe"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RolesModule-43eaff62ef8e5d5a452a0242b62ca4fad4992a5c757f61b08db010e5dec59b1444ffb672ca565a61a87bb622663930e8efafdab1123ac82a13c316928a50f8fe"' :
                                            'id="xs-controllers-links-module-RolesModule-43eaff62ef8e5d5a452a0242b62ca4fad4992a5c757f61b08db010e5dec59b1444ffb672ca565a61a87bb622663930e8efafdab1123ac82a13c316928a50f8fe"' }>
                                            <li class="link">
                                                <a href="controllers/RolesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RolesModule-43eaff62ef8e5d5a452a0242b62ca4fad4992a5c757f61b08db010e5dec59b1444ffb672ca565a61a87bb622663930e8efafdab1123ac82a13c316928a50f8fe"' : 'data-bs-target="#xs-injectables-links-module-RolesModule-43eaff62ef8e5d5a452a0242b62ca4fad4992a5c757f61b08db010e5dec59b1444ffb672ca565a61a87bb622663930e8efafdab1123ac82a13c316928a50f8fe"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RolesModule-43eaff62ef8e5d5a452a0242b62ca4fad4992a5c757f61b08db010e5dec59b1444ffb672ca565a61a87bb622663930e8efafdab1123ac82a13c316928a50f8fe"' :
                                        'id="xs-injectables-links-module-RolesModule-43eaff62ef8e5d5a452a0242b62ca4fad4992a5c757f61b08db010e5dec59b1444ffb672ca565a61a87bb622663930e8efafdab1123ac82a13c316928a50f8fe"' }>
                                        <li class="link">
                                            <a href="injectables/RolesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SubscribersModule.html" data-type="entity-link" >SubscribersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SubscribersModule-b04748c113dc574a1acde217b3ef6812944641611def2d0277f2a2637f1cd937302723c8aeacf686ba5b2c7322feea5e1ce128d5ee932e142e144d3cccdd6dc5"' : 'data-bs-target="#xs-controllers-links-module-SubscribersModule-b04748c113dc574a1acde217b3ef6812944641611def2d0277f2a2637f1cd937302723c8aeacf686ba5b2c7322feea5e1ce128d5ee932e142e144d3cccdd6dc5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SubscribersModule-b04748c113dc574a1acde217b3ef6812944641611def2d0277f2a2637f1cd937302723c8aeacf686ba5b2c7322feea5e1ce128d5ee932e142e144d3cccdd6dc5"' :
                                            'id="xs-controllers-links-module-SubscribersModule-b04748c113dc574a1acde217b3ef6812944641611def2d0277f2a2637f1cd937302723c8aeacf686ba5b2c7322feea5e1ce128d5ee932e142e144d3cccdd6dc5"' }>
                                            <li class="link">
                                                <a href="controllers/SubscribersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscribersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SubscribersModule-b04748c113dc574a1acde217b3ef6812944641611def2d0277f2a2637f1cd937302723c8aeacf686ba5b2c7322feea5e1ce128d5ee932e142e144d3cccdd6dc5"' : 'data-bs-target="#xs-injectables-links-module-SubscribersModule-b04748c113dc574a1acde217b3ef6812944641611def2d0277f2a2637f1cd937302723c8aeacf686ba5b2c7322feea5e1ce128d5ee932e142e144d3cccdd6dc5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SubscribersModule-b04748c113dc574a1acde217b3ef6812944641611def2d0277f2a2637f1cd937302723c8aeacf686ba5b2c7322feea5e1ce128d5ee932e142e144d3cccdd6dc5"' :
                                        'id="xs-injectables-links-module-SubscribersModule-b04748c113dc574a1acde217b3ef6812944641611def2d0277f2a2637f1cd937302723c8aeacf686ba5b2c7322feea5e1ce128d5ee932e142e144d3cccdd6dc5"' }>
                                        <li class="link">
                                            <a href="injectables/SubscribersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscribersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-8a5cd1ec04b977d3cb0de9ef6c523b727d7f0b500aac97a148ed177ccd379e51d11caddcece3328a9aa156876e1181201458f1835d2f4f0a7bf62c975092179d"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-8a5cd1ec04b977d3cb0de9ef6c523b727d7f0b500aac97a148ed177ccd379e51d11caddcece3328a9aa156876e1181201458f1835d2f4f0a7bf62c975092179d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-8a5cd1ec04b977d3cb0de9ef6c523b727d7f0b500aac97a148ed177ccd379e51d11caddcece3328a9aa156876e1181201458f1835d2f4f0a7bf62c975092179d"' :
                                            'id="xs-controllers-links-module-UsersModule-8a5cd1ec04b977d3cb0de9ef6c523b727d7f0b500aac97a148ed177ccd379e51d11caddcece3328a9aa156876e1181201458f1835d2f4f0a7bf62c975092179d"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-8a5cd1ec04b977d3cb0de9ef6c523b727d7f0b500aac97a148ed177ccd379e51d11caddcece3328a9aa156876e1181201458f1835d2f4f0a7bf62c975092179d"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-8a5cd1ec04b977d3cb0de9ef6c523b727d7f0b500aac97a148ed177ccd379e51d11caddcece3328a9aa156876e1181201458f1835d2f4f0a7bf62c975092179d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-8a5cd1ec04b977d3cb0de9ef6c523b727d7f0b500aac97a148ed177ccd379e51d11caddcece3328a9aa156876e1181201458f1835d2f4f0a7bf62c975092179d"' :
                                        'id="xs-injectables-links-module-UsersModule-8a5cd1ec04b977d3cb0de9ef6c523b727d7f0b500aac97a148ed177ccd379e51d11caddcece3328a9aa156876e1181201458f1835d2f4f0a7bf62c975092179d"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CompaniesController.html" data-type="entity-link" >CompaniesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/DatabasesController.html" data-type="entity-link" >DatabasesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/FilesController.html" data-type="entity-link" >FilesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/HealthController.html" data-type="entity-link" >HealthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/JobsController.html" data-type="entity-link" >JobsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MailController.html" data-type="entity-link" >MailController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PermissionsController.html" data-type="entity-link" >PermissionsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ResumesController.html" data-type="entity-link" >ResumesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RolesController.html" data-type="entity-link" >RolesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SubscribersController.html" data-type="entity-link" >SubscribersController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Company.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/Company-1.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/Company-2.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCompanyDto.html" data-type="entity-link" >CreateCompanyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateFileDto.html" data-type="entity-link" >CreateFileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateJobDto.html" data-type="entity-link" >CreateJobDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePermissionDto.html" data-type="entity-link" >CreatePermissionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateResumeDto.html" data-type="entity-link" >CreateResumeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRoleDto.html" data-type="entity-link" >CreateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSubscriberDto.html" data-type="entity-link" >CreateSubscriberDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserCvDto.html" data-type="entity-link" >CreateUserCvDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/File.html" data-type="entity-link" >File</a>
                            </li>
                            <li class="link">
                                <a href="classes/History.html" data-type="entity-link" >History</a>
                            </li>
                            <li class="link">
                                <a href="classes/Job.html" data-type="entity-link" >Job</a>
                            </li>
                            <li class="link">
                                <a href="classes/Permission.html" data-type="entity-link" >Permission</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterDto.html" data-type="entity-link" >RegisterDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Resume.html" data-type="entity-link" >Resume</a>
                            </li>
                            <li class="link">
                                <a href="classes/Role.html" data-type="entity-link" >Role</a>
                            </li>
                            <li class="link">
                                <a href="classes/RoleService.html" data-type="entity-link" >RoleService</a>
                            </li>
                            <li class="link">
                                <a href="classes/Subscriber.html" data-type="entity-link" >Subscriber</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCompanyDto.html" data-type="entity-link" >UpdateCompanyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatedBy.html" data-type="entity-link" >UpdatedBy</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateFileDto.html" data-type="entity-link" >UpdateFileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateJobDto.html" data-type="entity-link" >UpdateJobDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePermissionDto.html" data-type="entity-link" >UpdatePermissionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateResumeDto.html" data-type="entity-link" >UpdateResumeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRoleDto.html" data-type="entity-link" >UpdateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSubscriberDto.html" data-type="entity-link" >UpdateSubscriberDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto-1.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserLoginDto.html" data-type="entity-link" >UserLoginDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CompaniesService.html" data-type="entity-link" >CompaniesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DatabasesService.html" data-type="entity-link" >DatabasesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FilesService.html" data-type="entity-link" >FilesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JobsService.html" data-type="entity-link" >JobsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link" >LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MailService.html" data-type="entity-link" >MailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MulterConfigService.html" data-type="entity-link" >MulterConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PermissionsService.html" data-type="entity-link" >PermissionsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResumesService.html" data-type="entity-link" >ResumesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RolesService.html" data-type="entity-link" >RolesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SubscribersService.html" data-type="entity-link" >SubscribersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransformInterceptor.html" data-type="entity-link" >TransformInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ICheckRoleExists.html" data-type="entity-link" >ICheckRoleExists</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICreateUser.html" data-type="entity-link" >ICreateUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IResultUser.html" data-type="entity-link" >IResultUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRole.html" data-type="entity-link" >IRole</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUser.html" data-type="entity-link" >IUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Response.html" data-type="entity-link" >Response</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});