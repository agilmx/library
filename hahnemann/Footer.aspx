<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<%@ Page Language="C#" %>
<%@ Register tagprefix="SharePoint" namespace="Microsoft.SharePoint.WebControls" assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml">

<head runat="server">
<meta name="WebPartPageExpansion" content="full" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Paladin - Hahnemann</title>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
    <link rel="stylesheet" type="text/css" href="https://www.hahnemannhospital.com/SiteAssets/css/theme_hahnemann.css" />
    <link rel="stylesheet" type="text/css" href="https://www.hahnemannhospital.com/SiteAssets/css/hahnemann.css" />
<meta http-equiv="X-UA-Compatible" content="IE=10" />
<SharePoint:CssRegistration Name="default" runat="server"/>
</head>


<body>
    <div class="paladin-container mt-5" id="explore-all-container">
        <div class="paladin-row">
            <div class="paladin-col-md-12">
                <div class="inner-container accent-bg-2">
                    <div class="explore-all"> Explore all of Hahnemann University Hospital &nbsp;<a href="#" id="toggle-footer-nav"><i class="fa fa-chevron-circle-down "></i></a></div>
                </div>
            </div>
        </div>
    </div>

    <!--Footer Start-->
    <div class="paladin-container hidden-md-down" id="footer-container">
        <div class="paladin-row">
            <div class="paladin-col-md-12">
                <div class="inner-container accent-bg-1">
                    <footer class="pb-2 pt-3">

                        <div id="footerNav" class="plNavWrp" v-cloak=v-cloak>
							<ul class="plNavList">
                                <li v-for="item in menuItems">
                                    <a v-bind:href="item.link">{{ item.Name }}</a>
                                    <ul>
                                        <li v-for="subitem in item.subItems"><a v-bind:href="subitem.link">{{ subitem.Name }}</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>

                    </footer>
                </div>

            </div>
        </div>
    </div>
    <div class="paladin-container mb-2">
        <div class="paladin-row">
            <div class="paladin-col-md-8">
                <div class="copyrightFooterNav">
                    <ul>
                        <li><a href="https://www.hahnemannhospital.com/SitePages/Privacy-Notice.aspx">Privacy Policy</a></li>
                        <li><a href="https://www.hahnemannhospital.com/SitePages/Nondiscrimination-Notice-and-Language-Assistance-Services.aspx">Notice of Non-Discrimination</a></li>
                        <li><a href="https://www.hahnemannhospital.com/SitePages/Accessibility-Statement.aspx">Accessibility</a></li>
                        <li><a href="https://www.hahnemannhospital.com/SitePages/Terms-and-Conditions.aspx">Terms & Conditions</a></li>
                    </ul>
                </div>
            </div>
            <div class="paladin-col-md-4 text-right">
                <span class="pl-reserved">  2018 Hahnemann University Hospital, All Rights Reserved</span>
                <div class="pl-powered">Powered by <a target="_blank" href="https://www.myhospitalwebsite.com/en/">MyHospitalWebSite.com</a></div>
            </div>
        </div>
    </div>
    <!--Footer Ends-->
    <script src="https://www.hahnemannhospital.com/SiteAssets/js/vue.min.js"></script>
    <script src="https://www.hahnemannhospital.com/SiteAssets/js/tether.js"></script>
    <script src="https://www.hahnemannhospital.com/SiteAssets/js/j-sliding-banner.js"></script>

    <script src="https://www.hahnemannhospital.com/SiteAssets/js/stchris.js"></script>
    <script src="https://www.hahnemannhospital.com/SiteAssets/js/plmain.js"></script>

    <script src="https://www.hahnemannhospital.com/SiteAssets/js/menu.js"></script>    
    <script src="https://www.hahnemannhospital.com/SiteAssets/js/header.js"></script>
    <script src="https://www.hahnemannhospital.com/SiteAssets/js/footer.js"></script>

</body>
</html>
