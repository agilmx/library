//$(document).ready(function () {
    document.addEventListener('DOMContentLoaded', function() {
        //Branding will apply only to SitePages (Not in edit mode)
        //var VueTopNav = new Vue({
        var VueFooterNav= new Vue({
            //el: '#megaNavBar',
            el: '#footerNav',

            data: {
                rootNavItems: ['Our-Services', 'Our-Locations', 'Our-Stories', 'For-Patients', 'For-Family-and-Visitors', 'For-Health-Professionals'],
                //Init variables for root folder
                /*
                menuItems: [
                  { subItems: [], Name: 'Our Services', link: _spPageContextInfo.siteAbsoluteUrl + '/SitePages/Our-Services.aspx' },
                  { subItems: [], Name: 'Our Locations', link: _spPageContextInfo.siteAbsoluteUrl + '/SitePages/Our-Locations.aspx' },
                  { subItems: [], Name: 'Our Stories', link: _spPageContextInfo.siteAbsoluteUrl + '/SitePages/Our-Stories.aspx' },
                  { subItems: [], Name: 'For Patients', link: _spPageContextInfo.siteAbsoluteUrl + '/SitePages/For-Patients.aspx' },
                  { subItems: [], Name: 'For Family & Visitors', link: _spPageContextInfo.siteAbsoluteUrl + '/SitePages/For-Family-and-Visitors.aspx' },
                  { subItems: [], Name: 'For Health Professionals', link: _spPageContextInfo.siteAbsoluteUrl + '/SitePages/For-Health-Professionals.aspx' }
                ]*/
                menuItems: [
                  { subItems: [], Name: 'Our Services', link: 'https://www.hahnemannhospital.com/SitePages/Our-Services.aspx' },
                  { subItems: [], Name: 'Our Locations', link: 'https://www.hahnemannhospital.com/SitePages/Our-Locations.aspx' },
                  { subItems: [], Name: 'Our Stories', link: 'https://www.hahnemannhospital.com/SitePages/Our-Stories.aspx' },
                  { subItems: [], Name: 'For Patients', link: 'https://www.hahnemannhospital.com/SitePages/For-Patients.aspx' },
                  { subItems: [], Name: 'For Family & Visitors', link: 'https://www.hahnemannhospital.com/SitePages/For-Family-and-Visitors.aspx' },
                  { subItems: [], Name: 'For Health Professionals', link: 'https://www.hahnemannhospital.com/SitePages/For-Health-Professionals.aspx' }
                ]

            },

            methods: {
                //Build main menu
                buildMainMenu: function () {

                    var sitePagesPath = '/SitePages';
                   // var relativePath = _spPageContextInfo.serverRequestPath;

    //                var relativeFolderPath = relativePath.substring(0, relativePath.lastIndexOf("/"));
                    var relativeFolderPath = "https://www.hahnemannhospital.com/SitePages/";

                    //Get same level pages Sharepoint REST API calls
                    var config = { headers: { 'accept': 'application/json;odata=verbose' } };
    //                var getFilesURL = _spPageContextInfo.siteAbsoluteUrl+ "/_api/Web/GetFolderByServerRelativeUrl('{path}')?$expand=Files,Folders/Files";
                    var getFilesURL = "https://www.hahnemannhospital.com/_api/Web/GetFolderByServerRelativeUrl('{path}')?$expand=Files,Folders/Files";


                    var getRelativeURL = getFilesURL.format({ path:  sitePagesPath});
                    //console.log(getRelativeURL);

                    //Load menu from JSON variable
                    VueFooterNav.addMainMenuPagesAndSubpages(menuJSON);
                    /*
                    axios.get(getRelativeURL , config)
                    .then(function (response) {
                        //console.log(response.data);
                        //VueTopNav.addMainMenuPagesAndSubpages(response.data);
                        VueFooterNav.addMainMenuPagesAndSubpages(response.data);
                    });
                    */
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
    //                        var pageURL = _spPageContextInfo.siteAbsoluteUrl + '/SitePages/' + menuItem.Name + '.aspx';
                    var pageURL = 'https://www.hahnemannhospital.com/SitePages/' + menuItem.Name + '.aspx';
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
                   // VueFooterNav.menuItems = this.menuItems
                },  //   addSameLevelPagesAndSubpages

            }, //methods
        }); // var VueTopNav

     /*
       var VueFooterNav = new Vue({
            el: '#footerNav2',
            data: {
                menuItems: VueTopNav.menuItems
            },
        }); // var VueFooterNav
    */

        //Menu Initialization
    //    VueTopNav.buildMainMenu();
        VueFooterNav.buildMainMenu();
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
