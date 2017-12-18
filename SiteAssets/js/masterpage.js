//Global varible to identify if current page is a SitePage 
var _isSitePage = false;

$(document).ready(function () {
    //Branding will apply only to SitePages (Not in edit mode) 
    if (_spPageContextInfo.serverRequestPath.indexOf('/SitePages/') == 0 && _spPageContextInfo.serverRequestPath.indexOf('/SitePages/Forms/') != 0) {
        _isSitePage = true;
    }

    if ($('#RibbonContainer_activeTabId').val())
        if ($('#RibbonContainer_activeTabId').val() == 'Ribbon.WikiPageTab')
            _isSitePage = false;

    var VueLeftNav = new Vue({
        el: '#pl-side-navbar',
        data: {
            sitePage: _isSitePage,
            rootNavItems: ['Our-Services', 'Our-Locations', 'Our-Stories', 'For-Patients', 'For-Family-and-Visitors', 'For-Health-Professionals'],
            //Init variables for root folder
            leftMenuTop: {
                title: 'Home',
                link: '/'
            },
            menuItems: []
        },

        methods: {
            //Build left menu using the current path
            buildLeftMenu: function () {
                var sitePagesPath = '/SitePages';

                var relativePath = _spPageContextInfo.serverRequestPath;

                var relativeFolderPath = relativePath.substring(0, relativePath.lastIndexOf("/"));

                var currentPage = relativePath.substring(relativePath.lastIndexOf("/") + 1);

                //Add navigation to current folder
                this.rootNavItems.push(currentPage.substring(0, currentPage.lastIndexOf(".aspx")));

                //For root folder the default menu is used
                var isRoot = relativeFolderPath == sitePagesPath
                if (!isRoot) {
                    //Set parent link at top
                    this.leftMenuTop.title = relativeFolderPath.substring(relativeFolderPath.lastIndexOf("/") + 1).dash();
                    this.leftMenuTop.link = relativeFolderPath + ".aspx";
                }

                //Get same level pages Sharepoint REST API calls
                var config = { headers: { 'accept': 'application/json;odata=verbose' } };
                var getFilesURL = _spPageContextInfo.webServerRelativeUrl + "_api/Web/GetFolderByServerRelativeUrl('{path}')?$expand=Files,Folders/Files";
                var sameLevelPages = getFilesURL.format({ path: relativeFolderPath });

                axios.get(sameLevelPages, config)
			    .then(function (response) {
			        //console.log(response.data);
			        VueLeftNav.addSameLevelPagesAndSubpages(response.data, currentPage, isRoot);
			    });
            }, //buildLeftMenu: function() {   

            //Get all the pages for the same level
            addSameLevelPagesAndSubpages: function (data, currentPage, isRoot) {
                this.menuItems = [];	//Clean left Menu    	                    	            

                var files = data.d.Files.results;
                var subfiles = data.d.Folders.results
                var subItems = [];

                if (!isRoot)
                    files.sort(dynamicSort("Name"));	 //Sort top menu items by name			    										
                //Iterate files in the same level	
                for (var i in files) {
                    var item = files[i];
                    if (item.Name.lastIndexOf(".aspx")) {
                        var pageName = item.Name.substring(0, item.Name.lastIndexOf(".aspx"));
                        var newMenuItem = { subItems: [], Name: pageName.dash(), link: item.ServerRelativeUrl };

                        //For root only certain menu items are added
                        var addMenuItem = true
                        if (isRoot && this.rootNavItems.indexOf(pageName) < 0)
                            addMenuItem = false;
                        //add siblings for the current page level
                        if (addMenuItem)
                            if (item.Name == currentPage)
                                this.menuItems.unshift(newMenuItem);	//Current file is located at the top
                            else
                                this.menuItems.push(newMenuItem);
                    }
                }
                //Iterate Subfiles in folders Add sublevel for folders containint files
                for (var i in subfiles) {
                    var item = subfiles[i];
                    var itemFolderPath = item.ServerRelativeUrl.split("/");
                    var itemName = itemFolderPath[itemFolderPath.length - 1];
                    var itemFolderName = itemFolderPath[itemFolderPath.length - 2];
                    var files = item.Files.results;

                    var menuItem = searchInArray(itemName.dash(), this.menuItems);
                    if (typeof menuItem != 'undefined') {
                        files.sort(dynamicSort("Name"));	 //Sort subitems by name		
                        for (var i in files) {
                            var file = files[i];
                            var fileName = file.Name.substring(0, file.Name.lastIndexOf(".aspx")).dash();
                            var newSubMenuItem = { Name: fileName, link: file.ServerRelativeUrl };
                            menuItem.subItems.push(newSubMenuItem);
                        }
                    }
                }
            },  //   addSameLevelPagesAndSubpages   	
        }, //methods	           
    }); // var VueLeftNav 

    var VueTopNav = new Vue({
        el: '#megaNavBar',
        data: {
            sitePage: _isSitePage,
            rootNavItems: ['Our-Services', 'Our-Locations', 'Our-Stories', 'For-Patients', 'For-Family-and-Visitors', 'For-Health-Professionals'],
            //Init variables for root folder
            menuItems: [
		      { subItems: [], Name: 'Our Services', link: '/SitePages/Our-Services.aspx' },
		      { subItems: [], Name: 'Our Locations', link: '/SitePages/Our-Locations.aspx' },
		      { subItems: [], Name: 'Our Stories', link: '/SitePages/Our-Stories.aspx' },
		      { subItems: [], Name: 'For Patients', link: '/SitePages/For-Patients.aspx' },
		      { subItems: [], Name: 'For Family & Visitors', link: '/SitePages/For-Family and Visitors.aspx' },
		      { subItems: [], Name: 'For Health Professionals', link: '/SitePages/For-Health Professionals.aspx' }
            ]
        },

        methods: {
            //Build main menu
            buildMainMenu: function () {
                //Get same level pages Sharepoint REST API calls
                var config = { headers: { 'accept': 'application/json;odata=verbose' } };
                var getFilesURL = _spPageContextInfo.webServerRelativeUrl + "_api/Web/GetFolderByServerRelativeUrl('/SitePages')?$expand=Folders/Files";

                axios.get(getFilesURL, config)
			    .then(function (response) {
			        //console.log(response.data);
			        VueTopNav.addMainMenuPagesAndSubpages(response.data);
			    });
            }, //buildMainMenu: function() { 

            //Get all the pages for the root level
            addMainMenuPagesAndSubpages: function (data) {
                this.menuItems = [];	//Clean left Menu    	                    	            

                var files = data.d.Files.results;
                var folders = data.d.Folders.results

                //Iterate defined folders at root level	
                for (var i in this.rootNavItems) {
                    var rootNavItem = this.rootNavItems[i];
                    var menuItem = searchInArray(rootNavItem, folders);
                    if (typeof menuItem != 'undefined') {
                        var pageURL = '/SitePages/' + menuItem.Name + '.aspx';
                        var newMenuItem = { subItems: [], Name: menuItem.Name.dash(), link: pageURL };

                        menuItem.Files.results.sort(dynamicSort("Name"));	 //Sort subitems by name

                        //Iterate Subfiles in folders Add sublevel for folders containint files
                        for (var i in menuItem.Files.results) {
                            var file = menuItem.Files.results[i];
                            var fileName = file.Name.substring(0, file.Name.lastIndexOf(".aspx")).dash();
                            var newSubMenuItem = { Name: fileName, link: file.ServerRelativeUrl };
                            newMenuItem.subItems.push(newSubMenuItem);
                        }
                        this.menuItems.push(newMenuItem);
                    }
                }
                //Makes a copy of main menu for the footer menu 
                VueFooterNav.menuItems = this.menuItems
            },  //   addSameLevelPagesAndSubpages   	

        }, //methods	                 
    }); // var VueTopNav 

    var VueFooterNav = new Vue({
        el: '#footerNav',
        data: {
            sitePage: _isSitePage,
            menuItems: VueTopNav.menuItems
        },
    }); // var VueFooterNav 


    //Menu Initialization
    VueLeftNav.buildLeftMenu();
    VueTopNav.buildMainMenu();
});  //$(document).ready(function()

// Helper functions 
String.prototype.format = function (placeholders) {
    var s = this;
    for (var propertyName in placeholders) {
        var re = new RegExp('{' + propertyName + '}', 'gm');
        s = s.replace(re, placeholders[propertyName]);
    }
    return s;
};

// Helper functions 
String.prototype.dash = function () {
    var s = this;
    s = s.replace(/-/g, ' ');
    return s;
};

//Search an Object in Array based on a object property
function searchInArray(nameKey, objArray) {
    for (var i = 0; i < objArray.length; i++) {
        if (objArray[i].Name === nameKey) {
            return objArray[i];
        }
    }
}

//Order object Array by a object property
function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}
