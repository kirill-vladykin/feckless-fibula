# feckless-fibula
The interface for a restaurant orders management system 

INTERFACE LANGUAGE
Russian

DESCRIPTION/WORKFLOW
1) Loading menu and orders list from .json files;
2) Showing list of all orders ordered by time;
3) Detail information about order is available when clicking on an order;
4) Detail information includes dishes, price, weight/volume, number of portions and total price. If all dishes in the order has only one portion then "number of portions" column is not shown;
5) Order can be marked as "payed". These orders then are labeled "payed" and decorated as semi-transparent; 
6) Work window has fixed dimensions but supports long order and dishes lists by auto scrolling;

INSTALLATION
On Windows the program can be run under DENWER (http://www.denwer.ru/). See DENWER help for more information.
! Whe using DENWER you must add utf-8 charset support as default. For this place inside httpd.conf file next line:
AddDefaultCharset UTF-8

BROWSER SUPPORT
Works pretty fine in Chrome version 46.0 and FF version 42.0.

MOBILE SUPPORT
Not tested
