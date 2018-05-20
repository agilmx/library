<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<%@ Page Language="C#" %>
<%@ Register tagprefix="SharePoint" namespace="Microsoft.SharePoint.WebControls" assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml">

<head runat="server">
<meta name="WebPartPageExpansion" content="full" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Paladin - St. Christopher's</title>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
    <link rel="stylesheet" type="text/css" href="https://www.stchristophershospital.com/SiteAssets/css/theme_stchris.css" />
    <link rel="stylesheet" type="text/css" href="https://www.stchristophershospital.com/SiteAssets/css/stchris.css" />
<meta http-equiv="X-UA-Compatible" content="IE=10" />
<SharePoint:CssRegistration Name="default" runat="server"/>
</head>


<body>
    <!--Header Start-->
    <div id=”DynamicHeader”>
        <header>
            <div class="paladin-container">
                <!--TOP-NAV START-->
                <div class="paladin-row hidden-md-down" id="top-nav-container">
                    <div class="paladin-col-md-12">
                        <nav class="paladin-navbar navbar-toggleable-sm navbar-inverse" id="top-navbar">
                            <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#topNavContent" aria-controls="topNavContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <a class="navbar-brand hidden-md-up" href="#">Login Menu</a>

                            <div class="collapse navbar-collapse justify-content-end" id="topNavContent">
                                <ul class="navbar-nav">
                                    <li class="nav-item">
                                        <a class="nav-link" href="https://www.stchristophershospital.com/"><i class="fa fa-home" aria-hidden="true"></i></a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="https://www.stchristophershospital.com/SitePages/Contact-Us.aspx">Contact Us</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" target="_blank" href="https://recruiting.adp.com/srccar/public/RTI.home?d=ExternalCareerSite&amp;_icx=v02FZ4QMhux9UtZAv81ZqaTRs4i7%2F_3rTnORppbDCDTNe9MjFaqGBYREP7oZkjwp3ft&amp;c=1216101&amp;_dissimuloSSO=TxegIxI13qU:YBbjt8ujkteWPN9r8yhMa_YB8fM">Careers</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="https://www.stchristophershospital.com/SitePages/About-Us.aspx">About</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="https://www.stchristophershospital.com/SitePages/Connect-With-Us.aspx">Connect</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="https://www.stchristophershospital.com/SitePages/Login.aspx">Login</a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
                <!--TOP-NAV END-->
                <!--Logo and Search Start-->
                <div class="paladin-row mt-3">
                    <div class="paladin-col-md-12">
                        <div id="logo-container">
                            <div id="stchris-logo">
                                <a title="St. Christopher's Hospital for Children" href="https://www.stchristophershospital.com">
                                    <img src="https://www.stchristophershospital.com/SiteAssets/images/Logo_StChris.png" alt="St. Christophers Hospital"  class="img-logo"/>
                                </a>   
                            </div>

                            <div id="search-container-header">
                                <div class="right-inner-addon mb-3">
                                        <a id="sharePointSearch" href="#"><i class="fa fa-search" aria-hidden="true"></i></a>
                                        <input id="sharePointSearchParameter" type="text" class="form-control" placeholder="What we can help you find?" />
                                </div>
								<div class="social-icons text-right">
									<a target="_blank" href="https://www.instagram.com/stchrishospital">
										<i class="fa fa-instagram" aria-hidden="true"></i></a>
									<a target="_blank" href="https://twitter.com/stchrishospital">
										<i class="fa fa-twitter" aria-hidden="true"></i>
									</a>
									<a target="_blank" href="https://www.facebook.com/StChrisHospital">
										<i class="fa fa-facebook-f" aria-hidden="true"></i>
									</a>
									<a target="_blank" href="https://www.youtube.com/user/stchrisvideos">
										<i class="fa fa-youtube-play" aria-hidden="true"></i>
									</a>
								</div>                             
                            </div>

                        </div>
                    </div>
                </div>
                <!--Logo and Search End-->
                <!--Main Nav Start-->
                <div class="paladin-row mt-3" id="mega-nav-container">
                    <div class="paladin-col-md-12">
                        <nav class="paladin-navbar navbar-toggleable-md navbar-inverse btco-menu" id="mega-navbar">
                            <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#megaNavBar" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <a class="navbar-brand" href="#">&nbsp;</a>

                            <div class="collapse navbar-collapse" id="megaNavBar" v-cloak=v-cloak>
                                <ul class="navbar-nav">
                                    <li v-for="item in menuItems" class="nav-item dropdown">
                                        <a class="nav-link" id="magadropdownlink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-bind:href="item.link" v-bind:class="{'dropdown-toggle': item.subItems.length > 0}">
                                            {{ item.Name }}
                                        </a>
                                        <ul class="dropdown-menu" aria-labelledby="magadropdownlink" v-if="item.subItems.length > 0">
                                            <li v-for="subitem in item.subItems"><a class="dropdown-item" v-bind:href="subitem.link">{{ subitem.Name }}</a></li>
                                        </ul>
                                    </li>
                                    <li class="nav-item dropdown hidden-lg-up">
                                        <a class="nav-link dropdown-toggle" href="#" id="loginDropdownLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Quick Links
                                        </a>
                                        <ul class="dropdown-menu" aria-labelledby="loginDropdownLink">
                                             <li>
                                                <a class="dropdown-item" href="https://www.stchristophershospital.com/SitePages/Contact-Us.aspx">Contact Us</a>
                                            </li>
                                            <li>
                                                <a class="dropdown-item" target="_blank" href="https://recruiting.adp.com/srccar/public/RTI.home?d=ExternalCareerSite&_icx=v02FZ4QMhux9UtZAv81ZqaTRs4i7%2F_3rTnORppbDCDTNe9MjFaqGBYREP7oZkjwp3ft&c=1216101&_dissimuloSSO=TxegIxI13qU:YBbjt8ujkteWPN9r8yhMa_YB8fM">Careers</a>
                                            </li>
                                            <li>
                                                <a class="dropdown-item" href="https://www.stchristophershospital.com/SitePages/About-Us.aspx">About</a>
                                            </li>
                                            <li>
                                                <a class="dropdown-item" href="https://www.stchristophershospital.com/SitePages/Connect-With-Us.aspx">Connect</a>
                                            </li>
                                            <li>
                                                <a class="dropdown-item" href="https://www.stchristophershospital.com/SitePages/Login.aspx">Login</a>
                                            </li>                                                                        </ul>
                                    </li>
                                    <li class="health-resource"><a target="_blank" href="http://stchristophershospital.staywellsolutionsonline.com"><i class="fa fa-heartbeat "></i><span>Health<br />Resources</span></a></li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
                <!--Main Nav END-->
            </div>
        </header>
    </div>
    

</body>
</html>
